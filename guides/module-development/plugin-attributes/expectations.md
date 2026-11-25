# Expectations

- Each plugin class the task asks for carries the PHP attribute of its plugin type (for example `#[Block]`, `#[FieldFormatter]`, `#[QueueWorker]`), imported with a `use` statement.
- No plugin class whose plugin type has an attribute class carries a docblock annotation for that type (for example `@Block(` or `@FieldFormatter(`).
- Translatable attribute arguments are `new TranslatableMarkup(...)` expressions.
- Attribute arguments use named-argument syntax with the plugin type's snake_case keys (for example `admin_label:`, `field_types:`).
- Each plugin class is in the `src/Plugin/<Type>/` directory that its plugin type scans (for example `src/Plugin/Block/` for blocks).
- After a cache rebuild, each plugin's manager returns `TRUE` from `hasDefinition()` for the plugin's ID.
- Rebuilding caches and loading plugin definitions triggers no deprecation notice that names the module's plugins.
- When the task defines a new plugin type, an attribute class extending `Drupal\Component\Plugin\Attribute\Plugin` exists in the module's `src/Attribute/` directory and declares `#[\Attribute(\Attribute::TARGET_CLASS)]`.
- When the task defines a new plugin type, the plugin manager extends `DefaultPluginManager` and passes the attribute class name to the parent constructor.
- When the task defines a new plugin type, no annotation class is added to the module's `src/Annotation/` directory.
- When the task defines a new plugin type, the plugin manager is registered as a service and a plugin of the new type is discovered by it.
- When the module must support core below 11.1, entity type classes keep their `@ContentEntityType` or `@ConfigEntityType` annotation.
