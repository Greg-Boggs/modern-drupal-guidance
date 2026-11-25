---
name: menu-home
title: "Designating a Front Page for your Site"
description: "How to configure a content item so that it gets displayed as the home page."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/menu-home.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Configure which content item is displayed as the front page of your website.
## Site prerequisites

The content item that you want to designate as the front page of your site must
exist. See {{ GUIDE_REF("content-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Configuration_ > _System_ >
    _Basic site settings_ (_admin/config/system/site-information_).
1. Under _Front page_, replace _/node_ with the name of the page you
    would like to make the home page. To use the home page that was previously
    created, provide its path _/home_. Click _Save configuration_.
    !['FRONT PAGE' area with /home in text field](https://www.drupal.org/docs/user_guide/en/images/menu-home_new_text_field.png)
1. Navigate to the home page to verify that it displays content as configured by
    you.
    !['FRONT PAGE' with 'Home' (Basic page) content added](https://www.drupal.org/docs/user_guide/en/images/menu-home_final.png)

## Expand your understanding

* {{ GUIDE_REF("menu-link-from-content") }}
* Follow {{ GUIDE_REF("content-create") }} to create an error page to be used as a 404 (page
not found) or 403 (not authorized) response on your site. Then following the
steps here, you can designate it as the error response, in the _Error pages_
section of the configuration.
## Related concepts

{{ GUIDE_REF("menu-concept") }}
## Videos

[Designating a Front Page for Your Site](https://www.youtube.com/watch?v=qOL8arBYpJ4)

*Attributions*

Written and edited by [Ann Greazel](https://www.drupal.org/u/AnnGreazel),
[Jack Haas](https://www.drupal.org/u/jerseycheese), and
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Designating a Front Page for your Site](https://www.drupal.org/docs/user_guide/en/menu-home.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
