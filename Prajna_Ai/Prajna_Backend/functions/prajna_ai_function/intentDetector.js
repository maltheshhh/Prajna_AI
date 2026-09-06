// intentDetector.js — DEBUG VERSION

function detectIntent(query) {

    console.log("========== INTENT DETECTOR ==========");
    console.log("Original Query:", query);

    const q = query.toLowerCase().trim();

    console.log("Lowercase Query:", q);

    // =========================
    // Conversational / Greeting / Chitchat
    // MUST run first — otherwise these fall through to
    // general_query and get forced into the rigid report template.
    // =========================
    const conversationalPatterns = [
        /^(hi+|hello+|hey+|yo|hola|namaste|namaskara)\b/,
        /^(good\s?(morning|afternoon|evening|night))\b/,
        /^(thanks|thank you|thankyou|ty|thx)\b/,
        /^(bye|goodbye|see you|see ya|take care)\b/,
        /^(how are you|what'?s up|sup|how'?s it going)\b/,
        /^(who are you|what can you do|what do you do)\b/,
        /^(ok|okay|cool|nice|great|got it|alright)\.?$/
    ];

    if (conversationalPatterns.some(p => p.test(q))) {
        console.log("MATCHED -> conversational");
        return "conversational";
    }

    if (
        q.includes("trend") ||
        q.includes("analysis") ||
        q.includes("pattern") ||
        q.includes("increase") ||
        q.includes("rise") ||
        q.includes("spike")
    ) {
        console.log("MATCHED -> trend_analysis");
        return "trend_analysis";
    }

    if (
        q.includes("hotspot") ||
        q.includes("location") ||
        q.includes("area") ||
        q.includes("map") ||
        q.includes("where") ||
        q.includes("zone")
    ) {
        console.log("MATCHED -> hotspot_analysis");
        return "hotspot_analysis";
    }

    if (
        q.includes("suspect") ||
        q.includes("accused") ||
        q.includes("offender") ||
        q.includes("repeat") ||
        q.includes("profile") ||
        q.includes("who is")
    ) {
        console.log("MATCHED -> offender_profile");
        return "offender_profile";
    }

    if (
        q.includes("network") ||
        q.includes("gang") ||
        q.includes("linked") ||
        q.includes("connection") ||
        q.includes("associate")
    ) {
        console.log("MATCHED -> network_analysis");
        return "network_analysis";
    }

    if (
        q.includes("predict") ||
        q.includes("forecast") ||
        q.includes("future") ||
        q.includes("risk") ||
        q.includes("probability")
    ) {
        console.log("MATCHED -> prediction");
        return "prediction";
    }

    if (
        q.includes("pending") ||
        q.includes("unsolved") ||
        q.includes("status") ||
        q.includes("open")
    ) {
        console.log("MATCHED -> case_status");
        return "case_status";
    }

    if (
        q.includes("financial") ||
        q.includes("transaction") ||
        q.includes("fraud") ||
        q.includes("money")
    ) {
        console.log("MATCHED -> financial_analysis");
        return "financial_analysis";
    }

    if (
        q.includes("count") ||
        q.includes("how many") ||
        q.includes("total") ||
        q.includes("number")
    ) {
        console.log("MATCHED -> count_query");
        return "count_query";
    }
    if (
    q.includes("sociology") ||
    q.includes("sociological") ||
    q.includes("insight") ||
    q.includes("insights") ||
    q.includes("demographic") ||
    q.includes("gender") ||
    q.includes("age")
) {
    console.log("MATCHED -> sociological_analysis");
    return "sociological_analysis";
}

    if (
        q.includes("show") ||
        q.includes("list") ||
        q.includes("find") ||
        q.includes("search")
    ) {
        console.log("MATCHED -> search");
        return "search";
    }

    console.log("MATCHED -> general_query");
    return "general_query";
}

module.exports = { detectIntent };