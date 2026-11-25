import { spawn, spawnSync, type SpawnOptions } from 'child_process';

export interface ExecResult {
  code: number;
  stdout: string;
  stderr: string;
}

/** Runs a command synchronously and captures its output. Never throws on a non-zero exit. */
export function run(cmd: string, args: string[], opts: { cwd?: string; env?: NodeJS.ProcessEnv; input?: string; timeoutMs?: number } = {}): ExecResult {
  const r = spawnSync(cmd, args, {
    cwd: opts.cwd,
    env: opts.env ?? process.env,
    input: opts.input,
    encoding: 'utf8',
    timeout: opts.timeoutMs ?? 300_000,
    maxBuffer: 256 * 1024 * 1024,
  });
  return {
    code: r.status ?? (r.error ? 127 : 1),
    stdout: r.stdout ?? '',
    stderr: (r.stderr ?? '') + (r.error ? String(r.error) : ''),
  };
}

/** Like run() but throws with the command's output when it fails. */
export function mustRun(cmd: string, args: string[], opts: Parameters<typeof run>[2] = {}): string {
  const r = run(cmd, args, opts);
  if (r.code !== 0) {
    throw new Error(`Command failed (${r.code}): ${cmd} ${args.join(' ')}\n${r.stdout.slice(-2000)}\n${r.stderr.slice(-4000)}`);
  }
  return r.stdout;
}

/** Runs a command asynchronously, streaming output to a callback, with a hard timeout. */
export function runAsync(cmd: string, args: string[], opts: SpawnOptions & { timeoutMs?: number; onOutput?: (chunk: string) => void } = {}): Promise<ExecResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { ...opts, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    const timer = opts.timeoutMs ? setTimeout(() => { child.kill('SIGTERM'); setTimeout(() => child.kill('SIGKILL'), 5000); }, opts.timeoutMs) : undefined;
    child.stdout?.on('data', (d) => { stdout += d; opts.onOutput?.(String(d)); });
    child.stderr?.on('data', (d) => { stderr += d; opts.onOutput?.(String(d)); });
    child.on('error', (e) => { stderr += String(e); });
    child.on('close', (code) => { if (timer) clearTimeout(timer); resolve({ code: code ?? 1, stdout, stderr }); });
  });
}

export function which(bin: string): string | null {
  const r = run('sh', ['-c', `command -v ${bin}`]);
  return r.code === 0 ? r.stdout.trim() : null;
}
