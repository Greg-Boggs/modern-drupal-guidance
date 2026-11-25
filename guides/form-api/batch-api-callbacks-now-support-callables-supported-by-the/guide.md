---
name: batch-api-callbacks-now-support-callables-supported-by-the
title: "Batch api callbacks now support callables supported by the CallableResolver"
description: "Batch api callbacks now support callables supported by the CallableResolver"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3570904
change-record-nid: 3570904
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3539919](https://www.drupal.org/node/3539919)

Batch api callbacks such finish or operation callbacks now support any callables that `Drupal\Core\Utility\CallableResolver` supports.

These callbacks can now live in services and will support dependency injection.

Note that the callback no longer needs to be static. See allowed callables in the [related change record](https://www.drupal.org/node/3368504).\
**⚠️ Warning**\
Using `$this` as a pointer for form callback `[$this, 'someMethod']` is an antipattern and should be avoided to prevent the full object from being serialized.

### Batch Builder:

Create the Batch Builder object first:\
`$batch_builder = new BatchBuilder();`

Before operations:\
`$batch_builder->addOperation([$batch_test_callbacks, 'titleCallback'], []);`

After operations:\
`$batch_builder->addOperation(BatchInjectionCallbacks::class . ':titleCallback', []);`

Before finished:\
`$batch_builder->setFinishCallback([$batch_test_callbacks, 'finished1Finished']);`

After finished:\
`$batch_builder->setFinishCallback(BatchTestCallbacks::class . ':finished1Finished');`

### Batch Array:

Before operations:\
`'operations' => [[[$batch_test_callbacks, 'titleCallback'], []]],`

After operations:

```php
'operations' => [[BatchInjectionCallbacks::class . ':titleCallback', []]],
```

Before finished:\
`$batch['finished'] = [$batch_test_callbacks, 'finished1Finished'];`

After finished:\
`$batch['finished'] = BatchTestCallbacks::class . ':finished1Finished';`

*Source: [Batch api callbacks now support callables supported by the CallableResolver](https://www.drupal.org/node/3570904), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
