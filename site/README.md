# Modern Drupal Guidance website

Static site that publishes every guide in `../guides` for people to read. Built with [Eleventy](https://www.11ty.dev/) 3.

## Why Eleventy

The site is a few content pages plus one template per guide, so it needs no client framework. Eleventy builds plain HTML with no client JavaScript by default, and a data file (`_data/guides.js`) can walk `../guides` directly. Astro would also work, but its component and island model buys nothing here. The only script shipped is about 2 KB, for the theme toggle and guide search, and the site works without it (search is hidden, theme follows the system setting).

## Layout

```
_data/guides.js   Reads guides, parses frontmatter, renders Markdown, highlights code
_data/site.js     Site name, upstream links
_data/contribute.json  Source of truth for the Contribute page; set "repository" once the public repo URL exists
_includes/        base.njk layout
src/              Pages: index, about, contribute, guides/index, guides/guide (one page per guide)
src/assets/       site.css, site.js
fixtures/guides/  Three sample guides used when ../guides has none
```

## How guides are read

`_data/guides.js` follows the guide contract in `../README.md`: `guides/<category>/<slug>/guide.md` with `name`, `description`, `drupal-core` and optional `draft`.

- Guides with a `draft` value are skipped.
- A guide with invalid YAML or a missing `name` or `description` is skipped with a warning in the build log.
- If `../guides` has no publishable guide, the site builds from `fixtures/guides` and the guide index shows a "sample fixture guides" notice. Set `GUIDES_DIR=/path/to/guides` to read from somewhere else.
- Code fences are highlighted at build time with Prism: `php`, `twig`, `yaml`, `js`/`javascript`, plus `json`, `bash`, `css`, `html`.
- Guide pages show a "Supports" badge derived from `drupal-core`, plus the raw constraint.
- Category root guides (`<category>/<category>`) are listed first in their category with a "Category overview" label.

Gotcha for authors: an unquoted `description:` containing `#` after a space (for example `with the #[Hook] attribute`) is silently truncated by YAML, and `: ` inside one is a parse error. Quote descriptions that contain those characters. The example in `../README.md` has this problem.

## Build and preview

```bash
cd site
npm install
npm run build     # writes _site/
npm start         # dev server with live reload at http://localhost:8080
```

Requires Node 18 or later (developed on Node 22).

## Deploy to Cloudflare Pages

Nothing is deployed. There is no Wrangler configuration file in this project, so use the `cf` CLI.

| Setting | Value |
|---|---|
| Root directory | `site` |
| Build command | `npm install && npm run build` |
| Build output directory | `_site` |
| Environment variable | `NODE_VERSION=22` |

Guides are read from `../guides`, so a Git-integrated build must clone the whole repository (root directory `site` still checks out everything). For a direct upload, build locally and upload the output:

```bash
cd site && npm install && npm run build
cf pages project create modern-drupal-guidance --production-branch main
cf pages deploy _site --project-name modern-drupal-guidance
```

Run `cf pages --help` to confirm the flags in your installed version. Add a custom domain from the Pages project settings.

## Not done yet

- `../guides` is empty at the time of writing, so the site shows the fixtures. Rebuild once real guides land.
- No repository link in the header or footer until the public repo URL exists (`_data/site.js`).
- The MCP package name on the landing page is provisional.
- No sitemap, favicon or social image.
