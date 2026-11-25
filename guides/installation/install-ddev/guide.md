---
name: install-ddev
title: "Setting Up an Environment with DDEV"
description: "How to set up a development site using DDEV, a local development environment for PHP applications."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/install-ddev.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Set up a local development environment using DDEV to serve the application and
Composer to download the required files.
## Prerequisite knowledge

{{ GUIDE_REF("install-requirements") }}
{{ GUIDE_REF("install-composer") }}
## Why use DDEV?

DDEV is a local development environment for PHP applications built on Docker. It
includes all the necessary components to run the core software, and is used by
many developers in the Drupal community.
## Steps

1. Follow the
    [official DDEV installation instructions](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)
    to install DDEV on your local machine. DDEV is available for Windows, Mac, and
    Linux. The installation process is different for each operating system, so be
    sure to follow the instructions for your OS.
1. After installing DDEV, follow the
    [Drupal Quickstart instructions](https://ddev.readthedocs.io/en/stable/users/quickstart/#drupal)
    to download the core software using Composer and install it in the DDEV
    environment.
1. Run the command `ddev launch` from the directory created in the previous step
    to open the site in your web browser and confirm the environment is working
    correctly.

## Related topics

* {{ GUIDE_REF("install-requirements") }}
* {{ GUIDE_REF("install-dev-sites") }}
* {{ GUIDE_REF("install-tools") }}
## Additional resources

* [DDEV documentation](https://ddev.readthedocs.io/en/stable/)
* [Install Drupal using DDEV for local development](https://www.drupal.org/docs/getting-started/installing-drupal/install-drupal-using-ddev-for-local-development)

*Attributions*

Written and edited by [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me).

*Source: [Setting Up an Environment with DDEV](https://www.drupal.org/docs/user_guide/en/install-ddev.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
