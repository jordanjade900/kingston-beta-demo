import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = 5173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function sendIndex(res) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kingston Beta Documentation</title>
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #FAFAF7; color: #1A1A1A; }
    main { max-width: 980px; margin: 0 auto; padding: 64px 24px; }
    h1 { font-size: clamp(42px, 8vw, 96px); line-height: .9; margin: 0 0 24px; letter-spacing: -0.04em; }
    p { max-width: 680px; color: #4B4B4B; font-size: 18px; line-height: 1.6; }
    a { color: #1F7A3A; font-weight: 800; text-decoration-thickness: 2px; text-underline-offset: 4px; }
    ul { display: grid; gap: 16px; padding: 32px 0 0; list-style: none; }
    li { border-top: 1px solid rgba(0,0,0,.08); padding-top: 16px; }
    img { max-width: 100%; border-radius: 10px; margin-top: 36px; box-shadow: 0 24px 70px rgba(26,26,26,.12); }
    .dot { display: inline-block; width: 14px; height: 14px; border-radius: 999px; background: #E63946; margin-right: 10px; }
  </style>
</head>
<body>
  <main>
    <h1><span class="dot"></span>Kingston Beta Docs</h1>
    <p>Creative system documentation generated from the new reference image. This is a documentation preview only, not a redesigned website.</p>
    <ul>
      <li><a href="/design.md">design.md</a></li>
      <li><a href="/implementation-master.md">implementation-master.md</a></li>
      <li><a href="/fidelity-rules.md">fidelity-rules.md</a></li>
      <li><a href="/project.md">project.md</a></li>
      <li><a href="/reference-source.png">reference-source.png</a></li>
    </ul>
    <img src="/reference-source.png" alt="Kingston Beta source reference" />
  </main>
</body>
</html>`);
}

createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  if (url === "/") {
    sendIndex(res);
    return;
  }

  const filePath = normalize(join(root, url));
  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Kingston Beta docs running at http://127.0.0.1:${port}`);
});
