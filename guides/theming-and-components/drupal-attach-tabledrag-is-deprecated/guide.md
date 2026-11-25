---
name: drupal-attach-tabledrag-is-deprecated
title: "drupal_attach_tabledrag() is deprecated"
description: "drupal_attach_tabledrag() is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3035565
change-record-nid: 3035565
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3035343](https://www.drupal.org/node/3035343)

Function `drupal_attach_tabledrag()` is deprecated use static method `\Drupal\Core\Render\Element\Table::attachTabledrag()` instead.

Before\
`drupal_attach_tabledrag($elements, $options);`

After\
`Table::attachTabledrag($element, $options);`

Also the element selector changed from using HTML Id to `data-drupal-tabledrag-id`

*Source: [drupal_attach_tabledrag() is deprecated](https://www.drupal.org/node/3035565), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
