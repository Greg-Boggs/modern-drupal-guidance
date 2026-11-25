---
name: route-attributes-support-a-top-level-title-property
title: "Route attributes support a top level \"title\" property"
description: "Route attributes support a top level \"title\" property"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3614321
change-record-nid: 3614321
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3607968](https://www.drupal.org/node/3607968)

`Drupal\Core\Routing\Attribute\Route` extends the Symfony `#[Route]` attribute and\
adds a `title` property. The property sets the `_title` route default.

The title can be a plain string or a `TranslatableMarkup` object. Additionally, in PHP 8.5 and up, the title can be a static closure that is evaluated on each request. Closures can be used to replace the `_title_callback` default so a separate title method is no longer needed to generate dynamic page titles.

## Before

```php
use Symfony\Component\Routing\Attribute\Route;

#[Route(
  path: '/admin/config/system/site-information',
  name: 'system.site_information_settings',
  defaults: ['_title' => 'Basic site settings'],
)]
```

A dynamic title needed a separate `_title_callback` default:

```php
block_content.add_form:
  path: '/block/add/{block_content_type}'
  defaults:
    _controller: '\Drupal\block_content\Controller\BlockContentController::addForm'
    _title_callback: '\Drupal\block_content\Controller\BlockContentController::getAddFormTitle'
```

## After

```php
use Drupal\Core\Routing\Attribute\Route;

#[Route(
  path: '/admin/config/system/site-information',
  name: 'system.site_information_settings',
  title: new TranslatableMarkup('Basic site settings'),
)]
```

A closure keeps the dynamic title generator next to the route:

```php
#[Route(
  path: '/block/add/{block_content_type}',
  name: 'block_content.add_form',
  title: static function (BlockContentTypeInterface $block_content_type) {
    return new TranslatableMarkup('Add %type content block', [
      '%type' => $block_content_type->label(),
    ]);
  },
)]
```

## Title closures

Title closures are only available in PHP 8.5 and up due to language limitations.

Closure arguments are resolved in the same way as `_title_callback` arguments, from upcasted route parameters, the request and the route match. A closure has no access to the container. You can continue to use `_title_callback` when the title depends on injected services.

Title closures only work on method-level `#[Route]` attributes. Class-level `#[Route]` attributes with title closures throw an InvalidArgumentException.

*Source: [Route attributes support a top level "title" property](https://www.drupal.org/node/3614321), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
