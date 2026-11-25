---
id: cr-recipe-optional-action
title: Recipe actions that tolerate missing blocks
kind: site-building
guides: [config-actions-can-now-be-skipped-if-the-entity-does-not]
---

Write a recipe in `recipes/bench_quiet_footer` that turns off the block `block.block.olivero_powered`, and also `block.block.olivero_syndicate` and `block.block.bench_promo` where those exist. The recipe must apply cleanly on sites that lack any of them (this site has no `bench_promo` block) and must not create them. Apply it to this site.
