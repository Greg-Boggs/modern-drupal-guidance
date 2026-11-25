/**
 * Builds the distributable package in dist/skills-cli (or `--out <dir>`):
 *
 *   package.json, plugin manifests, README.md, LICENSE, NOTICE, THIRD_PARTY_NOTICES
 *   skills/modern-drupal-guidance/
 *     SKILL.md, skill-version.txt
 *     modern-drupal-guidance.mjs   CLI entry (bin)
 *     search.mjs, legacy-scan.mjs  lazily loaded bundles
 *     gen/                         guides.json, guide-chunks.*, query-words.*
 *     guides/<category>/<id>.md    built guides served by `retrieve`
 *
 * Usage: node --import tsx src/build/build-dist.ts [--guides <dir>] [--out <dir>] [--version <x.y.z>] [--strict]
 * Nothing here publishes anything.
 */
import "./guides-dir-arg.ts";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { parseArgs } from "util";
import * as esbuild from "esbuild";
import { config } from "../core/skills-config.ts";
import { gitExec } from "../core/git-utils.ts";
import { rootDir, guidesDir } from "../core/paths.ts";
import { processGuides } from "./build-guides.ts";
import { replaceMacros } from "../core/macros.ts";

const ROOT_DIST_DIR = path.join(rootDir, "dist");
const SKILL_NAME = config.monoskill.name;

interface BuildResult {
  publishRoot: string;
  skillsCount: number;
  skillNames: string[];
  guideCount: number;
  chunkCount: number;
}

