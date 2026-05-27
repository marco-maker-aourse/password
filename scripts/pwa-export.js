const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const webDir = path.join(root, "web");

fs.mkdirSync(distDir, { recursive: true });

for (const file of ["manifest.json", "sw.js"]) {
  const src = path.join(webDir, file);
  const dest = path.join(distDir, file);
  fs.copyFileSync(src, dest);
}

const bundleDir = path.join(distDir, "_expo", "static", "js", "web");
const bundleFiles = fs
  .readdirSync(bundleDir)
  .filter((name) => name.startsWith("AppEntry-") && name.endsWith(".js"));

if (bundleFiles.length === 0) {
  throw new Error("No Expo web bundle found in dist/_expo/static/js/web");
}

const bundlePath = `/_expo/static/js/web/${bundleFiles[0]}`;
const indexHtml = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#4f46e5" />
    <meta name="description" content="SafePass AI - analiza y genera contraseñas seguras." />
    <link rel="manifest" href="/manifest.json" />
    <title>SafePass AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="${bundlePath}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(distDir, "index.html"), indexHtml, "utf8");
console.log("PWA assets copied to dist/ and dist/index.html generated.");
