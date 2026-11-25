#!/usr/bin/env node

import { ensureNodeVersion } from "./node-version.ts";

ensureNodeVersion();

import { parseArgs } from "node:util";
import { spawnSync } from "node:child_process";
import { join, dirname, basename } from "node:path";
import { existsSync, fstatSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { retrieveUseCase } from "../rag/retrieve.ts";
import { logToolResult } from "../rag/logger.ts";
import { normalizeCoreTarget, writeMdgrc, resolveCoreTarget } from "../core/mdgrc.ts";
import { getVersion } from "./version.ts";
import { getSkillUpdateLevel } from "./skill-version.ts";
import { getSkillsRunner } from "./skills-runner.ts";
import { getUseCases } from "../rag/guides.ts";
import { determineAgent } from "./agent/detect-agent.ts";

const CLI_NAME = "modern-drupal-guidance";

/**
 * Where `install` fetches the skill from, in `skills add <source>` form (a GitHub `owner/repo`,
 * a git URL, or a local path). The publish repository is set by the release workstream; until
 * then set `MDG_SKILL_SOURCE`.
 */
const DEFAULT_SKILL_SOURCE = "modern-drupal-guidance/modern-drupal-guidance";

const MAX_INLINE_STDOUT_BYTES = 9500;

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
    choose: { type: "boolean" },
    json: { type: "boolean" },
    "skill-version": { type: "string" },
  },
  allowPositionals: true,
  strict: false,
});

function isStdoutRedirectedToFile(): boolean {
  try {
    return fstatSync(1).isFile();
  } catch {
    return false;
  }
}

function saveRetrievedGuides(content: string): string | null {
  const filename = `mdg-guide-${process.pid}-${Date.now()}.md`;
  const candidateDirs = [...new Set([tmpdir(), "/tmp"])];
  for (const dir of candidateDirs) {
    try {
      if (!existsSync(dir)) continue;
      const filePath = join(dir, filename);
      writeFileSync(filePath, content, "utf8");
      return filePath;
    } catch {
      // Try next candidate directory
    }
  }
  return null;
}

function printUsage() {
  console.log(`
Usage: ${CLI_NAME} <command> [args]

Commands:
  search <query>                 Search guides with an English query (JSON: [{ id, description }])
  list                           List all guides (JSON: [{ id, description }])
  retrieve <ids>                 Print guide(s) by ID; separate several IDs with commas or spaces
  legacy-scan [path] [options]   Find legacy Drupal patterns in a codebase (see legacy-scan --help)
  set-core <version>             Record the project's target Drupal core version in .mdgrc
  target [--json]                Show the target Drupal core version retrieve will use, and its source
  install [options]              Install the ${CLI_NAME} skill (passes options to "skills add")
  uninstall                      Uninstall the skill
  update                         Update the skill

Options:
  --skill-version <version>      Internal: version of the SKILL.md calling the CLI
  --choose                       install: choose skills interactively
  -h, --help                     Show this help
  -v, --version                  Show version
`);
}

