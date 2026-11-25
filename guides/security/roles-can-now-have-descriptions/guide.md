---
name: roles-can-now-have-descriptions
title: "Roles can now have descriptions"
description: "Roles can now have descriptions"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3617935
change-record-nid: 3617935
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#256287](https://www.drupal.org/node/256287)

Roles can now have human readable descriptions alongside the role name. This can be useful to document:

- why a role exists
- why you might want to grant it to a user (or why you shouldn't)
- what kinds of permissions a role receives

Set the description when creating/editing a role

![Screenshot of editing a role (including the new Description field)](https://www.drupal.org/files/Screenshot%202026-10-28%20at%205.00.53%E2%80%AFPM.png)

The description appears on the list of all roles\
![Screenshot of the list of all roles (including the new Description field)](https://www.drupal.org/files/Screenshot%202026-10-28%20at%205.01.06%E2%80%AFPM.png)

Correspondingly, `\Drupal\user\RoleInterface` has gained two new methods:

```php
public function getDescription(): string;
public function setDescription(string $description): static;
```

These are used to get and set the description respectively on a Role entity.

*Source: [Roles can now have descriptions](https://www.drupal.org/node/3617935), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
