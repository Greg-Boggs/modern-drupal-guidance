---
name: recipe-input-config-and-env-source-elements-can-now-have
title: "Recipe input config and env source elements can now have fallbacks set"
description: "Recipe input config and env source elements can now have fallbacks set"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3540260
change-record-nid: 3540260
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3537627](https://www.drupal.org/node/3537627)

When a recipe asks for input, it must contain a `source` element, which can be one of `config`, `env`, or `value`.

The `config` and `env source` elements can contain fallbacks which is helpful for when a config file is not available yet, or an environment variable does not exist.

**config source example:**

```php
input_name:
  default:
    source: config
    config: ['foo.settings', 'baz']
    fallback: bar
```

**environment source example:**

```php
input_name:
  default:
    source: env
    env: 'RUNTIME_ENVIRONMENT'
    fallback: 'DEV'
```

**fallback allows for null:**

```php
input_name:
  default:
    source: env
    env: 'FOO'
    fallback: null
```

`value` sources remain required and can not have a fallback.

*Source: [Recipe input config and env source elements can now have fallbacks set](https://www.drupal.org/node/3540260), a Drupal core change record by [thejimbirch](https://www.drupal.org/user/2507260) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
