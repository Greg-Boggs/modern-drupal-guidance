---
name: string-formatter-can-now-also-link-to-an-entitys-edit-form
title: "String formatter can now also link to an entity's edit form"
description: "String formatter can now also link to an entity's edit form"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3585330
change-record-nid: 3585330
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3544339](https://www.drupal.org/node/3544339)

From 11.4.0 the string formatter (available on most string fields) can now also link to an entity's edit form.

If the entity has an edit form and a canonical link, site builders can choose which link relation to link to

![A screenshot of the string formatter configuration form showing the option to select linking to either the entity or its edit form](https://www.drupal.org/files/issues/2025-10-01/Screenshot%202025-10-01%20at%207.01.50%E2%80%AFam.png)

---

If you alter this form and you are not seeing your options, ensure you add

```php
$form['link_rel']['#access'] = count($form['link_rel']['#options']) > 1;
```

after setting them.

*Source: [String formatter can now also link to an entity's edit form](https://www.drupal.org/node/3585330), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
