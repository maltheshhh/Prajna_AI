const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const PORT = process.env.PORT || 2785;
let latestQr = null;
let clientReady = false;
let clientInfo = null;

console.log('====================================================');
console.log('🚀 Starting KSP WhatsApp Gateway on port ' + PORT);
console.log('====================================================');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  }
});

client.on('qr', (qr) => {
  latestQr = qr;
  clientReady = false;
  console.log('\n======================================================');
  console.log('📲 SCAN THIS QR CODE WITH WHATSAPP (Linked Devices):');
  console.log('   >>> Open in your browser: http://localhost:2785/qr <<<');
  console.log('======================================================\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  clientReady = true;
  latestQr = null;
  clientInfo = client.info;
  console.log('\n✅ WhatsApp Gateway Client Ready & Authenticated!');
  console.log('   Linked Number: +' + (client.info && client.info.wid ? client.info.wid.user : 'Active'));
  console.log('   Listening for OTP requests on port ' + PORT + '...\n');
});

client.on('authenticated', () => {
  console.log('🔑 WhatsApp session authenticated.');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failure:', msg);
});

client.on('disconnected', (reason) => {
  clientReady = false;
  latestQr = null;
  console.warn('⚠️ WhatsApp client disconnected:', reason);
  // Reinitialize client after disconnect
  setTimeout(() => {
    try {
      client.initialize().catch(err => console.error('Re-init error:', err));
    } catch (e) {
      console.warn('Re-init catch:', e.message);
    }
  }, 2000);
});

process.on('uncaughtException', (err) => {
  console.warn('⚠️ Non-fatal process error caught:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.warn('⚠️ Non-fatal promise rejection caught:', reason);
});

client.initialize().catch(err => {
  console.error('Failed to initialize client:', err);
});

// Web QR Page (Open in browser to scan easily)
app.get('/qr', (req, res) => {
  if (clientReady) {
    const num = clientInfo && clientInfo.wid ? clientInfo.wid.user : 'Active';
    return res.send(`
      <html>
        <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #0B2E59; color: white;">
          <h2 style="color: #4ade80;">✅ WhatsApp Gateway Connected!</h2>
          <p>Linked Phone: <strong>+${num}</strong></p>
          <p>You can now receive real OTPs on WhatsApp when filing citizen incident reports.</p>
        </body>
      </html>
    `);
  }
  if (!latestQr) {
    return res.send(`
      <html>
        <head><meta http-equiv="refresh" content="3"></head>
        <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #0B2E59; color: white;">
          <h2>⏳ Generating WhatsApp QR Code...</h2>
          <p>Please wait a moment, this page will refresh automatically.</p>
        </body>
      </html>
    `);
  }
  const qrImgUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(latestQr);
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="15">
        <title>Scan WhatsApp QR Code</title>
      </head>
      <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #0B2E59; color: white; padding: 20px;">
        <div style="background: white; padding: 24px; border-radius: 16px; text-align: center; color: #111; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.4);">
          <h2 style="color: #0B2E59; margin-top: 0;">Scan to Link WhatsApp</h2>
          <p style="font-size: 13px; color: #555; margin-bottom: 20px;">
            Open <strong>WhatsApp</strong> on your phone &rarr; <strong>Settings / Menu</strong> &rarr; <strong>Linked Devices</strong> &rarr; <strong>Link a Device</strong>.
          </p>
          <img src="${qrImgUrl}" alt="QR Code" style="width: 260px; height: 260px; border: 4px solid #0B2E59; border-radius: 8px;" />
          <p style="font-size: 11px; color: #777; margin-top: 15px;">Page refreshes automatically every 15s until scanned.</p>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: clientReady ? 'CONNECTED' : (latestQr ? 'QR_PENDING' : 'INITIALIZING'),
    ready: clientReady,
    user: clientInfo && clientInfo.wid ? clientInfo.wid.user : null
  });
});

app.get('/api/qr-data', (req, res) => {
  res.json({
    status: clientReady ? 'CONNECTED' : (latestQr ? 'QR_PENDING' : 'INITIALIZING'),
    ready: clientReady,
    qr: latestQr,
    qrImageUrl: latestQr ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(latestQr)}` : null,
    user: clientInfo && clientInfo.wid ? clientInfo.wid.user : null
  });
});

app.get('/api/sessions', (req, res) => {
  res.json([
    {
      id: 'default',
      sessionId: 'default',
      name: 'default',
      status: clientReady ? 'CONNECTED' : 'DISCONNECTED'
    }
  ]);
});

async function handleSendMessage(req, res) {
  const to = req.body.chatId || req.body.to;
  const text = req.body.text || req.body.message || '';

  if (!to || !text) {
    return res.status(400).json({ success: false, error: 'Missing to or text in body' });
  }

  if (!clientReady) {
    return res.status(503).json({
      success: false,
      error: 'WhatsApp client is not ready. Please scan the QR code at http://localhost:2785/qr'
    });
  }

  let cleanTo = String(to).replace(/[^0-9@c.us]/g, '');
  if (!cleanTo.endsWith('@c.us')) {
    cleanTo = cleanTo.replace(/[^0-9]/g, '') + '@c.us';
  }

  try {
    const msg = await client.sendMessage(cleanTo, text);
    console.log('[WhatsApp Gateway] Sent OTP to ' + cleanTo);
    return res.json({
      success: true,
      messageId: msg.id ? msg.id.id : 'SENT',
      to: cleanTo,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('[WhatsApp Gateway] Send failed to ' + cleanTo + ':', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}

app.post('/api/sessions/:session/messages/send-text', handleSendMessage);
app.post('/api/sessions/:session/messages', handleSendMessage);
app.post('/api/messages/send-text', handleSendMessage);
app.post('/api/messages', handleSendMessage);
app.post('/api/sendText', handleSendMessage);

app.listen(PORT, () => {
  console.log('WhatsApp Gateway HTTP API listening on port ' + PORT);
});
