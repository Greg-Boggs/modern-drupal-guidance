/**
 * Regenerates the static query word table (`src/rag/gen/query-words.*`) for the Drupal corpus.
 * Offline and deterministic: no API key, no network.
 *
 * The table maps each word to a 256-d unit vector plus a weight. Search embeds a query by
 * summing the weighted vectors of its words (see static-embedder.ts), and build-time chunk vectors
 * use the same table (doc-embedder.ts), so both sides share one space.
 *
 * Steps:
 *   1. Base vocabulary. Load the current table. Words this script added on an earlier run
 *      (recorded in query-words.meta.json) are dropped first, so reruns do not compound.
 *      The base rows are the general-English and technical vocabulary inherited from upstream.
 *   2. Corpus scan. Chunk every published guide the way the build does and tokenize the chunks.
 *   3. New words. Each corpus token missing from the base vocabulary (Drupal terms such as
 *      `drush`, `twig`, `hook_form_alter`) gets a vector from its contexts: the IDF-weighted
 *      sum of the base vectors of the words within WINDOW tokens of each occurrence, normalized.
 *      Snake_case identifiers also blend in the vectors of their parts.
 *   4. Weights. Every word's weight is its corpus IDF, `ln(1 + (N − df + 0.5) / (df + 0.5))`
 *      over N chunks; words absent from the corpus get the median corpus IDF (upstream's `idfcap`).
 *   5. Export. Int8-quantize rows and fold the row scale into the weight; write
 *      query-words.{json,i8,scale.f32} and query-words.meta.json.
 *
 * Rerun after guides change: `pnpm train:words`, then `pnpm build`. See src/rag/README.md.
 *
 * Usage:
 *   node --import tsx src/rag/train-query-words.ts [--guides <dir>]... [--out <dir>] [--check]
 *     --guides  guide roots to learn from (repeatable). Default: project guides/ and test-fixtures/guides.
 *     --out     output directory. Default: src/rag/gen.
 *     --check   exit 1 if a retrain would add words the table lacks (no files written).
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { scanAllGuides, getGuideMarkdownPath, setGuidesMapRoots } from "../core/guide-validation.ts";
import { rootDir, defaultGuidesDir, fixtureGuidesDir } from "../core/paths.ts";
import { extractGuideChunks } from "../core/guide-chunks.ts";
import { tokenize } from "./bm25.ts";
import { accumulateNormalizedVector, encodeTokens } from "./static-embedder.ts";
import { STATIC_DIMS, toAlignedFloat32Array, toInt8Array } from "./quantize.ts";

export const DEFAULT_OUT_DIR = path.join(rootDir, "src/rag/gen");
const WINDOW = 8;
/** Corpus tokens must look like words: at least 2 chars, not purely numeric. */
const MIN_TOKEN_LENGTH = 2;

export interface StaticTable {
  words: string[];
  /** Unit vectors, V × 256. */
  E: Float32Array;
  W: Float32Array;
}

export interface TableMeta {
  /** Number of leading rows that came from the base table (not derived by this script). */
  baseVocabSize: number;
  derivedWords: number;
  corpus: { roots: string[]; guides: number; chunks: number };
  generatedAt: string;
}

export interface QuantizeExportResult {
  vocabSize: number;
  dims: number;
  minCosine: number;
}

/** Loads query-words.* from `dir` as unit vectors; weights are recovered from the folded scales. */
export function loadStaticTable(dir = DEFAULT_OUT_DIR): StaticTable {
  const words: string[] = JSON.parse(fs.readFileSync(path.join(dir, "query-words.json"), "utf8"));
  const q = toInt8Array(fs.readFileSync(path.join(dir, "query-words.i8")));
  const scales = toAlignedFloat32Array(fs.readFileSync(path.join(dir, "query-words.scale.f32")));
  const V = words.length;
  const D = STATIC_DIMS;
  if (q.length !== V * D || scales.length !== V) {
    throw new Error(`Corrupt static table in ${dir}: ${V} words, ${q.length} i8 values, ${scales.length} scales`);
  }
  const E = new Float32Array(V * D);
  const W = new Float32Array(V);
  for (let i = 0; i < V; i++) {
    let norm = 0;
    for (let k = 0; k < D; k++) norm += q[i * D + k] ** 2;
    norm = Math.sqrt(norm) || 1;
    for (let k = 0; k < D; k++) E[i * D + k] = q[i * D + k] / norm;
    // scale = W · rowScale and ‖q · rowScale‖ = 1, so W = scale · ‖q‖.
    W[i] = scales[i] * norm;
  }
  return { words, E, W };
}

