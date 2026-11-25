---
name: saving-the-current-default-revision-as-a-non-default
title: "Saving the current default revision as a non-default revision is disallowed"
description: "Saving the current default revision as a non-default revision is disallowed"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3543212
change-record-nid: 3543212
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3499181](https://www.drupal.org/node/3499181)

It is possible to save the current default revision of an entity as the non-default revision. This results in inconsistent data as it only updates the revision data table but not the data table.

For example the following code snippet:

```php
$entity = Node::load(1);
$entity->set('title', 'new title');
$entity->isDefaultRevision(FALSE);
$entity->save();
```

Loading the entity or the revision will then produce a different result for that title.

This is now no longer allowed and attempting to do so will throw an exception. It is also not allowed to save a new entity as a non-default revision. This will be ignored half-way through the process, but insert/update hooks were in the past invoked with the default revision flag set to FALSE, possibly causing inconsistent behavior.

Essentially, saving an existing default revision as a non-default revision must be combined with saving it as a new revision or it must be kept as the default revision as having an entity without a default revision is not a valid state.

Either:

```php
$entity = Node::load(1);
$entity->set('title', 'new title');
$entity->isDefaultRevision(FALSE);
$entity->setNewRevision(TRUE);
$entity->save();
```

Or:

```php
$entity = Node::load(1);
$entity->set('title', 'new title');
// This should be the default in this scenario and this call should not be necessary.
$entity->isDefaultRevision(TRUE);
$entity->save();
```

*Source: [Saving the current default revision as a non-default revision is disallowed](https://www.drupal.org/node/3543212), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
