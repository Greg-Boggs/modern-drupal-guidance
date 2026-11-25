#!/usr/bin/env node
// Runs the compiled CLI (npm run build). On Node builds with TypeScript type
// stripping, `node bin/main.ts` runs the sources directly.
import { existsSync } from 'node:fs';

const compiled = new URL('../dist/bin/main.js', import.meta.url);
if (!existsSync(compiled)) {
  process.stderr.write('legacy-scan: dist/ is missing; run `npm run build` in legacy-scan/ first.\n');
  process.exit(1);
}
await import(compiled.href);