async function main() {
  if (values.version) {
    console.log(getVersion(import.meta.dirname));
    process.exit(0);
  }

  const skillVersion = typeof values["skill-version"] === "string" ? values["skill-version"] : null;
  const command = positionals[0];

  if (command === "legacy-scan" || command === "analyze") {
    maybeEmitUpdateMessage(skillVersion);
    // Dynamic import keeps CLI start-up fast: only load legacy-scan when it runs.
    const { runLegacyScanCli, writeLegacyScanCliResult } = await import("../legacy-scan/cli.ts");
    const args = process.argv.slice(2);
    const cmdIdx = args.indexOf(command);
    if (cmdIdx !== -1) args.splice(cmdIdx, 1);
    const result = await runLegacyScanCli(args);
    if (result.exitCode === 0 && result.data) {
      logToolResult("legacy-scan", result.data.guides.map((g) => ({ id: g.guideId, count: g.count })));
    }
    process.exit(writeLegacyScanCliResult(result));
  }

  if (values.help || positionals.length === 0) {
    printUsage();
    process.exit(values.help ? 0 : 1);
  }

  maybeEmitUpdateMessage(skillVersion);
  const arg = positionals.slice(1).join(" ");

  if (command === "search") {
    if (!arg) {
      console.error("No search query provided.");
      process.exit(1);
    }
    try {
      // Dynamic import keeps CLI start-up fast: only load the embedder when searching.
      const { searchUseCases } = await import("../rag/search.ts");
      const { tokenize } = await import("../rag/bm25.ts");
      const results = await searchUseCases(arg);

      // Compact format: only id and description, to keep token use low with top-10 results.
      const jsonLines = results.map(({ id, description }) => JSON.stringify({ id, description }));
      console.log("[" + jsonLines.join(",\n") + "]");

      // Non-ASCII letter (Unicode \p{L} intersected with non-ASCII \P{ASCII})
      if (/[\p{L}&&\P{ASCII}]/v.test(arg) && (results.length === 0 || tokenize(arg).length <= 1)) {
        console.error('Note: Search queries must be in English (e.g., search "block plugin attribute").');
      }
    } catch (error) {
      console.error("Search failed:", error);
      process.exit(1);
    }
  } else if (command === "list") {
    try {
      const jsonLines = getUseCases().map(({ id, description }) => JSON.stringify({ id, description }));
      console.log("[" + jsonLines.join(",\n") + "]");
    } catch (error) {
      console.error("List failed:", error);
      process.exit(1);
    }
  } else if (command === "retrieve") {
    const ids = arg
      ? [
          ...new Set(
            arg
              .split(/[\s,;]+/)
              .map((id) => id.replace(/^["'\\]+|["'\\;]+$/g, "").trim())
              .filter((id) => Boolean(id) && !id.startsWith("-"))
          ),
        ]
      : [];
    if (ids.length === 0) {
      console.error("No IDs provided for retrieve.");
      process.exit(1);
    }

    let hasError = false;
    const retrievedSections: string[] = [];

    for (const id of ids) {
      try {
        const guide = await retrieveUseCase(id);
        retrievedSections.push(`\n--- Guide for ${id} ---\n${guide}`);
      } catch (error) {
        hasError = true;
        console.error(`Retrieve failed for ${id}: ${error instanceof Error ? error.message : error}`);
      }
    }

    if (retrievedSections.length > 0) {
      const combinedStdout = retrievedSections.join("\n");
      const totalBytes = Buffer.byteLength(combinedStdout, "utf8");
      const shouldSaveToFile = totalBytes > MAX_INLINE_STDOUT_BYTES && !isStdoutRedirectedToFile();

      if (shouldSaveToFile) {
        const fileContent = combinedStdout.replace(/^\n+/, "") + "\n";
        const savedPath = saveRetrievedGuides(fileContent);
        if (savedPath) {
          const lineCount = fileContent.split("\n").length - 1;
          const sizeKb = (totalBytes / 1024).toFixed(1);
          console.log(
            `Output (${sizeKb} KB, ${lineCount} lines) saved to ${savedPath} to prevent CLI stdout truncation.\n` +
              `Read ${savedPath} in full using your file-reading tool (${lineCount} lines total)—do not use cat or head.`
          );
        } else {
          console.log(combinedStdout);
        }
      } else {
        console.log(combinedStdout);
      }
    }

    if (hasError) {
      process.exit(1);
    }
  } else if (command === "set-core") {
    const normalized = normalizeCoreTarget(arg);
    if (!normalized) {
      console.error(`Invalid Drupal core version: ${JSON.stringify(arg)}. Expected a version such as 10.3 or 11.1.`);
      process.exit(1);
    }
    const targetPath = writeMdgrc({ drupalCore: normalized });
    console.log(`Set target Drupal core to ${normalized} in ${targetPath}.`);
    process.exit(0);
  } else if (command === "target") {
    const target = resolveCoreTarget();
    if (values.json) {
      console.log(JSON.stringify(target ? { drupalCore: target.display, source: target.source, file: target.file } : null));
    } else if (target) {
      console.log(`Target Drupal core: ${target.display} (from ${target.source}: ${target.file})`);
    } else {
      console.log(`No target Drupal core found. Set one with: ${CLI_NAME} set-core <version>`);
    }
    process.exit(0);
  } else if (command === "install") {
    // Extra args (for example --agent and -y) pass through to the `skills` CLI.
    const extraArgs = process.argv.slice(3).filter((a) => a !== "--choose");
    const source = process.env.MDG_SKILL_SOURCE || DEFAULT_SKILL_SOURCE;
    const installArgs = ["skills", "add", source, ...(values.choose ? [] : ["--skill", CLI_NAME]), ...extraArgs];

    const detectedAgent = determineAgent().agent?.name;
    const env = detectedAgent ? { ...process.env, AI_AGENT: detectedAgent } : process.env;
    const runner = getSkillsRunner(env);
    const result = spawnSync(runner.cmd, [...runner.prefixArgs, ...installArgs], {
      stdio: "inherit",
      shell: process.platform === "win32",
      env,
    });
    if (result.error) {
      console.error("Install failed:", result.error);
      process.exit(1);
    }
    process.exit(result.status ?? 0);
  } else if (command === "update" || command === "uninstall") {
    const skills = getOurCLIAdjacentSkillIDs();
    const runner = getSkillsRunner();
    const result = spawnSync(runner.cmd, [...runner.prefixArgs, "skills", command === "update" ? "update" : "remove", ...skills], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    if (result.error) {
      console.error(`${command === "update" ? "Update" : "Uninstall"} failed:`, result.error);
      process.exit(1);
    }
    process.exit(result.status ?? 0);
  } else {
    console.error(`Unknown command: ${command}`);
    printUsage();
    process.exit(1);
  }
}

// Our own "skill version": an identifier that changes only when SKILL.md does.
function getCLISkillVersion(): string | null {
  try {
    return readFileSync(join(import.meta.dirname, "skill-version.txt"), "utf8").trim();
  } catch {
    return null;
  }
}

function getOurCLIAdjacentSkillIDs(): string[] {
  try {
    const parentDir = dirname(import.meta.dirname);
    const skillsPath = basename(parentDir) === "skills" ? parentDir : join(dirname(parentDir), "skills");
    return readdirSync(skillsPath).filter((name) => existsSync(join(skillsPath, name, "SKILL.md")));
  } catch {
    return [];
  }
}

function maybeEmitUpdateMessage(callerSkillVersion: string | null): void {
  const latestSkillVersion = getCLISkillVersion();
  const level = getSkillUpdateLevel(callerSkillVersion, latestSkillVersion);
  if (level === "none") return;

  if (level === "insist") {
    console.error(
      `PROBLEM DETECTED: The ${CLI_NAME} skill is very out of date and needs an update to give current Drupal guidance. Ask the user to update it.`
    );
  }
  console.error(
    [
      `Warning: a new SKILL.md is available for ${CLI_NAME}. Please update.`,
      "",
      `Your version: ${callerSkillVersion}`,
      `Latest version: ${latestSkillVersion}`,
      "",
      `Update with: npx -y ${CLI_NAME}@latest update`,
    ].join("\n")
  );
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
