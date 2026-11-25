import { promises as fs, readFileSync, existsSync } from "fs";
import path from "path";
import { resolveSkillsCliDataDir } from "./data-dir.ts";

export { resolveSkillsCliDataDir };

export interface UseCase {
  id: string;
  description: string;
  category: string;
  /** Guide title (frontmatter `title` or H1). */
  title: string;
  /** The guide's `drupal-core` Composer constraint, e.g. ">=11.1". */
  drupalCore: string;
  tokenCount: number;
}

function loadUseCases(): UseCase[] {
  const dataDir = resolveSkillsCliDataDir();
  const guidesJsonPath = path.join(dataDir, 'gen/guides.json');
  if (!existsSync(guidesJsonPath)) {
    throw new Error(`guides.json not found at ${guidesJsonPath}. Run 'pnpm build' first.`);
  }
  return JSON.parse(readFileSync(guidesJsonPath, 'utf-8'));
}

let useCases: UseCase[] | null = null;

/** All published use cases, loaded lazily from gen/guides.json. */
export function getUseCases(): UseCase[] {
  return (useCases ??= loadUseCases());
}

export function getUseCase(useCaseId: string): UseCase | undefined {
  return getUseCases().find((u) => u.id === useCaseId);
}

export function getUseCasesByCategory(category?: string): UseCase[] {
  if (!category) return getUseCases();
  return getUseCases().filter((u) => u.category === category);
}

export async function getGuide(useCaseId: string): Promise<string | null> {
  const useCase = getUseCase(useCaseId);
  if (!useCase) return null;
  const dataDir = resolveSkillsCliDataDir();
  const filePath = path.join(dataDir, "guides", useCase.category, `${useCaseId}.md`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    // Re-throw real errors
    throw error;
  }
}

