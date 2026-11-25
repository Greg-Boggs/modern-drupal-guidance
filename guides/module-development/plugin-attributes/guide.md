---
name: plugin-attributes
description: 'Declare Drupal plugins such as blocks, field formatters and queue workers with PHP attributes like #[Block] instead of @Block docblock annotations, and define new plugin types with an attribute class.'
drupal-core: ">=10.3"
replaces:
  - "@Block annotation"
  - "@FieldFormatter, @FieldWidget and @FieldType annotations"
  - "@QueueWorker annotation"
  - "@ContentEntityType and @ConfigEntityType annotations"
  - "Doctrine docblock annotations on plugin classes"
  - "Plugin annotation classes in src/Annotation"
deprecated-apis:
  - api: "Docblock annotations on plugins of a type that supports attributes"
    deprecated-in: "11.2.0"
    removed-in: "13.0.0"
    replacement: "The plugin type's PHP attribute, for example #[Block]"
---

# Declare plugins with PHP attributes instead of annotations

Core plugin types are discovered from PHP attributes on the plugin class, such as `#[Block(...)]` or `#[FieldFormatter(...)]`. The older Doctrine-style annotations in the docblock (`@Block(...)`) still work for most types but have been deprecated since 11.2 and are removed in 13.0. Attributes are real PHP: arguments are named and type-checked, IDEs autocomplete them, and translatable strings use `new TranslatableMarkup()` instead of `@Translation()`.

{{ DRUPAL_STATUS() }}

