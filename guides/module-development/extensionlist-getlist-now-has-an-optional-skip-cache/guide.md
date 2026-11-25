---
name: extensionlist-getlist-now-has-an-optional-skip-cache
title: "ExtensionList ::getList() now has an optional $skip_cache argument"
description: "ExtensionList ::getList() now has an optional $skip_cache argument"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3588598
change-record-nid: 3588598
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3588490](https://www.drupal.org/node/3588490)

`ExtensionList::getList()` now has a new, optional, `$skip_cache = FALSE` argument. When this argument is passed, both persistent and static caching will be bypassed and the list of extensions will be recalculated from the file-system. Note that as well as bypassing the cache, this also does not update the cache either, although it will populate the static cache so that subsequent calls on the same page will use the freshed possible information.

This can be used in situations that previously would have invalidated the cache in order to get a full list of available extensions:

Before:

```php
    // Get all available themes.
    $themes = $this->themeExtensionList->reset()->getList();
```

After:

```php
    // Get all available themes.
    $themes = $this->themeExtensionList->getList(TRUE);
```

*Source: [ExtensionList ::getList() now has an optional $skip_cache argument](https://www.drupal.org/node/3588598), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
