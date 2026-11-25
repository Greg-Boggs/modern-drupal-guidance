/**
 * Compiles guides into the CLI data directory:
 *
 *   <out>/gen/guides.json            UseCase[] metadata (id, description, category, title, drupalCore, tokenCount)
 *   <out>/gen/guide-chunks.json.gz   chunk metadata + chunk text (BM25 corpus)
 *   <out>/gen/guide-chunks.i8        Int8 chunk vectors (dense corpus)
 *   <out>/gen/guide-chunks.scale.f32 per-chunk dequantization scales
 *   <out>/guides/<category>/<id>.md  macro-expanded guide markdown served by `retrieve`
 *
 * Guides come from the guides directory (`../guides`, or `--guides <dir>` / `MDG_GUIDES_DIR`).
 * Drafts (`draft: stub | wip | blocked`) are skipped. Invalid guides are skipped with a warning,
 * or fail the build with `--strict`.
 *
 * Usage: node --import tsx src/build/build-guides.ts [--guides <dir>] [--output <dir>] [--strict] [--force] [--no-chunking] [guide-dir]
 */
import "./guides-dir-arg.ts";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { parseArgs } from "node:util";
import {
  scanAllGuides,
  type GuideInventory,
  getGuideMarkdownPath,
  validateGuide,
} from "../core/guide-validation.ts";
import { config } from "../core/skills-config.ts";
import { rootDir, outDir, guidesDir, defaultGuidesDir, drupalDataDir } from "../core/paths.ts";
import { extractGuideChunks } from "../core/guide-chunks.ts";
import type { UseCase } from "../rag/guides.ts";
import { embedDocuments } from "../rag/doc-embedder.ts";
import { quantizeVectors, STATIC_DIMS } from "../rag/quantize.ts";

export interface StoreUseCase {
  id: string;
  description: string;
  category: string;
  tokenCount: number;
  chunkContent: string;
}

export interface BuildOptions {
  outputDir: string;
  force?: boolean;
  /** Build only the guide in this directory (for authoring). */
  targetGuidePath?: string;
  noChunking?: boolean;
  /** Override the scanned guide list (tests). */
  guides?: GuideInventory[];
  /** Fail on any invalid guide instead of skipping it. */
  strict?: boolean;
  /** Pipeline cache directory; defaults to out/build/skills-cli. */
  pipelineCacheDir?: string;
}

export interface BuildSummary {
  skipped: boolean;
  /** Guides left out because they failed validation (non-strict builds). */
  invalidCount: number;
  guideCount: number;
  chunkCount: number;
  guidesDir: string;
}

/** Pipeline cache per guides directory, so fixture and real builds do not evict each other. */
export function defaultCacheDir(): string {
  if (path.resolve(guidesDir) === path.resolve(defaultGuidesDir)) return path.join(outDir, "build", "skills-cli");
  const key = crypto.createHash("sha256").update(path.resolve(guidesDir)).digest("hex").slice(0, 8);
  return path.join(outDir, "build", `skills-cli-${key}`);
}

function readyGuides(): GuideInventory[] {
  const excluded = config.monoskill.excludeFromBundling || [];
  return scanAllGuides().filter(
    (inv) => inv.isPublished && !excluded.includes(inv.category) && !excluded.includes(inv.name)
  );
}

function approxTokens(text: string): number {
  return (text.match(/\w+|[^\w\s]/g) || []).length;
}

const ENGINE_DEPS = [
  "src/build/build-guides.ts",
  "src/core/macros.ts",
  "src/core/guide-chunks.ts",
  "src/core/guide-validation.ts",
  "src/core/drupal-version.ts",
  "src/core/drupal-data.ts",
  "src/core/include.ts",
  "src/rag/doc-embedder.ts",
  "src/rag/quantize.ts",
  "src/rag/bm25.ts",
  "src/rag/gen/query-words.json",
  "src/rag/gen/query-words.scale.f32",
];

/** Hash of everything that affects the build output, used to skip unchanged rebuilds. */
export function computePipelineHash(guides: GuideInventory[], noChunking: boolean): string {
  const hash = crypto.createHash("sha256");
  for (const dep of ENGINE_DEPS) {
    const p = path.join(rootDir, dep);
    if (fs.existsSync(p)) hash.update(fs.readFileSync(p));
  }
  const releases = path.join(drupalDataDir, "releases.json");
  if (fs.existsSync(releases)) hash.update(fs.readFileSync(releases));
  hash.update(String(noChunking));
  for (const inv of guides) {
    const guidePath = getGuideMarkdownPath(inv);
    hash.update(`${inv.category}/${inv.name}\n`);
    hash.update(fs.readFileSync(guidePath));
    // Files a guide INCLUDEs can change without the guide changing; hash the whole guide dir.
    for (const f of fs.readdirSync(inv.dir).sort()) {
      const fp = path.join(inv.dir, f);
      if (f !== "guide.md" && f.endsWith(".md") && fs.statSync(fp).isFile()) hash.update(fs.readFileSync(fp));
    }
  }
  return hash.digest("hex");
}

const GEN_FILES = ["guides.json", "guide-chunks.json.gz", "guide-chunks.i8", "guide-chunks.scale.f32"];

function copyOutput(cacheDir: string, outputDir: string): void {
  if (path.resolve(outputDir) === path.resolve(cacheDir)) return;
  const destGen = path.join(outputDir, "gen");
  fs.mkdirSync(destGen, { recursive: true });
  for (const f of GEN_FILES) fs.copyFileSync(path.join(cacheDir, "gen", f), path.join(destGen, f));
  fs.rmSync(path.join(outputDir, "guides"), { recursive: true, force: true });
  fs.cpSync(path.join(cacheDir, "guides"), path.join(outputDir, "guides"), { recursive: true });
}

