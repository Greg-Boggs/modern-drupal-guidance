/**
 * Standalone runner: `legacy-scan <path> [--json] [--guide <id>]
 * [--include-docs-and-tests] [--max-files <n>]`.
 *
 * Output follows upstream src/legacy-scan/cli.ts: the same ScanJsonOutput
 * shape for --json and the same grouping (guide -> rule -> findings).
 */
import { readFile, stat } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import type { ScanFinding, ScanRule, VerifierRubric } from './schema.ts';
import { DRUPAL_RULES } from './rules/index.ts';
import { scanFiles, type ScanStats } from './scanners/index.ts';
import { DEFAULT_MAX_FILES, MAX_SOURCE_FILE_BYTES, scanRepoFiles } from './scanners/repo.ts';

export const RETRIEVE_COMMAND_PREFIX = 'npx modern-drupal-guidance retrieve';

export interface CliFinding {
  readonly file: string;
  readonly line: number;
  readonly message: string;
  readonly lineContent: string;
}

export interface CliRuleGroup {
  readonly ruleId: string;
  readonly summary: string;
  readonly verifierRubric?: VerifierRubric;
  readonly count: number;
  readonly findings: readonly CliFinding[];
}

export interface CliGuideGroup {
  readonly guideId: string;
  readonly retrieveCommand: string;
  readonly count: number;
  readonly rules: readonly CliRuleGroup[];
}

export interface ScanJsonOutput {
  readonly targetDir: string;
  readonly totalFindings: number;
  readonly guides: readonly CliGuideGroup[];
  readonly activeRuleCount?: number;
  readonly activeGuideCount?: number;
  readonly scannedFileCount?: number;
  readonly eligibleFileCount?: number;
  readonly truncatedByMaxFiles?: boolean;
  readonly error?: string;
  readonly skippedDocsAndTestsCount?: number;
  readonly note?: string;
  /** Drupal addition: files that failed to parse (format-support.md: never silently 0 findings). */
  readonly parseErrors?: readonly { readonly file: string; readonly message: string }[];
}

export interface CliResult {
  readonly exitCode: number;
  readonly output: string;
  readonly data?: ScanJsonOutput;
}

const HELP = `Usage: legacy-scan [path] [options]

Scan a Drupal module, theme or site for legacy patterns and the guide that replaces each.

Options:
  --json                    Machine-readable JSON for coding agents
  --guide <guideId>         Only run rules for one guide
  --include-docs-and-tests  Also scan tests/, docs/, examples/ and fixtures/
  --max-files <count>       Maximum files to scan (default ${DEFAULT_MAX_FILES}; 0 = unlimited)
  -h, --help                Show this help
`;

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function groupFindingsByGuide(findings: readonly ScanFinding[], activeRules: readonly ScanRule[]): CliGuideGroup[] {
  const ruleMap = new Map(activeRules.map((r) => [r.id, r]));
  const byGuide = Map.groupBy(findings, (f) => f.guideId);
  return [...byGuide.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([guideId, guideFindings]) => {
      const byRule = Map.groupBy(guideFindings, (f) => f.ruleId);
      const rules: CliRuleGroup[] = [...byRule.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([ruleId, rf]) => {
          const rule = ruleMap.get(ruleId);
          if (!rule) throw new Error(`Rule definition not found for ruleId "${ruleId}" (guide "${guideId}")`);
          const sorted = [...rf].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
          return {
            ruleId,
            summary: rule.summary,
            verifierRubric: rule.verifierRubric,
            count: sorted.length,
            findings: sorted.map((f) => ({ file: f.file, line: f.line, message: f.message, lineContent: f.lineContent ?? '' })),
          };
        });
      return {
        guideId,
        retrieveCommand: `${RETRIEVE_COMMAND_PREFIX} ${guideId}`,
        count: guideFindings.length,
        rules,
      };
    });
}

