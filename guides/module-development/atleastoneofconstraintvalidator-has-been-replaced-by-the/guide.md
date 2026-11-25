---
name: atleastoneofconstraintvalidator-has-been-replaced-by-the
title: "AtLeastOneOfConstraintValidator has been replaced by the default Symfony implementation"
description: "AtLeastOneOfConstraintValidator has been replaced by the default Symfony implementation"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3558133
change-record-nid: 3558133
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3521131](https://www.drupal.org/node/3521131)

By optimizing how we handle Composite constraits from Symfony we no longer need `AtLeastOneOfConstraintValidator` that was introduced in 11.2.0 but moved to the default implementation from Symfony.

If you are using or extending the `AtLeastOneOfConstraint` this should not affect you. Only if you have custom validation logic in the extended class.

*Source: [AtLeastOneOfConstraintValidator has been replaced by the default Symfony implementation](https://www.drupal.org/node/3558133), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
