import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Config } from "./config.js";
import { CliError, listGuides, retrieveGuides, searchGuides } from "./cli.js";

export const SERVER_INSTRUCTIONS = `Modern Drupal Guidance supplies short, current guides for Drupal 10 and 11 development. Training data is dominated by Drupal 7 and 8 patterns (procedural hooks, annotations, \\Drupal:: calls in services, drupal_set_message()), so call search_guides BEFORE writing or changing Drupal PHP, Twig, YAML or JS, then retrieve_guides for matches.`;

const SEARCH_DESCRIPTION = `Search Modern Drupal Guidance for current best practices. Call this FIRST, before writing or modifying Drupal code (modules, themes, recipes, config, Twig, JS behaviors, tests), because Drupal APIs change quickly and training data favors obsolete Drupal 7/8 patterns.

Use a 2-5 word, action-oriented English query for ONE Drupal capability (e.g. "oop hooks attribute", "single directory component", "cache metadata render array"). Omit project, module and file names. Split multi-feature tasks into separate searches. When the prompt implies a Drupal mechanism without naming it, search for that mechanism (e.g. "react to entity save" -> "entity hooks").

Returns JSON [{ "id", "description" }]. If a description matches, call retrieve_guides directly; do not also call list_guides. If results are empty or unrelated, rephrase once with the concrete Drupal noun (service, plugin, hook, form, block, SDC), then fall back to list_guides. If nothing applies, proceed without retrieving unrelated guides.

Do NOT use for generic PHP, Composer, hosting, CI/CD or non-Drupal work.`;

const RETRIEVE_DESCRIPTION = `Retrieve the full Markdown of one or more Modern Drupal Guidance guides by id. Call this after search_guides or list_guides returns a relevant id, and before writing the code. Include both the specific use-case guide and any broader discipline guide that applies. Pass several ids at once rather than calling repeatedly.

Each guide states the Drupal core versions it applies to and gives fallbacks for older supported versions: follow them. Cross-check your implementation against the guide before finishing, and apply the guide's rules without adding features the user did not ask for. Only use ids returned by search_guides or list_guides; never guess ids.`;

const LIST_DESCRIPTION = `List every available Modern Drupal Guidance guide as JSON [{ "id", "description" }]. Prefer search_guides. Use this only when search returned nothing useful after one rephrase, or for a broad audit of a module or theme where no single capability is named. The output is large; do not call it by default.`;

function text(t: string) {
  return { content: [{ type: "text" as const, text: t }] };
}

function fail(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  return { isError: true, content: [{ type: "text" as const, text: msg }] };
}

export function createServer(config: Config, version = "0.1.0"): McpServer {
  const server = new McpServer(
    { name: "modern-drupal-guidance", version },
    { instructions: SERVER_INSTRUCTIONS },
  );
  const ro = { readOnlyHint: true, openWorldHint: false } as const;

  server.registerTool(
    "search_guides",
    {
      title: "Search Drupal guides",
      description: SEARCH_DESCRIPTION,
      inputSchema: { query: z.string().min(1).describe("2-5 word English query for one Drupal capability") },
      annotations: ro,
    },
    async ({ query }) => {
      try {
        return text(JSON.stringify(await searchGuides(config, query), null, 2));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "retrieve_guides",
    {
      title: "Retrieve Drupal guides",
      description: RETRIEVE_DESCRIPTION,
      inputSchema: { ids: z.array(z.string().min(1)).min(1).describe("Guide ids from search_guides or list_guides") },
      annotations: ro,
    },
    async ({ ids }) => {
      try {
        return text(await retrieveGuides(config, ids));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "list_guides",
    { title: "List Drupal guides", description: LIST_DESCRIPTION, inputSchema: {}, annotations: ro },
    async () => {
      try {
        return text(JSON.stringify(await listGuides(config), null, 2));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerResource(
    "guide",
    new ResourceTemplate("drupal-guide://{id}", {
      list: async () => ({
        resources: (await listGuides(config)).map((g) => ({
          uri: `drupal-guide://${encodeURIComponent(g.id)}`,
          name: g.id,
          description: g.description,
          mimeType: "text/markdown",
        })),
      }),
    }),
    { title: "Modern Drupal Guidance guide", mimeType: "text/markdown" },
    async (uri, { id }) => {
      const gid = decodeURIComponent(Array.isArray(id) ? id[0] : id);
      try {
        return { contents: [{ uri: uri.href, mimeType: "text/markdown", text: await retrieveGuides(config, [gid]) }] };
      } catch (e) {
        throw e instanceof CliError ? e : new Error(String(e));
      }
    },
  );

  return server;
}
