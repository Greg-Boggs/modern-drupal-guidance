# Drupal core change record import

Turns the drupal.org [change records for Drupal core](https://www.drupal.org/list-changes/drupal) that were introduced in 11.x or 12.x into guides under `guides/`. The conversion is mechanical (HTML to Markdown); the record text is never reworded, summarized or added to. Change records are licensed CC BY-SA 2.0.

Plain Node ESM. `import.mjs` borrows `linkedom` from `engine/node_modules`, so run `pnpm install` in `engine/` first.

```bash
node import/change-records/fetch.mjs              # fetch missing pages into cache/ (slow: one request every 6 s)
node import/change-records/fetch.mjs --refresh    # drop the cache and fetch again, then rerun import.mjs
node import/change-records/import.mjs             # write guides from the cache; no network
node import/change-records/import.mjs --dry-run   # report counts, write nothing
node import/change-records/import.mjs --list      # print nid, category, core constraint and title; write nothing
node import/change-records/review.mjs             # write REVIEW.md and benchmarks/suites/change-records.json
```

## Source and pin

- Source: the drupal.org Drupal 7 REST API, `https://www.drupal.org/api-d7/node.json?type=changenotice&field_project=3060` (3060 is the `drupal` project), 50 records a page, newest first. The list pages carry every field the import needs (`field_description`, `field_change_to`, `field_change_to_branch`, `field_change_record_status`, `field_issue_links`, `author`), so no per-record request is made.
- `fetch.mjs` pages back until a whole page was created before `2023-01-01` (the 11.x branch did not exist yet), sleeps 6 s between requests, and stops without retrying on any non-JSON or error answer (a block or bot challenge).
- Cache: `cache/pages/page-NNNN.json`, gitignored. A cached page is never requested again unless `--refresh` is given.
- `pin.json` records the API, query, cutoff date and fetch date. Commit it.

## What is imported

- Records whose project is Drupal core and whose "Introduced in version" (`field_change_to`) has major version 11 or 12. When the version has no minor (`11.x`), the minor is taken as 0; when the version field is empty, the "Introduced in branch" field decides.
- Skipped, and listed in `manifest.json` under `skipped` with the reason: change records still in draft (`field_change_record_status` false; drupal.org's list shows these as not yet published), unpublished nodes, and records whose body is empty or under 80 characters of text.

## Output

- `guides/<category>/<slug>/guide.md`. `<slug>` is the record title, lowercased and hyphenated, cut to 60 characters at a word boundary. If that name is taken by another guide, `-<nid>` is appended.
- `<category>` is one of the categories in `guides/CONTRIBUTING.md`. `CATEGORY_OVERRIDES` in `import.mjs` (nid to category) wins first; otherwise the first of the keyword rules `CATEGORY_RULES` that matches the record title decides, else `module-development`. The rules look at the title only: matching the body as well filed records by passing mentions. This is mechanical sorting; a reviewer who wants a guide elsewhere changes a rule or an override and reruns.
- Frontmatter: `name`, `title` and `description` (both the record title, quoted), `drupal-core` (from "Introduced in version": `>=<major>.<minor>`, or `>=<major>.<minor>.<patch>` for a patch release; a backport to an earlier minor of the same major in a comma-separated version adds `^<backport> || `), `source-url`, `change-record-nid`, `introduced-in-version`, `introduced-in-branch`, `license: CC-BY-SA-2.0`.
- Body: one metadata line block (Introduced in branch, Introduced in version, Issue links, as on the record page), the record's description converted to Markdown, and a last line: `*Source: [title](url), a Drupal core change record by [author](...) on drupal.org, licensed under CC BY-SA 2.0.*` The API gives only the node author, not later revision authors; the record URL shows the full history.
- `manifest.json` lists every imported guide (`path`, `file`, `nid`, `title`, `category`, `version`, `drupalCore`, `url`, `overlaps`) and every skipped record with its reason. `overlaps` names hand-written guides whose topic the record's text matches by keyword (`OVERLAP_RULES`); it is a pointer for review, not a judgment.
- Reruns write only changed files and delete only folders listed in the previous manifest. If a target folder exists and is not in the manifest, the script stops and writes nothing. Commit `manifest.json`.

## Mechanical changes to the text

| Source HTML | Result |
|---|---|
| `<pre><code class="language-x">` | fenced code block tagged `x` (drupal.org tags most blocks `language-php`, YAML included; the tag is kept as given) |
| `<code>`, `<a>`, `<strong>`, `<em>`, lists, headings, `<blockquote>`, `<table>`, `<dl>` | Markdown equivalents. Headings start at `##`. |
| relative links and images | absolute `https://www.drupal.org/...` URLs |
| `*`, `_`, `[`, `` ` ``, `\` in prose; `<`; `{#`, `{{`, `{%` | backslash-escaped, `&lt;`, `{\#` etc., so Markdown, the engine's HTML check and its `{# #}` macro comments read them literally |

Known limit: the engine strips `{# ... #}` macro comments everywhere, code blocks included, so a Twig comment inside a code block disappears from the built guide (the source `guide.md` keeps it). `manifest.json` lists the affected guides under `twigCommentsInCode`.

## Result of the 2026-11-24 fetch

- 36 pages, 1800 records fetched (back to 2022-10-29). 1060 were introduced in 11.x or 12.x.
- Imported: 724 (658 with `drupal-core` `>=11.x`, 66 with `>=12.x`).
- Skipped: 336. 333 are drafts, 3 have a body too short to guide (nodes 3497318, 3552870, 3562304).
- Per category (after the 2026-11-24 review): module-development 284, entities-and-fields 80, theming-and-components 78, configuration-and-recipes 52, testing 50, composer-and-tooling 37, security 33, caching-and-performance 32, form-api 24, front-end-javascript 24, migration 19, headless-and-apis 11.
- Eight of these categories had no folder before this import and still have no discipline guide.

## Review and benchmark tasks

`REVIEW.md` is generated by `review.mjs` from `manifest.json`, the reviewer decisions in `review-data.json` (flagged guides and the reason a record has no task) and the `cr-*` tasks in `benchmarks/tasks/`, whose first `guides:` entry names the change-record guide they exercise. A record introduced after the benchmark base app's core version is reported as "needs newer core". `review.mjs` also writes the task set `benchmarks/suites/change-records.json`. Rerun it after adding a task or editing `review-data.json`.
