---
name: support-for-enums-and-php-constants-constants-in-yaml-files
title: "Support for enums and PHP constants constants in YAML files"
description: "Support for enums and PHP constants constants in YAML files"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3403883
change-record-nid: 3403883
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2951046](https://www.drupal.org/node/2951046)

Drupal now supports PHP constants in YAML files. For example:

```php
parameters:
    # this is considered a regular string
    foo: PHP_INT_MAX
    # this is considered a PHP constant
    bar: !php/const PHP_INT_MAX
```

Will be read as

```php
[
    "parameters" => [
      "foo" => "PHP_INT_MAX",
      "bar" => 9223372036854775807,
    ],
]
```

This also allows us to support enums in config and service yamls too. For example:

```php
enum Suit {
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}

$data = [
  'suit' => Suit::Hearts
];
dump(\Drupal\Component\Serialization\Yaml::encode($data));
```

Produces the following YAML:

```php
suit: !php/const Suit::Hearts
```

*Source: [Support for enums and PHP constants constants in YAML files](https://www.drupal.org/node/3403883), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
