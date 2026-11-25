---
name: archive-glossary-and-recent-content-block-views-were-removed
title: "Archive, glossary and recent content block views were removed"
description: "Archive, glossary and recent content block views were removed"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3614831
change-record-nid: 3614831
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3589894](https://www.drupal.org/node/3589894)

The legacy demonstration views (post archive, glossary and recent content block) previously shipped with the Node module have been removed from the default configuration. Originally included to showcase Views capabilities, these unused views unnecessarily cluttered the UI, added parsing overhead, and forced administrators of non-blog sites to manually delete them. By removing these use-case-specific views from the standard installation, we simplified the Views interface and streamlined the out-of-the-box experience.

All three views were retained internally for testing purposes inside test modules so the underlying functionality to create glossaries, grouped archives, etc. are still tested.

*Source: [Archive, glossary and recent content block views were removed](https://www.drupal.org/node/3614831), a Drupal core change record by [gábor hojtsy](https://www.drupal.org/user/4166) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
