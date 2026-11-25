---
name: drupal-taxonomy-form-overviewterms-now-extends-drupal-core
title: "Drupal\\taxonomy\\Form\\OverviewTerms now extends Drupal\\Core\\Entity\\EntityForm"
description: "Drupal\\taxonomy\\Form\\OverviewTerms now extends Drupal\\Core\\Entity\\EntityForm"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3528300
change-record-nid: 3528300
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3461700](https://www.drupal.org/node/3461700)

To support better extensibility of the Overview form for Taxonomy vocabularies, `Drupal\taxonomy\Form\OverviewTerms` now extends `Drupal\Core\Entity\EntityForm`

The overview route has subsequently been updated as well\
From\
`$route->setDefault('_form', 'Drupal\taxonomy\Form\OverviewTerms')`\
To\
`$route->setDefault('_entity_form', 'taxonomy_vocabulary.overview')`

This gives developers an easy way to override this form via `hook_entity_type_alter`

`$entity_types['taxonomy_vocabulary']->setFormClass('overview', 'Drupal\my_module\MyOverviewTerms');`

*Source: [Drupal\taxonomy\Form\OverviewTerms now extends Drupal\Core\Entity\EntityForm](https://www.drupal.org/node/3528300), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
