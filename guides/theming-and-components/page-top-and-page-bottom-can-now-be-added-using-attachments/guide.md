---
name: page-top-and-page-bottom-can-now-be-added-using-attachments
title: "page_top and page_bottom can now be added using attachments on a page's main content"
description: "page_top and page_bottom can now be added using attachments on a page's main content"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3558616
change-record-nid: 3558616
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3339905](https://www.drupal.org/node/3339905)

Before this change, `hook_page_top` and `hook_page_bottom` were the only way to inject content into the top and bottom of a page. Now it is possible to add this content directly from a Controller using the `#attached` key.

**Before:**

```php
  /**
   * Implements hook_page_top().
   */
  #[Hook('page_top')]
  public function pageTop(array &$page_top): void {
    if ($this->routeMatch->getRouteName() == 'my_route') {
      $page_top['my_content'] = [
        '#markup' => '<p>Hello world</p>,
      ];
    }
  }
```

**After:**

```php
// In the controller for my_route:
$build['#attached']['page_top']['my_module'] = [
  '#markup' => '<p>Hello world</p>,
];
```

*Source: [page_top and page_bottom can now be added using attachments on a page's main content](https://www.drupal.org/node/3558616), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
