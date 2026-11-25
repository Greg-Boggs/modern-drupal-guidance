---
name: security-update-core
title: "Updating the Core Software"
description: "How to update the core software using the administrative interface or Drush."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/security-update-core.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Update the core software, either through the administrative interface or by
using Drush.
## Site prerequisites

* If you want to use Drush, Drush must be installed. See {{ GUIDE_REF("install-tools") }}.
* If your site is live, you should test this process in a development
environment before running it on your production site. See
{{ GUIDE_REF("install-dev-making") }}.
## Steps

1. Make a complete backup of your site. Refer to {{ GUIDE_REF("prevent-backups") }}.
1. Open _settings.php_ (_/sites/default/settings.php_) in any plain text
    editor. Find the line with the _$settings['update_free_access']_ variable. By
    default, it is set to "FALSE" due to security reasons. Change the setting to
    "TRUE":
    ```text
    $settings['update_free_access'] = TRUE;
    ```
1. Disable any caching technique (memcache, varnish, and so on) your application
    might be using.
1. Put your site in maintenance mode. See {{ GUIDE_REF("extend-maintenance") }}.
1. If you are using Composer to manage dependencies, skip the next six steps, and
    instead see {{ GUIDE_REF("install-composer") }} for instructions on downloading updated
    files. Continue with the _update.php_ step.
1. Download the tar.gz or zip file archive for the latest version of Drupal core
    for the branch you are currently using (such as 8.x or 9.x) from
    [_Drupal.org_ Drupal Core Downloads](https://www.drupal.org/project/drupal).
    See {{ GUIDE_REF("install-prepare") }} for more details on how to find the latest version.
1. Upload the archive file to your web hosting server.
1. Extract the archive file to a temporary directory on your server (should be
    outside the directory where the site is hosted). Your hosting control panel's
    file manager should provide a way to extract the files. Or, if you have
    terminal access to your hosting server (running Linux), you can use a command
    like:
    ```text
    tar -xzf drupal-8.3.2.tar.gz
    ```
1. In your site hosting directory, delete the _core_ and _vendor_ directories,
    and all files that are not in a subdirectory, including _.htaccess_,
    _composer.json_, and _autoload.php_. Don't delete custom and customized files
    because you may end up losing the custom functionality stored in them.
1. Copy the _core_ and _vendor_ directories and the non-custom/non-customized
    files that you deleted in the preceding step from the temporary directory to
    your site directory.
1. Run the _update.php_ script using either of the following:
    * Visit _http://www.example.com/update.php_ in your browser (where
      _www.example.com_ is your site's URL). Click _Continue_ in the first screen
      to run the updates and successfully complete the script.
    * Run the following Drush command: `drush updatedb`
1. If you get any error or warning, re-run the _update.php_ script
    again till all the updates have been completed successfully.
1. Open _settings.php_ (_/sites/default/settings.php_) in a text editor. Find the
    line with the _$settings['update_free_access']_ variable and update it to
    "FALSE":
    ```text
    $settings['update_free_access'] = FALSE;
    ```
1. Click _Administration pages_ to return to the administration section of your
    site.
1. Take your site out of maintenance mode. See {{ GUIDE_REF("extend-maintenance") }}.
1. Clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
1. Re-enable any caching technique you disabled at Step 3.
1. You should have the updated version running. You can verify the current
    version of your software by checking the _Status report_ (see
    {{ GUIDE_REF("prevent-status") }}).

## Expand your understanding

* {{ GUIDE_REF("install-tools") }}
* {{ GUIDE_REF("install-dev-making") }}
* {{ GUIDE_REF("prevent-backups") }}
## Related concepts

{{ GUIDE_REF("prevent-status") }}
## Videos

[Updating the Core Software](https://www.youtube.com/watch?v=DqYqxp4xByk)

## Additional resources

* ["Drupal Core Downloads" page on _Drupal.org_](https://www.drupal.org/project/drupal)
* ["Registry Rebuild" page on _Drupal.org_](https://www.drupal.org/project/registry_rebuild)
* The file _/core/UPDATE.txt_ within your installation.

*Attributions*

Written and edited by [Surendra Mohan](https://www.drupal.org/u/surendramohan),
[Boris Doesborgh](https://www.drupal.org/u/batigolix), and
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Updating the Core Software](https://www.drupal.org/docs/user_guide/en/security-update-core.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
