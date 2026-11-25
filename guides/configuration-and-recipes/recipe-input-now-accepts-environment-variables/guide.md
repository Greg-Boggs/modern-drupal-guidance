---
name: recipe-input-now-accepts-environment-variables
title: "Recipe input now accepts environment variables"
description: "Recipe input now accepts environment variables"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3524496
change-record-nid: 3524496
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3523988](https://www.drupal.org/node/3523988)

In addition to `config` and `value`, recipe's input source element now accepts `env`. If `source` is `env`, there must also be an `env` element, which is the name of an environment variable to return.

The value will always be returned as a string. If the environment variable is not set, an empty string will be returned.

**Example:**

```php
name: 'Input from environment variables'
input:
  name:
    data_type: string
    description: The name of the site.
    default:
      # Set the source to look for an environment variable.
      source: env
      # Define the name of the environment variable.
      env: SITE_NAME
  slogan:
    data_type: string
    description: The site slogan.
    default:
      source: env
      env: SITE_SLOGAN
config:
  actions:
    system.site:
      # Use the input in the same way we always have.
      simpleConfigUpdate:
        name: ${name}
        slogan: ${slogan}
```

*Source: [Recipe input now accepts environment variables](https://www.drupal.org/node/3524496), a Drupal core change record by [thejimbirch](https://www.drupal.org/user/2507260) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
