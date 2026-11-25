---
id: cr-node-form-namespace
title: Custom node add/edit form class
kind: code
guides: [nodeform-and-nodetypeform-have-moved-to-the-drupal-node, oop-hooks]
---

Create a module called `bench_nodeform` in `web/modules/custom` and turn it on. Every node add and edit form should show `Remember to proofread.` at the top. Do it by making Drupal use the class `Drupal\bench_nodeform\Form\BenchNodeForm` as the node add and edit form. It builds on core's own node form, keeps everything that form does, and adds an element keyed `bench_reminder` with the reminder.
