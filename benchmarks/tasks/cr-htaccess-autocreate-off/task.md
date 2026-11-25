---
id: cr-htaccess-autocreate-off
title: Stop Drupal writing .htaccess files
kind: site-building
guides: [automatic-creation-of-htaccess-files-can-be-disabled]
---

This site runs on nginx, whose configuration already protects the public, private and temporary file folders, so Drupal should stop creating `.htaccess` files in them. Put the setting in `web/sites/default/settings.php`.
