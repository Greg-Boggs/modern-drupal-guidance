import { getGuidesMap } from "./guide-validation.ts";
import { resolveInclude } from "./include.ts";
import { parseCoreConstraint, describeInterval, DrupalConstraintError } from "./drupal-version.ts";
import { supportedReleasesIn } from "./drupal-data.ts";
import { MACRO_PATTERN, CONSECUTIVE_MACRO_PATTERN, COMMENT_PATTERN, parseArguments, stripComments, maskComments } from "./macro-parsing.ts";

// Re-exported for convenience; the implementations live in the dependency-free ./macro-parsing.ts
export { MACRO_PATTERN, CONSECUTIVE_MACRO_PATTERN, COMMENT_PATTERN, parseArguments, stripComments, maskComments };

/** Build targets. `skills-cli` is the agent-facing CLI bundle; the site builds from guides/ directly. */
export type BuildTarget = 'skills-cli';

/** The CLI command agents run; GUIDE_REF output and SKILL.md use it. */
export const CLI_COMMAND = 'npx -y modern-drupal-guidance@latest';

export interface MacroOptions {
  target?: BuildTarget;
  includedFiles?: Set<string>;
  /** The guide's `drupal-core` frontmatter constraint. `DRUPAL_STATUS()` with no argument renders it. */
  drupalCore?: string;
}

type MacroHandler = (args: string[], filePath: string, options?: MacroOptions) => string;

export class MacroError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MacroError";
  }
}

/**
 * Renders a Drupal core range for agents, e.g.
 * `**Drupal core:** 10.3 to 11.x (\`^10.3 || ^11\`).`
 * When the `data/drupal/` dataset is present, the supported releases inside the range are appended.
 */
export function formatDrupalStatus(constraint: string): string {
  const intervals = parseCoreConstraint(constraint);
  const range = intervals.map(describeInterval).join(" or ");
  let out = `**Drupal core:** ${range} (\`${constraint.trim()}\`).`;
  const supported = supportedReleasesIn(intervals);
  if (supported) {
    out += supported.length > 0
      ? ` Currently supported releases in range: ${supported.join(", ")}.`
      : ` No currently supported release is in this range.`;
  }
  return out;
}

const MACRO_HANDLERS: Record<string, MacroHandler> = {
  INCLUDE: (args, filePath, options) => {
    const [rawArg] = args;
    if (!rawArg) {
      throw new MacroError(`Missing path in INCLUDE macro (${filePath}).`);
    }

    const result = resolveInclude(rawArg, filePath);
    if (!result.isValid) {
      throw new MacroError(`${result.errorMessage} (referenced in INCLUDE macro in ${filePath}).`);
    }
    if (result.content === undefined) {
      throw new MacroError(`Transcluded file or section not found: "${rawArg}" in ${filePath}.`);
    }

    if (result.absolutePath) {
      options?.includedFiles?.add(result.absolutePath);
    }

    // NOTE: no cycle detection. If files INCLUDE each other in a loop, this
    // will overflow the call stack. Add a visited set if it becomes a problem.
    return replaceMacros(result.content, result.absolutePath!, options);
  },
  GUIDE_REF: (args, filePath) => {
    const [guideId] = args;
    if (!guideId) {
      throw new MacroError(`Missing guide ID in GUIDE_REF macro (${filePath}).`);
    }
    const guideInfo = getGuidesMap().get(guideId);
    if (!guideInfo) {
      throw new MacroError(`Guide "${guideId}" not found (referenced in GUIDE_REF macro in ${filePath}).`);
    }
    return `\`${guideId}\` (via \`${CLI_COMMAND} retrieve "${guideId}"\`)`;
  },
  /**
   * `{{ DRUPAL_STATUS() }}` renders the guide's own `drupal-core` range.
   * `{{ DRUPAL_STATUS(">=11.1") }}` renders an explicit range, for a section that needs a newer core
   * than the rest of the guide.
   */
  DRUPAL_STATUS: (args, filePath, options) => {
    const constraint = (args[0] ?? options?.drupalCore ?? "").trim();
    if (!constraint) {
      throw new MacroError(`DRUPAL_STATUS needs a constraint argument or a "drupal-core" frontmatter field (${filePath}).`);
    }
    try {
      return formatDrupalStatus(constraint);
    } catch (e) {
      if (e instanceof DrupalConstraintError) {
        throw new MacroError(`${e.message} (referenced in DRUPAL_STATUS macro in ${filePath}).`);
      }
      throw e;
    }
  },
};

/** Names of the macros this engine expands. Unknown `{{ NAME(...) }}` patterns are left as-is. */
export const MACRO_NAMES = Object.keys(MACRO_HANDLERS);

/**
 * Internal helper to iterate over macros and call a processor.
 */
function processMacros(
  content: string,
  onMatch: (handler: MacroHandler, args: string[], match: string, name: string) => string | void
): string {
  return content.replace(MACRO_PATTERN, (match: string, name: string, argsString: string): string => {
    const handler = MACRO_HANDLERS[name];
    if (!handler) return match;

    const args = parseArguments(argsString);
    const result = onMatch(handler, args, match, name);
    return typeof result === 'string' ? result : match;
  });
}

/**
 * Validates all macros in markdown content.
 * @param content - The markdown content to validate
 * @param filePath - The path to the file (for error reporting)
 * @returns Array of validation errors
 */
export function validateMacros(content: string, filePath: string, options: MacroOptions = {}): string[] {
  const errors: string[] = [];
  processMacros(content, (handler, args, match) => {
    try {
      handler(args, filePath, options);
    } catch (err: any) {
      if (err instanceof MacroError) {
        errors.push(err.message);
      } else {
        errors.push(`Macro error in ${match}: ${err.message} (${filePath})`);
      }
    }
  });
  return errors;
}

export function replaceMacros(content: string, filePath: string, options: MacroOptions = {}): string {
  const stripped = stripComments(content);
  const normalized = stripped.replace(CONSECUTIVE_MACRO_PATTERN, "$1\n\n");
  return processMacros(normalized, (handler, args, match) => {
    try {
      return handler(args, filePath, options);
    } catch (err: any) {
      if (err instanceof MacroError) {
        throw err;
      }
      console.error(`Unexpected error processing macro ${match} in ${filePath}:`, err.message);
    }
  });
}
