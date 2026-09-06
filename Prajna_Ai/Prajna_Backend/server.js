const http = require("http");
const path = require("path");

// Load backend function handlers
const aiHandler = require("./functions/prajna_ai_function/index.js");
const ziaSpeechHandler = require("./functions/zia_speech/index.js");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = req.url || "";
    if (reqUrl.startsWith("/server/zia_speech") || reqUrl.startsWith("/zia_speech")) {
      await ziaSpeechHandler(req, res);
    } else {
      await aiHandler(req, res);
    }
  } catch (err) {
    console.error("Local Server Request Error:", err);
    res.writeHead(500, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`[Prajna-AI] Local Backend Server running at http://127.0.0.1:${PORT}`);
});
