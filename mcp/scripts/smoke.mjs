// Smoke test: spawn the built server over stdio against the fake CLI, list tools, run a search.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [fileURLToPath(new URL("dist/src/index.js", root))],
  env: { ...process.env, MODERN_DRUPAL_GUIDANCE_CLI: fileURLToPath(new URL("test/fixtures/fake-cli.mjs", root)) },
});
const client = new Client({ name: "smoke", version: "0" });
await client.connect(transport);
console.log("tools:", (await client.listTools()).tools.map((t) => t.name).join(", "));
const r = await client.callTool({ name: "search_guides", arguments: { query: "oop hooks" } });
console.log("search:", r.content[0].text);
console.log("resources:", (await client.listResources()).resources.map((x) => x.uri).join(", "));
await client.close();
