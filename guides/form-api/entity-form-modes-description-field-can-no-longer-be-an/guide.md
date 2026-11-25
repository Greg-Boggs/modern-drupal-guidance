---
name: entity-form-modes-description-field-can-no-longer-be-an
title: "Entity form modes 'description' field can no longer be an empty string"
description: "Entity form modes 'description' field can no longer be an empty string"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3452144
change-record-nid: 3452144
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3448457](https://www.drupal.org/node/3448457)

In order to not have a `description` in a form mode the `description` field must be set to NULL. Previously, an empty string was allowed.

#### Before

```php
langcode: en
status: true
dependencies:
  module:
    - user
id: user.register
label: Register
description:''
targetEntityType: user
cache: true
```

This is `core.entity_form_mode.user.register.yml` before the change.

#### After

```php
langcode: en
status: true
dependencies:
  module:
    - user
id: user.register
label: Register
description: null
targetEntityType: user
cache: true
```

This is `core.entity_form_mode.user.register.yml` after the change.

If this field is NULL, `\Drupal\Core\Entity\EntityDisplayModeBase::getDescription()` will return an empty string, for backwards compatibility.

*Source: [Entity form modes 'description' field can no longer be an empty string](https://www.drupal.org/node/3452144), a Drupal core change record by [narendrar](https://www.drupal.org/user/1730192) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
