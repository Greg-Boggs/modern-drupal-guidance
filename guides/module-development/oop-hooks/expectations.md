# Expectations

- Every hook implementation the task asks for is a public method on a class in the module's `src/Hook/` directory, in the `Drupal\<module>\Hook` namespace.
- Each hook method carries a `#[Hook('<hook_name>')]` attribute from `Drupal\Core\Hook\Attribute\Hook`, or the class carries `#[Hook('<hook_name>', method: '<method>')]`.
- The hook name in each `#[Hook]` attribute has no `hook_` prefix and no module-name prefix.
- The module's `.module` file contains no function that implements one of the hooks the task asks for, unless that function carries `#[LegacyHook]`.
- No hook class calls `\Drupal::service()`, `\Drupal::entityTypeManager()`, `\Drupal::config()` or another static `\Drupal::` service accessor.
- Services a hook class uses arrive as constructor parameters.
- A constructor parameter typed with an interface that has no autowiring alias (such as `Psr\Log\LoggerInterface` or `Drupal\Core\Cache\CacheBackendInterface`) carries a `#[Autowire]` attribute that names the service.
- The module installs with `drush pm:install` without errors.
- After a cache rebuild, `\Drupal::hasService()` returns `TRUE` for each hook class name.
- After a cache rebuild, `\Drupal::moduleHandler()->hasImplementations('<hook>', '<module>')` returns `TRUE` for each implemented hook.
- Each implemented hook produces its effect exactly once per invocation (for example, a form alter adds its element once).
- No implementation of `hook_module_implements_alter()` is added; ordering, if the task needs it, uses the `order` argument of `#[Hook]`, `#[ReorderHook]` or `#[RemoveHook]`.
- Installing, uninstalling and update hooks (`hook_install()`, `hook_uninstall()`, `hook_schema()`, `hook_update_N()`) remain procedural functions in the `.install` file.
- When the module must support core before 11.1, each hook has a procedural function marked `#[LegacyHook]` that calls the hook class's method, and the hook class is registered in the module's `services.yml`.
- When the module must support core before 11.1, each hook's effect happens exactly once on both a Drupal 10 site and a Drupal 11.1 or later site.
