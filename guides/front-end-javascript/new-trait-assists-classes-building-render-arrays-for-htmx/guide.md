---
name: new-trait-assists-classes-building-render-arrays-for-htmx
title: "New trait assists classes building render arrays for HTMX"
description: "New trait assists classes building render arrays for HTMX"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3549174
change-record-nid: 3549174
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3544486](https://www.drupal.org/node/3544486)

HTMX passes information about the context of the request in a [set of custom headers](https://htmx.org/reference/#request_headers). This information is useful to developers building dynamic responses.

The trait `Drupal\Core\Htmx\HtmxRequestInfoTrait` is included in Drupal 11.3 and has been added to `Drupal\Core\Form\FormBase`. This trait can be added to a controller or any other class building render arrays for HTMX.

`HtmxRequestInfoTrait` includes an abstract method which must be implemented on the exhibiting class:

```php
/**
   * Gets the request object.
   *
   * @return \Symfony\Component\HttpFoundation\Request
   *   The request object.
   */
  abstract protected function getRequest();
```

**Before**

```php
$trigger = $this->getRequest()->headers->get('HX-Trigger-Name');
if ($trigger === 'config_type') {
  …
}
elseif ($trigger === 'config_name') {
  …
}
```

**After**

```php
if ($this->getHtmxTriggerName() === 'config_type') {
  …
}
elseif ($this->getHtmxTriggerName() === 'config_name') {
  …
}
```

*Source: [New trait assists classes building render arrays for HTMX](https://www.drupal.org/node/3549174), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
