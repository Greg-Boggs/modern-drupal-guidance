---
name: config-basic
title: "Editing Basic Site Information"
description: "How to edit basic site information (site name, slogan, and default time zone)."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/config-basic.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Change basic site information such as _Site name_, _Slogan_,
_Default time zone_.
## Prerequisite knowledge

{{ GUIDE_REF("config-overview") }}
## Steps
### Configuring the basic site information

1. In the _Manage_ administrative menu, navigate to _Configuration_ > _System_ >
    _Basic site settings_ (_admin/config/system/site-information_) to change the
    _Site name_, _Slogan_, administrative _Email address_, or the _Default front
    page_ path.
1. Fill in the available fields as appropriate for your site.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Site details > Site name | Used to identify the site and displayed in browsers | Anytown Farmers Market |
    | Site details > Slogan | How this is used depends on your site's theme. Not displayed by default when using the Olivero theme. | Farm Fresh Food |
    | Site details > Email address | Used as _From_ address in automated email messages (registrations, password resets, etc) | info@example.com |


    ![Site Information](https://www.drupal.org/docs/user_guide/en/images/config-basic-SiteInfo.png)

1. After editing the fields, click _Save configuration_ to see the changes
    applied to the site.

### Configuring default Regional settings

1. In the _Manage_ administrative menu, navigate to _Configuration_ >
    _Regional and language_ > _Regional settings_
    (_admin/config/regional/settings_).
1. Fill in the form as follows:

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Locale > Default country | The primary country for your site | United States |
    | Locale > First day of week | The day when the week starts on calendars | Sunday |
    | Time zones > Default time zone | The primary time zone for your site | America > Los Angeles |
    | Time zones > Users may set their own time zone | Whether logged-in users can choose a different time zone for display of dates and times on the site | Unchecked |


    ![Time Zones](https://www.drupal.org/docs/user_guide/en/images/config-basic-TimeZone.png)

1. After editing the fields, click _Save configuration_ to see the changes
    applied to the site.

## Videos

[Editing Basic Site Information](https://www.youtube.com/watch?v=oDMCQ1cDYOI)

## Additional resources

[_Drupal.org_ community documentation page "Getting started with Drupal administration"](https://www.drupal.org/docs/administering-a-drupal-site/getting-started-with-drupal-administration)

*Attributions*

Written and edited by [Sree Veturi](https://www.drupal.org/u/sree),
[Michael Lenahan](https://www.drupal.org/u/michaellenahan) at
[erdfisch](https://erdfisch.de),
[Antje Lorch](https://www.drupal.org/u/ifrik),
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon), and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me).

*Source: [Editing Basic Site Information](https://www.drupal.org/docs/user_guide/en/config-basic.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
