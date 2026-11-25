---
name: extend-config-versions
title: "Synchronizing Configuration Versions"
description: "How to synchronize the configuration between a development and live site using the core Configuration Manager module."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/extend-config-versions.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Synchronize the configuration between a development and live site.
## Prerequisite knowledge

* {{ GUIDE_REF("understanding-data") }}
* {{ GUIDE_REF("install-prepare") }}
* {{ GUIDE_REF("install-dev-sites") }}
* {{ GUIDE_REF("install-dev-making") }}
## Site prerequisites

* You must have a development copy of your production site. See
{{ GUIDE_REF("install-dev-making") }}.
* The core Configuration Manager module must be installed on both the
development and production sites. See {{ GUIDE_REF("config-install") }} for instructions on how
to install core modules.
* You must have changed configuration on either the production or development
site (the _source site_), and want to synchronize the changes to the other site
(the _destination site_). As an example, you can develop a new content type,
fields, and views on your development site, and when it is all working
correctly, deploy the changes to the live site.
* All configuration that should not be synchronized between the source and
destination sites must be stored in configuration overrides in the
_settings.php_ file rather than in the database. See {{ GUIDE_REF("install-dev-making") }}.
## Steps

1. In the source site, in the _Manage_ administrative menu, navigate to
    _Configuration_ > _Development_ > _Configuration synchronization_ > _Export_
    (_admin/config/development/configuration/full/export_).
1. Click _Export_. Your site will generate an archive of the full site
    configuration. Save the file on your local computer.
1. In the destination site, in the _Manage_ administrative menu, navigate to
    _Configuration_ > _Development_ > _Configuration synchronization_ > _Import_
    (_admin/config/development/configuration/full/import_).
1. Browse to find the downloaded configuration archive, and click _Upload_. Your
    configuration archive will be uploaded to the destination site, and you will be
    redirected to the configuration _Synchronize_ page
    (_admin/config/development/configuration_) with a message saying your files were
    uploaded.
1. Verify that the differences shown on the page are what you expect. You may see
    configuration items that have been added, deleted, or changed; for changed
    items, you can click _View differences_ to see what the changes are.
1. When you are satisfied, click _Import all_ to import the configuration
    changes.

## Expand your understanding

* If the changes you have made involve only one configuration item (such as one
view), you can use the single configuration export/import feature to deploy
the change between sites. See {{ GUIDE_REF("extend-deploy") }}.
* After the step where you export the full configuration from the source site,
you might also want to unpack the archive and commit it to a version control
system, such as Git, to track changes in your site configuration. See
{{ GUIDE_REF("extend-git") }}.
## Videos

[Synchronizing Configuration Versions](https://www.youtube.com/watch?v=dLUGQk8GKa0)

*Attributions*

Written by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Synchronizing Configuration Versions](https://www.drupal.org/docs/user_guide/en/extend-config-versions.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
