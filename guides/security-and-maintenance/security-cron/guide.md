---
name: security-cron
title: "Configuring Cron Maintenance Tasks"
description: "How to run cron maintenance tasks using the core Automated Cron module, or by running them from outside the site."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/security-cron.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Check whether cron maintenance tasks are run regularly, and if not, either
install the core Automated Cron module or run cron maintenance tasks from
outside the website.
## Prerequisite knowledge

{{ GUIDE_REF("security-cron-concept") }}
## Steps

1. Review the _Status report_ (see {{ GUIDE_REF("prevent-status") }}) to see when cron
    maintenance tasks were last run.

    If you installed the website using the core Standard installation profile (or
    similar), then cron maintenance tasks might already be running via the
    core Automated Cron module.  By default, these tasks are run about every three
    hours.

1. Choose whether to run cron maintenance tasks using the core Automated Cron
    module, or by other means. The core Automated Cron module might not be suitable
    for some websites because:
    * Each time someone accesses a page on the site, the module checks how long it
      has been since cron maintenance tasks have last run, and then runs them if
      necessary. If no one visits the website for a long time, cron maintenance
      tasks will not be run.
    * Cron maintenance tasks are run after the page has been generated. This means
      there is less time for the tasks to be run before various server timeouts are
      reached (for example, PHP execution timeout). If this happens, the logs (see
      {{ GUIDE_REF("prevent-log") }}) will show error messages that cron is unable to complete.
    * There is a small [scalability](https://en.wikipedia.org/wiki/Scalability) cost
      associated with the core Automated Cron module. This is because one of the web
      server's processes is occupied (and can't serve other web pages) until the
      cron maintenance tasks are complete.
1. If you want to use the core Automated Cron module, first make sure it is
    installed (it is installed with the core Standard install profile; see
    {{ GUIDE_REF("config-install") }} if it is not installed).

    Next, configure the module to control how frequently cron maintenance tasks are
    run. In the _Manage_ administrative menu, navigate to _Configuration_ >
    _System_ > _Cron_ (_admin/config/system/cron_). Select the desired interval from
    the _Run cron every_ field under _Cron settings_, and click _Save
    configuration_.
    ![Configure the core Automated Cron module](https://www.drupal.org/docs/user_guide/en/images/security-cron.png)

1. If you want to run cron maintenance tasks from outside the website, uninstall
    the core Automated Cron module (see {{ GUIDE_REF("config-uninstall") }}). Next, find the
    cron URL. This URL is shown in the _Status report_ (see {{ GUIDE_REF("prevent-status") }}), and
    in the _Cron_ administration page (see previous step). The URL looks
    like this:
    _http://www.example.com/cron/0MgWtfB33FYbbQ5UAC3L0LL3RC0PT3RNUBZILLA0Nf1Re_

    Whenever this URL is visited, cron maintenance tasks will run. Set up one of
    the following schedulers to access this URL regularly:

    * [The Cron daemon](https://www.drupal.org/docs/7/setting-up-cron/configuring-cron-jobs-using-the-cron-command) (Linux, OS X, Solaris, BSD)
    * [Scheduled Tasks](https://www.drupal.org/docs/7/setting-up-cron-for-drupal/configuring-cron-jobs-with-windows) (Windows)
    * A cron SASS provider (software as a service)
    * A cron manager provided by your web hosting provider (see the documentation
      provided by your provider)

## Related concepts

{{ GUIDE_REF("security-concept") }}
## Videos

[Configuring Cron Maintenance Tasks](https://www.youtube.com/watch?v=ts4g1jTEAt4)

## Additional resources

* [Drush page "Running Drupal cron tasks from Drush"](https://www.drush.org/latest/cron/)
* [_Drupal.org_ community documentation page "Setting up cron"](https://www.drupal.org/docs/7/setting-up-cron/overview)

*Attributions*

Written and edited by [Dave Hansen-Lange](https://www.drupal.org/u/dalin) at
[Advomatic](https://www.advomatic.com/),
[Boris Doesborg](https://www.drupal.org/u/batigolix),
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Configuring Cron Maintenance Tasks](https://www.drupal.org/docs/user_guide/en/security-cron.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