{# Verified: core/lib/Drupal/Core/Block/Attribute/Block.php at 10.2.0; Field/Attribute/{FieldType,FieldFormatter,FieldWidget}.php and Action, Queue, Validation, Render attributes at 10.3.0. Entity/Attribute/{EntityType,ContentEntityType,ConfigEntityType}.php at 11.1.0, not 11.0.0. migrate/src/Attribute/MigrateSource.php at 11.2.0, not 11.1.0. Deprecation: AttributeDiscoveryWithAnnotations.php at 11.2.0 triggers "Using @X annotation for plugin with ID Y is deprecated and is removed from drupal:13.0.0" (CR https://www.drupal.org/node/3395575); absent at 11.1.0. #}

This guide covers declaring plugins. For injecting services into a plugin, see {{ GUIDE_REF("dependency-injection") }}.

## Implementation

### 1. Put the attribute on the plugin class

Each plugin type has its attribute class in an `Attribute` namespace next to the plugin type: `Drupal\Core\Block\Attribute\Block`, `Drupal\Core\Field\Attribute\FieldFormatter`, `Drupal\Core\Queue\Attribute\QueueWorker`. Import it with `use`, like any class. The plugin class stays in the same `src/Plugin/<Type>/` directory as before.

```php
<?php
// src/Plugin/Block/HelloBlock.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Displays a greeting.
 */
// Arguments are named. Translatable strings are TranslatableMarkup objects,
// created with "new" (t() is a function call and is not allowed here).
#[Block(
  id: 'mymodule_hello',
  admin_label: new TranslatableMarkup('Hello block'),
  category: new TranslatableMarkup('Custom'),
)]
class HelloBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return ['#markup' => $this->t('Hello!')];
  }

}
```

The docblock now holds only the class description. Remove the `@Block(...)` block entirely: a class with both is discovered from the attribute, and the leftover annotation misleads readers.

### 2. Map annotation keys to attribute arguments

Argument names are the annotation keys, in the same snake_case: `admin_label`, `field_types`, `context_definitions`. Values change form:

| Annotation | Attribute |
|---|---|
| `@Translation("Hello")` | `new TranslatableMarkup('Hello')` |
| `{"string", "text"}` | `['string', 'text']` |
| `cron = {"time" = 60}` | `cron: ['time' => 60]` |
| `deriver = "Drupal\mymodule\Plugin\Derivative\Foo"` | `deriver: Foo::class` (with a `use` line) |
| `@ContextDefinition("entity:node", label = @Translation("Node"))` | `context_definitions: ['node' => new EntityContextDefinition('entity:node', new TranslatableMarkup('Node'))]` |

Field formatter and queue worker examples:

```php
<?php
// src/Plugin/Field/FieldFormatter/ShoutFormatter.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Formats a plain text field in upper case.
 */
#[FieldFormatter(
  id: 'mymodule_shout',
  label: new TranslatableMarkup('Shout'),
  field_types: ['string'],
)]
class ShoutFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = [];
    foreach ($items as $delta => $item) {
      // #plain_text escapes the value; never build #markup from field values.
      $elements[$delta] = ['#plain_text' => mb_strtoupper((string) $item->value)];
    }
    return $elements;
  }

}
```

```php
<?php
// src/Plugin/QueueWorker/CleanupWorker.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\QueueWorker;

use Drupal\Core\Queue\Attribute\QueueWorker;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Processes cleanup items.
 */
#[QueueWorker(
  id: 'mymodule_cleanup',
  title: new TranslatableMarkup('Cleanup'),
  // Example value: seconds of each cron run this worker may use.
  cron: ['time' => 30],
)]
class CleanupWorker extends QueueWorkerBase {

  /**
   * {@inheritdoc}
   */
  public function processItem($data): void {
    // Process one item.
  }

}
```

Entity types use the same approach from 11.1: `#[ContentEntityType(...)]` and `#[ConfigEntityType(...)]` from `Drupal\Core\Entity\Attribute`, with the annotation keys as arguments (`handlers:`, `entity_keys:`, `links:`).

### 3. Define a new plugin type with an attribute

A new plugin type needs an attribute class, an interface, and a plugin manager that passes the attribute class to `DefaultPluginManager`.

```php
<?php
// src/Attribute/Greeter.php

declare(strict_types=1);

namespace Drupal\mymodule\Attribute;

use Drupal\Component\Plugin\Attribute\Plugin;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Defines a Greeter plugin attribute.
 *
 * Plugin namespace: Plugin\Greeter.
 */
#[\Attribute(\Attribute::TARGET_CLASS)]
class Greeter extends Plugin {

  /**
   * Constructs a Greeter attribute.
   *
   * @param string $id
   *   The plugin ID.
   * @param \Drupal\Core\StringTranslation\TranslatableMarkup $label
   *   The human-readable name.
   * @param class-string|null $deriver
   *   (optional) The deriver class.
   */
  public function __construct(
    public readonly string $id,
    public readonly TranslatableMarkup $label,
    public readonly ?string $deriver = NULL,
  ) {}

}
```

```php
<?php
// src/GreeterPluginManager.php

declare(strict_types=1);

namespace Drupal\mymodule;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\mymodule\Attribute\Greeter;

/**
 * Manages Greeter plugins.
 */
class GreeterPluginManager extends DefaultPluginManager {

  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    // Arguments: subdirectory, namespaces, module handler, plugin interface,
    // attribute class. Pass no annotation class for a new plugin type.
    parent::__construct('Plugin/Greeter', $namespaces, $module_handler, GreeterInterface::class, Greeter::class);
    $this->alterInfo('mymodule_greeter_info');
    $this->setCacheBackend($cache_backend, 'mymodule_greeter_plugins');
  }

}
```

```yaml
# mymodule.services.yml
services:
  plugin.manager.mymodule_greeter:
    class: Drupal\mymodule\GreeterPluginManager
    # default_plugin_manager supplies namespaces, cache.discovery and
    # module_handler as constructor arguments.
    parent: default_plugin_manager
```

Plugins of the new type live in `src/Plugin/Greeter/` of any module and carry `#[Greeter(id: '...', label: new TranslatableMarkup('...'))]`.

## Rules

- DO NOT write `@Block`, `@FieldFormatter`, `@QueueWorker` or any other annotation for a plugin type that has an attribute class. Check for `src/Attribute/` (contrib and core modules) or `lib/Drupal/Core/<Subsystem>/Attribute/` (core subsystems) next to the plugin type.
- DO keep the annotation when the plugin type's manager passes no attribute class to `DefaultPluginManager` (common in contrib plugin types that have not been converted). Attributes on such plugins are ignored and the plugin disappears.
- DO use `new TranslatableMarkup()`. `t()`, `$this->t()` and `@Translation` are not valid in an attribute.
- DO NOT create an `src/Annotation/` class for a new plugin type. Create an `src/Attribute/` class.
- DO clear caches after adding or renaming a plugin. Plugin definitions are cached in `cache.discovery`.

## Older supported core versions

Every core plugin type above has an attribute class in 10.3 and later, except these:

- Entity types (`#[ContentEntityType]`, `#[ConfigEntityType]`) need 11.1. On 10.x, keep `@ContentEntityType` and `@ConfigEntityType` annotations.
- Migrate source plugins (`#[MigrateSource]`) need 11.2. On earlier versions, keep `@MigrateSource`. Migrate process and destination plugins have attributes from 10.3.

A module that supports both 10.x and 11.x and wants a single class can keep the annotation and add the attribute: the attribute wins where it is supported, and the annotation is used on versions where the attribute class does not exist. Drop the annotation once the module requires a core version that has the attribute.

A plugin type defined by a module for several core majors passes both an attribute class and an annotation class to `DefaultPluginManager` (the sixth argument), so plugins written either way are found.

## Verify

```bash
drush cache:rebuild
# The plugin ID is listed by its manager.
drush php:eval 'var_dump(\Drupal::service("plugin.manager.block")->hasDefinition("mymodule_hello"));'
```
