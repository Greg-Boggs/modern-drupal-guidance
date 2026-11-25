---
name: use-of-md5-sha1-crc32-and-hash-with-weak-algorithms-is
title: "Use of md5(), sha1(), crc32() and hash() with weak algorithms is disallowed in Drupal code"
description: "Use of md5(), sha1(), crc32() and hash() with weak algorithms is disallowed in Drupal code"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3581605
change-record-nid: 3581605
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3574204](https://www.drupal.org/node/3574204), [#2569119](https://www.drupal.org/node/2569119), [#3581442](https://www.drupal.org/node/3581442)

Use of certain weak hashing function was already discouraged in [Never use crc32b, md5, sha1, and other weak hashes in Drupal code](https://www.drupal.org/node/2833433).

Now Drupal's PHPStan analysis reports as errors the usage of `crc32()`, `md5()`, `sha1()` and `hash()` with weak encryption algorithms.

For data hashing, use `hash()` with a fast, low collision, non-cryptographic algorithm when appropriate (usually one of the xxHash variants), don't use weak cryptographic algorithms. See [https://xxhash.com/](https://xxhash.com/).

For cryptographic hashing, see the [Crypt](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Component%21Utility%21Crypt.php/class/Crypt/main) class for common use-cases.

*Source: [Use of md5(), sha1(), crc32() and hash() with weak algorithms is disallowed in Drupal code](https://www.drupal.org/node/3581605), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
