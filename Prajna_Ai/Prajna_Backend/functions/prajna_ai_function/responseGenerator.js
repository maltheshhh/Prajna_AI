const dashboardEngine = require("./dashboardEngine");
const { getNetworkGraph } = require("./networkEngine");
const executeQuery = require("./executeQuery");
const analyticsEngine = require("./analyticsEngine");
const generateAIResponse = require("./aiEngine");
const trendEngine  = require("./trendEngine");
const offenderEngine = require("./offenderEngine");
console.log("Trend:", trendEngine.getTrendAnalytics);
console.log("Socio:", trendEngine.getSociologicalAnalytics);

async function generateResponse(
    context,
    db,
    intent,
    entities,
    query,
    language = "en"
) {
   // Dashboard Auto Briefing
if (query === "__dashboard__") {
    return await dashboardEngine(db);
}

    // --------------------------
    // Conversational / Greeting handling
    // Skips the DB query, analytics, and rigid report template entirely —
    // this is what lets "hi" get a natural officer-tone reply instead of
    // being forced into an Executive Summary / Key Findings structure.
    // --------------------------
    if (intent === "conversational") {

        let langNote = "";
        if (language === "kn") langNote = " Reply in fluent Kannada.";
        if (language === "hi") langNote = " Reply in fluent Hindi.";

        const personaPrompt = `You are Prajna-AI. An officer just said: "${query}"
Reply the way a sharp, courteous AI assistant would when addressed directly by a police officer — natural, brief, in-character. Do not produce a report.${langNote}`;

        let reply = "Prajna-AI online, Officer. How can I assist with your investigation?";

        try {

            const aiResult = await generateAIResponse(context, personaPrompt, "conversational");

            if (typeof aiResult.response === "string") {
                reply = aiResult.response;
            } else if (aiResult.choices && aiResult.choices[0] && aiResult.choices[0].message) {
                reply = aiResult.choices[0].message.content;
            } else if (aiResult.output && aiResult.output[0] && aiResult.output[0].content) {
                reply = aiResult.output[0].content;
            } else if (aiResult.message) {
                reply = aiResult.message;
            } else if (aiResult.content) {
                reply = aiResult.content;
            }

        } catch (err) {
            console.error("Conversational AI Error:", err);
        }

        return {
            success: true,
            type: "conversational",
            languageReceived: language,
            response: reply
        };
    }

    // --------------------------
    // Execute Mongo Query
    // --------------------------
   const result = await executeQuery(db, entities);
   const firs = result.data;

// -------------------------- 
// Generate Analytics
// --------------------------

   const analytics = analyticsEngine(firs);

let summary = "";
let insights = [];
let recommendations = [];

    switch (intent) {

        case "trend_analysis": {

    const trends = await trendEngine.getTrendAnalytics(db);

    return {
        success: true,
        type: "trend",
        data: trends
    };

}

        case "hotspot_analysis":

            summary = `Crime hotspot identified at ${analytics.hotspotStation}.`;

            insights = analytics.insights;

            recommendations = [
                "Increase beat patrols.",
                "Deploy CCTV monitoring.",
                "Strengthen night surveillance."
            ];
            break;
        case "sociological_analysis": {

    const analytics = await trendEngine.getSociologicalAnalytics(db);

    return {
        success: true,
        type: "sociology",
        data: analytics
    };
}


        case "offender_profile": {

    const offenderData = await offenderEngine.getOffenderProfiles(db);

    return {
        success: true,
        type: "offender",
        data: offenderData
    };

}

        case "financial_analysis":

            summary = `Financial crime analysis completed. ${analytics.totalFIRs} related FIRs found.`;

            insights = analytics.insights;

            recommendations = [
                "Review suspicious transactions.",
                "Cross-check linked bank accounts.",
                "Monitor high-value transfers."
            ];
            break;
        
        case "network_analysis": {

    const graph = await getNetworkGraph(db);

    return {
        success: true,
        type: "network",
        graph
    };
}

        default:

            summary = `Found ${analytics.totalFIRs} matching FIR records.`;

            insights = analytics.insights;
            recommendations = analytics.recommendations;
    }

    // --------------------------
    // AI Prompt
    // --------------------------
let languageInstruction = "Respond ONLY in English.";

if (language === "kn") {
    languageInstruction = `
Respond ONLY in fluent professional Kannada.

Generate the ENTIRE intelligence report in Kannada.

Do NOT mix English with Kannada except official police terms such as:
FIR,
IPC,
BNS,
CCTNS,
QuickML,
Catalyst,
Prajna-AI.

Translate all headings into Kannada.
Use natural Kannada suitable for Karnataka State Police officers.
`;
}

if (language === "hi") {
    languageInstruction = `
Respond ONLY in fluent professional Hindi.

Generate the ENTIRE intelligence report in Hindi.

Do NOT mix English with Hindi except official police terms such as:
FIR,
IPC,
BNS,
CCTNS,
QuickML,
Catalyst,
Prajna-AI.

Translate all headings into Hindi.
`;
}
   
    // Does the officer actually want a formal written report/briefing,
    // or are they just asking a normal question? This is the switch that
    // lets the model behave conversationally (like ChatGPT/Claude) instead
    // of always dumping the full 9-section template.
    const reportRequestPattern =
        /\b(report|briefing|detailed analysis|full analysis|summary report|write up|writeup|dossier)\b/i;

    const wantsFormalReport = reportRequestPattern.test(query);

    const formatInstruction = wantsFormalReport
        ? `The officer has explicitly asked for a formal report/briefing. Prepare a structured intelligence briefing with these sections: Executive Summary, Key Findings, Geographic Intelligence, Crime Pattern Analysis, Offender Intelligence, Risk Assessment, Recommended Police Actions, Evidence Summary (cite FIR numbers), Confidence Assessment. Use professional police terminology and clear headings.`
        : `The officer is asking a normal question, not requesting a formal report. Answer naturally and conversationally — the way a sharp, knowledgeable colleague would, in plain prose or a short list, sized to match the question (a one-line question deserves a short answer, not an essay). Do NOT use report headings like "Executive Summary" or force every section above unless the officer actually asked for a report. You may still mention specific FIR numbers, districts, or stats when relevant.`;

    const prompt = `
${languageInstruction}

You are Prajna AI, Crime Intelligence Assistant for Karnataka State Police, speaking directly with an officer in a chat conversation.

User Query:
${query}

Intent:
${intent}

Entities:
${JSON.stringify(entities, null, 2)}

Crime Statistics:
${JSON.stringify({
    totalCases: analytics.totalFIRs,
    hotspot: analytics.hotspotStation,
    topCrime: analytics.topCrime
}, null, 2)}

Sample FIRs (this is your ONLY source of truth — never use outside/general/web knowledge, never invent facts or statistics not present here):
${JSON.stringify(firs.slice(0, 10), null, 2)}

${formatInstruction}

If the supplied FIR data doesn't contain enough to answer confidently, say so plainly instead of guessing.
`;

    // --------------------------
    // AI Report
    // --------------------------

    let aiReport = "AI report generation failed.";

    try {

        const aiResult = await generateAIResponse(context, prompt, "report");

        console.log("========== RAW AI RESULT ==========");
        console.log(JSON.stringify(aiResult, null, 2));
        console.log("Keys:", Object.keys(aiResult));

        if (aiResult.choices) {
            console.log("CHOICES:");
            console.log(JSON.stringify(aiResult.choices, null, 2));
        }

        if (aiResult.response) {
            console.log("RESPONSE:");
            console.log(aiResult.response);
        }

        if (aiResult.output) {
            console.log("OUTPUT:");
            console.log(JSON.stringify(aiResult.output, null, 2));
        }

        if (aiResult.message) {
            console.log("MESSAGE:");
            console.log(JSON.stringify(aiResult.message, null, 2));
        }

        console.log("===================================");

        // ---------- Extract AI Text ----------

        if (typeof aiResult.response === "string") {

            aiReport = aiResult.response;

        } else if (
            aiResult.choices &&
            aiResult.choices.length &&
            aiResult.choices[0].message
        ) {

            aiReport = aiResult.choices[0].message.content;

        } else if (
            aiResult.output &&
            aiResult.output.length &&
            aiResult.output[0].content
        ) {

            aiReport = aiResult.output[0].content;

        } else if (aiResult.message) {

            aiReport = aiResult.message;

        } else if (aiResult.content) {

            aiReport = aiResult.content;

        } else {

            aiReport = JSON.stringify(aiResult, null, 2);

        }

    } catch (err) {

        console.error("AI Error:", err);

        aiReport = `AI Error: ${err.message}`;

    }

    // --------------------------
    // Final Response
    // --------------------------

    return {
    success: true,

    languageReceived: language,

    response: aiReport,

    summary,

    insights,

    recommendations,

    statistics: {
        totalCases: analytics.totalFIRs,
        openCases: analytics.openCases,
        closedCases: analytics.closedCases,
        underInvestigation: analytics.underInvestigation,
        chargesheeted: analytics.chargesheeted,
        convicted: analytics.convicted,
        severity: analytics.severity,
        hotspotStation: analytics.hotspotStation,
        topCrime: analytics.topCrime
    }
};

}

module.exports = generateResponse;