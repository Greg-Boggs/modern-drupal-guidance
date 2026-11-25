---
name: setquery-and-getquery-added-to-conditionaggregateinterface
title: "setQuery() and getQuery() added to ConditionAggregateInterface"
description: "setQuery() and getQuery() added to ConditionAggregateInterface"
drupal-core: ">=11.4.3"
source-url: https://www.drupal.org/node/3603991
change-record-nid: 3603991
introduced-in-version: "11.4.3"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.3\
Issue links: [#3593233](https://www.drupal.org/node/3593233)

Two methods have been added to `\Drupal\Core\Entity\Query\ConditionAggregateInterface`:

- `setQuery(QueryInterface $query): static`
- `getQuery(): QueryInterface`

These methods were already implemented on all core aggregate condition classes via the `ConditionFundamentals` trait (used by `ConditionAggregateBase`), but were not part of the interface contract. They are now declared on the interface so that `QueryBase::__clone()` and `Sql\Query::__clone()` can safely re-parent cloned aggregate conditions.

### Before

Cloning an aggregate query shared the aggregate condition tree between the original and the clone — calling conditionAggregate() on the clone also modified the original.

### After

Cloning an aggregate query produces an independent copy with its own aggregate condition tree.

### What you need to do

If you have a custom class that directly implements `ConditionAggregateInterface` (not by extending `ConditionAggregateBase`), you must now implement `setQuery()` and `getQuery()`.\
If your class already uses the `ConditionFundamentals` trait or extends `ConditionAggregateBase`, no change is needed.

*Source: [setQuery() and getQuery() added to ConditionAggregateInterface](https://www.drupal.org/node/3603991), a Drupal core change record by [amitgoyal](https://www.drupal.org/user/56441) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
