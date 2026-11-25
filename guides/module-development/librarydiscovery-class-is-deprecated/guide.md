---
name: librarydiscovery-class-is-deprecated
title: "LibraryDiscovery class is deprecated"
description: "LibraryDiscovery class is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3462970
change-record-nid: 3462970
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3462871](https://www.drupal.org/node/3462871)

The LibraryDiscovery class and the `library.discovery.collector` service has been deprecated.

Code should already interact with the `library.discovery` service directly, which now uses the `LibraryDiscoveryCollector` class.

*Source: [LibraryDiscovery class is deprecated](https://www.drupal.org/node/3462970), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
