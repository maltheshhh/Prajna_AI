const https = require("https");
const getAccessToken = require("./getToken");

const PROJECT_ID = process.env.PROJECT_ID;
const ORG_ID = process.env.ORG_ID;

const ENDPOINT =
`https://api.catalyst.zoho.in/quickml/v1/project/${PROJECT_ID}/glm/chat`;

// System prompts by mode. "report" = strict structured intelligence
// briefing (unchanged behaviour). "conversational" = natural,
// in-persona officer-tone replies for greetings/chitchat.
const SYSTEM_PROMPTS = {
    report:
"You are Prajna AI, an AI Crime Intelligence Assistant for Karnataka State Police. Return ONLY the final police intelligence report. Do NOT output your reasoning, thinking process, analysis steps, or prompt interpretation.",

    conversational:
"You are Prajna AI, an AI Crime Intelligence Assistant for Karnataka State Police, speaking directly to a police officer. Reply naturally and briefly, in a respectful, professional officer-to-officer tone — like a sharp human colleague, not a report generator. Do NOT use report headings, bullet-point sections, or the words 'Executive Summary' for casual conversation. Keep it to 1-3 sentences unless the officer asks for more."
};

async function generateAIResponse(req, prompt, mode = "report") {

    const accessToken = await getAccessToken();

    const systemContent = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.report;

    const requestBody = JSON.stringify({

        model: "crm-di-glm47b_30b_it",

        messages: [
            {
                role: "system",
                content: systemContent
            },
            {
                role: "user",
                content: prompt
            }
        ],

        max_tokens: mode === "conversational" ? 300 : 2000,

        temperature: mode === "conversational" ? 0.6 : 0.2,

        stream: false,

chat_template_kwargs: {
    enable_thinking: false
}

    });

    console.log("========== QUICKML REQUEST ==========");
    console.log("Endpoint:", ENDPOINT);
    console.log("Mode:", mode);
    console.log("Prompt Length:", prompt.length);
    console.log("=====================================");

    return new Promise((resolve, reject) => {

        const request = https.request(

            ENDPOINT,

            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Zoho-oauthtoken ${accessToken}`,

                    "CATALYST-ORG": ORG_ID,

                    "Content-Type": "application/json",

                    "Content-Length":
                        Buffer.byteLength(requestBody)

                }

            },

            (response) => {

                console.log("STATUS:", response.statusCode);

                let body = "";

                response.on("data", chunk => {
                    body += chunk;
                });

                response.on("end", () => {

                    console.log("========== QUICKML RESPONSE ==========");
                    console.log(JSON.stringify(JSON.parse(body), null, 2));
                    console.log("======================================");

                    try {

                        resolve(JSON.parse(body));

                    } catch {

                        resolve({
                            raw: body
                        });

                    }

                });

            }

        );

        request.on("error", err => {

            console.error(err);

            reject(err);

        });

        request.setTimeout(120000, () => {

            request.destroy();

            reject(new Error("QuickML request timed out"));

        });

        request.write(requestBody);

        request.end();

    });

}

module.exports = generateAIResponse;