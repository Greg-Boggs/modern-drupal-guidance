---
name: add-ajax-command-to-views-module-that-sets-the-browser-url
title: "Add AJAX command to Views module that sets the browser URL without refreshing the page"
description: "Add AJAX command to Views module that sets the browser URL without refreshing the page"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3552223
change-record-nid: 3552223
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#343535](https://www.drupal.org/node/343535)

The views module has an AJAX command that allows code to set the browser URL without reloading the page.

```php
        use Drupal\views\Ajax\SetBrowserUrl;

        /** @var \Drupal\Core\Url $url */
        /** @var \Drupal\Core\Ajax\AjaxResponse $response */
        $response->addCommand(new SetBrowserUrl($url->toString()));
```

*Source: [Add AJAX command to Views module that sets the browser URL without refreshing the page](https://www.drupal.org/node/3552223), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
