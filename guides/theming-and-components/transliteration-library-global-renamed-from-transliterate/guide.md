---
name: transliteration-library-global-renamed-from-transliterate
title: "transliteration library global renamed from transliterate to transliteration.transliterate"
description: "transliteration library global renamed from transliterate to transliteration.transliterate"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3625169
change-record-nid: 3625169
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3621277](https://www.drupal.org/node/3621277)

The transliteration JavaScript library is updated from 2.3.5 to 2.6.1.

The library no longer defines a global `transliterate()` function; it defines a global `transliteration` object with `transliterate()` and `slugify()` properties. Code that attaches the core/transliteration library and calls `transliterate(text, options)` must now call `transliteration.transliterate(text, options)` instead. The options are unchanged.

*Source: [transliteration library global renamed from transliterate to transliteration.transliterate](https://www.drupal.org/node/3625169), a Drupal core change record by [gábor hojtsy](https://www.drupal.org/user/4166) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
