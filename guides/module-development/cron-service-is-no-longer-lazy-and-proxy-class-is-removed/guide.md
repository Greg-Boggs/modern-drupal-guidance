---
name: cron-service-is-no-longer-lazy-and-proxy-class-is-removed
title: "Cron service is no longer lazy and proxy class is removed"
description: "Cron service is no longer lazy and proxy class is removed"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3484001
change-record-nid: 3484001
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3483996](https://www.drupal.org/node/3483996)

The `cron` service is no longer marked `lazy`, and its proxy `Drupal\Core\ProxyClass\Cron` has been removed. Instead, if `cron` needs to be injected into a service, it is recommended to use service closures instead.

If existing code injecting the cron service is not updated, there may be a slight performance hit due to the different ways that lazy services/proxy classes and service closures optimize for late instantiation (generally 1ms or less). Otherwise, existing code should continue to function as usual.

**Before:**

```php
public function __construct(
  protected CronInterface $cron,
) {}
```

Service definition:

```php
services:
  my_service:
    class: Foo\Bar
    arguments: ['@cron']
```

**After:**

```php
public function __construct(
  protected \Closure $cronClosure,
) {}

protected function getCron(): CronInterface {
  return ($this->cronClosure)();
}
```

Service definition:

```php
services:
  my_service:
    class: Foo\Bar
    arguments: [!service_closure '@cron']
```

Service closures can also be autowired.\
**Before:**

```php
public function __construct(
  protected CronInterface $cron,
) {}
```

Service definition:

```php
services:
  my_service:
    class: Foo\Bar
    autowire: true
```

**After:**

```php
use Symfony\Component\DependencyInjection\Attribute\AutowireServiceClosure;

public function __construct(
  #[AutowireServiceClosure('cron')]
  protected \Closure $cronClosure,
) {}

protected function getCron(): CronInterface {
  return ($this->cronClosure)();
}
```

*Source: [Cron service is no longer lazy and proxy class is removed](https://www.drupal.org/node/3484001), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
