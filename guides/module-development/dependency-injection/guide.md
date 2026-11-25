---
name: dependency-injection
description: Inject services into Drupal services, controllers, forms and plugins through autowired constructors instead of calling \Drupal::service() or writing long create() methods.
drupal-core: ">=10.3"
replaces:
  - "\\Drupal::service() inside classes"
  - "\\Drupal::entityTypeManager(), \\Drupal::config(), \\Drupal::currentUser() inside classes"
  - "Hand-written create(ContainerInterface $container) methods that only fetch services"
  - "Long arguments: lists in services.yml"
---

# Inject services with autowiring

A class that needs a service declares it as a typed constructor parameter, and Drupal supplies it. For services this is Symfony autowiring in `services.yml`. For controllers and forms, `AutowireTrait` provides a `create()` that reads the constructor. For plugins, `create()` passes the services after the plugin's own three arguments. Calling `\Drupal::service()` inside a class hides its dependencies, makes it impossible to unit test, and is the pattern agents reach for most often. Use the `\Drupal` static wrapper only in procedural code that has no other way to get a service: `.module`, `.install` and `.theme` files.

{{ DRUPAL_STATUS() }}

{# Verified: AutowireTrait (core/lib/Drupal/Core/DependencyInjection/AutowireTrait.php) used by ControllerBase at 10.2.0 and later. FormBase uses AutowireTrait at 11.4.0, not at 11.3.0. PluginBase::create() calling createInstanceAutowired() at 11.3.0, not at 11.2.0. YamlFileLoader supports _defaults with autowire/autoconfigure at 10.3.0. Interface aliases checked in core/core.services.yml at 10.3.0 and 11.4.0. Autoconfiguration of EventSubscriberInterface and LoggerAwareInterface: CoreServiceProvider at 10.3.0. #}

For hooks, the hook class is itself an autowired service; see {{ GUIDE_REF("oop-hooks") }}.

## How autowiring resolves a parameter

Each constructor parameter is resolved by its type. Core defines an alias from the interface to the service for most core services, so typing a parameter `EntityTypeManagerInterface` gets `entity_type.manager`. Use the interface, not the concrete class.

Types with several possible services have no alias. Name the service with Symfony's `#[Autowire]` attribute on the parameter:

| Parameter type | Use |
|---|---|
| `Psr\Log\LoggerInterface` | `#[Autowire(service: 'logger.channel.mymodule')]` |
| `Drupal\Core\Cache\CacheBackendInterface` | `#[Autowire(service: 'cache.default')]` or another bin, such as `cache.data` |
| `Drupal\Core\Lock\LockBackendInterface` | `#[Autowire(service: 'lock')]` |
| Entity storage | Inject `EntityTypeManagerInterface` and call `getStorage()` when you need it |
| A container parameter | `#[Autowire(param: 'mymodule.feed_url')]` |

`#[Autowire]` is `Symfony\Component\DependencyInjection\Attribute\Autowire`.

## Implementation

### 1. Services: turn on autowiring in `services.yml`

```yaml
# mymodule.services.yml
services:
  _defaults:
    # Resolve constructor arguments by type.
    autowire: true
    # Tag event subscribers and logger-aware services automatically.
    autoconfigure: true

  # Use the class name as the service ID. "~" means no further options.
  Drupal\mymodule\GreetingBuilder: ~

  # Alias the interface so other classes can autowire it.
  Drupal\mymodule\GreetingBuilderInterface: '@Drupal\mymodule\GreetingBuilder'

  logger.channel.mymodule:
    parent: logger.channel_base
    arguments: ['mymodule']
```

`_defaults` applies only to the services in this file. A service that other modules call by a string ID, such as `mymodule.greeting_builder`, keeps that ID; add an alias from the class name to it (`Drupal\mymodule\GreetingBuilder: '@mymodule.greeting_builder'`) so it can be autowired too.

```php
<?php
// src/GreetingBuilder.php

declare(strict_types=1);

namespace Drupal\mymodule;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Builds greetings for the current user.
 */
class GreetingBuilder implements GreetingBuilderInterface {

  use StringTranslationTrait;

  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
    protected readonly AccountInterface $currentUser,
    #[Autowire(service: 'logger.channel.mymodule')]
    protected readonly LoggerInterface $logger,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function build(): string {
    $site = $this->configFactory->get('system.site')->get('name');
    $this->logger->debug('Greeting built.');
    return (string) $this->t('Hello @name, welcome to @site.', [
      '@name' => $this->currentUser->getDisplayName(),
      '@site' => $site,
    ]);
  }

}
```

### 2. Controllers: extend `ControllerBase` and write a constructor

`ControllerBase` uses `AutowireTrait`, so a controller needs only a constructor. Do not write `create()`.

```php
<?php
// src/Controller/GreetingController.php

declare(strict_types=1);

namespace Drupal\mymodule\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\mymodule\GreetingBuilderInterface;

/**
 * Returns the greeting page.
 */
class GreetingController extends ControllerBase {

  public function __construct(
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {}

  /**
   * Builds the page.
   */
  public function page(): array {
    return [
      '#markup' => $this->greetingBuilder->build(),
      // The greeting names the current user and the site name.
      '#cache' => [
        'contexts' => ['user'],
        'tags' => ['config:system.site'],
      ],
    ];
  }

}
```

> [!WARNING]
> `ControllerBase` already declares untyped properties named `$entityTypeManager`, `$configFactory`, `$currentUser`, `$moduleHandler`, `$languageManager`, `$formBuilder`, `$entityFormBuilder`, `$keyValue` and `$stateService`. Redeclaring one with a type, as in `protected readonly EntityTypeManagerInterface $entityTypeManager`, is a fatal PHP error ("Type of ...::$entityTypeManager must not be defined"). Give the promoted property another name (`$entityTypes`, `$siteConfig`) or do not extend `ControllerBase`.

A controller that does not extend `ControllerBase` implements `ContainerInjectionInterface` and adds `use AutowireTrait;` (`Drupal\Core\DependencyInjection\AutowireTrait`).

### 3. Forms: add `AutowireTrait` and a constructor

```php
<?php
// src/Form/GreetingForm.php

declare(strict_types=1);

namespace Drupal\mymodule\Form;

use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\mymodule\GreetingBuilderInterface;

/**
 * Shows a greeting and a button.
 */
class GreetingForm extends FormBase {

  // FormBase uses this trait itself from 11.4. Adding it here makes the form
  // autowired on every supported core version.
  use AutowireTrait;

  public function __construct(
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'mymodule_greeting_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['greeting'] = ['#markup' => $this->greetingBuilder->build()];
    $form['submit'] = ['#type' => 'submit', '#value' => $this->t('Thanks')];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->messenger()->addStatus($this->t('You are welcome.'));
  }

}
```

`FormBase` declares untyped `$configFactory`, `$requestStack` and `$routeMatch`; the warning above applies to those names too.

A `ConfigFormBase` form must pass the parent's two services on. Declare them first and call the parent constructor:

```php
  // In a class that extends ConfigFormBase, with AutowireTrait:
  public function __construct(
    ConfigFactoryInterface $config_factory,
    TypedConfigManagerInterface $typed_config_manager,
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {
    parent::__construct($config_factory, $typed_config_manager);
  }
```

### 4. Plugins: implement `ContainerFactoryPluginInterface`

A plugin's constructor starts with the three plugin arguments, then the services. `create()` receives the container plus those three arguments.

```php
<?php
// src/Plugin/Block/GreetingBlock.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mymodule\GreetingBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Shows the greeting.
 */
#[Block(
  id: 'mymodule_greeting',
  admin_label: new TranslatableMarkup('Greeting'),
)]
class GreetingBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  // On 11.3 and later PluginBase autowires the constructor; this method can be
  // deleted once the module requires core 11.3.
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(GreetingBuilderInterface::class),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#markup' => $this->greetingBuilder->build(),
      '#cache' => ['contexts' => ['user'], 'tags' => ['config:system.site']],
    ];
  }

}
```

Fetch services in `create()` by the same ID the class would autowire: the interface or class name when an alias exists.

## Rules

- DO NOT call `\Drupal::service()`, `\Drupal::entityTypeManager()`, `\Drupal::config()`, `\Drupal::currentUser()`, `\Drupal::messenger()` or other `\Drupal::` accessors inside a service, controller, form, plugin, hook class or event subscriber.
- DO type constructor parameters with interfaces (`EntityTypeManagerInterface`, not `EntityTypeManager`).
- DO NOT inject the container (`ContainerInterface`) into a service to fetch services later. Inject the services.
- DO NOT write a `create()` method in a controller that extends `ControllerBase`, or in a form that uses `AutowireTrait`. It overrides autowiring and must then be kept in sync with the constructor by hand.
- DO NOT redeclare base-class properties with a type (see the warning in step 2).
- DO use `autoconfigure: true` for event subscribers instead of tagging them `event_subscriber` by hand.

## Older supported core versions

The patterns above work on 10.3 and later. Two simplifications need newer core:

- {{ DRUPAL_STATUS(">=11.4") }} `FormBase` uses `AutowireTrait` itself, so forms can omit `use AutowireTrait;`. Before 11.4, a form without the trait falls back to `FormBase::create()`, which passes no arguments, and the constructor fails with too few arguments. Keep the trait while the module supports core below 11.4.
- {{ DRUPAL_STATUS(">=11.3") }} `PluginBase` provides an autowiring `create()`, so a plugin that implements `ContainerFactoryPluginInterface` can drop its own `create()`. Keep `create()` while the module supports core below 11.3.

## Verify

```bash
drush cache:rebuild
# The service resolves and its dependencies are wired.
drush php:eval 'echo get_class(\Drupal::service("Drupal\mymodule\GreetingBuilderInterface")), "\n";'
# Search for leftover static calls in classes.
grep -rn '\\Drupal::' web/modules/custom/mymodule/src
```
