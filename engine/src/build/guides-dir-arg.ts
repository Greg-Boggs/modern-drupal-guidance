/**
 * Side-effect module: maps a `--guides <dir>` (or `--guides=<dir>`) command-line flag onto
 * `MDG_GUIDES_DIR` before ../core/paths.ts is evaluated. Import it first in build entry points.
 */
const argv = process.argv;
for (let i = 2; i < argv.length; i++) {
  const arg = argv[i];
  if (arg === "--guides" && argv[i + 1]) {
    process.env.MDG_GUIDES_DIR = argv[i + 1];
    break;
  }
  if (arg.startsWith("--guides=")) {
    process.env.MDG_GUIDES_DIR = arg.slice("--guides=".length);
    break;
  }
}
export {};
