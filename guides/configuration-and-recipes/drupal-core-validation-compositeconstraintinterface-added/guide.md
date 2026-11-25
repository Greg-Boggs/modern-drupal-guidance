---
name: drupal-core-validation-compositeconstraintinterface-added
title: "\\Drupal\\Core\\Validation\\CompositeConstraintInterface added to bridge Symfony's Composite constraints to Drupal"
description: "\\Drupal\\Core\\Validation\\CompositeConstraintInterface added to bridge Symfony's Composite constraints to Drupal"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3558184
change-record-nid: 3558184
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3521131](https://www.drupal.org/node/3521131)

When implementing composite constraints in Drupal, the constraint class must implement `\Drupal\Core\Validation\CompositeConstraintInterface`. The public static method `\Drupal\Core\Validation\CompositeConstraintInterface::getCompositeOptionStatic()` is a copy of Symfony's `\Symfony\Component\Validator\Constraints\Composite::getCompositeOption()` method and allows the Drupal ConstraintManager to instantiate the nested constraints.

*Source: [\Drupal\Core\Validation\CompositeConstraintInterface added to bridge Symfony's Composite constraints to Drupal](https://www.drupal.org/node/3558184), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
