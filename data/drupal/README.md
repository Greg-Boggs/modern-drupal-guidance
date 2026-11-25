# data/drupal

Machine-readable facts about Drupal core versions and API changes. The version layer and the legacy scanner read these files. They are data only; nothing here is a guide.

| File | What it holds | Schema |
|---|---|---|
| `releases.json` | Every core minor from 9.0 on: release date, security support end, minimum PHP, whether it is supported today | `schemas/releases.schema.json` |
| `deprecations.json` | Deprecated and removed APIs (functions, classes, methods, services, hooks, annotations, libraries and more) with versions, replacement and change record | `schemas/deprecations.schema.json` |
| `features.json` | Notable new APIs by the version that introduced them, each with a change record | `schemas/features.schema.json` |

Every entry carries a source URL (`source_urls` in releases, `source_url` elsewhere). An entry is left out rather than given a guessed version.

## Reading the data

- `releases.json`: `status` is `current` (newest stable minor), `supported` (older minor still in security coverage), `end-of-life`, or `prerelease` (announced, no stable `.0` yet). `supported` is the boolean form. `status` and `supported` are computed for `as_of`, so a consumer that runs later than that date should recompute from `security_support_end`. `security_support_end` is `YYYY-MM-DD` when drupal.org gives a day and `YYYY-MM` when it gives only a month; `security_support_end_precision` says which.
- `deprecations.json`:
  - `status` is `removed` when `removed_in` is at or before `latest_stable`, otherwise `deprecated`. Anything with `removed_in` of 12.0.0 or 13.0.0 is still present in the newest stable release.
  - `deprecated_in` can be 8.x. The file holds anything removed in 9.0 or later, because `drupal_set_message()` and `db_query()` were deprecated in 8.x and removed in 9.0.
  - `priority: high` marks APIs coding agents are known to still emit; `tags` group them (`database`, `entity-wrapper`, `file`, `user`, `messenger`, `javascript` and so on). Rules live in `curated/priority.json`.
  - `origin: core-source` entries come from the `@deprecated` notice in core. `origin: curated` entries were added by hand for things that have no docblock (plugin annotations, the `.theme` file, include-file hooks, `jQuery.once()`), and always cite a change record.
  - `change_record_url` is null when core's notice cites none. `source_url` is then the drupal.org issue the notice names, or the core file at the tag where the notice was found.
- `features.json`: `introduced_in` is the version in the change record's "Introduced in version" field, normalised to the `.0` release. A feature that first shipped as experimental says so in `notes`.

## Sources

- Release history feed: <https://updates.drupal.org/release-history/drupal/all> (release dates, latest patch)
- Core release schedule: <https://www.drupal.org/about/core/policies/core-release-cycles/schedule> (security end dates, planned releases)
- Release notes of each minor, `https://www.drupal.org/project/drupal/releases/X.Y.0` (security support statements, PHP changes)
- `core/composer.json` at each `.0` tag in <https://github.com/drupal/core> (minimum PHP)
- Change records: <https://www.drupal.org/list-changes/drupal>
- Core source `@deprecated` notices at tags 8.9.20, 9.5.11, 10.6.22, 11.4.13 and 12.0.0-beta2 of <https://github.com/drupal/core>

## Layout

```
releases.json  deprecations.json  features.json
schemas/       JSON Schema (draft 2020-12), one per file
curated/       hand-maintained inputs the build scripts merge in
scripts/       build, extract, lookup and validate scripts (Python 3, standard library; validate.py needs `jsonschema`)
```

## Validate

```bash
pip install jsonschema   # once
python3 data/drupal/scripts/validate.py
```

It checks each file against its schema, then cross-field rules: unique ids, `removed_in` after `deprecated_in`, `status` consistent with `latest_stable`, every released minor present, features cite the same URL as source and change record. Exit code 1 on any problem.

## Refresh

Run when a core minor ships, when the release schedule changes, and at least once per minor cycle. Paths below are relative to `data/drupal`; use a scratch directory for downloads.

