---
name: elementinfomanager-no-longer-overwrites-a-form-elements-own
title: "ElementInfoManager no longer overwrites a form element's own #value_callback"
description: "ElementInfoManager no longer overwrites a form element's own #value_callback"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3619397
change-record-nid: 3619397
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3616663](https://www.drupal.org/node/3616663)

Elements implementing `FormElementInterface` can now declare a `#value_callback` in `getInfo()` and have it kept. `ElementInfoManager` used to overwrite it with the default `[<class>, 'valueCallback']`. Now it only applies that default if the element hasn't declared its own.

No action needed unless your element declares a custom `#value_callback`. It's respected now instead of discarded.

*Source: [ElementInfoManager no longer overwrites a form element's own #value_callback](https://www.drupal.org/node/3619397), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
