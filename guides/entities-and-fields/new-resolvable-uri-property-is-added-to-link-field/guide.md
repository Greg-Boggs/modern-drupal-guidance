---
name: new-resolvable-uri-property-is-added-to-link-field
title: "New 'resolvable_uri' property is added to link field"
description: "New 'resolvable_uri' property is added to link field"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3143736
change-record-nid: 3143736
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3066751](https://www.drupal.org/node/3066751)

A new `resolvable_uri` property is added to the link field which can be used in href attribute.

For example if an entity has a `field_link` and link field has following value:

```php
  $entity->field_link = [
    'uri' => 'internal:/',
    'title'=> 'Home',
    'options' => [
      'fragment' => '#main-content',
    ],
  ];
```

Link field output in JSON:API would be in following format:\
**Before**

```php
"field_link": [
  {
    "uri": "internal:/",
    "title": "Home",
    "options": [
      'fragment' : '#main-content'
    ]
  }
]
```

This isn't very useful for anything consuming the API because it needs to process these links.\
**After**

```php
"field_link": [
  {
    "uri": "internal:/",
    "resolvable_uri": "/#main-content"
    "title": "Home",
    "options": [
      'fragment' : '#main-content'
    ]
  }
]
```

Now `resolvable_uri` property can be used in in href attribute.

Due to this change, a new token for link field would exist `[entity:field_link:resolvable_uri]`.

**API Addition**\
Similarly, if a `resolvable_uri` property is properly set it will initialize all the link property e.g.:

```php
  $entity->field_link->resolvable_uri = 'https://www.drupal.org?test_param=test_value#main-content';
```

Same as:

```php
   $entity->field_link->uri = 'https://www.drupal.org'
   $entity->field_link->options = [
     'query' => [
       'test_param' => 'test_value',
     ],
     'fragment' => '#main-content',
   ];
```

*Source: [New 'resolvable_uri' property is added to link field](https://www.drupal.org/node/3143736), a Drupal core change record by [jibran](https://www.drupal.org/user/1198144) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
