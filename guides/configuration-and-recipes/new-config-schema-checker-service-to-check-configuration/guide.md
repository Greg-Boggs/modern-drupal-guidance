---
name: new-config-schema-checker-service-to-check-configuration
title: "New config.schema_checker service to check configuration schema in a development setting"
description: "New config.schema_checker service to check configuration schema in a development setting"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/2828126
change-record-nid: 2828126
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2625212](https://www.drupal.org/node/2625212)

This change adds `\Drupal\Core\Config\DevelopmentLenientConfigSchemaChecker` and the ` config.schema_checker` service to validate config schema on save. Only enabled in development.services.yml by default to help identify issues while developing.

*Source: [New config.schema_checker service to check configuration schema in a development setting](https://www.drupal.org/node/2828126), a Drupal core change record by [faline](https://www.drupal.org/user/303644) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
