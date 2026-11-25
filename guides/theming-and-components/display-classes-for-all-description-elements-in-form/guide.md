---
name: display-classes-for-all-description-elements-in-form
title: "Display classes for all description elements in form-element.html.twig"
description: "Display classes for all description elements in form-element.html.twig"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3482370
change-record-nid: 3482370
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2700439](https://www.drupal.org/node/2700439)

In the template `form-element.html.twig`, certain classes are added to the `div` element that contains the form element description. These classes were added only when `description_display` was set to "after" or "invisible", but not when it was set to "before". With this change, the classes will always be set.

The files that are changed are the core `form-element.html.twig` and that template in themes `stable9`, `starterkit_theme`, and `umami`.

Before:

```php
    <div{{ description.attributes }}>
      {{ description.content }}
    </div>
```

After:

```php
    <div{{ description.attributes.addClass(description_classes) }}>
      {{ description.content }}
    </div>
```

*Source: [Display classes for all description elements in form-element.html.twig](https://www.drupal.org/node/3482370), a Drupal core change record by [arunkumark](https://www.drupal.org/user/2994023) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