1. **Releases.** Edit `curated/releases-support.json`: add the new minor (copy a neighbour), fill `security_support_end` and its precision from the release notes or the schedule page, set `min_php` from `core/composer.json` at the new `.0` tag. Update `PLANNED` in `scripts/build_releases.py` from the schedule page. Then:
   ```bash
   python3 scripts/build_releases.py --as-of "$(date +%F)"
   ```
   It downloads the release history feed and recomputes dates, latest patches, `status` and `supported`.
2. **Deprecations.** Clone core at the newest tag of each series you want covered (shallow clones of <https://github.com/drupal/core>), then extract and build:
   ```bash
   for t in 8.9.20 9.5.11 10.6.22 11.4.13 12.0.0-beta2; do git clone -q --depth 1 --branch $t https://github.com/drupal/core.git "$SCRATCH/src/$t"; done
   python3 -I scripts/extract_deprecations.py "$SCRATCH/cand.json" 8.9.20="$SCRATCH/src/8.9.20" 9.5.11="$SCRATCH/src/9.5.11" 10.6.22="$SCRATCH/src/10.6.22" 11.4.13="$SCRATCH/src/11.4.13" 12.0.0-beta2="$SCRATCH/src/12.0.0-beta2"
   python3 scripts/build_deprecations.py "$SCRATCH/cand.json" --latest-stable 11.4.13
   ```
   Replace the tags with the current ones (`git ls-remote --tags https://github.com/drupal/core.git`). Pass the newest stable release as `--latest-stable`; it decides `removed` versus `deprecated`. Add hand-checked entries to `curated/deprecations-curated.json` and priority rules to `curated/priority.json`.
3. **Features.** Add entries to `curated/features-curated.json`. Find change records with `python3 scripts/cr_search.py "keyword" --title`, and confirm the version with `python3 scripts/cr_info.py NODE_ID` before you write `introduced_in`. Then `python3 scripts/build_features.py`.
4. **Check.** `python3 scripts/validate.py`, then review `git diff --stat` for the three JSON files. A large drop in entries means an extractor regression.

The extractor only reads `@deprecated in drupal:X and is removed from drupal:Y` docblocks (and the older `Drupal X ... removed before Drupal Y` wording), `deprecated:` messages in `*.services.yml`, and `deprecated:` messages in `*.libraries.yml`. It does not read `@trigger_error()` calls on their own.

## Known gaps

- Security end dates before 2026 are month-precision (release notes say "until December 2023", not a day). Only 9.5, 10.6 and 11.4 have a day. The 11.4.0 release notes say June 2027 while the schedule page says April 21, 2027; the schedule page is newer and is used.
- 9.4's end date (2023-06) is inferred from the 10.1.0 release notes saying 9.4.x no longer receives security support; no release note states 9.4's end directly.
- `releases.json` carries 11.5 and 12.0 as `prerelease`, with planned dates from the schedule page and minimum PHP from `composer.json` on the beta tags. Both can change before release.
- Deprecations not written as an `@deprecated` docblock, services entry or library entry are missing unless curated: `@trigger_error()`-only notices, config schema keys, routing YAML, Twig variables and theme-hook keys. Curated coverage is five entries.
- Procedural hooks are not formally deprecated in 11.x, so they have no deprecation entry. The replacement is in `features.json` (`oop-hooks`, 11.1.0). Removal of hook discovery outside the main extension file (CR 3613767) lands in 12.0 but is not yet recorded as a deprecation entry.
- `replacement` is core's own message, lightly trimmed. 83 entries have an empty replacement because core states none; 141 entries have no change record and cite a source file or issue.
- Deprecations announced for 11.5 and 12.0 (the release candidate cycle) come from the 12.0.0-beta2 tree and may still change.
- The change record for `jQuery.once()` was created for 9.2.0, when `core/once` landed; core's library notice deprecates `core/jquery.once` in 9.3.0. The dataset uses 9.3.0.
- Recipes shipped as experimental in 10.3.0. No change record marks stabilisation, so `features.json` does not claim a stable version.
- Deprecated items removed before 9.0 (for example `l()` and `url()`, gone in 8.x) are out of scope.
