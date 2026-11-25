---
name: ckeditor-5-additemtotoolbar-now-supports-adding-multiple
title: "CKEditor 5 AddItemToToolbar now supports adding multiple items"
description: "CKEditor 5 AddItemToToolbar now supports adding multiple items"
drupal-core: ">=11.4.9"
source-url: https://www.drupal.org/node/3624154
change-record-nid: 3624154
introduced-in-version: "11.4.9"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.9\
Issue links: [#3507570](https://www.drupal.org/node/3507570)

When using `addItemToToolbar` in a recipe, currently you can only add a single toolbar item to CKEditor within one recipe. Example:

```php
name: Add specialCharacters to Rich Editor
description: 'A recipe to add specialCharacters to the Rich Editor with CKEditor 5'
config:
  actions:
    editor.editor.full_html:
      addItemToToolbar:
        item_name: 'specialCharacters'
```

Drupal core now supports using `addItemToToolbar` or its alias `addItemsToToolbar` to add multiple items to the CKEditor toolbar. Example:

```php
name: Add specialCharacters and codeBlock to Rich Editor
description: 'A recipe to add specialCharacters and codeBlock to the Rich Editor with CKEditor 5'
config:
  actions:
    editor.editor.full_html:
      addItemsToToolbar:
        - specialCharacters
        - codeBlock
```

*Source: [CKEditor 5 AddItemToToolbar now supports adding multiple items](https://www.drupal.org/node/3624154), a Drupal core change record by [dmundra](https://www.drupal.org/user/866436) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
