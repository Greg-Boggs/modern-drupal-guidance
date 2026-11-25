---
name: url-createfromrequest-does-not-ignore-query-parameters
title: "Url::createFromRequest does not ignore query parameters anymore"
description: "Url::createFromRequest does not ignore query parameters anymore"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3522346
change-record-nid: 3522346
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2985400](https://www.drupal.org/node/2985400)

When creating a URL object via `\Drupal\Core\Url::createFromRequest()`, you do not need to set the missing query parameters via `setOption` anymore.

**Before**

```php
    $request = \Symfony\Component\HttpFoundation\Request::create('/node', 'GET');
    $url = \Drupal\Core\Url::createFromRequest($request);
    // Hack.
    $url->setOption('query', $request->query->all());
```

**After**

```php
    $request = \Symfony\Component\HttpFoundation\Request::create('/node', 'GET');
    $url = \Drupal\Core\Url::createFromRequest($request);
    // No hack anymore \o/.
```

*Source: [Url::createFromRequest does not ignore query parameters anymore](https://www.drupal.org/node/3522346), a Drupal core change record by [tobiasb](https://www.drupal.org/user/183956) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
