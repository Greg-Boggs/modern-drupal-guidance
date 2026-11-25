---
name: install-run
title: "Running the Interactive Installer"
description: "How to use the interactive installer to install the core software."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/install-run.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Install the core software and create the admin account by running the included
installer.
## Site prerequisites

{{ GUIDE_REF("install-prepare") }}

Note that if you followed the instructions in {{ GUIDE_REF("install-ddev") }} the core software
was already installed. If you wish to install the core software again, you can
run the command `ddev drush sql:drop` and then follow the instructions below.
## Steps

1. If you are using a 1-click install from a hosting provider or demo site, you
    will most likely see some or all of the following screens as part of the
    installation process. If you uploaded the core files manually or using Composer,
    to start the installer, open a browser and visit the URL that you set up for
    your hosting.
1. Select a language on the first page of the installer; for example,
    English. You could optionally choose from any of the other listed languages.
    The language files for the chosen language will be downloaded and installed so
    that the rest of the installation process can be finished in the chosen
    language. After choosing a language, click _Save and continue_.
    ![Choose a language](https://www.drupal.org/docs/user_guide/en/images/install-run-1.png)
1. Select an installation profile. Installation profiles provide site features
    and functions for a specific type of site as a single download containing
    the core software, contributed modules, themes, and pre-defined
    configuration. Core contains two installation profiles. Select the core
    Standard installation profile. Click _Save and continue_.
    ![Choose an installation profile](https://www.drupal.org/docs/user_guide/en/images/install-run-2.png)
1. The next step in the installer will verify that your system meets the minimum
    requirements. If it does not, you'll be presented with an outline of what
    needs to be corrected in order to proceed. If it does, the installer will
    automatically advance to the next step.
1. Provide details of the database you created in the {{ GUIDE_REF("install-prepare") }}
    chapter. Then click _Save and continue_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Database name | The custom name given to the database | drupal |
    | Database username | Username created | databaseUsername |
    | Database password | Password chosen | ************ |


    ![Database configuration form](https://www.drupal.org/docs/user_guide/en/images/install-run-3.png)

1. The next step will display a progress bar under the heading _Installing
    Drupal_. After the installer has completed, it will automatically advance to
    the next step.
    ![Installation progress bar](https://www.drupal.org/docs/user_guide/en/images/install-run-4.png)
1. The next step is to configure some basic information about your new site
    (also notice if there is a warning about file permissions, for a later step).
    Note that the user account you create in this step is the site's admin
    account. See {{ GUIDE_REF("user-admin-account") }} for important information about this unique
    account. You can safely name this account "admin", and make sure to choose a
    secure and unique password.

    Fill in the form with the following information:

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Site name | The name chosen for the site | Anytown Farmers Market |
    | Site email address | The email associated with the site | info@example.com |
    | Username | The designated user's credentials | admin |
    | Password | The password chosen | ************ |
    | Confirm password | Repeat the password | ************ |
    | Email address | The user's email | admin@example.com |


    The remaining fields can likely be left at their default values.
    ![Configuration form](https://www.drupal.org/docs/user_guide/en/images/install-run-5.png)

1. Click _Save and continue_.
1. You will be redirected to the front page of your new site and you should see
    the message _Congratulations, you installed Drupal!_ displayed at the top of
    the page.
    ![Installation success](https://www.drupal.org/docs/user_guide/en/images/install-run-6.png)
1. You may have seen a warning in the Configuration step about file permissions,
    and you may continue to see this warning until you fix the permissions. To
    avoid the warning and make your site more secure, change the permissions on the
    _sites/default_ directory and the _sites/default/settings.php_ file so that they
    are read-only (you may need to consult your hosting company documentation about
    how to do that).

## Expand your understanding

Alternatively, you can install the software using Drush instead of the UI. Use
the following Drush command, from inside the directory that you downloaded the
software to, where _DB_NAME_, _DB_USER_ and _DB_PASS_ are your database's
credentials:

```text
drush site:install standard --db-url='mysql://DB_USER:DB_PASS@localhost/DB_NAME' --site-name=example
```

Check the Status Report to see if there are any problems with the
installation. See {{ GUIDE_REF("prevent-status") }}.
## Related concepts

* {{ GUIDE_REF("install-dev-sites") }}
* {{ GUIDE_REF("install-tools") }}
## Videos

[Running the Installer](https://www.youtube.com/watch?v=LGfRKKKDjv8)

## Additional resources

* [_Drupal.org_ community documentation page "Create a database"](https://www.drupal.org/docs/installing-drupal/step-3-create-a-database)
* [_Drupal.org_ community documentation section "Webhosting issues"](https://www.drupal.org/server-permissions)

*Attributions*

Written and edited by [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Running the Interactive Installer](https://www.drupal.org/docs/user_guide/en/install-run.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
