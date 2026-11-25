---
name: add-mergewith-to-ajaxresponse-for-merging-with-another
title: "Add mergeWith() to AjaxResponse for merging with another response"
description: "Add mergeWith() to AjaxResponse for merging with another response"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3486330
change-record-nid: 3486330
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3343670](https://www.drupal.org/node/3343670)

Introduce a new `mergeWith()`method in `core/lib/Drupal/Core/Ajax/AjaxResponse.php`.

A new mergeWith method has been added to the AjaxResponse class. This allows developers to another AjaxResponse into the current one.

Example

```php
$response1 = new AjaxResponse();
$response2 = new AjaxResponse();

$response1->addCommand(new MessageCommand('Your changes have been saved.'));
$response2->addCommand(new MessageCommand('Your changes have been saved but saying it again.'));

/** @var \Drupal\Core\Ajax\AjaxResponse */
return $response1->mergeWith($response2);
```

*Source: [Add mergeWith() to AjaxResponse for merging with another response](https://www.drupal.org/node/3486330), a Drupal core change record by [shalini_jha](https://www.drupal.org/user/3675486) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
