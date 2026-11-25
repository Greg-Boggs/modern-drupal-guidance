# Expectations

- No class in the module's `src/` directory calls a static `\Drupal::` service accessor (`\Drupal::service()`, `\Drupal::entityTypeManager()`, `\Drupal::config()`, `\Drupal::currentUser()`, `\Drupal::messenger()` and similar).
- Every service, controller, form and plugin class the task asks for receives the services it uses as constructor parameters.
- Constructor parameters for core services are typed with the service's interface (for example `EntityTypeManagerInterface`, `ConfigFactoryInterface`, `AccountInterface`).
- No class receives the service container (`ContainerInterface`) as a constructor parameter.
- Each new service in the module's `services.yml` is autowired, either by `autowire: true` on the service or by `_defaults: { autowire: true }` in the file, or lists its dependencies under `arguments`.
- Each new service can be fetched from the container after a cache rebuild, and its dependencies are set.
- A constructor parameter typed with an interface that has no autowiring alias (such as `Psr\Log\LoggerInterface` or `Drupal\Core\Cache\CacheBackendInterface`) carries a `#[Autowire]` attribute that names the service.
- A controller that extends `ControllerBase` has a constructor that declares its services and has no `create()` method.
- A form class that declares services in its constructor uses `Drupal\Core\DependencyInjection\AutowireTrait` or defines a `create()` method that passes those services.
- A form class that extends `ConfigFormBase` and adds services passes `ConfigFactoryInterface` and `TypedConfigManagerInterface` to `parent::__construct()`.
- A plugin class that injects services implements `ContainerFactoryPluginInterface`, and its constructor takes `$configuration`, `$plugin_id` and `$plugin_definition` before the services.
- No constructor-promoted property redeclares a property of `ControllerBase` or `FormBase` (`$entityTypeManager`, `$configFactory`, `$currentUser`, `$moduleHandler`, `$requestStack`, `$routeMatch` and the others those classes declare).
- The controller route, the form route and the plugin each render without errors after the module is installed.
- When the module supports core below 11.4, each form class that injects services uses `AutowireTrait` or defines `create()`.
- When the module supports core below 11.3, each plugin class that injects services defines `create()`.
