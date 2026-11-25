---
name: schemachecktrait-isviolationforignoredpropertypath-expects
title: "SchemaCheckTrait::isViolationForIgnoredPropertyPath expects a ConstraintViolationInterface"
description: "SchemaCheckTrait::isViolationForIgnoredPropertyPath expects a ConstraintViolationInterface"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3549625
change-record-nid: 3549625
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3542137](https://www.drupal.org/node/3542137)

The `$v` parameter for `Drupal\Core\Config\Schema\SchemaCheckTrait::isViolationForIgnoredPropertyPath` is now typehinted to the interface `Symfony\Component\Validator\ConstraintViolationInterface` rather than the `ConstraintViolation` concrete class.

**Before**\
`Drupal\Core\Config\Schema\SchemaCheckTrait::isViolationForIgnoredPropertyPath(ConstraintViolation $v)`

**After**\
`Drupal\Core\Config\Schema\SchemaCheckTrait::isViolationForIgnoredPropertyPath(ConstraintViolationInterface $v)`

Calling this method is not affected, but overriding this method in subclasses will need updating to match the trait.

*Source: [SchemaCheckTrait::isViolationForIgnoredPropertyPath expects a ConstraintViolationInterface](https://www.drupal.org/node/3549625), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
