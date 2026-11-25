import { appendFileSync } from "fs";
import path from "path";
import { MDG_LOG_FILE } from "../core/constants.ts";

export function logToolResult(toolName: string, result: { id?: string; distance?: string | number; similarity?: string | number; count?: number }[]) {
  if (process.env.ENABLE_FILE_LOGGING !== 'true') {
    return;
  }
  try {
    const logDir = process.env.MDG_LOG_DIR || process.cwd();
    const logPath = path.join(logDir, MDG_LOG_FILE);
    const logEntry = {
      timestamp: new Date().toISOString(),
      tool: toolName,
      result
    };
    appendFileSync(logPath, JSON.stringify(logEntry) + "\n", "utf8");
  } catch (err) {
    console.error("Failed to log tool result:", err);
  }
}
