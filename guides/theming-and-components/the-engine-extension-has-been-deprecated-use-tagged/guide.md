---
name: the-engine-extension-has-been-deprecated-use-tagged
title: "The .engine extension has been deprecated. Use tagged services instead."
description: "The .engine extension has been deprecated. Use tagged services instead."
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3547356
change-record-nid: 3547356
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#1685492](https://www.drupal.org/node/1685492)

Theme engine extensions have been deprecated. Theme engines must now be a tagged services in modules.

In a module implement `\Drupal\Core\Theme\ThemeEngineInterface`\
Tag the service as a `theme_engine`:

```php
  Drupal\Core\Template\TwigThemeEngine:
    class: Drupal\Core\Template\TwigThemeEngine
    autowire: true
    tags:
      - { name: theme_engine, engine_name: twig }
```

If your theme *depends* on a custom engine you will need to do the following.

- Add a dependency to the module providing the dependency.
- Ensure the module gets installed as part of the conversion otherwise it will not be available

Theme engines no longer support preprocess hooks.\
Any preprocess hooks implemented by the theme engine should be moved to the module providing the new theme engine service.

The ThemeManager service now requires the set of theme_engine services to be passed into the constructor as a service locator:

```php
    #[AutowireLocator('theme_engine', 'engine_name')]
    protected ContainerInterface $themeEngines,
```

*Source: [The .engine extension has been deprecated. Use tagged services instead.](https://www.drupal.org/node/3547356), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