export function readMeta(dir = DEFAULT_OUT_DIR): TableMeta | null {
  const p = path.join(dir, "query-words.meta.json");
  return fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")) as TableMeta) : null;
}

/**
 * Quantizes unit vectors `E` (V × 256) to symmetric per-row Int8 and folds each row's
 * `maxAbs / 127` scale into the weight `W`. Returns the minimum Float32→Int8 cosine on a sample.
 */
export function quantizeAndExportStaticModel(table: StaticTable, targetDir = DEFAULT_OUT_DIR): QuantizeExportResult {
  const { words, E, W } = table;
  const V = words.length;
  const D = STATIC_DIMS;
  const qTable = new Int8Array(V * D);
  const folded = new Float32Array(V);
  for (let i = 0; i < V; i++) {
    let maxAbs = 0;
    for (let k = 0; k < D; k++) maxAbs = Math.max(maxAbs, Math.abs(E[i * D + k]));
    const rowScale = maxAbs > 0 ? maxAbs / 127 : 1;
    folded[i] = W[i] * rowScale;
    for (let k = 0; k < D; k++) {
      qTable[i * D + k] = Math.max(-127, Math.min(127, Math.round(E[i * D + k] / rowScale)));
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "query-words.json"), JSON.stringify(words));
  fs.writeFileSync(path.join(targetDir, "query-words.i8"), Buffer.from(qTable.buffer, qTable.byteOffset, qTable.byteLength));
  fs.writeFileSync(path.join(targetDir, "query-words.scale.f32"), Buffer.from(folded.buffer, folded.byteOffset, folded.byteLength));

  // Fidelity check: 3-word pseudo-queries embedded from Float32 vs Int8 rows.
  const wordIndex = new Map(words.map((w, i) => [w, i]));
  let minCosine = 1;
  for (let s = 0; s < Math.min(50, Math.floor(V / 3)); s++) {
    const text = [(s * 97) % V, (s * 97 + 1) % V, (s * 97 + 2) % V].map((i) => words[i]).join(" ");
    const enc = encodeTokens(text, wordIndex);
    if (enc.length === 0) continue;
    const f = accumulateNormalizedVector(enc, E, W);
    const qv = accumulateNormalizedVector(enc, qTable, folded);
    let cos = 0;
    for (let k = 0; k < D; k++) cos += f[k] * qv[k];
    if (Number.isFinite(cos) && cos !== 0) minCosine = Math.min(minCosine, cos);
  }
  return { vocabSize: V, dims: D, minCosine };
}

/** Tokenized chunks of every published guide under `roots`. */
export function scanCorpus(roots: readonly string[]): { chunks: string[][]; guides: number } {
  const chunks: string[][] = [];
  let guides = 0;
  setGuidesMapRoots(roots);
  for (const root of roots) {
    for (const inv of scanAllGuides(root)) {
      if (!inv.isPublished) continue;
      let extracted;
      try {
        extracted = extractGuideChunks({ filePath: getGuideMarkdownPath(inv), category: inv.category, id: inv.name });
      } catch (e) {
        console.warn(`Skipping ${inv.category}/${inv.name}: ${(e as Error).message}`);
        continue;
      }
      if (!extracted) continue;
      guides++;
      for (const ec of extracted.embeddedChunks) chunks.push(tokenize(ec.embeddedText));
    }
  }
  setGuidesMapRoots(null);
  return { chunks, guides };
}

function isWordLike(tok: string): boolean {
  return tok.length >= MIN_TOKEN_LENGTH && !/^[0-9_-]+$/.test(tok) && tok.length <= 48;
}

/**
 * Builds the retrained table from a base table and a tokenized corpus. Pure: no I/O.
 */