export async function processGuides(opts: BuildOptions): Promise<BuildSummary> {
  const { outputDir, force, targetGuidePath, noChunking = false } = opts;
  const cacheDir = opts.pipelineCacheDir ?? defaultCacheDir();

  let guides = opts.guides ?? readyGuides();
  if (targetGuidePath) {
    const dir = path.resolve(targetGuidePath);
    if (!fs.existsSync(path.join(dir, "guide.md"))) throw new Error(`guide.md not found in ${dir}.`);
    guides = guides.filter((g) => path.resolve(g.dir) === dir);
    if (guides.length === 0) throw new Error(`${dir} is not a published guide under ${guidesDir}.`);
  }

  // Validate first so every error is reported, not just the first one hit while building.
  // Default: skip invalid guides with a warning, so one workstream's in-progress guide does not
  // break everyone's build. `strict` (release, CI): fail instead.
  const invalid: Array<{ inv: GuideInventory; errors: string[] }> = [];
  for (const g of guides) {
    const { errors } = validateGuide(getGuideMarkdownPath(g));
    if (errors.length > 0) invalid.push({ inv: g, errors });
  }
  if (invalid.length > 0) {
    const report = invalid.flatMap(({ errors }) => errors).join("\n  - ");
    if (opts.strict) throw new Error(`Guide validation failed:\n  - ${report}`);
    console.warn(`⚠️  Skipping ${invalid.length} invalid guide(s) (run with --strict to fail instead):\n  - ${report}`);
    const bad = new Set(invalid.map(({ inv }) => inv.dir));
    guides = guides.filter((g) => !bad.has(g.dir));
  }

  const hash = computePipelineHash(guides, noChunking);
  const manifestPath = path.join(cacheDir, "pipeline.manifest.json");
  const cacheHit =
    !force &&
    !targetGuidePath &&
    fs.existsSync(manifestPath) &&
    GEN_FILES.every((f) => fs.existsSync(path.join(cacheDir, "gen", f))) &&
    JSON.parse(fs.readFileSync(manifestPath, "utf8")).hash === hash;

  if (cacheHit) {
    const summary = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    copyOutput(cacheDir, outputDir);
    return { skipped: true, invalidCount: invalid.length, guideCount: summary.guideCount, chunkCount: summary.chunkCount, guidesDir };
  }

  fs.rmSync(cacheDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(cacheDir, "gen"), { recursive: true });
  fs.mkdirSync(path.join(cacheDir, "guides"), { recursive: true });

  const useCases: UseCase[] = [];
  const store: StoreUseCase[] = [];
  const seen = new Map<string, string>();

  for (const inv of guides) {
    const prev = seen.get(inv.name);
    if (prev) throw new Error(`Duplicate guide id "${inv.name}" in categories "${prev}" and "${inv.category}".`);
    seen.set(inv.name, inv.category);

    const extracted = extractGuideChunks({
      filePath: getGuideMarkdownPath(inv),
      category: inv.category,
      id: inv.name,
      noChunking,
    });
    if (!extracted) continue;

    const { title, description, drupalCore, processedMarkdown } = extracted;
    const tokenCount = approxTokens(processedMarkdown);
    useCases.push({ id: inv.name, description, category: inv.category, title, drupalCore, tokenCount });
    for (const ec of extracted.embeddedChunks) {
      store.push({ id: inv.name, description, category: inv.category, tokenCount, chunkContent: ec.embeddedText });
    }

    const catDir = path.join(cacheDir, "guides", inv.category);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(path.join(catDir, `${inv.name}.md`), processedMarkdown.trimStart());
  }

  const vectors = embedDocuments(store.map((s) => s.chunkContent));
  const { qTable, scales } = quantizeVectors(vectors, STATIC_DIMS);

  fs.writeFileSync(path.join(cacheDir, "gen", "guides.json"), JSON.stringify(useCases, null, 2) + "\n");
  fs.writeFileSync(path.join(cacheDir, "gen", "guide-chunks.json.gz"), zlib.gzipSync(JSON.stringify(store)));
  fs.writeFileSync(path.join(cacheDir, "gen", "guide-chunks.i8"), Buffer.from(qTable.buffer, qTable.byteOffset, qTable.byteLength));
  fs.writeFileSync(path.join(cacheDir, "gen", "guide-chunks.scale.f32"), Buffer.from(scales.buffer, scales.byteOffset, scales.byteLength));

  const summary = { hash, guideCount: useCases.length, chunkCount: store.length, guidesDir };
  if (!targetGuidePath) fs.writeFileSync(manifestPath, JSON.stringify(summary, null, 2) + "\n");

  copyOutput(cacheDir, outputDir);
  return { skipped: false, invalidCount: invalid.length, guideCount: useCases.length, chunkCount: store.length, guidesDir };
}

if (process.argv[1] === import.meta.filename) {
  const { values, positionals } = parseArgs({
    options: {
      force: { type: "boolean" },
      "no-chunking": { type: "boolean" },
      output: { type: "string" },
      guides: { type: "string" },
      strict: { type: "boolean" },
    },
    allowPositionals: true,
  });
  const outputDir = values.output ? path.resolve(values.output) : defaultCacheDir();
  processGuides({
    outputDir,
    force: values.force,
    targetGuidePath: positionals[0],
    noChunking: values["no-chunking"],
    strict: values.strict,
  })
    .then((s) => {
      console.log(
        `${s.skipped ? "Unchanged" : "Built"}: ${s.guideCount} guides, ${s.chunkCount} chunks from ${path.relative(process.cwd(), s.guidesDir) || "."} → ${path.relative(process.cwd(), outputDir)}`
      );
    })
    .catch((err) => {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    });
}
