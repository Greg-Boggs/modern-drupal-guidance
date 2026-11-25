---
name: i18nquerytrait-is-moved-from-content-translation-to-migrate
title: "I18nQueryTrait is moved from content_translation to migrate_drupal module"
description: "I18nQueryTrait is moved from content_translation to migrate_drupal module"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3439256
change-record-nid: 3439256
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3258581](https://www.drupal.org/node/3258581)

`Drupal\content_translation\Plugin\migrate\source\I18nQueryTrait` is deprecated and will be removed in Drupal 12. Instead, use `Drupal\migrate_drupal\Plugin\migrate\source\I18nQueryTrait`.

The \`I18nQueryTrait\` in the \`content_translation\` module, which was deprecated in Drupal 11.2.x, has been moved to the \`migrate_drupal\` module. The trait is now available at \`Drupal\migrate_drupal\Plugin\migrate\source\I18nQueryTrait\`. It will be removed from the \`content_translation\` module in Drupal 12.0.0.

Module developers should update their code to use the new location in the \`migrate_drupal\` module. The functionality provided by the trait remains the same, but its location has changed to better align with migration-focused modules.

*Source: [I18nQueryTrait is moved from content_translation to migrate_drupal module](https://www.drupal.org/node/3439256), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
