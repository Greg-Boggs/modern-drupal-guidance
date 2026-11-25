---
name: route-option-added-for-routes-designed-to-serve-htmx
title: "Route option added for routes designed to serve HTMX requests"
description: "Route option added for routes designed to serve HTMX requests"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3547745
change-record-nid: 3547745
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3544632](https://www.drupal.org/node/3544632)

A new route option `_htmx_route` is added. When this option is `TRUE`, the HTMX renderer created in [#3522597: Return only main content for selected htmx requests](https://www.drupal.org/project/drupal/issues/3522597) will be used to return a response that contains only the main content.

**Example**

```php
test_htmx.attachments.route_option:
  path: '/htmx-test-attachments/route-option'
  defaults:
    _title: 'Using _htmx_route option'
    _controller: '\Drupal\test_htmx\Controller\HtmxTestAttachmentsController::replace'
  requirements:
    _permission: 'access content'
  options:
    _htmx_route: TRUE
```

*Source: [Route option added for routes designed to serve HTMX requests](https://www.drupal.org/node/3547745), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
