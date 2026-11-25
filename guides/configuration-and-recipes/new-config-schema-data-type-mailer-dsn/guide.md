---
name: new-config-schema-data-type-mailer-dsn
title: "New config schema data type: mailer_dsn"
description: "New config schema data type: mailer_dsn"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3404188
change-record-nid: 3404188
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3401255](https://www.drupal.org/node/3401255)

A new config schema data type has been added: `mailer_dsn`.

The `system.mail.mailer_dsn` config has been switched to the `mailer_dsn` data type. Contrib and custom modules providing their own Symfony Mailer transport configuration are encouraged to switch to the `mailer_dsn` data type for their config and/or config entities.

The `mailer_dsn` data type defines a mapping with the following keys and constraints:

- `scheme:` (required) Must start with a letter followed by zero or more letters, numbers, plus (+), minus (-) or periods (.)
- `host:` (required) Must comply with [RFC 3986 URI host](https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.2).
- `user:` (optional) All strings accepted
- `password:` (optional) All strings accepted
- `port:` (optional) Must be an integer between 0 and 65535
- `options:` (optional) Sequence of key-value pairs. All values accepted unless a more specific config schema exists for the DSN scheme.

*Source: [New config schema data type: mailer_dsn](https://www.drupal.org/node/3404188), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
