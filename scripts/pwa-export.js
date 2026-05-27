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

console.log("PWA assets copied to dist/");
