---
name: the-contextual-links-to-id-contextual-id-to-links-functions
title: "The _contextual_links_to_id() & _contextual_id_to_links() functions are deprecated"
description: "The _contextual_links_to_id() & _contextual_id_to_links() functions are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3568088
change-record-nid: 3568088
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3568087](https://www.drupal.org/node/3568087)

The `_contextual_links_to_id()` & `_contextual_id_to_links()` functions are deprecated and their functionality has been moved to a new `Drupal\contextual\ContextualLinksSerializer` service.

### Before

```php
$variables['title_suffix']['contextual_links'] = [
  '#type' => 'contextual_links_placeholder',
  '#id' => _contextual_links_to_id($element['#contextual_links']),
];
...
$element = [
  '#type' => 'contextual_links',
  '#contextual_links' => _contextual_id_to_links($id),
];
```

### After

```php
use use Drupal\contextual\ContextualLinksSerializer;
...
// Inject when possible.
$service = \Drupal::service(ContextualLinksSerializer::class);

$variables['title_suffix']['contextual_links'] = [
  '#type' => 'contextual_links_placeholder',
  '#id' => $service->linksToId($element['#contextual_links']),
];
...
$element = [
  '#type' => 'contextual_links',
  '#contextual_links' => $service->idToLinks($id),
];
```

*Source: [The \_contextual_links_to_id() & \_contextual_id_to_links() functions are deprecated](https://www.drupal.org/node/3568088), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
