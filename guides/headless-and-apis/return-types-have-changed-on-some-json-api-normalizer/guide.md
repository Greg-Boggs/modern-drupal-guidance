---
name: return-types-have-changed-on-some-json-api-normalizer
title: "Return types have changed on some JSON:API Normalizer methods"
description: "Return types have changed on some JSON:API Normalizer methods"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3588047
change-record-nid: 3588047
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3563533](https://www.drupal.org/node/3563533)

The following methods have had changes to their return type declarations:

***Drupal\serialization\Normalizer\ComplexDataNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

***Drupal\serialization\Normalizer\ConfigEntityNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

***Drupal\serialization\Normalizer\ContentEntityNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

***Drupal\serialization\Normalizer\EntityReferenceFieldItemNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

***Drupal\serialization\Normalizer\ListNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

***Drupal\serialization\Normalizer\MarkupNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): string`

***Drupal\serialization\Normalizer\NullNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): null`

***Drupal\serialization\Normalizer\TimestampItemNormalizer***

**Before**: `public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL`\
**After**: `public function normalize($object, $format = NULL, array $context = []): array`

*Source: [Return types have changed on some JSON:API Normalizer methods](https://www.drupal.org/node/3588047), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
