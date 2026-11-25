---
name: hooks-are-no-longer-event-listeners
title: "Hooks are no longer event listeners"
description: "Hooks are no longer event listeners"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3550627
change-record-nid: 3550627
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3506930](https://www.drupal.org/node/3506930)

The module hook system no longer utilizes the event dispatcher for gathering hook implementations and therefore no longer tags automatically registered hook services as event listeners.

This *significantly* improves performance by reducing the container size and memory required for requests.

There are **no changes** to how OOP hooks are defined and used (exception: dynamically registered hooks through a service provider, see below)

Information about hooks is now stored in the hook_data key value store, this is considered internal information and directly accessing that information is not supported and there is no backwards compatibility contract, it's structure may change again in the future.

There is a new ImplementationList class to assist with sorting, filtering and looping over hook implementations.

Information about preprocess hooks has also been moved to the key value store and is no longer injected as a parameter into \Drupal\Core\Theme\Registry, instead, the key value factory is injected.

### Backwards compatibility breaks

If you decorated or directly created the ModuleHandler class then you will need to update your code to match the new constructor and methods.

If you [utilized a service provider to inject hooks dynamically](https://www.drupal.org/project/field_encrypt/issues/3486465#comment-15851339) you will need to update your code. Instead, you will now need to update the hook_list key in the hook_data key value collection. Per previous comment, this is discouraged and not recommended. A possible alternative may be to check a runtime condition within the hook or [make the hook depend on a module once that is supported.](https://www.drupal.org/node/3548805)

*Source: [Hooks are no longer event listeners](https://www.drupal.org/node/3550627), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
