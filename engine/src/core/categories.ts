/**
 * Display titles and ordering for guide categories.
 *
 * The source of truth for which categories exist is the directory tree under guides/
 * (and guides/CONTRIBUTING.md). This list only supplies titles and a stable order for
 * the categories the project starts with; a category directory not listed here still
 * builds, sorts after the listed ones, and gets a title derived from its slug.
 */
export interface CategoryEntry {
  slug: string;
  title: string;
}

export const CATEGORIES: readonly CategoryEntry[] = [
  { slug: 'module-development', title: 'Module Development' },
  { slug: 'configuration-and-recipes', title: 'Configuration and Recipes' },
  { slug: 'entities-and-fields', title: 'Entities and Fields' },
  { slug: 'theming-and-components', title: 'Theming and Components' },
  { slug: 'front-end-javascript', title: 'Front-end JavaScript' },
  { slug: 'form-api', title: 'Form API' },
  { slug: 'caching-and-performance', title: 'Caching and Performance' },
  { slug: 'security', title: 'Security' },
  { slug: 'testing', title: 'Testing' },
  { slug: 'composer-and-tooling', title: 'Composer and Tooling' },
  { slug: 'migration', title: 'Migration' },
  { slug: 'headless-and-apis', title: 'Headless and APIs' },
];

const CATEGORY_MAP = new Map<string, CategoryEntry>(CATEGORIES.map(cat => [cat.slug, cat]));
const CATEGORY_INDEX = new Map<string, number>(CATEGORIES.map((cat, index) => [cat.slug, index]));

const SMALL_WORDS = new Set(['and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'to', 'for']);
const ACRONYMS: Record<string, string> = { api: 'API', apis: 'APIs', js: 'JS', php: 'PHP', ui: 'UI', sdc: 'SDC', yaml: 'YAML', twig: 'Twig' };

/** "configuration-and-recipes" → "Configuration and Recipes". */
export function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w, i) => ACRONYMS[w] ?? (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

export function getCategoryTitle(slug: string): string {
  return CATEGORY_MAP.get(slug)?.title ?? titleFromSlug(slug);
}

/** Listed categories sort by list position; others sort after them, alphabetically by the caller. */
export function getCategoryIndex(slug: string): number {
  return CATEGORY_INDEX.get(slug) ?? CATEGORIES.length;
}

export function isKnownCategory(slug: string): boolean {
  return CATEGORY_MAP.has(slug);
}
