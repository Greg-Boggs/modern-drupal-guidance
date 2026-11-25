---
name: new-config-action-called-setproperties-for-use-on
title: "New config action called setProperties for use on configuration entities. simpleConfigUpdate will no longer be allowed for use on configuration entities"
description: "New config action called setProperties for use on configuration entities. simpleConfigUpdate will no longer be allowed for use on configuration entities"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3515543
change-record-nid: 3515543
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3439713](https://www.drupal.org/node/3439713)

It has long been a crutch that we allow the `simpleConfigUpdate` config action to be applied to not just simple config files, but also configuration entities.

We have introduced a new config action called `setProperties` that allows for a similar experience for recipe authors.

To update your recipes, just replace the old action with the new one. That said, **you should continue to use `simpleConfigUpdate` to alter simple config** (i.e., anything that is not a config entity).

**Deprecated way**

```php
config:
  actions:
    # This is a config entity, since there could be more than one of them -- i.e., there could be several config items that start with `openid_connect.client`. This, therefore, is not an appropriate usage of simpleConfigUpdate.
    openid_connect.client.okta:
      simpleConfigUpdate:
        label: "My label"
        settings.client_id: my_id
```

**New way**

```php
config:
  actions:
    openid_connect.client.okta:
      # Replace simpleConfigUpdate with setProperties.
      setProperties:
        label: "My label"
        # Can also target nested properties.
        settings.client_id: my_id
```

You cannot change the ID, nor the UUID keys of any config entity files.

*Source: [New config action called setProperties for use on configuration entities. simpleConfigUpdate will no longer be allowed for use on configuration entities](https://www.drupal.org/node/3515543), a Drupal core change record by [thejimbirch](https://www.drupal.org/user/2507260) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
