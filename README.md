# Modern Drupal Guidance

Modern Drupal Guidance is a set of expert-curated guides, a command-line tool and agent plugins that steer AI coding agents toward current Drupal practices and away from the legacy patterns that dominate their training data.

It is built on Google Chrome's [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) ([source repository](https://github.com/GoogleChrome/modern-web-guidance-src)). The engine stays the same. The content is replaced with Drupal guidance.

`engine/` is a copy of the upstream source repository rather than a git fork, because upstream keeps its web guides in the same repository. To pick up upstream fixes, compare `engine/` against the upstream commit it was copied from and port the changes by hand.

## Content sources

Guide text comes from curated, human-reviewed sources, never from AI-written prose.

- The [Drupal User Guide](https://www.drupal.org/docs/user_guide/en/index.html) (source: `git.drupalcode.org/project/user_guide`, CC BY-SA 2.0) is imported by script without rewording. Each guide keeps attribution and records the User Guide commit it came from.
- Other curated sources, such as drupal.org change records and the `*.api.php` documentation in Drupal core, may be added the same way.
- A guide that a person writes, or that AI drafted, is not released until a person reviews it. Guides still awaiting review are listed below.

AI may write import scripts, build code and tooling. It does not author published guide text.

### Content awaiting review

These developer guides were drafted by AI. They ship in development builds so the benchmarks can test them, but they have not been reviewed by a person and must not be released until they are. Each one has a tested demo module in its `demo/` folder.

The website's Contribute page (`site/src/contribute.njk`) tracks these reviews and wanted guides from the data file `site/_data/contribute.json`.

| Guide | Path |
|---|---|
| OOP hooks | `guides/module-development/oop-hooks/` |
| Plugin attributes | `guides/module-development/plugin-attributes/` |
| Dependency injection | `guides/module-development/dependency-injection/` |
| Cache metadata | `guides/caching-and-performance/cache-metadata/` |
| Lazy builders | `guides/caching-and-performance/lazy-builders/` |
| Behaviors and once | `guides/front-end-javascript/behaviors-and-once/` |
| Single Directory Components | `guides/theming-and-components/single-directory-components/` |

To review one, check it against Drupal core and its change records, fix or cut anything wrong, and remove it from this table. Benchmark results for these guides measure unreviewed content.

## Why

LLMs have seen far more Drupal 7 and 8 code than Drupal 10 and 11 code. Left alone, agents write procedural hooks, plugin annotations, `\Drupal::` calls inside services, `drupal_set_message()`, `jQuery.once` and other APIs that are deprecated or removed. Modern Drupal Guidance gives agents short, tested guides at the moment they write code, so they use what core provides today: OOP hooks with `#[Hook]`, PHP attributes, dependency injection, Single Directory Components, Recipes, cache metadata and the rest.

## Components

| Component | What it does |
|---|---|
| Guides | Markdown guides, one per use case, grouped by category. The only thing agents read at runtime. |
| CLI | `npx modern-drupal-guidance search "<query>"`, `retrieve "<id>"`, `list`, `install`, `legacy-scan <path>`. |
| Search | Local BM25 plus static word embeddings. No server, no API key. |
| Agent plugins | Agent Skill and plugin manifests for Claude Code, Codex, Cursor, Gemini CLI and others. |
| MCP server | `search` and `retrieve` exposed as MCP tools for clients that prefer MCP over a skill. |
| Legacy scan | Static rules for PHP, Twig, YAML and JS that find legacy Drupal patterns and point to the guide that replaces them. |
| Website | A static site that publishes every guide for people to read. |
| Evals | A harness that measures whether agents with the guidance write better Drupal code than agents without it. |

### Skill or MCP

Both deliver the same guides to an agent. They differ in how the agent reaches them.

- **Skill:** a `SKILL.md` file that the agent reads. It says when to look something up and to run `npx modern-drupal-guidance search` and `retrieve` in a shell. This needs an agent that can run commands, such as Claude Code, Codex or Cursor's agent.
- **MCP server:** a small program that the agent's app starts in the background. It announces tools (`search_guides`, `retrieve_guides`) with typed inputs, and the app calls them for the model. No shell is needed, so it also works in chat apps such as Claude Desktop.

## Benchmarks: help us test

We measure whether the guides help by having agents do the same Drupal tasks with and without them, and grading the results. There are no nightly runs on our servers. Volunteers run the benchmark on their own machines with their own agent subscriptions and send in the results, like SETI@home for Drupal skills.

Each run builds a clean Drupal site, gives the agent a task without guidance and then with the skill, and grades the result with deterministic checks: config, legacy-pattern scans and page fetches. The MCP server and Context7 are optional extra modes. You get a table of pass rates per mode and the uplift, plus one results file.

To take part:

1. Follow the setup in [`benchmarks/README.md`](benchmarks/README.md).
2. Run the dry run first. It checks your setup and the graders without calling any model and costs nothing.
3. Run the default benchmark with your agent: at most 5 trials. The benchmarks README lists the measured token cost before you start.
4. Open a pull request that adds your file from `benchmarks/results/`. Every result includes the agent's changes, so maintainers can re-grade it.

Results from many agents, models and machines are what make the numbers credible. Every run helps.

### Results so far

These numbers are rough. Every run so far is one model (Claude Haiku 5.5 in Claude Code), on one machine, with each task run once.

| Task set | Tasks | Without guidance | With the skill | Uplift |
|---|---|---|---|---|
| Pilot | 10 | 10 of 10 passed | 10 of 10 passed | +0 points |
| Change records | 91 | 59 of 91 passed (65%) | at most 79 of 91 (87%) | at most +22 points |

- The pilot tasks are too easy for Haiku. It passed all of them without help, so they can't show uplift. In the same run the MCP server passed 9 of 10, breaking one task Haiku had solved without help.
- On the change-records tasks the skill fixed 20 of the 32 tasks Haiku failed without help. The other 59 tasks were skipped in skill mode because Haiku solved them without help, and the summary counts them as skill passes. That's why +22 is an upper bound. The skill may break some of them. The next planned run measures the skill on a random 30 of those 59 to get a real number.
- Haiku read a guide in 30 of the 32 skill trials. Of the 12 skill failures, 10 read a guide and still failed. Those 10 are the first place to look for guides that need work.

See [Reading the summary](benchmarks/README.md#reading-the-summary) for what the columns mean. The results files are in [`benchmarks/results/`](benchmarks/results/).

## Repository layout

```
README.md          This file. Evergreen overview.
MILESTONES.md      Current status of each workstream.
PROMPTS.md         The prompts used to start each workstream session.
engine/            Fork of modern-web-guidance-src: build, search, CLI, dist, legacy-scan host.
guides/            Guide content: guides/<category>/<slug>/guide.md
data/drupal/       Drupal core versions, release dates, deprecations and API changes as JSON.
legacy-scan/       Drupal legacy-pattern rules, built to plug into engine/src/legacy-scan.
mcp/               MCP server wrapping the CLI.
site/              Static website built from guides/.
import/            Scripts that import curated sources into guides/.
benchmarks/        Benchmark tasks, setup instructions and submitted results.
```

Each directory has one owner at a time. Work in one directory does not edit another directory.

## Guide contract

Every guide is `guides/<category>/<slug>/guide.md` with YAML frontmatter. The minimum fields, which every component may rely on:

```yaml
---
name: oop-hooks                 # equals <slug>
description: Implement hooks as autowired class methods with the #[Hook] attribute instead of procedural functions in .module files.
drupal-core: ">=11.1"           # Composer constraint for the core versions the guide applies to
draft: stub                     # optional: stub | wip | blocked; drafts are not distributed
---
```

The body is self-contained Markdown written for a coding agent: an overview, the rules, complete code, and fallbacks for older supported core versions. `guides/CONTRIBUTING.md` holds the full authoring spec, the category list and any extra frontmatter fields.

Category root guides at `guides/<category>/<category>/guide.md` are discipline guides. They orient an agent to the category and link to its use-case guides.

## Workflow and models

Work runs as separate top-level Claude sessions, one per workstream, each listed in `PROMPTS.md`. A coordinating session starts them, tracks `MILESTONES.md`, and decides when dependent work can begin.

| Kind of task | Model | Effort |
|---|---|---|
| Judgement calls: architecture, what to keep or cut from upstream, the authoring spec, Drupal accuracy, legacy rules and their false positives, reviewing other sessions' work | Opus | high |
| Writing guides to an existing spec | Opus | medium |
| Mechanical or well-specified work: renames, scaffolding, data gathering, manifests, site templates, wrappers around a defined interface | Sonnet | medium |
| Trivial edits, formatting, link checks | Sonnet | low |

Rules for every session:

- Stay inside the directories the prompt assigns. Read anything; write only there.
- Do not edit `README.md`, `MILESTONES.md` or `PROMPTS.md`. Report status in your final message, and the coordinator records it.
- Do not publish, deploy, push to npm or open pull requests upstream. Prepare them and stop.
- Verify before reporting done: run the build, the tests or the command that proves it works.

## License and attribution

Upstream code is Apache-2.0, copyright Google LLC. This project keeps the upstream `LICENSE` and adds a `NOTICE` that credits the original project. It does not use Google, Chrome or Modern Web Guidance branding.

Guides imported from the Drupal User Guide stay under CC BY-SA 2.0, with attribution to its contributors. Code and guide content are licensed separately.
