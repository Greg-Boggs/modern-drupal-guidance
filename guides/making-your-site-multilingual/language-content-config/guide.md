---
name: language-content-config
title: "Configuring Content Translation"
description: "How to configure content items to make them translatable."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/language-content-config.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Make _Custom block_, _Custom menu link_, and _Content_ entity types
translatable. Select specific subtypes and set which fields of these can be
translated.
## Prerequisite knowledge

* {{ GUIDE_REF("planning-data-types") }}
* {{ GUIDE_REF("language-concept") }}
## Site prerequisites

The core Content Translation module must be installed, and your site must
have at least two languages. See {{ GUIDE_REF("language-add") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Configuration_ > _Regional
    and language_ > _Content language and translation_
    (_admin/config/regional/content-language_).
1. Under _Custom language settings_, check _Content_,
    _Content block_ and _Custom menu link_ to make these entity types translatable.
    ![Custom language settings checklist](https://www.drupal.org/docs/user_guide/en/images/language-content-config_custom.png)
1. Configuration options appear for _Content_, _Content block_ and  _Custom menu
    link_. Choose the subtypes you want to translate for each entity
    type. Check _Basic page_ for _Content_, _Basic block_ for _Content block_ and
    _Custom menu link_ for _Custom menu link_.
1. Verify the settings for the entity types as shown below:

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Default language | The default language for the entity subtype | Site's default language (English) |
    | Show language selector on create and edit pages | Whether or not the language selector should be shown while editing and creating content | Checked |


    ![Default language and translatability for content types](https://www.drupal.org/docs/user_guide/en/images/language-content-config_content.png)

1. Choose the fields that should be translatable for _Basic page_ as shown in the
    table below. If a field is not translation-dependent, leave it unchecked.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Title | The title of the content | Checked |
    | Authored by | The author | Unchecked |
    | Published | Whether the content has been published or not | Checked |
    | Authored on | Date of publishing | Unchecked |
    | Changed | Date of last update | Unchecked |
    | Promoted to front page | Whether the content will be included in some content views | Unchecked |
    | Sticky at top of lists | Whether the content will be displayed first in some content views | Unchecked |
    | URL alias | Nicer URL for the content | Checked |
    | Body | The main content of the page | Checked |


    ![Translatable content entity subtypes' fields checklist](https://www.drupal.org/docs/user_guide/en/images/language-content-config_basic_page.png)

1. Similarly, check the appropriate boxes for translatable fields belonging to
    _Basic block_ and _Custom menu link_.
1. Click _Save configuration_.

## Expand your understanding

* {{ GUIDE_REF("language-config-translate") }}
* {{ GUIDE_REF("language-content-translate") }}
## Videos

[Configuring Content Translation](https://www.youtube.com/watch?v=b_w904_pcTY)

## Additional resources

* [Blog post "Multilingual Drupal 8 tidbits, part 5"](http://hojtsy.hu/blog/2013-jun-21/drupal-8-multilingual-tidbits-5-almost-limitless-language-assignment)
* [Blog post "Multilingual Drupal 8 tidbits, part 17"](http://hojtsy.hu/blog/2015-jan-27/drupal-8-multilingual-tidbits-17-content-translation-basics)

*Attributions*

Written and edited by [Laura Vass](https://www.drupal.org/u/lolk) at
[Pronovix](https://pronovix.com/),
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com),
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Configuring Content Translation](https://www.drupal.org/docs/user_guide/en/language-content-config.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
