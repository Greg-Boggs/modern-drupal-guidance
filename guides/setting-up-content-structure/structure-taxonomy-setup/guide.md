---
name: structure-taxonomy-setup
title: "Setting Up a Taxonomy"
description: "How to create a taxonomy vocabulary and add it as a field to a content type."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-taxonomy-setup.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Create an Ingredients vocabulary and add it to the Recipe content type as
a field that can contain an unlimited number of values and that allows adding
new terms to the vocabulary.
## Prerequisite knowledge

* {{ GUIDE_REF("planning-data-types") }}
* {{ GUIDE_REF("structure-taxonomy") }}
* {{ GUIDE_REF("structure-fields") }}
## Site prerequisites

The Recipe content type must exist. See {{ GUIDE_REF("structure-content-type") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Taxonomy_
    (_admin/structure/taxonomy_). You will see the _Tags_ vocabulary that was
    created with the core Standard installation profile. (Note that the name and
    description of this vocabulary are shown in English on this page; see
    {{ GUIDE_REF("language-concept") }} for an explanation.)
    ![taxonomy list page](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-taxonomy-page.png)
1. Click _Add vocabulary_, and fill in the values below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Name | The name of the vocabulary | Ingredients |
    | Description | A brief note about the vocabulary | (Leave blank) |


    ![taxonomy add Ingredients](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-add-vocabulary.png)

1. Click _Save_. You will be taken to the Ingredients page, which shows a list
    of all the terms in this vocabulary.
    ![Ingredients taxonomy term listing](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-vocabulary-overview.png)
1. Click _Add term_. Enter "Butter" in the _Name_ field. Click _Save_.
    ![Add term page](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-add-term.png)
1. You will receive a confirmation about the term you created. Add more
    terms. For example, "Eggs" and "Milk".
1. In the _Manage_ administrative menu, navigate to _Structure_ > _Content Types_
    (_admin/structure/types_). Click _Manage fields_ for your Recipe content type.
1. Click _Create a new field_. The _Add field_ page appears. Choose the _Reference_ field type from the _Choose a field type_ options. Click _Continue_. The _Add field_ page appears with a form to configure the field.
    ![Add Ingredients field to Content type Recipe](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-add-field.png)
1. Enter values from the table below. Click _Continue_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Label | The title to give the field | Ingredients |
    | Choose an option below: | Type of content to reference | Taxonomy term |


    ![Settings for Ingredients field](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-add-field-label.png)

1. On the following configuration screen, enter the values from the table below. Click _Save settings_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Help text | Help shown to users creating content | Enter ingredients that site visitors might want to search for |
    | Type of item to reference | The type of entity that is referenced by the field | Taxonomy term |
    | Allowed number of values | The number of values a user can enter | Unlimited |
    | Reference type > Reference method | Select the method used to choose allowed values | Default |
    | Reference type > Vocabulary | Select the vocabulary to choose allowed values from | Ingredients |
    | Reference type > Create referenced entities if they don't already exist | Whether new ingredient terms can be created from the content editing form | Checked |


    ![reference type field settings](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-field-settings-2.png)

1. Click _Save settings_. You will be taken back to the _Manage Fields_ page. A
    message will be displayed saying that the configuration for Ingredients is
    complete.
    ![Manage fields page for Recipe content type](https://www.drupal.org/docs/user_guide/en/images/structure-taxonomy-setup-finished.png)

## Videos

[Setting up a Taxonomy](https://www.youtube.com/watch?v=EbsXffnjsjc)

*Attributions*

Written and edited by [Bob Snodgrass](https://www.drupal.org/u/bsnodgrass),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Setting Up a Taxonomy](https://www.drupal.org/docs/user_guide/en/structure-taxonomy-setup.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
