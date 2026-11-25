---
id: cr-aggregate-compression-off
title: Stop writing precompressed CSS and JS aggregates
kind: site-building
guides: [brotli-compression-support-added-for-css-and-javascript]
---

This site sits behind a CDN that compresses every response itself, so Drupal no longer needs to write its own compressed copies of the combined CSS and JavaScript files. Stop that for both CSS and JavaScript. Leave the setting that combines CSS and JavaScript files as it is.
