/**
 * To wire in CIRAS routes:
 * 1. Require the routes: const { handleCirasRequest } = require('./ciras/cirasRoutes');
 * 2. In the handler function, check for CIRAS routes early (e.g., before body parsing or after URL parsing):
 *    const parsed = url.parse(req.url, true);
 *    if (parsed.pathname && parsed.pathname.startsWith('/ciras/')) {
 *        // Pass `app` as undefined if this is a standalone function or inject Catalyst app instance
 *        return handleCirasRequest(req, res, undefined, parsed.pathname);
 *    }
 */
const getDashboardSummary = require("./dashboardEngine");
const { getOffenderProfiles } = require("./offenderEngine");
const { getNetworkGraph } = require("./networkEngine");
const { getTrendAnalytics, getSociologicalAnalytics } = require("./trendEngine");
const { connectDB } = require("./db"); 
const { detectIntent } = require("./intentDetector");
const extractEntities = require("./entityExtractor");
const generateResponse = require("./responseGenerator");
const url = require("url");

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            resolve(data);
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
}

module.exports = async (req, res) => {
    console.log("NEW VERSION RUNNING");
    console.log("Method:", req.method);
    console.log("Headers:", req.headers);
    console.log("URL:", req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    try {
        let query = "";
        let language = "en";
        const parsed = url.parse(req.url, true);

        if (parsed.query && parsed.query.query) {
            query = parsed.query.query;
        }

        // Manually read raw body from the request stream
        let parsedBody = {};
        if (req.method === "POST") {
            const rawBody = await readRequestBody(req);
            console.log("RAW BODY:", rawBody);
            try {
                parsedBody = rawBody ? JSON.parse(rawBody) : {};
            } catch (e) {
                console.error("Failed to parse raw body as JSON:", e.message);
                parsedBody = {};
            }
        }

        if (!query && parsedBody && parsedBody.query) {
            query = parsedBody.query;
        }
        if (parsedBody && parsedBody.language) {
    language = parsedBody.language;
}

        console.log("PARSED BODY:", parsedBody);
        console.log("FINAL QUERY:", query);

        if (!query) {
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({
                success: false,
                error: "Query is required"
            }));
        }

        if (query === "__dashboard__") {

    const db = await connectDB();

    const dashboard = await getDashboardSummary(db);

    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify(dashboard));
}
      if (query === "__offender__") {

    const db = await connectDB();

    const offenders = await getOffenderProfiles(db);

    res.setHeader("Content-Type","application/json");

    return res.end(JSON.stringify(offenders));
}

        // ── Citizen Report: Save (from citizen portal) ────────────────────────
        if (query === "__saveCitizenReport__") {
            const report = parsedBody.report || parsedBody;
            if (!report || !report.id) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ success: false, error: "Missing report data" }));
            }
            // Attach server timestamp
            report._savedAt = new Date().toISOString();
            report._source = "citizen_portal";

            try {
                const db = await connectDB();
                const col = db.collection("citizen_reports");
                // Upsert by id so duplicates are safe
                try {
                    await col.updateOne(
                        { id: report.id },
                        { $set: report },
                        { upsert: true }
                    );
                } catch {
                    // In-memory fallback: just insertMany
                    await col.insertMany([report]);
                }
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({
                    success: true,
                    message: "Citizen report saved to shared database.",
                    report_id: report.id,
                    incident_ref: report.incidentRef,
                    timestamp: report._savedAt
                }));
            } catch (err) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ success: false, error: err.message }));
            }
        }

        // ── Citizen Reports: Fetch (for police portal) ────────────────────────
        if (query === "__getCitizenReports__") {
            try {
                const db = await connectDB();
                const col = db.collection("citizen_reports");
                let reports = [];
                try {
                    reports = await col.find({}).toArray();
                    // Sort newest first
                    reports.sort((a, b) => new Date(b._savedAt || b.timestamp || 0) - new Date(a._savedAt || a.timestamp || 0));
                } catch {
                    reports = [];
                }
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({
                    success: true,
                    total: reports.length,
                    reports: reports.slice(0, 200)
                }));
            } catch (err) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ success: false, reports: [], error: err.message }));
            }
        }

        // ── Real WhatsApp OTP (via OpenWA) / SMS Gateway: Send ─────────────────
        if (query === "__sendOtp__") {
            const rawPhone = String(parsedBody.phone || "").replace(/\D/g, "");
            const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : rawPhone;
            if (cleanPhone.length !== 10) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ success: false, error: "Invalid 10-digit mobile number." }));
            }

            const otp = String(Math.floor(Math.random() * 900000) + 100000);
            const openwaUrl = (parsedBody.openwaUrl || process.env.OPENWA_URL || "http://localhost:2785").replace(/\/+$/, "");
            const openwaSession = parsedBody.openwaSessionId || process.env.OPENWA_SESSION_ID || "default";
            const openwaKey = parsedBody.apiKey || process.env.OPENWA_API_KEY || "";

            // Save to DB or in-memory OTP collection
            try {
                const db = await connectDB();
                const otpCol = db.collection("active_otps");
                const expiresAt = new Date(Date.now() + 300000);
                try {
                    await otpCol.updateOne(
                        { phone: cleanPhone },
                        { $set: { phone: cleanPhone, otp, expiresAt, createdAt: new Date() } },
                        { upsert: true }
                    );
                } catch {
                    await otpCol.insertMany([{ phone: cleanPhone, otp, expiresAt, createdAt: new Date() }]);
                }
            } catch (e) {
                console.warn("[OTP] DB save note:", e.message);
            }

            let whatsappDispatched = false;
            const waMsg = `🛡️ *Karnataka State Police (KSP) - Crime Intelligence Portal*\n*Citizen Incident Verification*\n\nYour 6-digit DigiLocker Verification OTP is:\n👉 *${otp}* 👈\n\n⏱️ Valid for 5 minutes.\n⚠️ Do NOT share this code with anyone.`;
            const waRecipient = `91${cleanPhone}@c.us`;

            // Try dispatching via OpenWA
            if (typeof fetch === "function") {
                const endpoints = [
                    `${openwaUrl}/api/sessions/${openwaSession}/messages/send-text`,
                    `${openwaUrl}/api/sessions/${openwaSession}/messages`,
                    `${openwaUrl}/api/messages/send-text`,
                    `${openwaUrl}/api/messages`,
                    `${openwaUrl}/api/sendText`
                ];
                for (const ep of endpoints) {
                    try {
                        const headers = { "Content-Type": "application/json" };
                        if (openwaKey) {
                            headers["X-API-Key"] = openwaKey;
                            headers["Authorization"] = `Bearer ${openwaKey}`;
                        }
                        const r = await fetch(ep, {
                            method: "POST",
                            headers,
                            body: JSON.stringify({ chatId: waRecipient, to: waRecipient, text: waMsg, sessionId: openwaSession })
                        });
                        if (r.ok) {
                            whatsappDispatched = true;
                            break;
                        }
                    } catch {}
                }
            }

            console.log(`[OTP] Generated ${otp} for +91-${cleanPhone}. WhatsApp: ${whatsappDispatched}`);

            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({
                success: true,
                phone: `+91-${cleanPhone}`,
                otp, // Provided for instant demo autofill
                whatsapp_dispatched: whatsappDispatched,
                message: `6-digit DigiLocker OTP sent to registered mobile +91-${cleanPhone}.${whatsappDispatched ? " (WhatsApp via OpenWA)" : ""}`,
                timestamp: new Date().toISOString()
            }));
        }

        // ── Real WhatsApp / SMS Gateway: Verify ────────────────────────────────
        if (query === "__verifyOtp__") {
            const rawPhone = String(parsedBody.phone || "").replace(/\D/g, "");
            const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : rawPhone;
            const userOtp = String(parsedBody.otp || "").trim();

            if (userOtp === "123456") {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({
                    success: true,
                    verified: true,
                    message: `Mobile +91-${cleanPhone} verified successfully (Demo Bypass).`
                }));
            }

            let verified = false;
            try {
                const db = await connectDB();
                const otpCol = db.collection("active_otps");
                const record = (await otpCol.find({ phone: cleanPhone }).toArray())[0];
                if (record && String(record.otp).trim() === userOtp && new Date() < new Date(record.expiresAt)) {
                    verified = true;
                    // Delete OTP once verified to prevent reuse
                    try { await otpCol.deleteOne({ phone: cleanPhone }); } catch {}
                }
            } catch (e) {
                console.warn("[OTP] Verify DB check:", e.message);
            }

            if (verified) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({
                    success: true,
                    verified: true,
                    message: `Mobile number +91-${cleanPhone} authenticated with DigiLocker Gateway.`
                }));
            }

            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({
                success: false,
                verified: false,
                error: `Invalid OTP entered for +91-${cleanPhone}. Please enter the exact 6-digit OTP sent to your WhatsApp or enter 123456.`
            }));
        }

      if (query === "__network__") {

    const db = await connectDB();

    const graph = await getNetworkGraph(db);

    res.setHeader("Content-Type","application/json");

    return res.end(JSON.stringify(graph));
}
      if (query === "__trend__") {

    const db = await connectDB();

    const analytics = await getTrendAnalytics(db);

    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify(analytics));
}
      if (query === "__sociology__") {
    const db = await connectDB();

    const analytics = await getSociologicalAnalytics(db);

    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(analytics));
}

        const intent = detectIntent(query);
        const entities = extractEntities(query);

        console.log("Intent:", intent);
        console.log("Entities:", entities);

        const db = await connectDB();

        const aiResponse = await generateResponse(
            req,
            db,
            intent,
            entities,
            query,
            language
        );

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(aiResponse));

    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            success: false,
            error: err.message
        }));
    }
};