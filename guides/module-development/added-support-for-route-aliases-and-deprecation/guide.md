---
name: added-support-for-route-aliases-and-deprecation
title: "Added support for route aliases and deprecation"
description: "Added support for route aliases and deprecation"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3317784
change-record-nid: 3317784
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3159210](https://www.drupal.org/node/3159210)

Examples for adding a route alias and for deprecating a route are as follows.

#### Alias

```php
example.overview:
  alias: example.index
```

#### Deprecation

```php
example.overview:
  deprecated:
    package: 'drupal/example'
    version: '11.2'
    message: 'The example.overview route is deprecated in drupal:11.2.0 and is removed in drupal:12.0.0. Use the "example.overview_new." route instead.'
```

Symfony [5.4 added support](https://symfony.com/blog/new-in-symfony-5-4-route-aliasing) for aliases

*Source: [Added support for route aliases and deprecation](https://www.drupal.org/node/3317784), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
