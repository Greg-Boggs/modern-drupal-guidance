/**
 * JS scanner: same approach as upstream scanners/js-scanner.ts (ts-morph,
 * in-memory project). On integration the upstream JS scanner runs these
 * rules unchanged, because they are plain `JsRuleMatcher`s.
 */
import { Project, ts } from 'ts-morph';
import type { JsMatcherContext, JsRuleMatcher, ScanMatch } from '../schema.ts';
import { matchesFastTokens } from './fast-tokens.ts';

export const JS_EXTENSIONS: readonly string[] = ['.js', '.mjs', '.cjs', '.ts'];

let sharedProject: Project | undefined;

export function createInMemoryProject(): Project {
  return new Project({
    useInMemoryFileSystem: true,
    skipLoadingLibFiles: true,
    compilerOptions: {
      allowJs: true,
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.ESNext,
    },
  });
}

export function scanJsSource(
  code: string,
  matchers: readonly JsRuleMatcher[],
  ctx: JsMatcherContext,
): ScanMatch[][] {
  const active = matchers.map((m) => matchesFastTokens(code, m.fastTokens));
  if (!active.some(Boolean)) return matchers.map(() => []);
  sharedProject ??= createInMemoryProject();
  const virtualPath = `/__scan__/${ctx.filePath.replace(/[^A-Za-z0-9_./-]/g, '_')}`.replace(/\.(mjs|cjs)$/, '.js');
  const sourceFile = sharedProject.createSourceFile(virtualPath, code, { overwrite: true });
  try {
    return matchers.map((m, i) => (active[i] ? m.matchFile(sourceFile, ctx) : []));
  } finally {
    sharedProject.removeSourceFile(sourceFile);
  }
}
