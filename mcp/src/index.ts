#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { resolveConfig } from "./config.js";
import { createServer } from "./server.js";

const config = resolveConfig(process.argv.slice(2));
await createServer(config).connect(new StdioServerTransport());
console.error(`modern-drupal-guidance MCP server ready (cli: ${[config.command, ...config.baseArgs].join(" ")})`);
