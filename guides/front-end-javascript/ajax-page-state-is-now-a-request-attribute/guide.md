---
name: ajax-page-state-is-now-a-request-attribute
title: "AJAX page state is now a request attribute"
description: "AJAX page state is now a request attribute"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3569876
change-record-nid: 3569876
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3555532](https://www.drupal.org/node/3555532)

The `ajax_page_state` query parameter or request key holds information about previously loaded libraries, so that AJAX requests only add new libraries that are needed.

This is usually transparent and handled automatically, but following changes upstream in Symfony the `ajax_page_state` is added as a request attribute in early middleware. Any code that previously looked in the query string or request directly for the state should now look in the request attributes instead.

Previously:

```php
$ajax_page_state = $request->get('ajax_page_state');
// or
$ajax_page_state = $request->query->get('ajax_page_state');
```

Becomes:

```php
$ajax_page_state = $request->attributes->get('ajax_page_state');
```

*Source: [AJAX page state is now a request attribute](https://www.drupal.org/node/3569876), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
