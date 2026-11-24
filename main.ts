// One Emoji, One Dream Vacation — entry program.
//
// Writes a single emoji, standing in for the trip of a lifetime, to
// /output/entry.txt. Before writing it enforces the sealed gate, and only
// the sealed gate: the entry must be UTF-8 text of 1 to 8 characters, and
// not only white space.
//
// The pick is Mount Fuji (U+1F5FB): snow on the peak, a red sun rising
// behind it. A stranger sees Japan at a glance — one particular dream,
// not any holiday — and it is fresher than the beach, the plane or the
// palm tree, while staying bold and readable at any size.
//
// Character counting uses code points ([...text].length), not UTF-16
// units: most emojis are two UTF-16 units, so .length would count this
// single emoji as two characters.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = "🗻";

// Counts characters as the gate does: one code point is one character,
// however many UTF-16 units it takes. (String.length would count this
// single emoji as two.)
function charCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const text = ENTRY.trim();
  const chars = charCount(text);
  if (chars < 1 || chars > 8) {
    throw new Error(`entry is ${chars} characters; gate requires 1 to 8`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only white space");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  console.log(`wrote ${chars} character (${ENTRY}) to /output/entry.txt`);
}

main();
