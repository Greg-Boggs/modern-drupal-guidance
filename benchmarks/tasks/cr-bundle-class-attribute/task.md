---
id: cr-bundle-class-attribute
title: Article bundle class without hooks
kind: code
guides: [entity-bundle-classes-can-be-defined-and-discovered-using]
---

Create a module called `bench_bundle` in `web/modules/custom` and turn it on. Our theme code calls `shout()` on articles to get the title in capitals. Loading or creating an article must give an object of the class `Drupal\bench_bundle\Entity\Article`, based on core's node class, whose `shout()` returns the title in upper case. Basic pages stay ordinary nodes.
