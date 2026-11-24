// news-image-20261123 — a one-image summary of Monday 23 November 2026.
// Node 22, standard library only. The poster itself (entry.png, drawn by
// draw_poster.py from the 30 verified 23 November stories) sits next to
// this file; this program just copies it into the directory the grader
// reads. The copy is checked for completeness before the program exits.
//
// Run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(dir, "entry.png");
const target = join(output, "entry.png");

mkdirSync(output, { recursive: true });
copyFileSync(source, target);

const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png truncated: wrote ${written} of ${expected} bytes`);
}
console.log(`wrote ${target} (${written} bytes)`);
