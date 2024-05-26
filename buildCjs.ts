import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import pkg from "./package.json";

const src = (await readFile("src/file.ts")).toString();

pkg.type = "commonjs";
await writeFile("./package.json", JSON.stringify(pkg, null, 2));
await writeFile("src/file.ts", src.replace(/__dirname/, "import.meta.dirname"));
spawnSync("tsc", { stdio: "inherit" });
spawnSync("node", ["./dist/file.js"], { stdio: "inherit" });

// Cleanup
pkg.type = "module";
await writeFile("./package.json", `${JSON.stringify(pkg, null, 2)}\n`);
await writeFile(
  "src/file.ts",
  src.replace(/\bimport\.meta\.dirname\b/, "__dirname"),
);
