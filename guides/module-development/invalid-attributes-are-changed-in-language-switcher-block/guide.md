---
name: invalid-attributes-are-changed-in-language-switcher-block
title: "Invalid attributes are changed in language switcher block HTML"
description: "Invalid attributes are changed in language switcher block HTML"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3556699
change-record-nid: 3556699
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2454289](https://www.drupal.org/node/2454289)

The default HTML for the language switcher block contains an unordered list whose list items had an `hreflang` attribute which `hreflang` contained the two-letter code for the linked language. The `hreflang` attribute is not allowed on `<li>` elements. This attribute has been changed to `data-drupal-language`.

Before:

```php
<ul class="links">
  <li hreflang="en" data-drupal-link-system-path="&lt;front&gt;"><a href="/" class="language-link" hreflang="en" data-drupal-link-system-path="&lt;front&gt;">English</a></li>
  <li hreflang="is" data-drupal-link-system-path="&lt;front&gt;"><a href="/is" class="language-link" hreflang="is" data-drupal-link-system-path="&lt;front&gt;">Icelandic</a></li>
</ul>
```

After:

```php
<ul class="links">
  <li data-drupal-language="en" data-drupal-link-system-path="&lt;front&gt;"><a href="/" class="language-link" hreflang="en" data-drupal-link-system-path="&lt;front&gt;">English</a></li>
  <li data-drupal-language="is" data-drupal-link-system-path="&lt;front&gt;"><a href="/is" class="language-link" hreflang="is" data-drupal-link-system-path="&lt;front&gt;">Icelandic</a></li>
</ul>
```

*Source: [Invalid attributes are changed in language switcher block HTML](https://www.drupal.org/node/3556699), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
