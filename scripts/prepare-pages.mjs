import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const basePath = "/Portfolio";
const textExtensions = new Set([".css", ".html", ".js"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    else files.push(path);
  }

  return files;
}

for (const file of await collectFiles(distDir)) {
  if (!textExtensions.has(extname(file))) continue;

  const source = await readFile(file, "utf8");
  const output = source.replace(/\/assets\//g, (match, offset, content) => {
    const prefix = content.slice(Math.max(0, offset - basePath.length), offset);
    return prefix === basePath ? match : `${basePath}/assets/`;
  });

  if (output !== source) await writeFile(file, output);
}

await copyFile(join(distDir, "index.html"), join(distDir, "404.html"));
await writeFile(join(distDir, ".nojekyll"), "");
