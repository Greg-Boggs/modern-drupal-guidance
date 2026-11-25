---
name: service-decoration-behaviour-can-be-controlled-with
title: "Service decoration behaviour can be controlled with `decoration_on_invalid`"
description: "Service decoration behaviour can be controlled with `decoration_on_invalid`"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3477712
change-record-nid: 3477712
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3293926](https://www.drupal.org/node/3293926)

Drupal utilizes the Symfony service container, however some features such are not leveraged in Drupal 11.

Drupal now supports the `decoration_on_invalid` property. The [Symfony documentation](https://symfony.com/doc/current/service_container/service_decoration.html#control-the-behavior-when-the-decorated-service-does-not-exist) describes how it can be used.

> When you decorate a service that doesn't exist, the decoration_on_invalid option allows you to choose the behavior to adopt.
>
> Three different behaviors are available:
>
> - `exception`: A ServiceNotFoundException will be thrown telling that decorator's dependency is missing. (default)
> - `ignore`: The container will remove the decorator.
> - `null`: The container will keep the decorator service and will set the decorated one to null.

For example to ignore a service definition if the decorated service does not exist, in your `modulename.services.yaml` file you'd do:

```php
Bar:
    decorates: DoesNotExist
    decoration_on_invalid: ignore
    arguments: ['@.inner']
```

*Source: [Service decoration behaviour can be controlled with \`decoration_on_invalid\`](https://www.drupal.org/node/3477712), a Drupal core change record by [kingdutch](https://www.drupal.org/user/1868952) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
