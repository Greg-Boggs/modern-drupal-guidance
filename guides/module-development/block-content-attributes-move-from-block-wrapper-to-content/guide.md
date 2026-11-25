---
name: block-content-attributes-move-from-block-wrapper-to-content
title: "Block content attributes move from block wrapper to content wrapper"
description: "Block content attributes move from block wrapper to content wrapper"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3525287
change-record-nid: 3525287
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2486267](https://www.drupal.org/node/2486267)

From Drupal 11.4, attributes in a block content render array `#attributes` key are merged into the inner content wrapper (`<div class="content">`), not the outer block wrapper.

To apply attributes to the entire block, set the attributes in the render array `#wrapper_attributes` key instead.

Previously, if a block's content render array contained an `#attributes` key, then those attributes would be merged into the `<div>` wrapper for the entire block.

### Example

Given a render array like:

```php
return [
  '#attributes' => [
    'class' => [
      'foo'
    ],
    'data-content-custom' => 'bar',
  ],
  '#wrapper_attributes' => [
    'data-wrapper-custom' => 'baz',
  ],
  '#markup' => 'Sample content',
];
```

#### Before

```php
<div id="block-foobartest" class="foo" data-content-custom="bar" data-wrapper-custom="baz">
  <div class="content">
    Sample content.
  </div>
</div>
```

#### After

```php
<div id="block-foobartest" data-wrapper-custom="baz">
  <div class="content foo" data-content-custom="bar">
    Sample content.
  </div>
</div>
```

*Source: [Block content attributes move from block wrapper to content wrapper](https://www.drupal.org/node/3525287), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
