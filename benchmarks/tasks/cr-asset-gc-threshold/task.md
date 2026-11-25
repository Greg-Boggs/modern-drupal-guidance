---
id: cr-asset-gc-threshold
title: Keep CSS and JS aggregates for ten days across cache clears
kind: site-building
guides: [new-asset-garbage-collection-threshold]
---

When caches are cleared, Drupal deletes old combined CSS and JavaScript files. On this site it should delete only the ones older than ten days and keep newer ones, so CDN and browser caches stay warm. Put the setting in `web/sites/default/settings.php`.
