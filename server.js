const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { home, availability } = require('./controllers/homeController');
const root = path.join(__dirname, 'views');
const types = { '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method !== 'GET') { res.writeHead(405, { Allow: 'GET' }); return res.end(); }
    if (url.pathname === '/' || url.pathname === '/index.html') return home(req, res);
    if (url.pathname === '/api/availability') return availability(url, res);
    const file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(path.join(root, 'assets') + path.sep)) { res.writeHead(404); return res.end('No encontrado'); }
    const content = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': (types[path.extname(file)] || 'application/octet-stream') + (['.js', '.css'].includes(path.extname(file)) ? '; charset=utf-8' : ''), 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 400); res.end('Solicitud no disponible'); }
});
if (require.main === module) server.listen(process.env.PORT || 3000, '127.0.0.1', () => console.log('Hotel: http://localhost:' + (process.env.PORT || 3000)));
module.exports = server;
