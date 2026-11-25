export interface Config {
  /** Executable to run. */
  command: string;
  /** Arguments placed before the subcommand (search/retrieve/list). */
  baseArgs: string[];
  /** Per-call timeout in milliseconds. */
  timeoutMs: number;
}

export const DEFAULT_CLI = "npx -y modern-drupal-guidance@latest";

/** Split a command line on whitespace, honouring single and double quotes. */
export function splitCommand(input: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quote: string | null = null;
  let has = false;
  for (const ch of input) {
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      has = true;
    } else if (/\s/.test(ch)) {
      if (cur || has) out.push(cur);
      cur = "";
      has = false;
    } else cur += ch;
  }
  if (cur || has) out.push(cur);
  return out;
}

/**
 * Resolve the CLI to run. Precedence: --cli flag, MODERN_DRUPAL_GUIDANCE_CLI env, default.
 * The value is a command line (e.g. `npx -y modern-drupal-guidance@latest`) or a path to a
 * local build; a path ending in .js/.mjs/.cjs/.ts is run with the current Node binary.
 */
export function resolveConfig(argv: string[] = [], env: NodeJS.ProcessEnv = process.env): Config {
  let cli = env.MODERN_DRUPAL_GUIDANCE_CLI?.trim() || DEFAULT_CLI;
  const i = argv.indexOf("--cli");
  if (i >= 0 && argv[i + 1]) cli = argv[i + 1];
  const eq = argv.find((a) => a.startsWith("--cli="));
  if (eq) cli = eq.slice("--cli=".length);

  const parts = splitCommand(cli);
  if (parts.length === 0) throw new Error("CLI command is empty");
  let [command, ...baseArgs] = parts;
  if (parts.length === 1 && /\.(?:[cm]?js|ts)$/.test(command)) {
    baseArgs = [command];
    command = process.execPath;
  }
  const timeoutMs = Number(env.MODERN_DRUPAL_GUIDANCE_TIMEOUT_MS) || 120_000;
  return { command, baseArgs, timeoutMs };
}
