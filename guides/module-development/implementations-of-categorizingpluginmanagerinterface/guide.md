---
name: implementations-of-categorizingpluginmanagerinterface
title: "Implementations of CategorizingPluginManagerInterface:: getSortedDefinitions() and :: getGroupedDefinitions() require a $labelKey argument"
description: "Implementations of CategorizingPluginManagerInterface:: getSortedDefinitions() and :: getGroupedDefinitions() require a $labelKey argument"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567811
change-record-nid: 3567811
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3520730](https://www.drupal.org/node/3520730)

The signature of CategorizingPluginManagerInterface:: getSortedDefinitions() and :: getGroupedDefinitions() implementations will require a $labelKey argument in Drupal 12. This is to align the interface to the current real usage.

The $labelKey argument indicates the label to use for sorting/grouping plugins.

```php
public function getGroupedDefinitions(?array $definitions = NULL, string $label_key = 'label');
public function getSortedDefinitions(?array $definitions = NULL, string $label_key = 'label');
```

*Source: [Implementations of CategorizingPluginManagerInterface:: getSortedDefinitions() and :: getGroupedDefinitions() require a $labelKey argument](https://www.drupal.org/node/3567811), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