async function acquireLock(lockFilePath: string) {
  while (true) {
    try {
      fs.writeFileSync(lockFilePath, String(process.pid), { flag: 'wx' });
      return;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err;
    }

    let stale = false;
    try {
      const pid = parseInt(fs.readFileSync(lockFilePath, 'utf-8').trim(), 10);
      if (Number.isInteger(pid) && pid > 0) process.kill(pid, 0);
      else stale = true;
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      if (code === 'ESRCH' || code === 'ENOENT') stale = true;
    }

    if (!stale) {
      console.log(" Another build is in progress. Waiting...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      continue;
    }
    try {
      fs.unlinkSync(lockFilePath);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    }
  }
}

/** JSON files in the package that carry a version, and where the version sits in each. */
const VERSIONED_MANIFESTS: Array<{ file: string; plugin0?: boolean }> = [
  { file: "package.json" },
  { file: "gemini-extension.json" },
  { file: "kimi.plugin.json" },
  { file: "plugin.json" },
  { file: ".claude-plugin/plugin.json" },
  { file: ".claude-plugin/marketplace.json", plugin0: true },
  { file: ".cursor-plugin/plugin.json" },
  { file: ".github/plugin/plugin.json" },
  { file: ".grok-plugin/marketplace.json", plugin0: true },
  { file: ".codex-plugin/plugin.json" },
  { file: ".agents/plugins/marketplace.json", plugin0: true },
];

export function updateVersionsInDir(publishRoot: string, newVersion: string) {
  for (const { file, plugin0 } of VERSIONED_MANIFESTS) {
    const p = path.join(publishRoot, file);
    if (!fs.existsSync(p)) continue;
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    if (plugin0) {
      if (data.plugins?.[0]) data.plugins[0].version = newVersion;
    } else {
      data.version = newVersion;
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  }
}

/**
 * Skill version: `YYYY_MM_DD-<8 hex>`. From the last git commit touching SKILL.md when there is
 * one; otherwise today's date plus a hash of the SKILL.md content, so uncommitted builds still
 * produce a valid, content-sensitive version.
 */
export function computeSkillVersion(skillFile: string): string {
  try {
    const fromGit = gitExec(
      ['log', '-1', '--abbrev=8', '--date=format:%Y_%m_%d', '--pretty=format:%cd-%h', '--', path.basename(skillFile)],
      { stdio: ['pipe', 'pipe', 'ignore'], cwd: path.dirname(skillFile) }
    ).trim();
    if (/^\d{4}_\d{2}_\d{2}-[0-9a-f]+$/.test(fromGit)) return fromGit;
  } catch {
    // Not a git checkout, or no commits yet.
  }
  const d = new Date();
  const date = `${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, "0")}_${String(d.getDate()).padStart(2, "0")}`;
  const hash = crypto.createHash("sha256").update(fs.readFileSync(skillFile)).digest("hex").slice(0, 8);
  return `${date}-${hash}`;
}

export function processSkills(publishRoot: string) {
  const skills = config.standaloneSkills;

  for (const skill of skills) {
    const source = path.join(rootDir, skill.sourcePath);
    const skillDestDir = path.join(publishRoot, "skills", skill.name);
    fs.mkdirSync(skillDestDir, { recursive: true });

    // Copy sibling files (e.g. references/) next to SKILL.md.
    const sourceDir = path.dirname(source);
    for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
      if (entry.name === "SKILL.md") continue;
      fs.cpSync(path.join(sourceDir, entry.name), path.join(skillDestDir, entry.name), { recursive: true });
    }

    // The CLI compares the caller's --skill-version against skill-version.txt to nudge updates.
    const skillVersion = computeSkillVersion(source);
    fs.writeFileSync(path.join(skillDestDir, "skill-version.txt"), skillVersion);

    const content = replaceMacros(fs.readFileSync(source, "utf8"), source, { target: "skills-cli" })
      .replaceAll("SKILL_VERSION", skillVersion);
    fs.writeFileSync(path.join(skillDestDir, "SKILL.md"), content);
  }

  return { skillsCount: skills.length, skillNames: skills.map(s => s.name) };
}

export async function buildDist(opts: { publishRoot: string; version?: string; strict?: boolean }): Promise<BuildResult> {
  const { publishRoot, version, strict } = opts;
  const DIST_DIR = path.join(publishRoot, "skills", SKILL_NAME);

  fs.mkdirSync(ROOT_DIST_DIR, { recursive: true });
  const lockFilePath = path.join(ROOT_DIST_DIR, "build-dist.lock");
  await acquireLock(lockFilePath);

  try {
    fs.rmSync(publishRoot, { recursive: true, force: true });
    fs.mkdirSync(publishRoot, { recursive: true });

    const summary = await processGuides({ outputDir: DIST_DIR, strict });

    fs.cpSync(path.join(rootDir, "src/cli/template"), publishRoot, { recursive: true });
    fs.copyFileSync(path.join(rootDir, "LICENSE"), path.join(publishRoot, "LICENSE"));
    fs.copyFileSync(path.join(rootDir, "NOTICE"), path.join(publishRoot, "NOTICE"));
    if (version) updateVersionsInDir(publishRoot, version);

    const ragGenDir = path.join(rootDir, "src/rag/gen");
    const destGenDir = path.join(DIST_DIR, "gen");
    fs.mkdirSync(destGenDir, { recursive: true });
    for (const file of ["query-words.json", "query-words.i8", "query-words.scale.f32"]) {
      fs.copyFileSync(path.join(ragGenDir, file), path.join(destGenDir, file));
    }

    const resultSearch = await esbuild.build({
      entryPoints: [path.join(rootDir, "src/rag/search.ts")],
      bundle: true,
      platform: "node",
      format: "esm",
      mainFields: ["module", "main"],
      outfile: path.join(DIST_DIR, "search.mjs"),
      sourcemap: true,
      sourcesContent: false,
      metafile: true,
      minify: true,
      legalComments: "none",
    });

    const resultLegacyScan = await esbuild.build({
      entryPoints: [path.join(rootDir, "src/legacy-scan/cli.ts")],
      bundle: true,
      platform: "node",
      format: "esm",
      outfile: path.join(DIST_DIR, "legacy-scan.mjs"),
      banner: {
        js: `// @ts-nocheck
import { createRequire } from 'module';
import { fileURLToPath as __fileURLToPath } from 'url';
import { dirname as __dirnameFunction } from 'path';
const require = createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirnameFunction(__filename);
`,
      },
      sourcemap: false,
      sourcesContent: false,
      metafile: true,
      minify: true,
      legalComments: "none",
      plugins: [createStripTsMorphLibFilesPlugin()],
    });

    const cliOut = path.join(DIST_DIR, `${SKILL_NAME}.mjs`);
    const resultCli = await esbuild.build({
      entryPoints: [path.join(rootDir, "src/cli/modern-drupal-guidance.ts")],
      bundle: true,
      platform: "node",
      format: "esm",
      outfile: cliOut,
      banner: {
        js: `const [__mdg_major] = process.versions.node.split('.').map(Number);
if (__mdg_major < 22) {
  console.error(\`modern-drupal-guidance requires Node.js >= 22 (current: \${process.version}). Please upgrade: https://nodejs.org/\`);
  process.exit(1);
}
`,
      },
      plugins: [{
        name: 'external-cli-modules',
        setup(build) {
          build.onResolve({ filter: /search\.ts$/ }, () => ({ path: './search.mjs', external: true }));
          build.onResolve({ filter: /\/legacy-scan\/cli\.ts$/ }, () => ({ path: './legacy-scan.mjs', external: true }));
        },
      }],
      metafile: true,
    });
    const cliContent = fs.readFileSync(cliOut, "utf8");
    fs.writeFileSync(cliOut, cliContent.replace(/^#!.*\n/, "#!/usr/bin/env node\n"));
    fs.chmodSync(cliOut, 0o755);

    generateThirdPartyNotices(
      [resultSearch.metafile, resultLegacyScan.metafile, resultCli.metafile],
      path.join(publishRoot, "THIRD_PARTY_NOTICES")
    );

    const { skillsCount, skillNames } = processSkills(publishRoot);
    return { publishRoot, skillsCount, skillNames, guideCount: summary.guideCount, chunkCount: summary.chunkCount };
  } finally {
    if (fs.existsSync(lockFilePath)) fs.unlinkSync(lockFilePath);
  }
}

function generateThirdPartyNotices(metafiles: esbuild.Metafile[], outputFilePath: string) {
  const allowedLicenses = ['MIT', 'Apache 2.0', 'Apache-2.0', 'BSD-3-Clause', 'BSD-2-Clause', 'ISC', '0BSD'];
  const paths = new Set<string>();

  for (const metafile of metafiles) for (const p of Object.keys(metafile.inputs)) paths.add(p);

  const nodeModules = new Map<string, string>();
  for (const filePath of paths) {
    if (!filePath.includes('node_modules')) continue;

    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, filePath);
    let dir = path.dirname(absolutePath);
    let pkgJsonPath;

    while (dir.startsWith(rootDir) && dir !== rootDir) {
      const candidate = path.join(dir, 'package.json');
      if (fs.existsSync(candidate)) {
        pkgJsonPath = candidate;
        break;
      }
      dir = path.dirname(dir);
    }

    if (pkgJsonPath && pkgJsonPath.includes('node_modules')) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      if (pkg.name && pkg.name !== 'modern-drupal-guidance-src') nodeModules.set(pkg.name, path.dirname(pkgJsonPath));
    }
  }

  const divider = '\n\n-------------------- DEPENDENCY DIVIDER --------------------\n\n';

  const stringifiedDependencies = Array.from(nodeModules.keys()).sort().map(name => {
    const nodeModulePath = nodeModules.get(name)!;
    const dependency = JSON.parse(fs.readFileSync(path.join(nodeModulePath, 'package.json'), 'utf-8'));

    const licenseFilePaths = ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'LICENSE.MIT', 'LICENSE.APACHE'].map(f => path.join(nodeModulePath, f));
    const licenseFile = licenseFilePaths.find(f => fs.existsSync(f));
    if (licenseFile) dependency.licenseText = fs.readFileSync(licenseFile, 'utf-8');

    const license = dependency.license ?? 'N/A';
    if (!allowedLicenses.includes(license)) throw new Error(`Unapproved license for dependency ${name}: ${license}`);

    let url = dependency.homepage ?? dependency.repository;
    if (url && typeof url === 'object') url = url.url;

    return [
      `Name: ${dependency.name ?? 'N/A'}`,
      `URL: ${url ?? 'N/A'}`,
      `Version: ${dependency.version ?? 'N/A'}`,
      `License: ${license}`,
      ...(dependency.licenseText ? ['', dependency.licenseText.replaceAll('\r', '')] : [])
    ].join('\n');
  }).join(divider);

  fs.writeFileSync(outputFilePath, stringifiedDependencies);
}

