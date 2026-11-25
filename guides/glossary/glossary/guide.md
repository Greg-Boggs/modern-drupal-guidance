---
name: glossary
title: "Glossary"
description: "Glossary"
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/glossary.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Ajax

A web technology used to exchange data with a server to dynamically update parts of a web page (for example, forms) without needing entire page reloads.

## Alias

A user-friendly name to replace the internal [path](#path) that the system assigns to a [URL](#url) on the site. For example, you might assign an alias of _/about_ to the About page on your site, to replace the internal path _/node/5_. This would give the page a URL of _http://example.com/about_ instead of _http://example.com/node/5_. See {{ GUIDE_REF("content-paths") }} for more information.

## Anonymous

A person ([user](#user)) interacting with the site who is not logged in. See {{ GUIDE_REF("user-concept") }} for more information.

## Authenticated

A person ([user](#user)) interacting with the site who is logged in. See {{ GUIDE_REF("user-concept") }} for more information.

## Block

A chunk of [content](#content) (text, images, links, etc.) that can be displayed on a page of a site. Blocks are displayed in [regions](#region). See {{ GUIDE_REF("block-concept") }} for more information.

## Breakpoint

Breakpoints are used to separate the height or width of browser screens, printers, and other media output types into steps. A [responsive](#responsive) site adjusts its presentation at these breakpoints. See {{ GUIDE_REF("structure-image-responsive") }} for more information.

## Bundle

Synonym for [Entity subtype](#entity-subtype).

## Cache

The site's internal cache stores the output of time-consuming calculations, such as computing output for an HTML page request, and then retrieves them instead of recalculating the next time they are needed. External caching systems can also be used on the web server to speed up a site's response. See {{ GUIDE_REF("prevent-cache") }} for more information on the internal cache.

## Coding standards

Coding standards are the rules for programmers that define best practices, formatting, and various other rules, so that everyone uses the same conventions and has the same expectations when they see code. See {{ GUIDE_REF("install-tools") }} for more information.

## Composer

The PHP dependency manager used by Drupal, [Drush](#drush), the Symfony framework and others. It is the preferred means of installing Drupal projects. See {{ GUIDE_REF("install-composer") }} for more information.

## CMS

Acronym for [Content Management System](#content-management-system-cms).

## Configuration

Information about your site that is not [content](#content), and is meant to be more permanent than [state](#state) information, such as the name of your site, the [content types](#content-type) and [views](#view) you have defined, etc. See {{ GUIDE_REF("understanding-data") }} for more information.

## Content

Information meant to be displayed on your site, such as text, images, downloads, etc. See also [Configuration](#configuration) and [State](#state). See {{ GUIDE_REF("understanding-data") }} for more information.

## Content item

An item of [content](#content) that is typically meant to be displayed as the main content of a page on your site. This is an [entity type](#entity-type). See {{ GUIDE_REF("planning-data-types") }} for more information.

## Content Management System (CMS)

A collection of tools designed to allow the creation, modification, organization, search, retrieval and removal of information on a website. See {{ GUIDE_REF("understanding-drupal") }} for more information.

## Content type

An [entity subtype](#entity-subtype) for the [content item](#content-item) [entity type](#entity-type). Each content type is used for some particular purpose on the site, and each has its own fields. For example, a site for a farmers market might have a content type for simple pages, and another for a vendor listing page. See {{ GUIDE_REF("planning-data-types") }} for more information.

## Contextual Filter (in a View)

Limits the data to be output in a [view](#view), based on the context of the view [display](#display-in-a-view), such as the full URL of the page. See  {{ GUIDE_REF("views-parts") }} for more information.

## Contextual link

A link to an administrative page for editing or configuring a feature of the site, shown in the context where that feature is displayed. Example: a link to configure a [menu](#menu) that is shown when you hover your mouse over the menu. See {{ GUIDE_REF("config-overview") }} for more information.

## Contributed

[Modules](#module), [themes](#theme), and [distributions](#distribution) that are not part of the [Drupal core](#drupal-core) download, and that can be downloaded separately from the [_Drupal.org_](https://www.drupal.org) website.

## Cron

On some operating systems, _cron_ is a command scheduler application that executes commands or scripts periodically. Your site defines periodic tasks, also known as cron tasks, that need to be triggered either by an operating system cron scheduler, or internally. See {{ GUIDE_REF("security-cron-concept") }} for more information.

## Cross Site Scripting

Security vulnerability typically found in websites. In a site that is not well protected, malicious users can enter script into web pages that are viewed by other users. See {{ GUIDE_REF("structure-text-formats") }} for more information.

## Devel

Module that helps with development tasks such as debugging and inspecting code, analyzing database queries, and generating dummy content. See {{ GUIDE_REF("install-tools") }} for more information.

## Development site

Copy of the live website that is used for developing, updating, and testing the website. See {{ GUIDE_REF("install-dev-sites") }} for more information.

## Display (in a View)

Type of output of a [view](#view), for example a page, a [block](#block) or a feed. See {{ GUIDE_REF("views-parts") }} for more information.

## Distribution

A single download that provides a shortcut for setting up a specific type of site, such as a website for a club or for e-commerce. A distribution contains [Drupal core](#drupal-core), along with [contributed](#contributed) [modules](#module) and/or [themes](#theme); many distributions also pre-configure the site or even create sample content upon [installation](#installing). See {{ GUIDE_REF("understanding-distributions") }} for more information.

## Drupal Association

Non-profit organization dedicated to supporting the Drupal project and community. See {{ GUIDE_REF("understanding-project") }} for more information.

## Drupal core

The files, themes, profiles, and modules included with the standard project software download. See {{ GUIDE_REF("understanding-drupal") }} for more information.

## Drush

Command line shell and scripting interface for Drupal. See {{ GUIDE_REF("install-tools") }} for more information.

## Editorial Workflow

Process to create, review, edit, and publish content. Multiple people in different roles (for example content creators and editors) can be part of the process. See {{ GUIDE_REF("planning-workflow") }} for more information.

## Entity

An item of either [content](#content) or [configuration](#configuration) data, although in common usage, the term often refers to content entities. Examples include [content items](#content-item), custom [blocks](#block), [taxonomy terms](#taxonomy-term), and definitions of [content types](#content-type); the first three are content entities, and the last is a configuration entity. See also [Entity type](#entity-type), [Entity subtype](#entity-subtype), and [Field](#field). See {{ GUIDE_REF("planning-data-types") }} for more information.

## Entity subtype

Within a [content](#content) [entity type](#entity-type), a grouping of entities that share the same [fields](#field). For example, within the [content item](#content-item) entity type, a farmers market site might have subtypes (known as [content types](#content-type)) for static pages and vendor pages, each with its own group of fields. You may also see the term _bundle_ used (especially in programmer documentation) as a synonym of entity subtype. See {{ GUIDE_REF("planning-data-types") }} for more information.

## Entity type

The overall type of an [entity](#entity); in common usage, it is only applied to a [content](#content) entity. Examples include [content types](#content-type), [taxonomy terms](#taxonomy-term), and custom [blocks](#block). See {{ GUIDE_REF("planning-data-types") }} for more information.

## Field

Data of a certain type that is attached to a [content](#content) [entity](#entity). For instance, on a farmers market site's vendor content type, you might have fields for an image, the vendor description, and a [taxonomy term](#taxonomy-term). See {{ GUIDE_REF("planning-data-types") }} for more information.

## Field bundle

Synonym for [Entity subtype](#entity-subtype).

## Field formatter

[Configuration](#configuration) that defines how the data in a [field](#field) is displayed. For example, a text field could be displayed with a prefix and/or suffix, and it could have its HTML tags stripped out or limited. See also [View mode](#view-mode) and [Field widget](#field-widget). See {{ GUIDE_REF("structure-view-modes") }} for more information.

## Field widget

[Configuration](#configuration) that defines how someone can enter or edit data for a [field](#field) on a data entry form. For example, a text field could use a single-line or multi-line entry box, and there could be a setting for the size of the box. See also [Field formatter](#field-formatter). See {{ GUIDE_REF("structure-widgets") }} for more information.

## Filter (in a View)

Limits the data to be output in a [view](#view), based on criteria such as publication status, type of content, or field value. See {{ GUIDE_REF("views-parts") }} for more information.

## Formatter

See [Field formatter](#field-formatter).

## FOSS

Acronym for _Free and Open Source Software_, meaning software that is developed by a community of people and released under a non-commercial license. See also [GPL](#gpl). See {{ GUIDE_REF("understanding-project") }} for more information.

## Git

[Version control system](#version-control-system) used by Drupal developers to coordinate their individual code changes. Git records everyone’s changes to a given project in a directory tree called a git [repository](#repository). See {{ GUIDE_REF("install-tools") }} for more information.

## GPL

Acronym for the _GNU General Public License_, a non-commercial software license. All software downloaded from the [_Drupal.org_](https://www.drupal.org) website is licensed under the ["GNU General Public License, version 2"](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html). See also [FOSS](#foss). See {{ GUIDE_REF("understanding-gpl") }} for more information.

## Image style

A set of processing steps that transform a base image into a new image; typical processing includes scaling and cropping. See {{ GUIDE_REF("structure-image-styles") }} for more information.

## Installing

Preparing Drupal core or any contributed theme or module for usage. In the case of Drupal core this means downloading the necessary files, creating the database, configuring and running the installation script. See {{ GUIDE_REF("install-decide") }} for more information.

## LAMP

Acronym for _Linux, Apache, MySQL, and PHP_: the software on the web server that the scripts commonly run on (although it can use other operating systems, web servers, and databases). See {{ GUIDE_REF("install-requirements") }} for more information.

## Log

A list of recorded events on the site, such as usage data, performance data, errors, warnings, and operational information. See {{ GUIDE_REF("prevent-log") }} for more information.

## Menu

A set of links used for navigation on a site, which may be arranged in a hierarchy. See {{ GUIDE_REF("menu-concept") }} for more information.

## Module

Software (usually PHP, JavaScript, and/or CSS) that extends site features and adds functionality. The Drupal project distinguishes between _[core](#drupal-core)_ and _[contributed](#contributed)_ modules. See {{ GUIDE_REF("understanding-modules") }} for more information.

## Path

The unique, last part of the internal [URL](#url) that the system assigns to a page on the site, which can be a visitor-facing page or an administrative page. For example, the internal URL for the About page on your site might be _http://example.com/node/5_, and in this case, the path is _node/5_. See also [Alias](#alias). See {{ GUIDE_REF("content-paths") }} for more information.

## Permission

The ability to perform some action on the site, such as editing a particular type of [content](#content), or viewing user profiles. See also [Role](#role). See {{ GUIDE_REF("user-concept") }} for more information.

## Reference field

A [field](#field) that represents a relationship between an [entity](#entity) and one or more other entities, which may be the same [entity type](#entity-type) or a different type. For example, on a farmers market site, a recipe content item might have a reference field to the vendor (also a content item) that posted the recipe. [Taxonomy term](#taxonomy-term) fields are also reference fields. See {{ GUIDE_REF("structure-reference-fields") }} for more information.

## Region

A defined area of a page where [content](#content) can be placed, such as the header, footer, main content area, left sidebar, etc. Regions are defined by [themes](#theme), and the content displayed in each region is contained in [blocks](#block). See {{ GUIDE_REF("block-regions") }} for more information.

## Relationship (in a View)

Expansion of the data that is displayed in a view, by relating the base content to other content entities. See {{ GUIDE_REF("views-parts") }} for more information.

## Repository

Location where a version control system stores all the files and directories for a project. See {{ GUIDE_REF("install-tools") }} for more information.

## Responsive

A site or [theme](#theme) is said to be responsive if it adjusts its presentation in response to the size of the browser screen, printer, or other media output type. See also [Breakpoint](#breakpoint). See {{ GUIDE_REF("structure-image-responsive") }} for more information.

## Revision

A record of the past or present state of a [content](#content) [entity](#entity), as it is edited over time. See {{ GUIDE_REF("planning-workflow") }} for more information.

## Role

A named set of [permissions](#permission) that can be applied to a [user account](#user). See {{ GUIDE_REF("user-concept") }} for more information.

## Security update

An [update](#update) that fixes a security-related bug, such as a hacking vulnerability. See {{ GUIDE_REF("security-concept") }} for more information.

## Session

Information about individual site visitors' interactions with the site, such as whether they are logged in and their cookies. See {{ GUIDE_REF("understanding-data") }} for more information.

## Staging site

Copy of the live website that can be used for testing, or presenting the changes to the client for approval. See {{ GUIDE_REF("install-dev-sites") }} for more information.

## State

Information of a temporary nature about the current state of your site, such as the time when [cron](#cron) was last run, etc. See also [Content](#content) and [Configuration](#configuration).  See {{ GUIDE_REF("understanding-data") }} for more information.

## Taxonomy

The process of classifying [content](#content). See {{ GUIDE_REF("structure-taxonomy") }} for more information.

## Taxonomy term

A term used to classify [content](#content), such as a tag or a category. See also [Vocabulary](#vocabulary). See {{ GUIDE_REF("structure-taxonomy") }} for more information.

## Text format

[Configuration](#configuration) that defines the processing that happens to user-entered text before it is shown in the browser. This might include stripping or limiting HTML tags, or turning [URLs](#url) into links. See {{ GUIDE_REF("structure-text-formats") }} for more information.

## Theme

Software and asset files (images, CSS, PHP code, and/or templates) that determine the style and layout of the site. The Drupal project distinguishes between  _[core](#drupal-core)_ and _[contributed](#contributed)_ themes. See {{ GUIDE_REF("understanding-themes") }} for more information.

## UI

Acronym for [_User Interface_](#user-interface).

## Update

A newer version of your site's software, either [Drupal core](#drupal-core) or a [module](#module) or [theme](#theme). See also [Security update](#security-update). See {{ GUIDE_REF("security-concept") }} for more information.

## URL

A web page's unique address on the web. For example https://example.com/node/7. See {{ GUIDE_REF("content-paths") }} for more information.

## User

A person interacting with the site, either logged-in or [anonymous](#anonymous). See {{ GUIDE_REF("user-concept") }} for more information.

## User interface

The text, styles, and images that are visible on a site, separated logically into the user interface for site visitors and the administrative user interface.

## User one (User 1)

The initial [user](#user) account that is created when you [install](#installing) the site (whose ID number is 1). It automatically has all [permissions](#permission), even if it is not assigned an administrative [role](#role). See {{ GUIDE_REF("user-admin-account") }} for more information.

## Version Control System

Software that keeps copies of files and revision history in a [repository](#repository), and allows you to add, delete, and update files. See {{ GUIDE_REF("install-tools") }} for more information.

## View

A formatted listing of data; typically, the data comes from [content](#content) [entities](#entity). For example, on a farmers market site, you might create a [content item](#content-item) for each vendor. You could then make view that generates a listing page that shows a thumbnail image and short description of each vendor, linking to the full-page content item. Using the same data, you could also make a view that generates a new vendors block, which would show information from the most recently added vendors. See {{ GUIDE_REF("planning-modular") }} for more information.

## View mode

A set of [field formatter](#field-formatter) [configuration](#configuration) for all of the [fields](#field) of a [content](#content) [entity](#entity), some of which may be hidden. Each [entity subtype](#entity-subtype) can have one or more view modes defined; for example, [content types](#content-type) typically have _Full_ and _Teaser_ view modes, where the _Teaser_ view mode displays fewer or trimmed-down fields. See {{ GUIDE_REF("structure-view-modes") }} for more information.

## Vocabulary

A group of [taxonomy terms](#taxonomy-term) to choose from when classifying [content](#content) in a particular way, such as the list of all of the vendor categories on a farmers market site. Technically, vocabularies are the [entity subtype](#entity-subtype) for the taxonomy term [entity type](#entity-type). See {{ GUIDE_REF("structure-taxonomy") }} for more information.

## Widget

See [Field widget](#field-widget).

## Wizard

A web form that allows you to fill in a few values, and creates something with sensible defaults based on the values you chose. For example, there are wizards for creating [views](#view) of different types. See {{ GUIDE_REF("views-create") }} for more information.

## WYSIWYG

Acronym for _What You See is What You Get_, meaning a method for editing [content](#content) where what you see on the editing screen closely resembles the final product. See {{ GUIDE_REF("structure-text-format-config") }} for more information.

## Workflow

See [Editorial Workflow](#editorial-workflow).

## XSS

Acronym for [Cross Site Scripting](#cross-site-scripting).

*Source: [Glossary](https://www.drupal.org/docs/user_guide/en/glossary.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
