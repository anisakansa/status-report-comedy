// Status Report Comedy Sprint — one-line status report comedy entry.
//
// The entry line (winner of the 5-candidate comparison, scored 1-5 per
// criterion against the comedy-status-report rubric, in order: status-report
// voice > specific humour > twist > concision): a status update that
// confesses the project has been "90% done" for six weeks and will stay that
// way for six more — the most honest status report ever written. It scored 5
// on voice (a real status-update sentence, not a generic joke), 5 on humour
// (the 90%-done stall is the most specific status-report pain), 5 on twist
// (the stall is confessed in the open, then extended into the future), and 5
// on concision (95 characters, no padding). Runner-up: the calendar that is
// 100% meetings about being green (18/20) — same meeting joke family, but
// the twist lands softer and it costs 6 more characters.
//
// Deterministic by construction: a constant string plus guards only. No
// wall-clock, no Date, no Math.random, no I/O beyond writing the entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Status update: the project is 90% done, as it has been for six weeks, and will be for six more.";

const encoder = new TextEncoder();
const bytes = encoder.encode(ENTRY);

// Guards (deterministic budgets only): 1-120 UTF-8 characters, exactly one
// line, no leading/trailing whitespace, pure ASCII (byte length == length).
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error("entry must be 1-120 characters");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be one line");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not have leading/trailing whitespace");
}
if (bytes.length !== ENTRY.length) {
  throw new Error("entry must be pure ASCII");
}
if (ENTRY.includes("  ")) {
  throw new Error("entry must not contain double spaces");
}

const OUT = "/output/entry.txt";
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, ENTRY);

// Round-trip: the file must read back byte-identical.
if (readFileSync(OUT, "utf8") !== ENTRY) {
  throw new Error("entry round-trip mismatch");
}
