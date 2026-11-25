---
name: sdcs-can-now-declare-expectations-and-cardinality-for-slots
title: "SDCs can now declare expectations and cardinality for slots"
description: "SDCs can now declare expectations and cardinality for slots"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3582722
change-record-nid: 3582722
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3514072](https://www.drupal.org/node/3514072)

Drupal core now lets SDC authors declare expectations and cardinality on slots in their component's \*.component.yml metadata. You can specify which components (by ID or tag) a slot expects to receive via the new `expected` property, and constrain how many items a slot accepts with `minItems` and `maxItems`. Components can also declare tags at the top level, so a slot can reference a family of components by tag rather than listing each one individually.

For example, an accordion_group component can require that its default slot only accepts accordion_item components, and that at least one is present:

```php
  # accordion_group.component.yml                                               
  name: Accordion Group                                                         
  tags:
    - accordion                                                                 
  slots:                                                                      
    default:                                                                    
      title: Accordion Items
      expected:                                                                 
        - my_theme:accordion_item                                             
      minItems: 1                                                               
      maxItems: 10
```

Note that, although these new properties are supported by the component *schema*, no page builder (e.g., Canvas) supports them yet.

*Source: [SDCs can now declare expectations and cardinality for slots](https://www.drupal.org/node/3582722), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
