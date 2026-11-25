# Drupal User Guide import

`import.mjs` turns the English [Drupal User Guide](https://www.drupal.org/docs/user_guide/en/index.html) into guides under `guides/`. It changes the text only mechanically; it never rewords, summarizes or adds to it. Plain Node ESM, no dependencies, needs `git`.

```bash
node import/user-guide/import.mjs                 # use the pinned commit
node import/user-guide/import.mjs --update        # move the pin to the newest commit of the default branch
node import/user-guide/import.mjs --commit <sha>  # pin a specific commit
node import/user-guide/import.mjs --cache <dir>   # override the cache directory
```

## Source and pin

- Source: `https://git.drupalcode.org/project/user_guide` (`content/en/docs/*.md`, order and chapters from `content/en/zensical.toml`). License CC BY-SA 2.0.
- Cache: `${XDG_CACHE_HOME:-~/.cache}/modern-drupal-guidance/user-guide`, a blobless sparse clone outside the project. Created on first run.
- `pin.json` records the repository, default branch and pinned commit. Commit it. Runs without `--update` read the guide at that commit, so results are reproducible.
- Each guide's `source-commit` is the last commit that changed that page, so an update rewrites only guides whose text (or whose links) changed.

## Output

- `guides/<chapter>/<id>/guide.md`; each chapter is a category for the engine. `<chapter>` is the zensical.toml chapter, slugified without "Chapter N:" (`Chapter 8: Blocks` becomes `blocks`). The glossary has no chapter, so it is `glossary/glossary`. `<id>` is the page's `id` frontmatter.
- Frontmatter: `name` (= id), `title`, `description`, `drupal-core`, `source-url`, `source-commit`, `license: CC-BY-SA-2.0`.
- `drupal-core` is `^11`. The User Guide states it covers "the current major version of the core software" (`preface-conventions.md`), and the repository's default branch is `11.x`. The script derives the major version from the pinned branch and fails if the sentence disappears.
- `guides/ATTRIBUTION-user-guide.md` comes from the User Guide's `attributions.md`. `guides/LICENSE-user-guide.md` is a CC BY-SA 2.0 notice written by the script.
- `manifest.json` lists the `<chapter>/<id>` folders the script owns. Reruns write only changed files and delete only manifest folders whose page is gone upstream (and empty chapter folders). Folders from other work are never touched. If a chapter folder or page id already exists in `guides/` and is not in the manifest, or a page id equals another guide's name, the script stops with a report and writes nothing. Commit `manifest.json` and `pin.json`.

## Mechanical changes to the body

| Source | Result |
|---|---|
| `[text](./other-page.md#frag)` to an imported page | `text ({{ GUIDE_REF("other-page") }})`, or just the macro when the text equals the id. Fragments are dropped. |
| Link to a skipped page | `https://www.drupal.org/docs/user_guide/en/<id>.html` |
| Link to the same page, `./glossary.md#glossary-ajax` | `#ajax`, the generated heading anchor |
| `![alt](/images/x.png)`, `<img src="/images/x.png">` | `![alt](https://www.drupal.org/docs/user_guide/en/images/x.png)`. **Chosen: absolute URLs.** drupal.org serves every image at that path; all 128 URLs were checked and return 200. |
| `{ #anchor }` after headings, `[](){ #anchor }` lines | removed |
| `<table>` | Markdown table (the engine's validator rejects raw HTML). Cell text unchanged. |
| `<div class="embedded-video"><iframe>` | `[<iframe title>](https://www.youtube.com/watch?v=<id>)` (same video, watch URL) |
| end of page | one line: `*Source: [title](url), Drupal User Guide, licensed under [CC BY-SA 2.0](...).*` |

The page's own `*Attributions*` section stays in the text.

## Skipped pages (8 of 104)

| Page | Why |
|---|---|
| `index` | table of contents |
| `copyright` | covered by `LICENSE-user-guide.md` and `ATTRIBUTION-user-guide.md` |
| `attributions` | becomes `ATTRIBUTION-user-guide.md` |
| `preface-audience`, `preface-organization`, `preface-reporting`, `preface-conventions`, `preface-scenario` | preface |

Imported: 96 pages in 14 chapters plus the glossary.

The two `*-user-guide.md` files sit directly in `guides/`; the engine only scans directories there, so it ignores them (`CONTRIBUTING.md` lives there too).
