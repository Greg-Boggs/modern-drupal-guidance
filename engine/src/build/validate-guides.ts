/**
 * Validates every guide's frontmatter and body without building.
 *
 * Usage: node --import tsx src/build/validate-guides.ts [--guides <dir>]
 * Exits 1 if any guide has errors.
 */
import "./guides-dir-arg.ts";
import path from "node:path";
import { validateAllGuides } from "../core/guide-validation.ts";
import { guidesDir } from "../core/paths.ts";

const { errors, checked } = validateAllGuides();
const where = path.relative(process.cwd(), guidesDir) || ".";
if (errors.length > 0) {
  console.error(`❌ ${errors.length} error(s) in ${checked} guide(s) under ${where}:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✅ ${checked} guide(s) under ${where} are valid.`);
