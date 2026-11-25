---
name: trustedcallbackinterface-trigger-silenced-deprecation-is
title: "TrustedCallbackInterface::TRIGGER_SILENCED_DEPRECATION is deprecated and no longer triggers a deprecation"
description: "TrustedCallbackInterface::TRIGGER_SILENCED_DEPRECATION is deprecated and no longer triggers a deprecation"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3627046
change-record-nid: 3627046
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3081025](https://www.drupal.org/node/3081025)

`TrustedCallbackInterface::TRIGGER_SILENCED_DEPRECATION` was introduced so core could add the concept of trusted callbacks while not breaking existing code. Now trusted callbacks are in wide use and this feature is no longer used in core, the ability to trigger silenced deprecations is now removed.

There were no known uses of this feature in contrib and it is unlikely that it was used in custom code so this change will not affect most sites.

*Source: [TrustedCallbackInterface::TRIGGER_SILENCED_DEPRECATION is deprecated and no longer triggers a deprecation](https://www.drupal.org/node/3627046), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
