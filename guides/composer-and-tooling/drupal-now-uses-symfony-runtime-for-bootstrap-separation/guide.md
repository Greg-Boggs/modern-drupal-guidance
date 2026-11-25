---
name: drupal-now-uses-symfony-runtime-for-bootstrap-separation
title: "Drupal now uses symfony/runtime for bootstrap separation"
description: "Drupal now uses symfony/runtime for bootstrap separation"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3553275
change-record-nid: 3553275
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3313404](https://www.drupal.org/node/3313404)

Drupal now integrates the [Symfony Runtime component](https://symfony.com/doc/7.3/components/runtime.html) to separate bootstrapping logic from request handling. The change introduces a new `DrupalRuntime` class and modifies front-controllers (index.php, update.php) to use the runtime pattern instead of directly instantiating and handling requests through the DrupalKernel.

This issue does not remove bootstrapping logic from the DrupalKernel but enables this to be done in follow-up issues.

The Symfony Runtime component, `symfony/runtime`, is added as a dependency. This package is also a Composer plugin, so Composer may require you to explicitly allow it during an update:

`composer config allow-plugins.symfony/runtime true`

If you maintain custom front-controllers, you have two options:

1. **Keep existing format**: Legacy front-controllers continue to work unchanged for the time being.
2. **Adopt Symfony Runtime**: Update to the new pattern for better performance and features.

### Front-controller example

#### Before

```php
use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

$autoloader = require_once 'autoload.php';
$kernel = new DrupalKernel('prod', $autoloader);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
```

#### After

```php
use Drupal\Core\DrupalKernel;
use Drupal\Core\Runtime\DrupalRuntime;

$_ENV['APP_RUNTIME'] ??= $_SERVER['APP_RUNTIME'] ?? DrupalRuntime::class;
require_once 'autoload_runtime.php';

return static function () {
  return new DrupalKernel('prod', require 'autoload.php');
};
```

**Note:**\
It is important your script changes the current directory to Drupal's web root directory, so if was doing so before, it will need to after.

*Source: [Drupal now uses symfony/runtime for bootstrap separation](https://www.drupal.org/node/3553275), a Drupal core change record by [mxr576](https://www.drupal.org/user/315522) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
