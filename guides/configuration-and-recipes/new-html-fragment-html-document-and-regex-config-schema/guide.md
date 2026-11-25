---
name: new-html-fragment-html-document-and-regex-config-schema
title: "New html_fragment, html_document and regex config schema data types, with Html and ValidRegex constraints"
description: "New html_fragment, html_document and regex config schema data types, with Html and ValidRegex constraints"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3450544
change-record-nid: 3450544
introduced-in-version: "12.1.0"
introduced-in-branch: "main"
license: CC-BY-SA-2.0
---

Introduced in branch: main\
Introduced in version: 12.1.0\
Issue links: [#3437608](https://www.drupal.org/node/3437608)

Title: New html_fragment, html_document and regex config schema data types, with Html and ValidRegex constraints

Config schema gains three data types. \`html_fragment\` and \`html_document\` validate a string as HTML via the new \`Html\` constraint (\`mode: fragment\` or \`document\`). \`regex\` validates that a string is a valid regular expression via the new \`ValidRegex\` constraint. Module authors can use them in schema and get validation errors for malformed values. An unsupported \`mode\` makes the \`Html\` constraint throw an InvalidArgumentException when it is created.

Before: \`type: string\` with no HTML or regex validation.

After:

```php
my_module.settings:
  type: config_object
  mapping:
    intro:
      type: html_fragment
      label: 'Intro'
    pattern:
      type: regex
      label: 'Pattern'
```

*Source: [New html_fragment, html_document and regex config schema data types, with Html and ValidRegex constraints](https://www.drupal.org/node/3450544), a Drupal core change record by [narendrar](https://www.drupal.org/user/1730192) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
