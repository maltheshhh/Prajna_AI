//To Access the OAuth Token from Zoho API, we need to use the Refresh Token to get a new Access Token. This function handles that process and caches the token for future use.

const https = require("https");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

let cachedToken = null;
let expiry = 0;

async function getAccessToken() {

    console.log("\n========== OAuth Configuration ==========");
    console.log("CLIENT_ID:", CLIENT_ID);
    console.log("CLIENT_SECRET Loaded:", !!CLIENT_SECRET);
    console.log("REFRESH_TOKEN Loaded:", !!REFRESH_TOKEN);
    console.log("=========================================\n");

    if (cachedToken && Date.now() < expiry) {
        console.log("Using Cached Access Token");
        return cachedToken;
    }

    return new Promise((resolve, reject) => {

        const body =
            `refresh_token=${encodeURIComponent(REFRESH_TOKEN)}` +
            `&client_id=${encodeURIComponent(CLIENT_ID)}` +
            `&client_secret=${encodeURIComponent(CLIENT_SECRET)}` +
            `&grant_type=refresh_token`;

        const req = https.request({

            hostname: "accounts.zoho.in",
            path: "/oauth/v2/token",
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(body)
            }

        }, (res) => {

            let response = "";

            res.on("data", chunk => {
                response += chunk;
            });

            res.on("end", () => {

                console.log("\n========== Zoho OAuth Response ==========");
                console.log(response);
                console.log("=========================================\n");

                try {

                    const json = JSON.parse(response);

                    if (!json.access_token) {

                        console.error("OAuth Failed:", json);

                        return reject(json);

                    }

                    cachedToken = json.access_token;

                    expiry =
                        Date.now() +
                        ((json.expires_in - 300) * 1000);

                    console.log("Access Token Generated Successfully");

                    resolve(cachedToken);

                }

                catch (err) {

                    console.error("JSON Parse Error:", err);

                    reject(err);

                }

            });

        });

        req.on("error", err => {

            console.error("HTTPS Error:", err);

            reject(err);

        });

        req.write(body);

        req.end();

    });

}

module.exports = getAccessToken;