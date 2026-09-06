import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 8080;
const PUBLIC_DIR = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Normalize path and remove query params
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  
  // Prevent directory traversal attacks
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for React SPA client-side routing
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    
    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      console.error(streamErr);
      res.writeHead(500);
      res.end('Internal Server Error');
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
