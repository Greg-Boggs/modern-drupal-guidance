---
name: trans-twig-tag-can-contain-rendered-expressions-that-return
title: "{% trans %} Twig tag can contain rendered expressions that return render arrays and MarkupInterface objects"
description: "{% trans %} Twig tag can contain rendered expressions that return render arrays and MarkupInterface objects"
drupal-core: ">=11.2.5"
source-url: https://www.drupal.org/node/2615198
change-record-nid: 2615198
introduced-in-version: "11.2.5"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.5\
Issue links: [#2334319](https://www.drupal.org/node/2334319)

## Summary

The Twig translation tag, `{% trans %}`, works with rendered expressions (`{{ }}`) that return render arrays and MarkupInterface objects. Previously, only rendered expressions returning scalar values could be used inside `{% trans %}` tags, and other types of values would cause warnings or errors.

The following will work:

```php
// Example render array variable built in a preprocess.
$variables['render_array'] = [
  '#prefix' => '<b>',
  '#markup' => 'render array in a trans tag',
  '#suffix' => '</b>',
];
```

In the Twig template which is provided the `render_array` variable.

```php
{% trans %}
 This is a {{ render_array }}.
{% endtrans %}
```

*Source: [{\% trans %} Twig tag can contain rendered expressions that return render arrays and MarkupInterface objects](https://www.drupal.org/node/2615198), a Drupal core change record by [joelpittet](https://www.drupal.org/user/160302) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
