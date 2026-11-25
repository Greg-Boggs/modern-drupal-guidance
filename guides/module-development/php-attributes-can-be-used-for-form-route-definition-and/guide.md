---
name: php-attributes-can-be-used-for-form-route-definition-and
title: "PHP Attributes can be used for Form route definition and discovery"
description: "PHP Attributes can be used for Form route definition and discovery"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3585342
change-record-nid: 3585342
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3584793](https://www.drupal.org/node/3584793)

Using attributes for route definition and discovery, first introduced in [PHP Attributes can be used for route definition and discovery](https://www.drupal.org/node/3324758), has been extended to routes to forms. Any classes implementing `Drupal\Core\Form\FormInterface` in a module's `Form` namespace (for example, `Drupal\example\Form`) and having the `Symfony\Component\Routing\Attribute\Route` attribute will be picked up as route definitions. The attribute must be applied to the class; any `Route` attributes applied to a form object's methods will be ignored.

Note that entity form routes should still be defined in a route provider specified by an entity type definition. The `Route` attribute discovery replaces andor/or supplements the existing `.routing.yml `based declarations.

### Example using .yml file

```php
system.site_information_settings:
  path: '/admin/config/system/site-information'
  defaults:
    _form: '\Drupal\system\Form\SiteInformationForm'
    _title: 'Basic site settings'
  requirements:
    _permission: 'administer site configuration'
```

### Example using a route attribute

```php
<?php

namespace Drupal\system\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\TypedConfigManagerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\RedundantEditableConfigNamesTrait;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Routing\RequestContext;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Configure site information settings for this site.
 *
 * @internal
 */
#[Route(
  path: '/admin/config/system/site-information',
  name: 'system.site_information_settings',
  requirements: [
    '_permission' => 'administer site configuration',
  ],
  defaults: ['_title' => new TranslatableMarkup('Basic site settings')],
)]
class SiteInformationForm extends ConfigFormBase {
```

*Source: [PHP Attributes can be used for Form route definition and discovery](https://www.drupal.org/node/3585342), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
