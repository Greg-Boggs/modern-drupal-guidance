---
name: correctly-display-form-description-before-the-field-prefix
title: "Correctly display form description before the field prefix"
description: "Correctly display form description before the field prefix"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3523777
change-record-nid: 3523777
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3459838](https://www.drupal.org/node/3459838)

A form element's `#field_prefix` is intended to be displayed before and inline with the element in order to enable use cases such as displaying a currency symbol immediately before a number field. When the ability to display element descriptions before the element was added, it was mistakenly placed between the prefix and input.

This bug is now resolved for Core templates. If you have overridden the `form-element.html.twig` template, then you should update your template accordingly.

Before:

```php
...
  {% if prefix is not empty %}
    <span class="field-prefix">{{ prefix }}</span>
  {% endif %}
  {% if description_display == 'before' and description.content %}
    <div{{ description.attributes.addClass(description_classes) }}>
      {{ description.content }}
    </div>
  {% endif %}
...
```

After:

```php
...
  {% if description_display == 'before' and description.content %}
    <div{{ description.attributes.addClass(description_classes) }}>
      {{ description.content }}
    </div>
  {% endif %}
  {% if prefix is not empty %}
    <span class="field-prefix">{{ prefix }}</span>
  {% endif %}
...
```

*Source: [Correctly display form description before the field prefix](https://www.drupal.org/node/3523777), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
