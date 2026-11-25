---
name: dependency-injection
description: "Inject services through constructors instead of calling the static \\Drupal:: helper inside classes."
drupal-core: "^10.2 || ^11"
---

# Dependency injection

Classes should receive what they need. Static `\Drupal::` calls hide dependencies and make code hard to test.

## Rules

- Use constructor property promotion with `readonly` properties.
- Register services in `<module>.services.yml` with `autowire: true`.
- Controllers, forms and plugins use `ContainerInjectionInterface` or `ContainerFactoryPluginInterface`.
- `\Drupal::` is acceptable only in procedural code that has no container access.

## Example

```php
final class ReportBuilder {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly TimeInterface $time,
  ) {}

}
```

```yaml
services:
  Drupal\example\ReportBuilder:
    autowire: true
```
