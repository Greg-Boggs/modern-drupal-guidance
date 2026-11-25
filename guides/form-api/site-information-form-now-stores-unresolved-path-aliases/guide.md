---
name: site-information-form-now-stores-unresolved-path-aliases
title: "Site information form now stores unresolved path aliases for front, 403, and 404 pages"
description: "Site information form now stores unresolved path aliases for front, 403, and 404 pages"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3572707
change-record-nid: 3572707
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#1503146](https://www.drupal.org/node/1503146)

Previously, when you set the front page, 403 page, or 404 page on `/admin/config/system/site-information`, Drupal would convert path aliases to internal paths before saving. For example, if you entered /home (an alias for /node/1), the config stores /node/1.

This could cause redirects to /home instead of / when the front page is an aliased path, and it tied configuration to internal paths and thus to specific content (e.g. node IDs).

As of [#1503146: Aliased paths cannot be set as front page](https://www.drupal.org/project/drupal/issues/1503146), the front page and error pages now save exactly what you type, regardless of whether it is an alias or a system path. If you enter /home, that's what will be stored in config. The issue introduces a new path matcher that fixes the redirection problem -- in our example, visit / will no longer redirect to /home.

The main "gotcha" here is that, if you set the front page to /home (a.k.a. node/1) and then you change node 1's path alias to something else, your home page will suddenly be a 404, and you will need to remember to update it in site settings.

The same idea applies to custom 403 and 404 paths.

*Source: [Site information form now stores unresolved path aliases for front, 403, and 404 pages](https://www.drupal.org/node/3572707), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
