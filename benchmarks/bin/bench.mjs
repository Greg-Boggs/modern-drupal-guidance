#!/usr/bin/env node
// Runs the benchmark CLI with the engine's TypeScript loader, so the
// benchmarks/ folder needs no dependencies of its own.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const engine = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'engine');
const loader = join(engine, 'node_modules', 'tsx', 'dist', 'loader.mjs');
if (!existsSync(loader)) {
  console.error('engine/node_modules is missing. Run: cd engine && pnpm install && pnpm build');
  process.exit(1);
}
const cli = join(engine, 'src', 'harness', 'bench', 'cli.ts');
const r = spawnSync(process.execPath, ['--import', pathToFileURL(loader).href, cli, ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(r.status ?? 1);
