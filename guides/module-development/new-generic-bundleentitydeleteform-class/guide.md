---
name: new-generic-bundleentitydeleteform-class
title: "New generic BundleEntityDeleteForm class"
description: "New generic BundleEntityDeleteForm class"
drupal-core: ">=11.6"
source-url: https://www.drupal.org/node/3571991
change-record-nid: 3571991
introduced-in-version: "11.6.0"
introduced-in-branch: "11.6.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.6.x\
Introduced in version: 11.6.0\
Issue links: [#3571580](https://www.drupal.org/node/3571580)

Entities which are bundles of another entity type should not be deleted if there are entities of that bundle. For example, the 'article' node type entity should not be deleted if there are any nodes of type 'article'.

The new entity delete form class `\Drupal\Core\Entity\BundleEntityDeleteForm` provides a check for this. To use it, add the following to the definition of any custom bundle entity types:

```php
// In the bundle entity attribute handlers array:
     'form' => [
       'add' => MyBundleEntityForm::class,
       'edit' => MyBundleEntityForm::class,
       'delete' => BundleEntityDeleteForm::class,
     ],
```

Bundle entity types which require additional logic to prevent the deletion of entities may subclass `\Drupal\Core\Entity\BundleEntityDeleteForm` and override the method `getReasonsToPreventDeletion()`. For an example, see `\Drupal\comment\Form\CommentTypeDeleteForm`.

*Source: [New generic BundleEntityDeleteForm class](https://www.drupal.org/node/3571991), a Drupal core change record by [joachim](https://www.drupal.org/user/107701) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
