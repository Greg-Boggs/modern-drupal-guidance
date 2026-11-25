/**
 * Build-time document embedding with the static word table (`gen/query-words.*`).
 *
 * Upstream embedded guide chunks with a hosted teacher model and cached the vectors. This fork
 * has no hosted model, so chunk vectors are built offline from the same static word vectors the
 * query side uses:
 *
 *   chunk vector = normalize( Σ_t (1 + ln tf_t) · w_t · e_t )      (w_t folded into the table scales)
 *   final vector = normalize( chunk vector − corpus centroid )
 *
 * Averaging hundreds of words pulls every chunk toward the same "generic English" direction, so
 * the corpus centroid is subtracted. That keeps unrelated chunks apart and makes the dense score
 * informative alongside BM25. Rebuilds are deterministic: same guides + same word table → same index.
 */
import { tokenize } from "./bm25.ts";
import { StaticEmbedder, accumulateNormalizedVector, encodeTokens } from "./static-embedder.ts";
import { STATIC_DIMS, l2Normalize } from "./quantize.ts";

/** Bag-of-words encoding with sublinear term frequency. */
export function encodeDocument(text: string, wordIndex: ReadonlyMap<string, number>): Array<[number, number]> {
  const counts = new Map<number, number>();
  for (const tok of tokenize(text)) {
    for (const [idx, frac] of encodeTokens(tok, wordIndex)) {
      counts.set(idx, (counts.get(idx) ?? 0) + frac);
    }
  }
  const out: Array<[number, number]> = [];
  for (const [idx, tf] of counts) out.push([idx, 1 + Math.log(Math.max(tf, 1))]);
  return out;
}

/**
 * Embeds every text, then centers the set on its centroid. Texts with no known words get `[]`
 * (indexed for BM25 only).
 */
export function embedDocuments(texts: readonly string[], embedder = StaticEmbedder.getInstance()): number[][] {
  const model = embedder.getModel();
  const raw: Array<Float32Array | null> = texts.map((t) => {
    const enc = encodeDocument(t, model.wordIndex);
    if (enc.length === 0) return null;
    return accumulateNormalizedVector(enc, model.table, model.scales, new Float32Array(STATIC_DIMS));
  });

  const present = raw.filter((v): v is Float32Array => v !== null);
  const centroid = new Float32Array(STATIC_DIMS);
  // With one or two chunks the centroid is the documents themselves; centering would erase them.
  if (present.length >= 3) {
    for (const v of present) for (let k = 0; k < STATIC_DIMS; k++) centroid[k] += v[k] / present.length;
  }

  return raw.map((v) => {
    if (!v) return [];
    const c = new Float32Array(STATIC_DIMS);
    for (let k = 0; k < STATIC_DIMS; k++) c[k] = v[k] - centroid[k];
    return Array.from(l2Normalize(c));
  });
}