function elide(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function formatHuman(data: ScanJsonOutput): string {
  const lines: string[] = [];
  lines.push(`Modern Drupal Guidance legacy-scan — ${data.targetDir}`);
  if (data.totalFindings === 0) {
    lines.push(`No legacy patterns found (${plural(data.activeRuleCount ?? 0, 'rule')} across ${plural(data.activeGuideCount ?? 0, 'guide')}; scanned ${plural(data.scannedFileCount ?? 0, 'file')}).`);
  } else {
    lines.push(`Found ${plural(data.totalFindings, 'modernization opportunity', 'modernization opportunities')} across ${plural(data.guides.length, 'guide')} (scanned ${plural(data.scannedFileCount ?? 0, 'file')} with ${plural(data.activeRuleCount ?? 0, 'rule')}):`);
    lines.push('Note: Static analysis results are provisional — verify against the Keep/Drop criteria below.');
  }
  if (data.skippedDocsAndTestsCount) {
    lines.push(`Skipped ${plural(data.skippedDocsAndTestsCount, 'docs and test file', 'docs and test files')} (pass --include-docs-and-tests to scan).`);
  }
  for (const err of data.parseErrors ?? []) lines.push(`Parse error: ${err.file}: ${err.message}`);
  for (const guide of data.guides) {
    lines.push('', `* ${guide.guideId} (${plural(guide.count, 'finding')})`);
    for (const rule of guide.rules) {
      lines.push(`  ${rule.summary}`);
      if (rule.verifierRubric) {
        lines.push(`  Keep when: ${elide(rule.verifierRubric.keepWhen.join('; '), 120)}`);
        lines.push(`  Drop when: ${elide(rule.verifierRubric.dropWhen.join('; '), 120)}`);
      }
      for (const f of rule.findings) {
        lines.push(`  - ${f.file}:${f.line}`, `    ${elide(f.lineContent, 80)}`);
      }
    }
  }
  if (data.totalFindings > 0) lines.push('', `Retrieve a guide: ${RETRIEVE_COMMAND_PREFIX} <guide-id>`);
  return `${lines.join('\n')}\n`;
}

export interface CliOptions {
  readonly rules?: readonly ScanRule[];
  readonly cwd?: string;
}

function errorResult(message: string, isJson: boolean, targetDir: string): CliResult {
  if (isJson) {
    const data: ScanJsonOutput = { targetDir, totalFindings: 0, guides: [], error: message };
    return { exitCode: 1, output: `${JSON.stringify(data, null, 2)}\n`, data };
  }
  return { exitCode: 1, output: `Error: ${message}\n` };
}

export async function runLegacyScanCli(argv: readonly string[], options: CliOptions = {}): Promise<CliResult> {
  const args = [...argv];
  const isJson = args.includes('--json');
  if (args.includes('-h') || args.includes('--help')) return { exitCode: 0, output: HELP };
  const includeDocsAndTests = args.includes('--include-docs-and-tests');
  let guideFilter: string | undefined;
  let maxFiles = DEFAULT_MAX_FILES;
  const positional: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i] ?? '';
    if (a === '--guide') guideFilter = args[++i];
    else if (a === '--max-files') {
      const raw = args[++i] ?? '';
      if (!/^\d+$/.test(raw)) return errorResult(`Invalid --max-files value ${JSON.stringify(raw)}: expected a non-negative integer (0 for unlimited).`, isJson, '.');
      maxFiles = Number(raw);
    } else if (a.startsWith('-')) {
      if (!['--json', '--include-docs-and-tests'].includes(a)) return errorResult(`Unknown option: ${a}`, isJson, '.');
    } else positional.push(a);
  }
  const targetDir = positional[0] ?? '.';
  const baseCwd = options.cwd ?? process.cwd();
  const resolved = resolve(baseCwd, targetDir);

  const baseRules = options.rules ?? DRUPAL_RULES;
  const activeRules = guideFilter ? baseRules.filter((r) => r.guideId === guideFilter) : baseRules;
  if (guideFilter && activeRules.length === 0) return errorResult(`Unknown legacy-scan guide ID: ${guideFilter}`, isJson, targetDir);

  const info = await stat(resolved).catch(() => null);
  if (!info) return errorResult(`Target path not found: ${targetDir}`, isJson, targetDir);

  const stats: ScanStats = {};
  let findings: ScanFinding[];
  if (info.isFile()) {
    if (info.size > MAX_SOURCE_FILE_BYTES) return errorResult(`Target file exceeds maximum size (${MAX_SOURCE_FILE_BYTES} bytes): ${targetDir}`, isJson, targetDir);
    const rel = relative(baseCwd, resolved).split('\\').join('/');
    const key = rel && !rel.startsWith('..') ? rel : basename(resolved);
    findings = scanFiles(new Map([[key, await readFile(resolved, 'utf8')]]), activeRules, { stats });
    stats.scannedFileCount = 1;
  } else if (info.isDirectory()) {
    findings = await scanRepoFiles(resolved, activeRules, { maxFiles, includeDocsAndTests, stats });
  } else {
    return errorResult(`Target path is not a file or directory: ${targetDir}`, isJson, targetDir);
  }

  const activeRuleCount = activeRules.length;
  const activeGuideCount = new Set(activeRules.map((r) => r.guideId)).size;
  const totalFindings = findings.length;
  const noteParts: string[] = [];
  if (stats.truncatedByMaxFiles) noteParts.push(`Partial scan only: scanned ${stats.scannedFileCount} of ${stats.eligibleFileCount} eligible files; pass --max-files 0 or scan a subdirectory.`);
  noteParts.push(
    totalFindings === 0
      ? `No legacy patterns found across ${plural(activeGuideCount, 'guide')} (${activeRuleCount} rules). Use 'search <topic>' for feature-specific guidance.`
      : `Checked ${plural(activeGuideCount, 'guide')} (${activeRuleCount} deterministic rules). Finding ${totalFindings} ${totalFindings === 1 ? 'item' : 'items'} here only reflects deterministic legacy patterns; verify each against its keepWhen/dropWhen rubric, and use 'search <topic>' for the rest of the catalog.`,
  );

  const data: ScanJsonOutput = {
    targetDir,
    totalFindings,
    guides: groupFindingsByGuide(findings, activeRules),
    activeRuleCount,
    activeGuideCount,
    scannedFileCount: stats.scannedFileCount ?? 0,
    ...(stats.truncatedByMaxFiles ? { truncatedByMaxFiles: true, eligibleFileCount: stats.eligibleFileCount ?? 0 } : {}),
    note: noteParts.join(' '),
    ...(stats.skippedDocsAndTestsCount ? { skippedDocsAndTestsCount: stats.skippedDocsAndTestsCount } : {}),
    ...(stats.parseErrors?.length ? { parseErrors: stats.parseErrors } : {}),
  };
  const exitCode = stats.parseErrors?.length ? 2 : 0;
  return { exitCode, output: isJson ? `${JSON.stringify(data, null, 2)}\n` : formatHuman(data), data };
}
