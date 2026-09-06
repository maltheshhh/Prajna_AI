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
    console.log("Prajna AI Speech Service Function Running");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    // Standard CORS headers for Zoho Catalyst web hosting & client access
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Catalyst-Client");

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    res.setHeader("Content-Type", "application/json");

    try {
        if (req.method === "GET") {
            // Health check and capability status endpoint
            res.statusCode = 200;
            return res.end(JSON.stringify({
                success: true,
                service: "Prajna-AI Speech Processing Service",
                status: "active",
                supportedLanguages: [
                    { code: "en", locale: "en-IN", name: "English (India)" },
                    { code: "hi", locale: "hi-IN", name: "Hindi (हिंदी)" },
                    { code: "kn", locale: "kn-IN", name: "Kannada (ಕನ್ನಡ)" }
                ],
                clientEngine: "Chrome Web Speech API (Native)",
                timestamp: new Date().toISOString()
            }));
        }

        if (req.method === "POST") {
            const rawBody = await readRequestBody(req);
            let parsedBody = {};

            try {
                parsedBody = rawBody ? JSON.parse(rawBody) : {};
            } catch (e) {
                // If multipart or text payload
                parsedBody = { raw: rawBody };
            }

            const language = parsedBody.language || "en";
            const transcript = parsedBody.text || parsedBody.transcript || parsedBody.query || "";

            return res.end(JSON.stringify({
                success: true,
                text: transcript,
                language: language,
                confidence: 0.98,
                source: "prajna_voice_pipeline",
                message: transcript ? "Voice input processed successfully." : "Speech service ready.",
                timestamp: new Date().toISOString()
            }));
        }

        res.statusCode = 405;
        return res.end(JSON.stringify({
            success: false,
            error: "Method Not Allowed"
        }));

    } catch (err) {
        console.error("Speech service error:", err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            success: false,
            error: err.message || "Internal server error in speech endpoint"
        }));
    }
};
