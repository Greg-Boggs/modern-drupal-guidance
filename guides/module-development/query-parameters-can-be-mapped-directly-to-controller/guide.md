---
name: query-parameters-can-be-mapped-directly-to-controller
title: "Query parameters can be mapped directly to controller arguments"
description: "Query parameters can be mapped directly to controller arguments"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567958
change-record-nid: 3567958
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3559628](https://www.drupal.org/node/3559628)

The `#[MapQueryParameters]` attribute from Symfony is now supported in Drupal. Controllers that access query string parameters can now declare them directly in the method signature instead of having to read them from the request.

Before:

```php
  public function setDefaultTheme(Request $request) {
    $theme = $request->query->get('theme');
```

After:

```php
  public function setDefaultTheme(#[MapQueryParameter] string $theme) {
```

Mapped arguments can be typed, validated, and nullable or provide default values where this is needed. See the [Symfony documentation](https://symfony.com/blog/new-in-symfony-6-3-query-parameters-mapper) for more details.

*Source: [Query parameters can be mapped directly to controller arguments](https://www.drupal.org/node/3567958), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
