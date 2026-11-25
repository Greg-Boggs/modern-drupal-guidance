# Drupal benchmark

This benchmark measures whether coding agents do better Drupal work with Modern Drupal Guidance than without it. Volunteers run it on their own machines with their own agent subscriptions and submit one results file per run as a pull request. There are no nightly runs and no central infrastructure: maintainers re-grade submissions locally from the diffs in each file.

Each trial gives an agent one task in a fresh, identical Drupal site, then grades the site with cheap, deterministic checks. A trial runs in one of four modes:

| Mode | What the agent gets |
|---|---|
| `unguided` | Nothing beyond the task prompt. |
| `skill` | The built `modern-drupal-guidance` Agent Skill, with `npx modern-drupal-guidance` resolving to the local build. |
| `mcp` | The MCP server in `mcp/`, wired in through the agent's MCP config. Off by default. |
| `context7` | [Context7](https://github.com/upstash/context7)'s hosted MCP server in place of ours, to compare its generic Drupal docs (library `/websites/drupal`) with our guides. Off by default, Claude Code only. |

`context7` is wired like `mcp`. Our server's instructions tell the agent to call it before writing Drupal code; Context7's cannot be edited, so one appended system-prompt sentence says the same and names the library. Each server keeps its own instructions and tool descriptions. Set `CONTEXT7_API_KEY` for higher rate limits; without it the run uses no key. The key is never written to the MCP config, and it is redacted from transcripts and diffs. A rate-limit or connection failure marks the trial errored (not scored) and stops the run, which prints the tasks left to run. The dry run checks the connection:

```bash
npm run bench -- --dry-run --modes context7
```

To run it on the tasks that failed unguided in a results file:

```bash
npm run bench -- --rerun-failed results/2026-11-25-claude-code-claude-haiku-5-5-b52fbf.json --modes context7 --model claude-haiku-5-5
```

A default run is cheap: at most 5 trials, in `unguided` and `skill` only. The skill and the MCP server deliver the same guides, so `mcp` is an occasional check that you turn on yourself.

The summary reports the pass rate per mode and the uplift of each guided mode over `unguided`. Both modes are counted over the same tasks. See [Reading the summary](#reading-the-summary).

### How a run picks trials

1. The harness puts the tasks in a random order. It records the seed in the results file. Pass `--seed` to repeat an order. Different volunteers cover different tasks.
2. It takes one task at a time and runs `unguided` first.
3. If the agent passes every check unguided, the harness skips that task's guided trials. It records the task as solved unguided. Skipped trials do not count against the cap.
4. Otherwise it runs the guided modes for the same task.
5. It stops when the next task's trials might not fit under the cap (`--trials`, default 5). A task needs one trial per mode. So a run can use fewer trials than the cap.

So the guided modes only run on tasks the model fails without help. The summary still counts every task in both modes. It counts a skipped task as a guided pass, which assumes the guidance would not break it. That makes the guided figures an upper bound, marked `≤`. Pass `--no-skip-solved` to run every mode for every task and get exact figures.

With 5 trials that is a few tasks at most, so one run says little on its own. The value comes from pooling many runs.

## Results so far

Every run so far used Claude Haiku 5.5 in Claude Code, on one machine, with each task run once. Treat the numbers as rough. Print any file's full summary with `pnpm bench summary <file>`.

| Results file | Task set | Modes | Without guidance | Guided | Uplift (tasks) |
|---|---|---|---|---|---|
| `2026-11-24-…-b99467` | pilot, 10 tasks | unguided, skill, mcp | 10/10 | skill 10/10, mcp 9/10 | skill +0, mcp -10 pts |
| `2026-11-25-…-b52fbf` | change-records, 91 tasks | unguided, skill | 59/91 (64.8%) | skill ≤79/91 (≤86.8%) | skill ≤+22 pts |

- The pilot set is too easy for Haiku. It solved every task without help, so the set can't show uplift. The MCP server broke one of those tasks.
- The change-records run skipped skill mode on the 59 tasks Haiku solved without help, so its uplift is an upper bound. The skill fixed 20 of the 32 tasks that failed without help. Haiku read a guide in 30 of those 32 skill trials, and 10 of its 12 skill failures happened after reading one.
- The next planned run measures the skill on a random 30 of the 59 skipped tasks, to replace the upper bound with a real figure.
- Smaller files are partial or test runs. `dd41e6` errored before the agent ran. `dec2d1` (4 trials) and `14489d` (5 trials) are short change-records runs. `c2cf2b` reruns the 32 unguided failures of `b52fbf` three times each and has 2 trials so far.

## What runs where

| Path | Contents |
|---|---|
| `benchmarks/tasks/<id>/task.md` | The one-paragraph prompt, written as a site owner's feature request that names no API, with frontmatter naming the guides it exercises. |
| `benchmarks/tasks/<id>/expectations.md` | The observable checks, written for a Drupal developer to review, each marked Outcome (what the prompt asks for) or Practice (the approach the guides teach). |
| `benchmarks/tasks/<id>/grader.ts` | The same checks as code. |
| `benchmarks/tasks/<id>/reference/` | A hand-written reference solution (`solution.sh` plus files) used to calibrate the grader. |
| `benchmarks/suites/pilot.json` | The pilot task set. |
| `benchmarks/results/` | Submitted results files, one per run. |
| `engine/src/harness/bench/` | Base app builder, agent runners, CLI, results file, re-grading, dashboard export. |
| `engine/src/grading/drupal/` | Grading context and shared checks. |

### The base app

`bench setup` builds one Drupal site into `~/.cache/modern-drupal-guidance-bench/drupal-11.4.13/` (or `$MDG_BENCH_CACHE`) and never changes it afterwards:

- `drupal/recommended-project` 11.4.13 and `drush/drush` 13.8.1, pinned in `engine/src/harness/bench/paths.ts`.
- The `standard` install profile on SQLite, plus the core recipes `page_content_type`, `article_content_type` and `article_tags`. Since Drupal 11.3 the standard profile no longer creates Article and Basic page; the recipes add them back.
- CSS and JS aggregation off, the config sync directory at `config/sync`, and a git baseline commit.

Before every trial the harness copies this template to a new directory under the system temp directory (`$MDG_BENCH_TRIALS` overrides it), so each trial starts with the same files and the same database. Trials live outside your home directory so the agent does not pick up a `CLAUDE.md` or `AGENTS.md` from a parent folder.

### Isolation of the agent

Each trial gets a throwaway agent config directory (`CLAUDE_CONFIG_DIR` for Claude Code, `CODEX_HOME` for Codex). Your own skills, MCP servers, memory, settings and instructions do not reach the agent. Only your credentials file is copied in, or the agent uses a token from the environment. Web search and web fetch are turned off in every mode unless you pass `--allow-web`, so the comparison measures the guidance rather than web access. In every mode but `skill`, `npx modern-drupal-guidance` returns a 404.

The agent runs with `--dangerously-skip-permissions` (Codex: `--yolo`) inside the trial directory, with your user's privileges. Run the benchmark in a VM, a container or a dedicated user account if that worries you.

### Graders

Checks prefer the cheapest deterministic source of truth:

- Site building: active configuration (the same data as `drush config:get`), plus a content manifest saved with the trial in `bench-state/content.json`.
- Code: the rules in `legacy-scan/` (for example procedural hooks, `@Block` annotations, `jQuery.once`, static `\Drupal::` calls in injectable classes) and the deprecated and removed APIs in `data/drupal/deprecations.json`.
- Behavior: Drush (`cache:rebuild`, `pm:install`, `php:eval` against the site's services), and HTTP fetches of rendered pages from PHP's built-in server as an anonymous visitor.
- Front-end JavaScript: the page's behaviors run in a lightweight DOM (linkedom). No browser is needed. Playwright is not used by any pilot task.

Every check is either MUST (the result must be present) or MUST NOT (a legacy or unsafe pattern must be absent). A grader is calibrated when the reference solution passes every check and the untouched base app fails every MUST check and passes every MUST NOT check. Calibration also rebuilds a site from the reference solution's recorded diff and grades it again, which proves the diff in a results file is enough to re-grade.

## Task sets

`--tasks` picks a suite from `benchmarks/suites/`:

- `pilot`, the default: 10 hand-written tasks, listed below.
- `change-records`: 91 tasks built from Drupal 11 core change records (see `import/change-records/REVIEW.md`). Their ids start with `cr-`. Each prompt describes the behavior the record introduced without naming its API.
- `all`: every task in `benchmarks/tasks/`.

### Pilot tasks

| Task | Kind | Guides |
|---|---|---|
| `sb-content-type` | Site building | structure-content-type, structure-fields |
| `sb-view` | Site building | views-create, views-block |
| `sb-block` | Site building | block-create-custom, block-place |
| `sb-roles` | Site building | user-new-role, user-permissions |
| `sb-menu` | Site building | content-paths, menu-link-from-content |
| `code-oop-hooks` | Code | oop-hooks |
| `code-plugin-attributes` | Code | plugin-attributes |
| `code-dependency-injection` | Code | dependency-injection |
| `code-cache-metadata` | Code | cache-metadata |
| `code-behaviors-once` | Code | behaviors-and-once |

The agent has no browser, so site-building tasks are done through Drush or PHP. Each prompt is preceded by the same short description of the environment, in every mode (`buildPrompt()` in `engine/src/harness/bench/tasks.ts`).

## Prerequisites

- Linux or macOS. Windows works only inside WSL.
- Node.js 22.18 or newer, and pnpm (`corepack enable`) for building the engine.
- PHP 8.3 or newer (CLI) with `pdo_sqlite`, `gd`, `mbstring`, `xml`, `dom`, `simplexml`, `curl`, `json` and `zip`. PHP's SQLite library must be 3.45 or newer (Drupal 11 requires it; Ubuntu 22.04's packaged PHP is too old).
- Composer 2, git and bash.
- Network access to packagist.org and GitHub the first time the base app is built.
- About 250 MB in your cache directory for the base app, and about 250 MB of free temp space per running trial.
- Claude Code, logged in with your subscription or an API key. Codex CLI is optional and experimental.

## Setup

From the repository root:

```bash
cd engine && pnpm install && pnpm build
```

```bash
cd legacy-scan && npm ci && npm run build
```

Only for `mcp` mode, also build the MCP server:

```bash
cd mcp && npm ci && npm run build
```

The commands below run from `benchmarks/`. `npm run` works as well as `pnpm`; the benchmark has no dependencies of its own. With npm, put `--` before any options, as in `npm run bench -- --trials 10`. Without it npm keeps the options for itself, and `npm run bench --dry-run` starts a real run.

### Claude Code credentials

The harness passes your credentials to an isolated config directory without reading them:

- Subscription users (recommended on every platform): run `claude setup-token` and export the token it prints as `CLAUDE_CODE_OAUTH_TOKEN` in the shell where you run the benchmark. The token lasts for the whole run.
- Linux without a token: the harness copies `~/.claude/.credentials.json`. This is fragile: when one trial refreshes the copied login, the copies used by later trials can stop working, and the run stops on a sign-in error. On macOS the login lives in the keychain, which the isolated config cannot read, so a token is required.
- API users: export `ANTHROPIC_API_KEY`. Claude Code then also reports the cost in US dollars.

Pick the model with `--model` (or `ANTHROPIC_MODEL`). If `CLAUDE_EFFORT` is set in your shell, it is passed through and recorded.

## Dry run (free)

```bash
pnpm bench --dry-run
```

The dry run calls no model. It checks every prerequisite (including a guidance search), builds the base app if needed, and calibrates all ten graders. It prints the most trials a real run would start and the estimated tokens. It takes about five minutes, most of it calibration, and ends with "Dry run passed" or a list of what to fix. To also check the MCP server with a real `initialize` and `tools/list` handshake, add `--modes unguided,skill,mcp`.

Build or rebuild only the base app:

```bash
pnpm bench setup --force
```

## Run the benchmark

The default run starts at most 5 trials, with no MCP:

```bash
pnpm bench
```

The whole pilot set, `unguided` and `skill` (at most 20 trials):

```bash
pnpm bench --full
```

`--trials 30` also covers the whole pilot set. The whole set with MCP is at most 30 trials:

```bash
pnpm bench --trials 30 --modes unguided,skill,mcp
```

| Option | Default | Meaning |
|---|---|---|
| `--trials` | `5` | Cap on agent trials. Skipped trials do not count. It must be at least the number of modes. With `--rerun-failed` there is no cap unless you pass one. |
| `--full` | off | No cap: every task in the set, every run. Do not combine it with `--trials`. |
| `--modes` | `unguided,skill` | Comma-separated from `unguided`, `skill`, `mcp` and `context7`. Keep `unguided` so uplift can be computed and solved tasks skipped. `unguided` always runs first. |
| `--no-skip-solved` | off | Run the guided modes even when the agent passes every check unguided. |
| `--seed` | random | Repeat a task order. The same seed, task set and options give the same order. |
| `--agent` | `claude-code` | `claude-code` or `codex`. |
| `--tasks` | `pilot` | A suite in `benchmarks/suites/`, `all`, or comma-separated task ids. The cap still applies. |
| `--runs` | `1` | Repeat every task up to this many times. The harness goes through all tasks before it repeats one. The cap counts every run, so add `--full` or a larger `--trials`. The plan warns when the cap would cut the run short. |
| `--rerun-failed` | off | A results file. The task set becomes the tasks that failed in that file. See [Rerunning failed tasks](#rerunning-failed-tasks). |
| `--failed-mode` | `unguided` | With `--rerun-failed`: the mode whose failures are picked. It is also the default `--modes`. |
| `--model` | agent default | Model id passed to the agent. |
| `--timeout-min` | `20` | Per-trial time limit. |
| `--allow-web` | off | Let the agent use web search and fetch. |
| `--keep-sites` | off | Keep trial sites in the temp directory for inspection. |
| `--yes` | off | Skip the 10-second countdown before the first trial. |
| `--out` | `benchmarks/results/` | Directory for the results file. |

Before the first trial the harness prints the most trials it can start, the estimated tokens, the seed and the task order. Trials run one at a time. After every trial the harness prints the checks that failed and rewrites the results file, so an interrupted run keeps what it finished. At the end it prints the summary.

### Reading the summary

This is the summary of the first change-record run, Haiku 5.5 on 91 tasks:

```
| Mode     | Trials | Tasks fully passed | Checks passed     | Uplift (tasks) | Uplift (checks) | Fixed unguided failures | Errored | ...
|----------|--------|--------------------|-------------------|----------------|-----------------|-------------------------|---------|----
| unguided | 91     | 59/91 (64.8%)      | 382/431 (88.6%)   | -              | -               | -                       | 0       | ...
| skill    | 32     | ≤79/91 (≤86.8%)    | ≤415/431 (≤96.3%) | ≤+22 pts       | ≤+7.7 pts       | 20 of 32                | 0       | ...
skill: compares 91 task run(s) in both modes. Fixed 20 of 32 task run(s) that failed unguided.
skill: 59 task run(s) were solved unguided and skipped in skill. They count as skill passes, so the skill figures and uplift are upper bounds (≤): ...
```

- "Trials" is how many trials ran in that mode. The agent solved 59 tasks unguided, so the skill ran only on the other 32.
- "Tasks fully passed" and "Checks passed" cover the same 91 tasks in every row. The skill row is 59 skipped tasks plus the 20 the skill solved.
- `≤` marks an upper bound. The skill might have failed some of the 59 skipped tasks. Without skipping there is no `≤`.
- "Uplift" is the guided rate minus the unguided rate over those same tasks.
- "Fixed unguided failures" is the plain subset result: the skill solved 20 of the 32 tasks that failed unguided. Without skipping the notes also say how many tasks the guidance broke.
- A task with an unguided result but no guided result that was not skipped, because the cap was reached or the trial errored, is left out of uplift. The notes count these.

Versions before this change compared the skill on the 32 failed tasks with unguided on all 91. That reported "+62.5 pts" for this run. The honest figure is at most +22 pts.

"Tasks fully passed" counts trials where every check passed. "Checks passed" includes MUST NOT checks, which an agent that does nothing also passes, so read it alongside the task rate. The results file keeps the per-mode figures for the trials that ran in `summary.byMode`, and the comparison in `summary.uplift`.

Below the main table, a guide-use table splits each guided mode's trials by how far the agent got into the guidance. From the same run:

```
| Mode  | Read guidance       | Looked, read none | Did not look     |
|-------|---------------------|-------------------|------------------|
| skill | 30 (20 passed, 67%) | 1 (0 passed, 0%)  | 1 (0 passed, 0%) |
```

- "Read guidance" retrieved guide text, or Context7 docs. "Looked, read none" loaded the skill or searched but retrieved nothing. "Did not look" never touched the guidance.
- Uplift depends on two things: how often the agent consults the guidance, and how much the guidance helps when it does. A failed guided trial that never read a guide says nothing about the guides.
- The pass rates per column are not the effect of reading. The agent chooses when to look, and harder tasks may make it look more.
- Older MCP results did not count search and retrieve calls apart. Their MCP trials show as "Not recorded".

Print the summary of any results file, old or new, without running anything:

```bash
pnpm bench summary results/2026-11-25-claude-code-claude-haiku-5-5-b52fbf.json
```

### Rerunning failed tasks

One failed trial can be noise. To check, run the tasks that failed again, several times each. `--rerun-failed` takes a results file and uses the tasks that failed in it as the task set. By default it picks unguided failures, runs only `unguided`, and has no cap.

This runs the 32 unguided failures of the change-record run 3 more times each, unguided (96 trials):

```bash
pnpm bench --rerun-failed results/2026-11-25-claude-code-claude-haiku-5-5-b52fbf.json --runs 3
```

Check the plan for free first. The dry run prints the task list, the trial count and the token estimate before it calibrates the graders:

```bash
pnpm bench --dry-run --rerun-failed results/2026-11-25-claude-code-claude-haiku-5-5-b52fbf.json --runs 3
```

Other options combine as usual:

- `--failed-mode skill` picks the tasks the skill failed, and runs them with the skill.
- `--modes unguided,skill` runs both modes on the failed tasks. Tasks solved unguided still skip the skill, unless you pass `--no-skip-solved`.
- `--trials <n>` sets a cap again.

A task counts as failed if any of its scored trials in that mode failed. Trials that errored, for example on a sign-in failure, are not failures.

When a task runs more than once, the summary adds a table of results per task across runs:

```
| Task   | Mode     | Passed     | Result          |
|--------|----------|------------|-----------------|
| task-a | unguided | 0/3 passed | consistent fail |
| task-b | unguided | 2/3 passed | flaky           |
| task-c | unguided | 3/3 passed | consistent pass |
unguided: 1 consistent fail, 1 flaky, 1 consistent pass.
```

A consistent fail is a real failure. A flaky task passes sometimes, so one failed trial says little about it. The rerun writes a new results file that records the file it reran in `harness.rerunOf`. It does not change the original file.

### Expected token cost

These figures come from the runs above, with Claude Haiku 5.5 in Claude Code. A trial used a median of 100,000 to 150,000 tokens unguided and about 225,000 with the skill or the MCP server, almost all of it prompt-cache reads. Output averaged 4,000 to 7,000 tokens per trial. Guided trials take more turns because they search and read guides. A trial that gets stuck can use far more: the largest unguided trial used 2.2 million tokens.

| Run | Most trials | Measured total tokens |
|---|---|---|
| Default | 5 | about 1 million (from the medians above) |
| `--full` on the pilot set | 20 | 3.5 million |
| `--trials 30 --modes unguided,skill,mcp` | 30 | 5.6 million |
| `--full --tasks change-records` | 182, fewer after skipping | 32 million (123 trials ran) |

Other agents and larger models will use different amounts.

## Results file

The run writes `benchmarks/results/<date>-<agent>-<model>-<id>.json`. It records:

- `agent`: id, CLI version, model and reasoning effort if set.
- `guidance`: skill version (`skill-version.txt` of the built skill), repository commit and guide count.
- `drupal`: core, Drush and PHP versions, install profile and recipes.
- `os`: platform, release and architecture.
- `harness`: task set, modes, runs, web access, timeout, trial cap, seed and whether solved tasks were skipped.
- `solvedUnguided[]`: the task and run of each task solved unguided, whose guided trials were skipped.
- `harness.context7`: for a run with `context7` mode, the server URL, library ID and whether a key was set.
- `harness.rerunOf`: for a rerun, the file it reran, the mode whose failures it picked and the task count.
- `summary`: `byMode` with pass rates over the trials that ran in each mode; `uplift` per guided mode over the same task runs, with the assumed passes, the upper-bound flag and the fixed-of-failed count; `guideUse` per guided mode, the scored trials that read guidance, only looked, or never looked, with how many of each fully passed; the solved-unguided count; and `consistency` when a task ran more than once.
- `trials[]`: task, mode, run, start time, the agent's exit code, duration, turns, tokens (input, output, cache reads, cache writes), cost when known, guidance calls (searches and retrievals through the CLI or MCP, all MCP calls, skill invocations), every check with its result and detail, and the trial's full diff against the base app.

The diff includes code, exported configuration (`config/sync/`) and the content manifest (`bench-state/content.json`). Diffs over 512 KB are truncated and flagged. Transcripts are saved under `benchmarks/results/.logs/` for your own inspection; they are gitignored and not part of a submission.

## Submitting results

1. Check the results file. It holds only the diff of what the agent changed in a throwaway Drupal site, and no credentials, but read it before you publish it.
2. Fork the repository, add the file under `benchmarks/results/` without renaming it, and open a pull request.
3. In the pull request, say which subscription or API tier you used and anything unusual about the run, such as timeouts or a task you skipped.

Do not edit results by hand. Maintainers re-grade every submission.

## Re-grading a submission (maintainers)

```bash
pnpm bench regrade results/<file>.json --out /tmp/regraded.json
```

For each trial, `regrade` copies a fresh base app, applies the recorded diff with `git apply`, runs `drush config:import` and `drush cache:rebuild`, and grades the site with the current graders. It prints a table of recorded versus re-graded scores and every check whose result changed, then the re-graded summary. Checks marked `regrade: 'recorded'` in a grader depend on content entities that a diff cannot recreate (a custom block, a user, a node with its menu link); for those the recorded result is kept and shown as recorded.

Re-grade after changing a grader to see how earlier submissions are affected, and re-grade new submissions before merging them. A submission recorded on a different Drupal version prints a warning.

## Dashboard

```bash
pnpm bench dashboard
```

This converts every file in `benchmarks/results/` into the upstream dashboard's job format under `engine/results/suites/` and starts the dashboard at http://localhost:8081. Each results file becomes one job per guided mode it has results for (`bench-<file>-skill`, `bench-<file>-mcp`, `bench-<file>-context7`), and `bench-all-<mode>` jobs pool every submission. A job includes only task runs with both an unguided and a guided result, so tasks solved unguided are not in it, and its pass rates cover the tasks that failed unguided. Each job's `evals.md` and `evals.json` (`benchmark.allTasks`) also give both modes over every task, with the same upper bound as the summary. Open a job at `http://localhost:8081/dashboard.html?source=local&testId=bench-all-skill`. The landing page still carries upstream's public view and does not list local jobs. Use `--export-only` to write the jobs without starting the server, and `--port` to change the port.

## Calibrating graders after changes

```bash
pnpm bench calibrate --tasks pilot
```

Add `--keep-sites` to keep the calibration sites for debugging. When you add a task, write `task.md`, `expectations.md`, `grader.ts` and `reference/solution.sh`, add the id to a suite, and calibrate it.

The harness unit tests call no model. `npm test` in `engine/` leaves out `src/harness/`, so run them from `engine/` with:

```bash
node --import tsx --test src/harness/bench/*.test.ts
```

## Things that can trip you up

- macOS keychain logins are not visible to the isolated agent. Use `claude setup-token` as described above.
- If the agent fails to sign in, the harness records that trial as errored, leaves it out of every pass rate, and stops the run. Do not submit that partial results file; set `CLAUDE_CODE_OAUTH_TOKEN` and run again.
- If PHP's SQLite is older than 3.45, Drupal 11 refuses to install. The dry run checks this.
- A guide import or `pnpm build` in `engine/` changes the guidance version mid-run. Build first and leave it alone while the benchmark runs; the results file records the skill version it found at the end.
- Each trial needs about 250 MB in the temp directory. On systems where `/tmp` is a small RAM disk, set `MDG_BENCH_TRIALS` to a folder on disk outside your home directory.
- The first `bench setup` downloads Drupal and its dependencies through Composer and can hit GitHub API rate limits; set `COMPOSER_AUTH` with a GitHub token if it does.
- The Codex runner is experimental and has not been run end to end.
