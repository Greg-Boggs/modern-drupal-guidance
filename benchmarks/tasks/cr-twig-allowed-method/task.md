---
id: cr-twig-allowed-method
title: Let Twig call a value object's method
kind: code
guides: [new-twigallowed-method-attribute]
---

Create a module called `bench_tw` in `web/modules/custom` and turn it on. It has a class `Drupal\bench_tw\Badge`, created with a label, whose `shout()` returns the label in upper case followed by `!`. Our themers need to write `{{ badge.shout() }}` in templates, but Drupal refuses that call. Make it work for this method without loosening template security for anything else.
