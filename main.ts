// The Agent's Uh-Oh: one word an agent says when it has no idea what to do.
// Writes exactly that one word, and nothing else, to entry.txt in the
// grader's output directory. Deterministic: no input, no clock, no
// randomness, no network — the same single word on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word itself: an agent caught inventing an answer instead of knowing
// one. Self-aware, instantly readable, and unmistakably a machine blurting
// out its own failure mode the moment it is lost.
const word = "hallucinating";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 99 characters, a
// single word only, nothing attached — no spaces, no punctuation, no
// trailing newline.
if (word.length < 1 || word.length > 99 || /\s/.test(word)) {
  throw new Error("entry word must be a single word of 1 to 99 characters");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, word, "utf8");

// Self-check: read the written file back and confirm it is byte-for-byte
// the word alone, so a formatting slip can never reach the judge.
const written = readFileSync(outputPath, "utf8");
if (written !== word) {
  throw new Error("written entry.txt does not match the entry word");
}
