---
name: migrate-process-plugins-for-legacy-upgrade-are-deprecated
title: "Migrate process plugins for legacy upgrade are deprecated"
description: "Migrate process plugins for legacy upgrade are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533560
change-record-nid: 3533560
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3502755](https://www.drupal.org/node/3502755)

The following migration process plugins are deprecated and will be removed in Drupal 12.0. There is no replacement. These plugins are designed specifically for migration from legacy Drupal sites.

#### Deprecated

1. core/modules/block/src/Plugin/migrate/process/BlockPluginId.php
2. core/modules/block/src/Plugin/migrate/process/BlockRegion.php
3. core/modules/block/src/Plugin/migrate/process/BlockSettings.php
4. core/modules/block/src/Plugin/migrate/process/BlockTheme.php
5. core/modules/block/src/Plugin/migrate/process/BlockVisibility.php
6. core/modules/block/src/Plugin/migrate/process/RolesLookup.php
7. core/modules/field/src/Plugin/migrate/process/d6/FieldFormatterSettingsDefaults.php
8. core/modules/field/src/Plugin/migrate/process/d6/FieldInstanceDefaults.php
9. core/modules/field/src/Plugin/migrate/process/d6/FieldInstanceOptionTranslation.php
10. core/modules/field/src/Plugin/migrate/process/d6/FieldInstanceSettings.php
11. core/modules/field/src/Plugin/migrate/process/d6/FieldInstanceWidgetSettings.php
12. core/modules/field/src/Plugin/migrate/process/d6/FieldOptionTranslation.php
13. core/modules/field/src/Plugin/migrate/process/d6/FieldSettings.php
14. core/modules/field/src/Plugin/migrate/process/d6/FieldTypeDefaults.php
15. core/modules/field/src/Plugin/migrate/process/d7/FieldBundle.php
16. core/modules/field/src/Plugin/migrate/process/d7/FieldInstanceDefaults.php
17. core/modules/field/src/Plugin/migrate/process/d7/FieldInstanceOptionTranslation.php
18. core/modules/field/src/Plugin/migrate/process/d7/FieldInstanceSettings.php
19. core/modules/field/src/Plugin/migrate/process/d7/FieldOptionTranslation.php
20. core/modules/field/src/Plugin/migrate/process/d7/FieldSettings.php
21. core/modules/field/src/Plugin/migrate/process/d7/FieldTypeDefaults.php
22. core/modules/file/src/Plugin/migrate/process/d6/FieldFile.php
23. core/modules/file/src/Plugin/migrate/process/d6/FileUri.php
24. core/modules/filter/src/Plugin/migrate/process/FilterID.php
25. core/modules/filter/src/Plugin/migrate/process/FilterSettings.php
26. core/modules/filter/src/Plugin/migrate/process/d6/FilterFormatPermission.php
27. core/modules/image/src/Plugin/migrate/process/d6/ImageCacheActions.php
28. core/modules/language/src/Plugin/migrate/process/ContentTranslationEnabledSetting.php
29. core/modules/language/src/Plugin/migrate/process/LanguageDomains.php
30. core/modules/language/src/Plugin/migrate/process/LanguageNegotiation.php
31. core/modules/language/src/Plugin/migrate/process/LanguageTypes.php
32. core/modules/link/src/Plugin/migrate/process/FieldLink.php
33. core/modules/node/src/Plugin/migrate/process/d6/NodeUpdate7008.php
34. core/modules/path/src/Plugin/migrate/process/PathSetTranslated.php
35. core/modules/responsive_image/src/Plugin/migrate/process/ImageStyleMappings.php
36. core/modules/search/src/Plugin/migrate/process/SearchConfigurationRankings.php
37. core/modules/system/src/Plugin/migrate/process/d6/SystemUpdate7000.php
38. core/modules/system/src/Plugin/migrate/process/d6/TimeZone.php
39. core/modules/taxonomy/src/Plugin/migrate/process/TargetBundle.php
40. core/modules/user/src/Plugin/migrate/process/ConvertTokens.php
41. core/modules/user/src/Plugin/migrate/process/ProfileFieldSettings.php
42. core/modules/user/src/Plugin/migrate/process/UserLangcode.php
43. core/modules/user/src/Plugin/migrate/process/UserUpdate8002.php
44. core/modules/user/src/Plugin/migrate/process/d6/ProfileFieldOptionTranslation.php
45. core/modules/user/src/Plugin/migrate/process/d6/UserUpdate7002.php

#### Update

The `Timezone` and `UserLangcode` classes are restored and moved to the `migrate` module. See [Migration plugins link_options, link_uri, timezone, and user_langcode are moved to the Migrate module](https://www.drupal.org/node/3572239).

*Source: [Migrate process plugins for legacy upgrade are deprecated](https://www.drupal.org/node/3533560), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