/** The latest `vX.Y.Z` tag merged into HEAD, or "" when there is none. */
export function getLatestVersion(): string {
  try {
    const output = gitExec(['tag', '-l', 'v*.*.*', '--merged', 'HEAD', '--sort=-v:refname'], {
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    const [tag = ''] = output.trim().split('\n');
    return tag.startsWith('v') ? tag.slice(1) : tag;
  } catch {
    return '';
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({
    options: {
      out: { type: "string" },
      guides: { type: "string" },
      version: { type: "string" },
      strict: { type: "boolean" },
    },
    allowPositionals: false,
  });
  const publishRoot = values.out ? path.resolve(values.out) : path.join(ROOT_DIST_DIR, "skills-cli");
  const version = values.version || getLatestVersion() || undefined;
  buildDist({ publishRoot, version, strict: values.strict })
    .then((r) => {
      console.log(
        `Built ${path.relative(process.cwd(), r.publishRoot)}: ${r.guideCount} guides (${r.chunkCount} chunks) from ${path.relative(process.cwd(), guidesDir) || "."}, skills: ${r.skillNames.join(", ")}`
      );
    })
    .catch((err) => {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    });
}

/**
 * Strips unused 2.37 MB TypeScript .d.ts standard library strings (lib.dom.d.ts,
 * lib.webworker.d.ts, etc.) inlined in @ts-morph/common for in-memory type checking,
 * which legacy-scan rules never invoke.
 *
 * Fails fast if the file is never matched or if the replacement fails.
 */
export function createStripTsMorphLibFilesPlugin(): esbuild.Plugin {
  return {
    name: 'strip-ts-morph-lib-files',
    setup(build) {
      let didStrip = false;

      build.onLoad({ filter: /ts-morph-common\.js$/ }, async (args) => {
        const source = await fs.promises.readFile(args.path, 'utf8');
        const transformed = source.replace(
          /const libFiles = \[[\s\S]*?\];\s*(function getLibFiles\(\))/m,
          'const libFiles = [];\n$1'
        );
        if (transformed.length === source.length) {
          throw new Error('strip-ts-morph-lib-files: failed to match and strip inlined libFiles array');
        }
        didStrip = true;
        return {
          contents: transformed,
          loader: 'js',
        };
      });

      build.onEnd((result) => {
        if (result.errors.length === 0 && !didStrip) {
          throw new Error('strip-ts-morph-lib-files: filter /ts-morph-common\\.js$/ did not match any file during bundle');
        }
      });
    },
  };
}


