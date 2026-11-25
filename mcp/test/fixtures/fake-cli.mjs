#!/usr/bin/env node
// Fake modern-drupal-guidance CLI: mirrors upstream's interface with fixture output.
const guides = [
  { id: "oop-hooks", description: "Implement hooks as autowired class methods with the #[Hook] attribute." },
  { id: "single-directory-components", description: "Build reusable UI with Single Directory Components." },
];
const [cmd, ...rest] = process.argv.slice(2);
const arg = rest.join(" ");
if (process.env.FAKE_CLI_FAIL) { console.error("boom"); process.exit(1); }
if (cmd === "list") {
  console.log("[" + guides.map((g) => JSON.stringify(g)).join(",\n") + "]");
} else if (cmd === "search") {
  const q = arg.toLowerCase();
  const hits = guides.filter((g) => q.split(/\s+/).some((w) => w && (g.id + " " + g.description).toLowerCase().includes(w)));
  console.log("[" + hits.map((g) => JSON.stringify(g)).join(",\n") + "]");
} else if (cmd === "retrieve") {
  let bad = false;
  for (const id of arg.split(/[\s,;]+/).filter(Boolean)) {
    const g = guides.find((x) => x.id === id);
    if (!g) { console.error(`Unknown guide: ${id}`); bad = true; continue; }
    console.log(`\n--- Guide for ${id} ---\n# ${id}\n\n${g.description}\n`);
  }
  if (bad) process.exit(1);
} else { console.error("unknown command"); process.exit(1); }
