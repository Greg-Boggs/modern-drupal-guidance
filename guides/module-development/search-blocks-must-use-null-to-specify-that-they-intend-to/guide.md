---
name: search-blocks-must-use-null-to-specify-that-they-intend-to
title: "Search blocks must use NULL to specify that they intend to use the default search page"
description: "Search blocks must use NULL to specify that they intend to use the default search page"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3463132
change-record-nid: 3463132
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3379725](https://www.drupal.org/node/3379725)

Previously, it was possible for a block using the `search_block_form` plugin to have the `page_id` setting be an empty string, which would signify that the block should use the default search page. For example:

```php
id: olivero_search_form_narrow
theme: olivero
region: primary_menu
weight: -4
plugin: search_form_block
settings:
  id: search_form_block
  label: 'Search form (narrow)'
  label_display: '0'
  provider: search
  page_id: '' <---- EMPTY STRING
```

As of [#3379725: Make Block config entities fully validatable](https://www.drupal.org/project/drupal/issues/3379725), this isn't allowed. To use the default search page, `page_id` has to be NULL:

```php
id: olivero_search_form_narrow
theme: olivero
region: primary_menu
weight: -4
plugin: search_form_block
settings:
  id: search_form_block
  label: 'Search form (narrow)'
  label_display: '0'
  provider: search
  page_id: null <---- EXPLICIT NULL
```

*Source: [Search blocks must use NULL to specify that they intend to use the default search page](https://www.drupal.org/node/3463132), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
