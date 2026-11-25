---
name: use-the-gettoolkitid-method-instead-of-the-toolkitid
title: "Use the getToolkitId() method instead of the toolkitId property when in an ImageFactory subclass"
description: "Use the getToolkitId() method instead of the toolkitId property when in an ImageFactory subclass"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3541926
change-record-nid: 3541926
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3533322](https://www.drupal.org/node/3533322)

The toolkitId property in ImageFactory is no longer initialized in the constructor but instead only when accessed.

Subclasses should call getToolkitId():

Before:

```php
$this->toolkitId
```

After:

```php
$this->getToolkitId()
```

The getToolkitId() method has existed since Drupal 8.0.

*Source: [Use the getToolkitId() method instead of the toolkitId property when in an ImageFactory subclass](https://www.drupal.org/node/3541926), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
