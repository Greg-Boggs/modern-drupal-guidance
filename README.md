# Modern Drupal Guidance

AI coding agents write old Drupal. They learned from far more Drupal 7 and 8 code than Drupal 10 and 11, so they reach for procedural hooks, plugin annotations, `drupal_set_message()` and `jQuery.once`.

Modern Drupal Guidance gives an agent short guides at the moment it writes code, so it uses what core offers today. It ships as an Agent Skill, an MCP server and a command-line tool.

It is a Drupal port of Google Chrome's [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance). The engine is the same. The content is Drupal.

## Does it work?

Early results, one run on Claude Haiku 5.5, the weakest model we test:

```
91 Drupal 11 change-record tasks · unguided vs. the Modern Drupal Guidance skill

Mode       Tasks passed     Checks passed     Uplift (tasks)  Uplift (checks)
---------  ---------------  ----------------  --------------  ---------------
Unguided   59/91  (64.8%)   382/431 (88.6%)   -               -
Skill      79/91  (86.8%)*  415/431 (96.3%)*  +22.0 pts*      +7.7 pts*

* Upper bound. The 59 tasks solved unguided weren't rerun with the skill,
  so they count as skill passes too.

The 32 tasks Haiku failed unguided:

Mode       Tasks passed     Checks passed
---------  ---------------  ----------------
Unguided    0/32  (0%)      127/176 (72.2%)
Skill      20/32  (62.5%)   160/176 (90.9%)
```

The skill fixed 20 of the 32 failures, and the agent looked up guidance in 31 of those 32 trials. Some of that gain may be luck, since a failed task can pass on a second try. Reruns will tell us how much.

Want to help measure it? Volunteers run the benchmark on their own machines with their own agent subscriptions. Start with the free dry run in [`benchmarks/README.md`](benchmarks/README.md), then open a pull request with your results file.

## Where the guides come from

People write and review the guide text. AI does not. AI writes the import scripts, build code and tooling.

- The [Drupal User Guide](https://www.drupal.org/docs/user_guide/en/index.html) is imported word for word, with attribution (CC BY-SA 2.0).
- Drupal 11 and 12 [change records](https://www.drupal.org/list-changes/drupal) from drupal.org are imported the same way.

### Awaiting review

AI drafted these seven developer guides so the benchmarks had something to test. They stay out of releases until a person checks them against Drupal core and its change records. Each has a tested demo module in its `demo/` folder.

- `guides/module-development/oop-hooks/`
- `guides/module-development/plugin-attributes/`
- `guides/module-development/dependency-injection/`
- `guides/caching-and-performance/cache-metadata/`
- `guides/caching-and-performance/lazy-builders/`
- `guides/front-end-javascript/behaviors-and-once/`
- `guides/theming-and-components/single-directory-components/`

Reviewed one? Fix or cut what's wrong and remove it from this list. The site's Contribute page (`site/src/contribute.njk`, data in `site/_data/contribute.json`) tracks reviews and the guides we still want.

## Try it

Nothing is published to npm yet. Build and query it locally (Node.js 22.18 or later):

```bash
cd engine
npm install
npm run build
node dist/skills-cli/skills/modern-drupal-guidance/modern-drupal-guidance.mjs search "cache tags render array"
```

## Repository layout

```
engine/        The upstream engine: build, search, CLI, benchmark harness
guides/        The guides: guides/<category>/<slug>/guide.md
import/        Scripts that import the User Guide and change records
data/drupal/   Drupal versions, release dates and deprecations as JSON
legacy-scan/   Rules that find legacy Drupal patterns in code
mcp/           MCP server
site/          Static website (not ready yet)
benchmarks/    Benchmark tasks, setup and submitted results
```

`engine/` is a copy of the upstream source repository, not a git fork, because upstream keeps its web guides in the same repository. Port upstream fixes by hand.

`MILESTONES.md` tracks the status of each workstream. `PROMPTS.md` holds the prompts that started them.

## Guide format

Each guide is `guides/<category>/<slug>/guide.md` with this frontmatter at minimum:

```yaml
---
name: oop-hooks                 # equals <slug>
description: 'Implement hooks as autowired class methods with the #[Hook] attribute.'
drupal-core: ">=11.1"           # Composer constraint for the core versions it applies to
draft: stub                     # optional: stub | wip | blocked; drafts are not distributed
---
```

A description that contains `#` must be quoted. The full spec is in `guides/CONTRIBUTING.md`.

## Rules for agent sessions

Separate Claude sessions build each workstream. Each one:

- writes only in the directories its prompt assigns, and may read anything;
- leaves `README.md`, `MILESTONES.md` and `PROMPTS.md` to the coordinating session;
- never publishes, deploys or pushes to npm;
- runs the build or tests that prove the work before reporting it done.

## License

Code is Apache-2.0, from Google LLC's upstream project, credited in `NOTICE`. This project doesn't use Google, Chrome or Modern Web Guidance branding. Imported guide text stays under CC BY-SA 2.0 with attribution to its authors.
