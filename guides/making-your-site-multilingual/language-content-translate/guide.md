---
name: language-content-translate
title: "Translating Content"
description: "How to translate a page into another language."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/language-content-translate.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Translate the home page to Spanish.
## Prerequisite knowledge

{{ GUIDE_REF("language-concept") }}
## Site prerequisites

* The Home content item must exist. See {{ GUIDE_REF("content-create") }}.
* The core Content Translation module must be installed, and your site must
have at least two languages. See {{ GUIDE_REF("language-add") }}.
* The _Basic page_ content type must be configured to be translatable. See
{{ GUIDE_REF("language-content-config") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ (_admin/content_).
1. Locate the home page. You can search for it by entering "Home" in the title
    field.
1. Select _Translate_ from the dropdown button in the row of the Home content
    item. The page _Translations of Home_ appears.
1. Click _Add_ in the row _Spanish_.
    ![Adding a content translation](https://www.drupal.org/docs/user_guide/en/images/language-content-translate-add.png)
1. Note that the user interface has switched to Spanish. To switch it back to
    English, remove the first instance of _es_ in the browser's URL. For
    example, if your URL looks like _example.com/es/node/5/translations/add/en/es_,
    remove the _es_ that comes immediately after _example.com_.
1. Fill in the fields as shown below.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Title | Translated title of the page | Página principal |
    | Body | Translated body of the page | Bienvenido al mercado de la ciudad - ¡el mercado de agricultores de tu barrio!<br><br>Horario: Domingos de 9:00 a 14:00. Desde Abril a Septiembre<br><br>Lugar: parking del Banco Trust número 1. En el centro de la ciudad |
    | URL alias > URL alias | Translated address of the webpage | pagina-principal |

1. Click _Save (this translation)_.
1. Go to your site's home page to view the newly translated page.

## Expand your understanding

* Follow the steps above to translate more content on your site.
* {{ GUIDE_REF("language-config-translate") }}
## Videos

[Translating Content](https://www.youtube.com/watch?v=TOalcUYD5zM)

*Attributions*

Written by [Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Translating Content](https://www.drupal.org/docs/user_guide/en/language-content-translate.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
