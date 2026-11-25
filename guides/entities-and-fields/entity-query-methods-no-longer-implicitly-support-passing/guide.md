---
name: entity-query-methods-no-longer-implicitly-support-passing
title: "Entity query methods no longer implicitly support passing different query objects"
description: "Entity query methods no longer implicitly support passing different query objects"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3585318
change-record-nid: 3585318
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2875033](https://www.drupal.org/node/2875033)

`Drupal\Core\Entity\Query\Sql\Query::getTables()` no longer takes an $sql_query parameter and passing it in will trigger a deprecation in 11.4.0 and have no effect in 13.0.0. The query object is determined from the entity query object itself, so the argument can be removed.

Additionally, `Drupal\Core\Entity\Query\Sql\Query::condition()` will no longer accept a `Condition` object where that object was generated from a different entity query object. This was never officially supported, but will be explicitly disallowed from Drupal 13.0.0

*Source: [Entity query methods no longer implicitly support passing different query objects](https://www.drupal.org/node/3585318), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
