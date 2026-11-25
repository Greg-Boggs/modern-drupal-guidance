---
name: contextual-links-now-use-native-javascript-instead-of
title: "Contextual links now use native JavaScript instead of BackboneJS"
description: "Contextual links now use native JavaScript instead of BackboneJS"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3523287
change-record-nid: 3523287
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3203920](https://www.drupal.org/node/3203920)

| Drupal Event | Drupal.contextual | Drupal.contextualToolbar |
| --- | --- | --- |
| `drupalContextualLinkAdded $el => jQuery $region => jQuery contextualModelView ` | `instances: array of ContextualModelView ContextualModelView $contextual $region modelId regionIsHovered strings timer title hasFocus isLocked isOpen ` | `model: instance of ContextualToolbarModelView ContextualToolbarModelView $el strings tabbingContext isViewing ` |

| Drupal Event | Drupal.contextual | Drupal.contextualToolbar |
| --- | --- | --- |
| `drupalContextualLinkAdded $el => jQuery $region => jQuery model => StateModel` | `AuralView KeyboardView RegionView VisualView StateModel (Backbone model +): title regionIsHovered hasFocus isOpen isLocked toggleOpen() close() focus() blur() collection: Backbone collection of models: array of StateModel regionViews: array of RegionView views: array of objects: aural => AuralView keyboard => KeyboardView visual => VisualView events bound on backbone models: change (from the *Views models, triggers a renrender) change:hasFocus (from the regionView model) ` | `AuralView (not exposed) VisualView (not exposed) StateModel (Backbone model +): isViewing isVisible contextualCount tabbingContext countContextualLinks() lockNewContextualLinks() updateVisibility() model => StateModel events bound on model: change change:contextualCount change:isViewing events bound on collection: add remove reset ` |
| Backbone View | Backbone Model | Backbone Collection |
| `el cid $el prototype: $ bind delegate delegateEvents initialize listenTo listenToOnce off on once preinitialize remove render setElement stopListening tagName trigger unbind undelegate undelegateEvents` | `cid attributes changed prototype: bind chain changed changedAttributes cidPrefix clear clone destroy escape fetch get has hasChanged idAttribute initialize invert isEmpty isNew isValid keys listenTo listenToOnce matches off omit on once pairs parse pick preinitialize previous previousAttributes save set stopListening sync toJSON trigger unbind unset url validationError values` | `length models prototype: add all any at bind chain clone collect contains countBy create detect difference drop each entries every fetch filter find findIndex findLastIndex findWhere first foldl foldr forEach get groupBy has head include includes indexBy indexOf initial initialize inject invoke isEmpty keys last lastIndexOf listenTo listenToOnce map max min model modelId off on once parse partition pluck pop preinitialize push reduce reduceRight reject remove reset rest sample select set shift shuffle size slice some sort sortBy stopListening sync tail take toArray toJSON trigger unbind unshift values where without` |

*Source: [Contextual links now use native JavaScript instead of BackboneJS](https://www.drupal.org/node/3523287), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
