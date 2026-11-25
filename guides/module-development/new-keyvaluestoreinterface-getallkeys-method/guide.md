---
name: new-keyvaluestoreinterface-getallkeys-method
title: "New KeyValueStoreInterface::getAllKeys() method"
description: "New KeyValueStoreInterface::getAllKeys() method"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3563733
change-record-nid: 3563733
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3563639](https://www.drupal.org/node/3563639)

A method to get all keys in a KeyValue collection, `getAllKeys()`, has been added to `\Drupal\Core\KeyValueStore\KeyValueStoreInterface`.

This method lets you know the keys of the items in a given collection without the need of loading all those items. This can help to reduce memory usage where a collection has a large number of items or when the items themselves are large.

*Source: [New KeyValueStoreInterface::getAllKeys() method](https://www.drupal.org/node/3563733), a Drupal core change record by [plopesc](https://www.drupal.org/user/282415) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
