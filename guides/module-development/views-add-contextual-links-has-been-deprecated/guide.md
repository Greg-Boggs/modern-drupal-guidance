---
name: views-add-contextual-links-has-been-deprecated
title: "views_add_contextual_links() has been deprecated"
description: "views_add_contextual_links() has been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3382344
change-record-nid: 3382344
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2571679](https://www.drupal.org/node/2571679)

The ` views_add_contextual_links()` function has been deprecated.

Use `Drupal\views\ContextualLinks::addLinks()` instead.

#### Before

```php
views_add_contextual_links($element, 'view', $view->current_display);
```

#### After

```php
use Drupal\views\ContextualLinksHelper;
...
\Drupal::service(ContextualLinksHelper::class)->addLinks($element, 'view', $view->current_display);
```

*Source: [views_add_contextual_links() has been deprecated](https://www.drupal.org/node/3382344), a Drupal core change record by [narendrar](https://www.drupal.org/user/1730192) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
