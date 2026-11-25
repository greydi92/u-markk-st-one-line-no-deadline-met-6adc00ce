// One Line, No Deadline Met — make.fun entry for @greydi92.
// Writes a single-line joke giving an excuse for a missed deadline
// to /output/entry.txt (or MAKEFUN_OUTPUT_DIR when set).
// Runs on Node 22+, no network, no dependencies.
// Iterate round 1 (2026-11-25): replaced the builder's head-start line
// after play-testing — the new line's escalation punch ("which I also
// missed") scored clearly higher on humour and natural voice.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The entry line: an excuse that starts plausible and then owns the failure.
// One sentence, setup in the first clause, punch in the last clause —
// "too busy hitting all my other deadlines" sounds like a real excuse
// until "which I also missed" flips it into a confession.
const LINE =
  "I missed the deadline because I was too busy hitting all my other deadlines, which I also missed.";

function outputDir(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.trim().length > 0) {
    return resolve(envDir);
  }
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  // Default: /output when running in the grader sandbox layout.
  return resolve(scriptDir, "..", "output");
}

function main(): void {
  const line = LINE.trim();
  // Single line only: no embedded newline or carriage return,
  // 1-200 characters counted as code points, not bytes.
  const charCount = [...line].length;
  if (charCount === 0 || charCount > 200 || line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line of 1-200 characters");
  }
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "entry.txt"), line + "\n", "utf8");
}

main();
