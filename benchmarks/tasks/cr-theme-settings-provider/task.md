---
id: cr-theme-settings-provider
title: Read theme settings from a service
kind: code
guides: [theme-get-setting-is-deprecated]
---

Create a module called `bench_themeset` in `web/modules/custom` and turn it on. `setting($name, $theme = NULL)` on `bench_themeset.reader` returns a theme setting (for example `logo.use_default` or `features.favicon`) for that theme, or for the active theme when no theme is given, including values the theme takes from the global theme settings, exactly as Drupal resolves them.