export function retrainTable(base: StaticTable, baseVocabSize: number, chunks: string[][]): { table: StaticTable; derived: string[] } {
  const D = STATIC_DIMS;
  const baseWords = base.words.slice(0, baseVocabSize);
  const baseIndex = new Map(baseWords.map((w, i) => [w, i]));
  const E0 = base.E.subarray(0, baseVocabSize * D);

  // Document frequency over chunks.
  const df = new Map<string, number>();
  for (const toks of chunks) for (const t of new Set(toks)) df.set(t, (df.get(t) ?? 0) + 1);
  const N = Math.max(chunks.length, 1);
  const idfOf = (d: number) => Math.log(1 + (N - d + 0.5) / (d + 0.5));
  const corpusIdfs = [...df.values()].map(idfOf).sort((a, b) => a - b);
  const medianIdf = corpusIdfs.length > 0 ? corpusIdfs[Math.floor(corpusIdfs.length / 2)] : 1;
  const weightOf = (w: string) => {
    const d = df.get(w);
    return d !== undefined ? idfOf(d) : medianIdf;
  };

  // New corpus words, sorted for determinism.
  const newWords = [...df.keys()].filter((t) => !baseIndex.has(t) && isWordLike(t)).sort();
  const newIndex = new Map(newWords.map((w, i) => [w, i]));
  const acc = new Float32Array(newWords.length * D);
  const hits = new Uint32Array(newWords.length);

  for (const toks of chunks) {
    for (let p = 0; p < toks.length; p++) {
      const ni = newIndex.get(toks[p]);
      if (ni === undefined) continue;
      for (let c = Math.max(0, p - WINDOW); c <= Math.min(toks.length - 1, p + WINDOW); c++) {
        if (c === p) continue;
        const bi = baseIndex.get(toks[c]);
        if (bi === undefined) continue;
        const w = weightOf(toks[c]);
        for (let k = 0; k < D; k++) acc[ni * D + k] += w * E0[bi * D + k];
        hits[ni]++;
      }
    }
  }

  // Snake_case and hyphenated identifiers: blend in their known parts (weight 1 per part).
  for (const [w, ni] of newIndex) {
    const parts = w.split(/[_-]/).filter((part) => baseIndex.has(part));
    for (const part of parts) {
      const bi = baseIndex.get(part)!;
      const pw = weightOf(part) * 2;
      for (let k = 0; k < D; k++) acc[ni * D + k] += pw * E0[bi * D + k];
      hits[ni]++;
    }
  }

  const derived: string[] = [];
  const derivedRows: Float32Array[] = [];
  for (const [w, ni] of newIndex) {
    if (hits[ni] === 0) continue;
    const row = acc.slice(ni * D, (ni + 1) * D);
    let norm = 0;
    for (let k = 0; k < D; k++) norm += row[k] * row[k];
    norm = Math.sqrt(norm);
    if (!norm) continue;
    for (let k = 0; k < D; k++) row[k] /= norm;
    derived.push(w);
    derivedRows.push(row);
  }

  const V = baseVocabSize + derived.length;
  const E = new Float32Array(V * D);
  E.set(E0, 0);
  derivedRows.forEach((row, i) => E.set(row, (baseVocabSize + i) * D));
  const words = [...baseWords, ...derived];
  const W = Float32Array.from(words, weightOf);
  return { table: { words, E, W }, derived };
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      guides: { type: "string", multiple: true },
      out: { type: "string" },
      check: { type: "boolean" },
    },
  });
  const outDir = values.out ? path.resolve(values.out) : DEFAULT_OUT_DIR;
  const roots = (values.guides?.length ? values.guides : [defaultGuidesDir, fixtureGuidesDir]).map((r) => path.resolve(r));

  const base = loadStaticTable(DEFAULT_OUT_DIR);
  const meta = readMeta(DEFAULT_OUT_DIR);
  const baseVocabSize = meta?.baseVocabSize ?? base.words.length;

  const { chunks, guides } = scanCorpus(roots);
  console.log(`Corpus: ${guides} guides, ${chunks.length} chunks from ${roots.map((r) => path.relative(process.cwd(), r) || ".").join(", ")}`);

  if (values.check) {
    const { derived } = retrainTable(base, baseVocabSize, chunks);
    const current = new Set(base.words.slice(baseVocabSize));
    const missing = derived.filter((w) => !current.has(w));
    if (missing.length > 0) {
      console.error(`${missing.length} corpus word(s) are not in the table; run pnpm train:words: ${missing.slice(0, 40).join(", ")}${missing.length > 40 ? ", …" : ""}`);
      process.exit(1);
    }
    console.log("The word table covers the corpus.");
    return;
  }

  const { table, derived } = retrainTable(base, baseVocabSize, chunks);
  const result = quantizeAndExportStaticModel(table, outDir);
  const newMeta: TableMeta = {
    baseVocabSize,
    derivedWords: derived.length,
    corpus: { roots: roots.map((r) => path.relative(rootDir, r)), guides, chunks: chunks.length },
    generatedAt: new Date().toISOString().slice(0, 10),
  };
  fs.writeFileSync(path.join(outDir, "query-words.meta.json"), JSON.stringify(newMeta, null, 2) + "\n");
  console.log(
    `Wrote ${result.vocabSize} words (${baseVocabSize} base + ${derived.length} derived from the corpus) to ${path.relative(process.cwd(), outDir)}; Int8 fidelity min cosine ${result.minCosine.toFixed(4)}.`
  );
  if (derived.length > 0) console.log(`Derived: ${derived.slice(0, 30).join(", ")}${derived.length > 30 ? ", …" : ""}`);
}

if (process.argv[1] === import.meta.filename) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
