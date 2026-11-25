---
name: constraint-plugins-must-use-named-arguments-instead-of-an
title: "Constraint plugins must use named arguments instead of an options array"
description: "Constraint plugins must use named arguments instead of an options array"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3554746
change-record-nid: 3554746
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3555134](https://www.drupal.org/node/3555134), [#3555534](https://www.drupal.org/node/3555534), [#3561135](https://www.drupal.org/node/3561135)

Drupal's constraint plugins are a wrapper around the Symfony Validator component. Previously, constraint plugins were created by passing a single array of options to the constructor, e.g.

```php
$constraint = new MyConstraint(['message' => 'Custom validation message']);
```

In order to improve the API for both type safety and required arguments, Symfony has deprecated the single array format in favor of using named arguments:

```php
$constraint = new MyConstraint(message:  'Custom validation message');
```

Previously there was no need to write a constructor in most constraint plugins as the base Constraint constructor would take care of handling the options array. This feature will be removed in Symfony 8, which will ship alongside Drupal 12, so custom constraint plugins should add a custom constructor with named arguments.

If you do not need to provide backward compatibility you can use named arguments and constructor property promotion immediately:

```php
use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

class MyConstraint extends Constraint {

  #[HasNamedArguments]
  public function __construct(
    public string $message = 'Default validation message.',
    mixed ...$args,
  ) {
    parent::__construct(...$args);
  }

}
```

In order to ease the transition in contrib modules, you can provide backward compatibility as follows:

```php
use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

class MyConstraint extends Constraint {

  public string $message = 'Default validation message.';

  #[HasNamedArguments]
  public function __construct(?array $options = null, ?string $message = null, mixed ...$args) {
    if (is_array($options)) {
      @trigger_error(sprintf('Passing an array of options to configure the "%s" constraint is deprecated in drupal:11.3.0 and is removed in drupal:12.0.0. Use named arguments instead. See https://www.drupal.org/node/XXX', static::class), E_USER_DEPRECATED);
    }

    parent::__construct($options, ...$args);

    $this->message = $message ?? $this->message;
  }

}
```

The `#[HasNamedArguments]` attribute tells Symfony and Drupal that named arguments are supported when constructing the constraint.

In this example `$message` is the only configurable setting for the constraint but this should be extended to all settings that the constraint supports. The argument should be typed, and only nullable if the setting is optional.

In addition, passing any value that is not an associative array or `NULL` to the `addConstraint()` method of any class implementing the following interfaces is deprecated:

- Drupal\Component\Plugin\Context\ContextDefinitionInterface
- Drupal\Core\Entity\EntityTypeInterface
- Drupal\Core\Field\FieldConfigInterface
- Drupal\Core\TypedData\DataDefinitionInterface

In Drupal 12, the signature of those methods will look like this:\
`public function addConstraint(string $constraint_name, ?array $options = NULL): static;`

The keys of the `$options` associative array are the names of the constraint properties being set, and the array values are the values to set for the corresponding properties.

For example:\
**Before**

```php
$properties['entity'] = DataReferenceDefinition::create('entity')->addConstraint('EntityType', 'taxonomy_term');
```

**Now**

```php
$properties['entity'] = DataReferenceDefinition::create('entity')->addConstraint('EntityType', ['type' => 'taxonomy_term']);
```

Lastly, passing any value that is not an associative array or `NULL` to the `craete()` of Drupal\Core\Validation\ConstraintManager is deprecated. In Drupal 12, the signature will be updated to:\
`public function create(string $name, ?array $options): \Symfony\Component\Validator\Constraint<?code>`

*Source: [Constraint plugins must use named arguments instead of an options array](https://www.drupal.org/node/3554746), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
