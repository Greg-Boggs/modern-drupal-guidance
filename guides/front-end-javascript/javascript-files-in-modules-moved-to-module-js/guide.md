---
name: javascript-files-in-modules-moved-to-module-js
title: "JavaScript files in modules moved to module/js"
description: "JavaScript files in modules moved to module/js"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3471539
change-record-nid: 3471539
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#2484623](https://www.drupal.org/node/2484623)

All JavaScript files in modules are in a `js` directory, `core/modules/module_name/js`.

The following files were moved to a `js` directory.

| From | To |
| --- | --- |
| core/modules/comment/comment-entity-form.js | core/modules/comment/js/comment-entity-form.js |
| core/modules/content_translation/content_translation_admin.js | core/modules/content_translation/js/content_translation.admin.js |
| core/modules/file/file.js | core/modules/file/js/file.js |
| core/modules/filter/filter.admin.js | core/modules/filter/js/filter.admin.js |
| core/modules/filter/filter.js | core/modules/filter/js/filter.js |
| core/modules/language/language.admin.js | core/modules/language/js/language.admin.js |
| core/modules/locale/locale.admin.js | core/modules/locale/js/locale.admin.js |
| core/modules/menu_ui/menu_ui.js | core/modules/menu_ui/js/menu_ui.js |
| core/modules/menu_ui/menu_ui.admin.js | core/modules/menu_ui/js/menu_ui.admin.js |
| core/modules/node/node.js | core/modules/node/js/node.js |
| core/modules/node/node.preview.js | core/modules/node/js/node.preview.js |
| core/modules/node/content_types.js | core/modules/node/js/content_types.js |
| core/modules/path/path.js | core/modules/path/js/path.js |
| core/modules/taxonomy/taxonomy.js | core/modules/taxonomy/js/taxonomy.js |
| core/modules/text/text.js | core/modules/text/js/text.js |
| core/modules/user/user.js | core/modules/user/js/user.js |
| core/modules/user/user.permissions.js | core/modules/user/js/user.permissions.js |
| core/modules/user/user.theme.js | core/modules/user/js/user.theme.js |
| core/modules/views/tests/modules/views_test_data/views_cache.test.js | core/modules/views/tests/modules/views_test_data/js/views_cache.test.js |

*Source: [JavaScript files in modules moved to module/js](https://www.drupal.org/node/3471539), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
