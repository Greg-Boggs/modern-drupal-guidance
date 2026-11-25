/**
 * Central configuration for skills bundling and publishing.
 */
export interface StandaloneSkill {
  /** Unique name of the skill */
  name: string;
  /** Path to the SKILL.md file, relative to engine/ */
  sourcePath: string;
}

export interface MonoskillConfig {
  /** Name of the primary monoskill */
  name: string;
  /** Optional: categories or specific guides inside the guides directory to explicitly omit from vector store bundling */
  excludeFromBundling?: string[];
}

export interface SkillsConfiguration {
  monoskill: MonoskillConfig;
  standaloneSkills: StandaloneSkill[];
}

export const config: SkillsConfiguration = {
  monoskill: {
    name: "modern-drupal-guidance"
  },
  standaloneSkills: [
    // The primary skill. Its SKILL.md template lives in the engine, not in guides/.
    {
      name: "modern-drupal-guidance",
      sourcePath: "skill/SKILL.md"
    }
  ]
};
