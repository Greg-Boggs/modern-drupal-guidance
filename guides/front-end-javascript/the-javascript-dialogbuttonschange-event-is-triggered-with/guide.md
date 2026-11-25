---
name: the-javascript-dialogbuttonschange-event-is-triggered-with
title: "The JavaScript dialogButtonsChange event is triggered with a CustomEvent instead of jQuery"
description: "The JavaScript dialogButtonsChange event is triggered with a CustomEvent instead of jQuery"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3464202
change-record-nid: 3464202
introduced-in-version: "11.2.x"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.x\
Issue links: [#3460979](https://www.drupal.org/node/3460979)

The JavaScript event `dialogButtonsChange` is now a DOM event and should be triggered though a `CustomEvent`.

## Before

```php
$(dialog).trigger('dialogButtonsChange');
```

## After

```php
dialog.dispatchEvent(new CustomEvent('dialogButtonsChange'));
```

*Source: [The JavaScript dialogButtonsChange event is triggered with a CustomEvent instead of jQuery](https://www.drupal.org/node/3464202), a Drupal core change record by [finnsky](https://www.drupal.org/user/2755993) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
