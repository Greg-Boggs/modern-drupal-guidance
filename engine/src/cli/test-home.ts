import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** Creates a throwaway HOME directory for install tests. */
export function createIsolatedHome(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), `${prefix}-`));
}

export function cleanupIsolatedHome(homeDir: string): void {
  if (homeDir) fs.rmSync(homeDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
