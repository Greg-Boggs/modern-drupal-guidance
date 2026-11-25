---
name: extensionmimetypeguesser-extension-and-mimetype-maps-are
title: "ExtensionMimeTypeGuesser extension and mimetype maps are split off into a new MimeTypeMapInterface and service"
description: "ExtensionMimeTypeGuesser extension and mimetype maps are split off into a new MimeTypeMapInterface and service"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3494040
change-record-nid: 3494040
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2311679](https://www.drupal.org/node/2311679)

Previously a `$defaultMapping` protected property existed on `\Drupal\Core\File\MimeType\ExtensionMimeTypeGuesser`. However, services that just needed to change the map of mimetype to extensions (and visa versa) had to implement a whole alternative guesser.

The following methods on `Drupal\Core\File\MimeType\ExtensionMimeTypeGuesser ` are now deprecated:

- `setMapping()`
- `getMapping()`

The map is now provided by a separate `Drupal\Core\File\MimeType\MimeTypeMapInterface` property, with a `Drupal\Core\File\MimeType\DefaultMimeTypeMap` implementation and service. This allows different implementations to override the map service rather than the whole guesser service.

The protected `$defaultMapping` property on `ExtensionMimeTypeGuesser` has been removed. Users wanting to replace the mapping should inject their own implementation of `Drupal\Core\File\MimeType\MimeTypeMapInterface` instead.

The `hook_file_mimetype_mapping_alter(`) hook is also deprecated and will be removed in Drupal 12. Users should implement an `Drupal\Core\File\Event\MimeTypeMapLoadedEvent` listener to alter the map instead.

Notice:\
Review [https://www.drupal.org/project/drupal/issues/3530461](https://www.drupal.org/project/drupal/issues/3530461) regarding potential removal of the $fileSystem argument of `ExtensionMimeTypeGuesser::__construct()` in Drupal 11.3.0.

*Source: [ExtensionMimeTypeGuesser extension and mimetype maps are split off into a new MimeTypeMapInterface and service](https://www.drupal.org/node/3494040), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
