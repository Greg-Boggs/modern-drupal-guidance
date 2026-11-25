---
name: new-classresolverconstraint-to-validate-bases-on-service-or
title: "New ClassResolverConstraint to validate bases on service or instantiated class"
description: "New ClassResolverConstraint to validate bases on service or instantiated class"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3519434
change-record-nid: 3519434
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3436096](https://www.drupal.org/node/3436096)

The new ClassResolverConstraint checks if a method on a service or instantiated object returns true.

For example to call the method 'isValidScheme' on the service 'stream_wrapper_manager', use: \['stream_wrapper_manager', 'isValidScheme'\].

It is also possible to use a class if it implements ContainerInjectionInterface. It will use the ClassResolver to resolve the class and return an instance. Then it will call the configured method on that instance.

The called method should return TRUE when the result is valid. All other values will be considered as invalid.

*Source: [New ClassResolverConstraint to validate bases on service or instantiated class](https://www.drupal.org/node/3519434), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
