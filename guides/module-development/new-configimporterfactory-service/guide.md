---
name: new-configimporterfactory-service
title: "New ConfigImporterFactory service"
description: "New ConfigImporterFactory service"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3394638
change-record-nid: 3394638
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3123491](https://www.drupal.org/node/3123491)

A new service, `Drupal\Core\Config\ConfigImporterFactory::class` has been added which allows creation of a ConfigImporter object.

This should be used rather than instantiating the ConfigImporter class directly.

Before:

```php
$config_importer = new ConfigImporter(
  $storage_comparer,
  \Drupal::service('event_dispatcher'),
  \Drupal::service('config.manager'),
  \Drupal::service('lock.persistent'),
  \Drupal::service('config.typed'),
  \Drupal::service('module_handler'),
  \Drupal::service('module_installer'),
  \Drupal::service('theme_handler'),
  \Drupal::service('string_translation'),
  \Drupal::service('extension.list.module'),
  \Drupal::service('extension.list.theme')
);
```

After:

```php
$config_importer = \Drupal::service(Drupal\Core\Config\ConfigImporterFactory::class)->get($storage_comparer);
```

*Source: [New ConfigImporterFactory service](https://www.drupal.org/node/3394638), a Drupal core change record by [joachim](https://www.drupal.org/user/107701) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
