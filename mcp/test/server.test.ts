import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { resolveConfig, splitCommand, DEFAULT_CLI } from "../src/config.js";
import { createServer } from "../src/server.js";

const FAKE = fileURLToPath(new URL("../../test/fixtures/fake-cli.mjs", import.meta.url));

async function connect(env: NodeJS.ProcessEnv = {}) {
  const config = resolveConfig([], { MODERN_DRUPAL_GUIDANCE_CLI: FAKE, ...env });
  const [a, b] = InMemoryTransport.createLinkedPair();
  await createServer(config).connect(a);
  const client = new Client({ name: "test", version: "0" });
  await client.connect(b);
  return client;
}

const textOf = (r: any) => r.content[0].text as string;

test("config defaults to npx modern-drupal-guidance@latest", () => {
  const c = resolveConfig([], {});
  assert.equal(c.command, "npx");
  assert.deepEqual(c.baseArgs, ["-y", "modern-drupal-guidance@latest"]);
  assert.equal(DEFAULT_CLI, "npx -y modern-drupal-guidance@latest");
});

test("config accepts a local build path via env and --cli", () => {
  assert.deepEqual(resolveConfig([], { MODERN_DRUPAL_GUIDANCE_CLI: "/x/cli.js" }).baseArgs, ["/x/cli.js"]);
  assert.equal(resolveConfig([], { MODERN_DRUPAL_GUIDANCE_CLI: "/x/cli.js" }).command, process.execPath);
  assert.deepEqual(resolveConfig(["--cli", "node /a b/c.js"], {}).baseArgs, ["/a", "b/c.js"]);
  assert.deepEqual(splitCommand(`node "/a b/c.js"`), ["node", "/a b/c.js"]);
});

test("lists three tools with usage guidance", async () => {
  const client = await connect();
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((t) => t.name).sort(), ["list_guides", "retrieve_guides", "search_guides"]);
  assert.match(tools.find((t) => t.name === "search_guides")!.description!, /BEFORE writing|FIRST/);
});

test("search_guides returns id/description JSON", async () => {
  const client = await connect();
  const r = await client.callTool({ name: "search_guides", arguments: { query: "oop hooks" } });
  const data = JSON.parse(textOf(r));
  assert.equal(data[0].id, "oop-hooks");
  assert.ok(data[0].description);
});

test("retrieve_guides returns Markdown for several ids", async () => {
  const client = await connect();
  const r = await client.callTool({ name: "retrieve_guides", arguments: { ids: ["oop-hooks", "single-directory-components"] } });
  assert.match(textOf(r), /--- Guide for oop-hooks ---/);
  assert.match(textOf(r), /--- Guide for single-directory-components ---/);
});

test("retrieve_guides reports unknown ids as a tool error", async () => {
  const client = await connect();
  const r: any = await client.callTool({ name: "retrieve_guides", arguments: { ids: ["nope"] } });
  assert.equal(r.isError, true);
  assert.match(textOf(r), /Unknown guide: nope/);
});

test("list_guides returns every guide", async () => {
  const client = await connect();
  const r = await client.callTool({ name: "list_guides", arguments: {} });
  assert.equal(JSON.parse(textOf(r)).length, 2);
});

test("CLI failures surface as tool errors", async () => {
  process.env.FAKE_CLI_FAIL = "1";
  const client = await connect();
  let r: any;
  try {
    r = await client.callTool({ name: "search_guides", arguments: { query: "x" } });
  } finally {
    delete process.env.FAKE_CLI_FAIL;
  }
  assert.equal(r.isError, true);
  assert.match(textOf(r), /boom/);
});

test("each guide is a resource that can be read", async () => {
  const client = await connect();
  const { resources } = await client.listResources();
  assert.deepEqual(resources.map((r) => r.name), ["oop-hooks", "single-directory-components"]);
  const read = await client.readResource({ uri: resources[0].uri });
  assert.match((read.contents[0] as any).text, /--- Guide for oop-hooks ---/);
  assert.equal(read.contents[0].mimeType, "text/markdown");
});
