---
name: htmx-requests-may-be-configured-to-use-the-drupal-htmx
title: "HTMX requests may be configured to use the drupal_htmx wrapper format"
description: "HTMX requests may be configured to use the drupal_htmx wrapper format"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3558614
change-record-nid: 3558614
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3546105](https://www.drupal.org/node/3546105)

A new `onlyMainContent()` method is available in `Drupal\Core\Htmx\Htmx`. This method adds a data attribute which causes the HTMX request to use the `drupal_htmx` wrapper format paramter. When this parameter is present, Drupal only returns the main content, excluding header, footers, etc.

Return the full page with all regions and block on the page.

```php
    (new Htmx())
      ->post($form_url)
      ->select('[data-export-wrapper]')
      ->target('[data-export-wrapper]')
```

Only return the main content without any extra data from the blocks and regions around the content.

```php
    (new Htmx())
      ->post($form_url)
      ->onlyMainContent()
      ->select('[data-export-wrapper]')
      ->target('[data-export-wrapper]')
```

When the new method is used, a special `data-hx-drupal-only-main-content` data attribute will be added. When this attribute is present on an HTMX enhanced element, the query parameter for the `drupal_htmx` wrapper format created in [#3522597: Return only main content for selected htmx requests](https://www.drupal.org/project/drupal/issues/3522597) will be added to HTMX requests prepared by Drupal.

*Source: [HTMX requests may be configured to use the drupal_htmx wrapper format](https://www.drupal.org/node/3558614), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
