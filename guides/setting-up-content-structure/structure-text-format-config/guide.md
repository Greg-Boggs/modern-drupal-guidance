---
name: structure-text-format-config
title: "Configuring Text Formats and Editors"
description: "How to make a change to a text format and its editor configuration."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-text-format-config.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Add a horizontal rule tag to the _Basic HTML_ text format, and a corresponding
button to its editor configuration.
## Prerequisite knowledge

{{ GUIDE_REF("structure-text-formats") }}
## Site prerequisites

* The core Filter, Editor, and CKEditor modules must be installed. They are
installed on your site when you install with the core Standard installation
profile.
* The _Basic HTML_ text format must exist. This is created on your site when you
install with the core Standard installation profile.
## Steps

1. In the _Manage_ administrative menu, navigate to _Configuration_ > _Content
    authoring_ > _Text formats and editors_ (_admin/config/content/formats_). The
    _Text formats and editors_ page appears. Note that the names of the text formats
    that came with your installation profile are shown in English on this page; see
    {{ GUIDE_REF("language-concept") }} for an explanation.
1. Click _Configure_ for the _Basic HTML_ text format. The _Basic HTML_ page
    appears.
1. Note that _CKEditor_ is selected in the _Text editor_ field. This allows you
    to configure the editor's toolbar.
1. Drag the _horizontal line_ button from _Available buttons_ to the
    _Active toolbar_. Toolbar items can be visually grouped together using a
    vertical divider.  As an alternative to dragging, you can tab to select
    buttons and then move them using keyboard arrow keys.
    ![Configuring the editor](https://www.drupal.org/docs/user_guide/en/images/structure-text-format-config-editor-config.png)
1. Note that you can change the _Filter processing order_.
1. Under _Filter settings_ > _Limit allowed HTML tags and correct faulty HTML_,
    in the field _Allowed HTML tags_, verify that `&lt;hr&gt;` is present (adding its
    editor button will automatically update the allowed tags).
    ![Configuring the HTML tags](https://www.drupal.org/docs/user_guide/en/images/structure-text-format-config-allowed-html.png)
1. Click _Save configuration_. You will be taken back to the _Text formats and
    editors_ page. A message will be displayed saying that the text format has been
    updated.
    ![Confirmation message for text format configuration](https://www.drupal.org/docs/user_guide/en/images/structure-text-format-config-summary.png)

## Expand your understanding

If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Videos

[Configuring Text Formats and Editors](https://www.youtube.com/watch?v=T9RD6PTxe9U)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix), and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me).

*Source: [Configuring Text Formats and Editors](https://www.drupal.org/docs/user_guide/en/structure-text-format-config.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
