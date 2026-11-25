---
name: htaccesswriter-requires-a-settings-constructor-argument
title: "HtaccessWriter requires a Settings constructor argument"
description: "HtaccessWriter requires a Settings constructor argument"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3249817
change-record-nid: 3249817
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#360057](https://www.drupal.org/node/360057)

HtaccessWriter now requires a Settings constructor argument.

Before

```php
file.htaccess_writer:
    class: Drupal\Core\File\HtaccessWriter
    arguments: ['@logger.channel.security', '@stream_wrapper_manager']
```

After

```php
  file.htaccess_writer:
    class: Drupal\Core\File\HtaccessWriter
    arguments: ['@logger.channel.security', '@stream_wrapper_manager', '@settings']
```

*Source: [HtaccessWriter requires a Settings constructor argument](https://www.drupal.org/node/3249817), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
