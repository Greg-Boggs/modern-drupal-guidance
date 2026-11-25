# Local search and retrieval (`src/rag/`)

`search` ranks guides locally with no server, model download or API key. It fuses two rankings:

- **BM25** over every guide chunk (`bm25.ts`). Exact terms win here: `drupal_set_message`, `#[Hook]`, `core_version_requirement`, `SDC`.
- **Dense cosine** between a query vector and chunk vectors, both built from one static word table (`gen/query-words.*`, see `static-embedder.ts` and `doc-embedder.ts`). This catches paraphrases: "react when a node is saved" finds the hooks guide.

Ranks are merged with reciprocal rank fusion (k = 60). Each guide's score is its best chunk. If BM25 finds nothing and the best dense score is below 0.30, `search` returns `[]`, so out-of-scope queries ("best pizza in new york") get no results instead of noise. Results are `{ id, description }`, at most 10.

## Tokens

`tokenize()` in `bm25.ts` lowercases, keeps inner hyphens, drops a short stopword list, and keeps snake_case identifiers both whole and split: `hook_form_alter` → `hook_form_alter`, `hook`, `form`, `alter`. `\Drupal::service('entity_type.manager')` → `drupal`, `service`, `entity_type`, `entity`, `type`, `manager`.

## Chunks and vectors (built by `pnpm build`)

`src/build/build-guides.ts` splits each guide at headings (`src/core/guide-chunks.ts`). Every chunk gets a header with the guide title, id, category and core range (`Drupal core 11.1 and later`), so each chunk matches on those. One extra chunk holds the title and description.

Chunk vectors come from `doc-embedder.ts`: the weighted sum of the chunk's word vectors (sublinear term frequency), minus the corpus centroid, normalized. Subtracting the centroid stops long chunks from collapsing onto one generic direction. The build is deterministic: the same guides and word table give the same index.

Upstream embedded chunks with a hosted model at release time and cached the vectors. That path was removed with the other Google infrastructure; nothing in this fork calls a network service.

## The word table (`gen/query-words.*`)

| File | Contents |
|---|---|
| `query-words.json` | Vocabulary, `string[]` |
| `query-words.i8` | `Int8Array(V × 256)`, one quantized unit vector per word |
| `query-words.scale.f32` | `Float32Array(V)`, per-word weight × row quantization scale |
| `query-words.meta.json` | How the table was last trained: base size, derived words, corpus |

The first 29,165 rows are the general English and technical vocabulary inherited from upstream (distilled there from a large embedding model). `pnpm train:words` adapts the table to the Drupal corpus offline:

1. Drops the rows it derived last time (`baseVocabSize` in the meta file), so reruns do not compound.
2. Chunks and tokenizes every published guide in `../guides` and `test-fixtures/guides`.
3. Gives each corpus word that is not in the base vocabulary (`drush`, `twig`, `sdc`, `hook_form_alter`, `cacheablemetadata`) a vector from its contexts: the IDF-weighted sum of the base vectors of the words within 8 tokens of each occurrence. Snake_case and hyphenated words also blend in their known parts.
4. Re-weights every word by its IDF across corpus chunks, `ln(1 + (N − df + 0.5) / (df + 0.5))`. Words absent from the corpus get the median corpus IDF. Words that appear in every chunk ("drupal") get low weight, which is what you want.
5. Quantizes and writes the four files above.

### When to rerun

Rerun after guides are added or substantially rewritten, and after changing `tokenize()`:

```sh
corepack pnpm train:words          # rewrites src/rag/gen/query-words.*
corepack pnpm build                # rebuilds chunk vectors with the new table
corepack pnpm test                 # fixture ranking checks in search.test.ts
```

Commit the four `src/rag/gen/query-words.*` files. To check whether a rerun is due without writing anything (for CI):

```sh
node --import tsx src/rag/train-query-words.ts --check
```

It exits 1 and lists the corpus words missing from the table. Options: `--guides <dir>` (repeatable) to train on other roots, `--out <dir>` to write elsewhere.

### Limits

- With few guides, derived vectors and IDF weights are noisy. They improve as the corpus grows; rerun as guides land.
- There is no Drupal retrieval benchmark yet. Upstream's benchmark sets were web queries and were removed. A Drupal query set with expected guide IDs (built from real agent queries once the CLI is in use) is the next step for tuning; until then `src/rag/search.test.ts` pins a handful of fixture queries.
