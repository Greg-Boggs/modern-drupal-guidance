import { getGuide, getUseCase, type UseCase } from "./guides.ts";
import { logToolResult } from "./logger.ts";
import { resolveCoreTarget, type CoreTarget } from "../core/mdgrc.ts";
import { parseCoreConstraint, satisfies, describeConstraint } from "../core/drupal-version.ts";

/**
 * Banner prepended to a retrieved guide that tells the agent how the project's target core
 * version relates to the guide's `drupal-core` range. Empty when no target is known.
 */
export function formatCoreTargetBanner(useCase: Pick<UseCase, "id" | "drupalCore">, target: CoreTarget | null): string {
  if (!target || !useCase.drupalCore) return "";
  let intervals;
  let range: string;
  try {
    intervals = parseCoreConstraint(useCase.drupalCore);
    range = describeConstraint(useCase.drupalCore);
  } catch {
    return "";
  }
  const where = `\`${target.source}\``;
  if (satisfies(target.version, intervals)) {
    return `> [!NOTE]\n> **Project target: Drupal core ${target.display}** (from ${where}). This guide applies to ${range} (\`${useCase.drupalCore}\`), so use its main approach.\n\n`;
  }
  const below = target.version[0] < intervals[0].min[0] ||
    (target.version[0] === intervals[0].min[0] && target.version[1] < intervals[0].min[1]);
  if (below) {
    return `> [!IMPORTANT]\n> **Project target: Drupal core ${target.display}** (from ${where}) is older than this guide's range, ${range} (\`${useCase.drupalCore}\`). Use the guide's fallback for older core versions. Do not raise \`core_version_requirement\` or the \`drupal/core\` constraint to reach the newer API unless the user asks.\n\n`;
  }
  return `> [!IMPORTANT]\n> **Project target: Drupal core ${target.display}** (from ${where}) is outside this guide's range, ${range} (\`${useCase.drupalCore}\`). The API it describes may be deprecated or removed in your target; search for the current replacement before using it.\n\n`;
}

export async function retrieveUseCase(useCaseId: string, options?: { cwd?: string }): Promise<string> {
  const useCase = getUseCase(useCaseId);
  if (!useCase) {
    throw new Error(`No guide found for use case: ${useCaseId}`);
  }

  const guide = await getGuide(useCaseId);
  if (!guide) {
    throw new Error(`No guide found for use case: ${useCaseId}`);
  }

  logToolResult("retrieve", [{ id: useCaseId }]);

  let target: CoreTarget | null = null;
  try {
    target = resolveCoreTarget(options?.cwd);
  } catch {
    // An unreadable .mdgrc or composer file must not block retrieval.
    target = null;
  }
  return formatCoreTargetBanner(useCase, target) + guide;
}
