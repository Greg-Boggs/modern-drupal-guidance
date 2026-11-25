---
name: wrapper-format-to-use-htmxrenderer-added
title: "Wrapper format to use HtmxRenderer added"
description: "Wrapper format to use HtmxRenderer added"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3544666
change-record-nid: 3544666
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3522597](https://www.drupal.org/node/3522597)

Drupal uses wrapper format query parameters to adjust the format of responses on a given path. Drupal 11.3 adds a wrapper format for use with HTMX. This format returns the main content and needed JS/CSS assets in a very simple document.

The template used for the markup is very streamlined:

```php
<html>
  <head>
    <title>{{ title }}</title>
    <css-placeholder token="{{ placeholder_token }}">
    <js-placeholder token="{{ placeholder_token }}">
    <js-bottom-placeholder token="{{ placeholder_token }}">
  </head>
  <body>{{ content }}</body>
</html>
```

To use this format, add the query parameter to your url:

```php
$options = [
      'query' => [
        MainContentViewSubscriber::WRAPPER_FORMAT => 'drupal_htmx',
      ],
    ];
$url = Url::fromRoute('config.export_single', [], $options);
(new Htmx())
  ->post($url)
  ->select('*:has(>select[name="config_name"])')
  ->target('*:has(>select[name="config_name"])')
  ->swap('outerHTML')
  ->applyTo($form['config_type']);
```

*Source: [Wrapper format to use HtmxRenderer added](https://www.drupal.org/node/3544666), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
