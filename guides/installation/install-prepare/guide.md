---
name: install-prepare
title: "Preparing to Install"
description: "How to download the core software and satisfy prerequisites for installation."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/install-prepare.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Outline the steps to download the core software, and handle any required
prerequisites.
## Prerequisite knowledge

* How to install and configure server software (if installing on your own
computer)
* How to set up hosting for a generic web site
* How to create a database
## Site prerequisites

Server software must be installed on the computer where you plan to host your
site. See {{ GUIDE_REF("install-requirements") }} for a list of requirements.

See {{ GUIDE_REF("install-ddev") }} for the recommended way to get started running the software
locally.

Depending on how you plan to download the core software, you may need to install
additional software tools first. See {{ GUIDE_REF("install-decide") }} and {{ GUIDE_REF("install-tools") }}.
## Steps

1. Choose methods for downloading and installing the core software, from those
    listed in {{ GUIDE_REF("install-decide") }}. The rest of these instructions apply to the
    Composer and manual download options; if you chose other options, like a
    one-click installer from a hosting provider, consult the relevant documentation
    for any additional steps.
1. Set up a URL and hosting for your site on the server. Verify that the hosting
    is working by putting a simple HTML file in the web root directory of the
    hosting, and visiting the URL for your site.
1. Create a database, along with a database user account with full access.
1. Download the core software files to the web root directory, using the method
    you decided on. See {{ GUIDE_REF("install-decide") }} for links to instructions.

## Expand your understanding

See {{ GUIDE_REF("install-run") }} to run the interactive installer.
## Videos

[Preparing to Install](https://www.youtube.com/watch?v=7Aib3y9DM80)

## Additional resources

[Drush](http://www.drush.org)

*Attributions*

Written and edited by [Drew Gorton](https://www.drupal.org/u/dgorton),
[Michael Lenahan](https://www.drupal.org/u/michaellenahan) at
[erdfisch](https://erdfisch.de),
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Preparing to Install](https://www.drupal.org/docs/user_guide/en/install-prepare.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
