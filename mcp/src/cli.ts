import { execFile } from "node:child_process";
import type { Config } from "./config.js";

export interface Guide {
  id: string;
  description: string;
}

export class CliError extends Error {}

export function runCli(config: Config, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      config.command,
      [...config.baseArgs, ...args],
      { timeout: config.timeoutMs, maxBuffer: 32 * 1024 * 1024, windowsHide: true },
      (err, stdout, stderr) => {
        if (err) {
          const detail = (stderr || stdout || err.message).toString().trim();
          reject(new CliError(`modern-drupal-guidance ${args[0]} failed: ${detail}`));
        } else resolve(stdout.toString());
      },
    );
  });
}

function parseGuides(out: string): Guide[] {
  let data: unknown;
  try {
    data = JSON.parse(out);
  } catch {
    throw new CliError(`CLI returned output that is not JSON: ${out.slice(0, 200)}`);
  }
  if (!Array.isArray(data)) throw new CliError("CLI returned JSON that is not an array");
  return data.map((g) => ({ id: String(g.id), description: String(g.description ?? "") }));
}

export async function searchGuides(config: Config, query: string): Promise<Guide[]> {
  return parseGuides(await runCli(config, ["search", query]));
}

export async function listGuides(config: Config): Promise<Guide[]> {
  return parseGuides(await runCli(config, ["list"]));
}

export async function retrieveGuides(config: Config, ids: string[]): Promise<string> {
  return runCli(config, ["retrieve", ids.join(",")]);
}
