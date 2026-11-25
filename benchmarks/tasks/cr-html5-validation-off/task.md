---
id: cr-html5-validation-off
title: Turn off browser-native form validation site-wide
kind: site-building
guides: [html5-validation-will-be-disabled-in-drupal-12]
---

Screen reader users report that the browser's own validation pop-ups get in the way of Drupal's accessible error messages. Make every form on the site skip the browser's built-in validation, so Drupal's own error messages always show. Fields must stay marked as required and keep their input types. Set this once for the whole site in `web/sites/default/settings.php`, without writing custom code.
