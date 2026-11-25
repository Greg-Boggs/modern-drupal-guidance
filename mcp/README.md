# Modern Drupal Guidance MCP server

An [MCP](https://modelcontextprotocol.io) server (stdio) that gives MCP clients the Modern Drupal Guidance guides. It wraps the `modern-drupal-guidance` CLI, so search and retrieval behave exactly like the CLI and the Agent Skill.

## Tools

| Tool | When the agent should call it |
|---|---|
| `search_guides` | First, before writing or changing Drupal code. Takes `query` (2-5 word English). Returns `[{ "id", "description" }]`. |
| `retrieve_guides` | After a search match. Takes `ids` (array). Returns the guide Markdown. |
| `list_guides` | Only when search finds nothing after one rephrase, or for a broad audit. Returns every `{ id, description }`. |

Each guide is also an MCP resource at `drupal-guide://<id>` (`text/markdown`), listed through `resources/list`, for clients that let users attach resources.

## Configuration

The server runs the CLI for every call. The command defaults to:

```
npx -y modern-drupal-guidance@latest
```

Override it with the `MODERN_DRUPAL_GUIDANCE_CLI` environment variable or a `--cli` argument (the flag wins). The value is a command line, or a path to a local build; a single path ending in `.js`, `.mjs`, `.cjs` or `.ts` runs with the current Node.

```sh
MODERN_DRUPAL_GUIDANCE_CLI=/path/to/engine/dist/cli.js
MODERN_DRUPAL_GUIDANCE_CLI="pnpm --dir /path/to/engine exec modern-drupal-guidance"
```

`MODERN_DRUPAL_GUIDANCE_TIMEOUT_MS` sets the per-call timeout (default 120000; the first `npx` run downloads the package).

## Install

The package is not published yet. Until it is, build it and point clients at the built file:

```sh
cd mcp && npm install && npm run build   # produces dist/src/index.js
```

Once published, replace `node /abs/path/to/mcp/dist/src/index.js` with `npx -y modern-drupal-guidance-mcp@latest` in every snippet below.

### Claude Code

```sh
claude mcp add modern-drupal-guidance -- node /abs/path/to/mcp/dist/src/index.js
```

Add `-e MODERN_DRUPAL_GUIDANCE_CLI=/path/to/cli.js` to use a local engine build.

### Claude Desktop

Edit `claude_desktop_config.json` (Settings, Developer, Edit Config):

```json
{
  "mcpServers": {
    "modern-drupal-guidance": {
      "command": "node",
      "args": ["/abs/path/to/mcp/dist/src/index.js"]
    }
  }
}
```

### Cursor

`.cursor/mcp.json` in the project, or `~/.cursor/mcp.json` for all projects:

```json
{
  "mcpServers": {
    "modern-drupal-guidance": {
      "command": "node",
      "args": ["/abs/path/to/mcp/dist/src/index.js"]
    }
  }
}
```

### VS Code

`.vscode/mcp.json` (note the `servers` key):

```json
{
  "servers": {
    "modern-drupal-guidance": {
      "type": "stdio",
      "command": "node",
      "args": ["/abs/path/to/mcp/dist/src/index.js"]
    }
  }
}
```

Or run `code --add-mcp '{"name":"modern-drupal-guidance","command":"node","args":["/abs/path/to/mcp/dist/src/index.js"]}'`.

Add this to `AGENTS.md`, `CLAUDE.md` or Cursor rules so agents use it: "Before writing Drupal code, call `search_guides` from the modern-drupal-guidance MCP server, then `retrieve_guides` for matches."

## Develop

```sh
npm install
npm test        # builds, then runs node:test against test/fixtures/fake-cli.mjs
npm run smoke   # spawns the built server over stdio, lists tools and runs a search
npx @modelcontextprotocol/inspector node dist/src/index.js   # interactive
```

Tests never touch the real engine: `test/fixtures/fake-cli.mjs` mimics the CLI interface (`search`, `retrieve`, `list`) with fixture guides. To check against the real engine, set `MODERN_DRUPAL_GUIDANCE_CLI` and run `npm run smoke`.

## Waiting on the engine

- The CLI package name `modern-drupal-guidance` and its published `@latest` do not exist yet; the default only works after the engine publishes.
- Output formats were taken from upstream: `search` and `list` print a JSON array of `{ id, description }`; `retrieve` prints `--- Guide for <id> ---` sections. Re-check once `engine/README.md` documents the fork's interface.
- Upstream gates some guides on `retrieve` (origin trial and volatile features); the server returns the CLI's error text as a tool error.
- Not yet run against a real engine build.
