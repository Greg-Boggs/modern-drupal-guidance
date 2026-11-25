---
id: code-oop-hooks
title: Hooks for article titles and module help
kind: code
guides: [oop-hooks, module-development]
---

Create a module called `bench_hooks` in `web/modules/custom` and turn it on. Editors type article titles carelessly. When an article is saved, remove spaces at the start and end of its title and capitalise each word, so `  hello drupal world ` is saved as `Hello Drupal World`. Leave the titles of other content types alone. The module's help page at `/admin/help/bench_hooks` should say `Bench hooks tidies article titles.`
