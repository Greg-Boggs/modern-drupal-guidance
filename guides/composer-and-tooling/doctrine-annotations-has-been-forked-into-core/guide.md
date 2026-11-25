---
name: doctrine-annotations-has-been-forked-into-core
title: "doctrine/annotations has been forked into core"
description: "doctrine/annotations has been forked into core"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3551049
change-record-nid: 3551049
introduced-in-version: "11.3.0, 10.6.0"
introduced-in-branch: "11.x, 10.6.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.x, 10.6.x\
Introduced in version: 11.3.0, 10.6.0\
Issue links: [#3550917](https://www.drupal.org/node/3550917)

The `doctrine/annotations` package is marked as abandoned upstream. Drupal still uses some of the code from this package to parse PHP annotations and support for this will be not dropped until Drupal 13: [Not providing an attribute class for a plugin that that uses annotation based discovery is now deprecated](https://www.drupal.org/node/3522776). As a result Drupal core has copied the relevant parts of the code from Doctrine and moved them into core.

Code that relied on the `Doctrine\Common\Annotations\AnnotationException` exception should switch to using `Drupal\Component\Annotation\Doctrine\AnnotationException` instead; a backward compatibility layer is provided for this.

Code that relied on other parts of `doctrine/annotations` may choose to add an explicit dependency on the abandoned package, or use the classes that were copied to core (with the caveat that these will be removed in Drupal 13), or rework their code to no longer rely on PHP annotations.

*Source: [doctrine/annotations has been forked into core](https://www.drupal.org/node/3551049), a Drupal core change record by [yesct](https://www.drupal.org/user/258568) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
