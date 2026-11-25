---
id: cr-recipe-env-input
title: Recipe that reads the slogan from the environment
kind: site-building
guides: [recipe-input-now-accepts-environment-variables, recipe-input-config-and-env-source-elements-can-now-have]
---

Write a recipe in `recipes/bench_slogan` that sets the site slogan. The slogan is a recipe setting named `slogan`: by default it comes from the environment variable `BENCH_SLOGAN`, or is `Made with Drupal` when that variable is not set. Apply the recipe to this site with `BENCH_SLOGAN` set to `Built with recipes` for the command that applies it, without typing the slogan in.
