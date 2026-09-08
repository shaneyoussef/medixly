// Optional local preview; GitHub Pages still serves docs/ without a build.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const args = process.argv.slice(2);
const value = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const root = path.resolve('docs');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png'};
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://preview').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/signin.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end('Forbidden'); return; }
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'}).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(Number(value('--port', '4173')), value('--host', '0.0.0.0'), () => console.log('Medixly preview ready'));
