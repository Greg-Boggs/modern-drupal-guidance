---
name: views-field-default-views-data-and-related-helpers-have
title: "views_field_default_views_data and related helpers have been deprecated or removed."
description: "views_field_default_views_data and related helpers have been deprecated or removed."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3489502
change-record-nid: 3489502
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3489415](https://www.drupal.org/node/3489415)

## views_field_default_views_data

Before:\
`views_field_default_views_data($field_storage);`

After direct:\
`\Drupal::service('views.field_data_provider')->defaultFieldImplementation($field_storage);`

After Dependency Injection:

```php
use Drupal\views\FieldViewsDataProvider;

public function __construct(
    protected readonly FieldViewsDataProvider
$fieldViewsDataProvider,
  ) {}

$this->fieldViewsDataProvider->defaultFieldImplementation($field_storage)
```

## datetime_type_field_views_data_helper

Before:\
`datetime_type_field_views_data_helper($field_storage, $data, $column_name);`

After direct:\
`\Drupal::service('datetime.views_helper')->buildViewsData($field_storage, $data, $column_name);`

After Dependency Injection:

```php
use Drupal\datetime\DateTimeViewsHelper;

public function __construct(
    protected readonly DateTimeViewsHelper $dateTimeViewsHelper,
  ) {}

$this->dateTimeViewsHelper->buildViewsData($field_storage, $data, column_name)
```

## \_views_field_get_entity_type_storage

Before:\
`_views_field_get_entity_type_storage($field_storage);`

After direct:\
`\Drupal::service('views.views_field_default_data')->getSqlStorageForField($field_storage);`

After Dependency Injection:

```php
use Drupal\views\FieldViewsDataProvider;

public function __construct(
    protected readonly FieldViewsDataProvider $fieldViewsDataProvider,
  ) {}

$this->fieldViewsDataProvider->getSqlStorageForField($field_storage)
```

## \_content_moderation_views_data_object

**This has been removed.**\
Before:\
`_content_moderation_views_data_object()`

After:

```php
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\content_moderation\ModerationInformation;
use Drupal\content_moderation\ViewsData;

public function __construct(
    protected readonly EntityTypeManagerInterface $entityTypeManager,
    protected readonly ModerationInformation $moderationInformation,
  ) {}

$viewsData = new ViewsData(
      $this->entityTypeManager,
      $this->moderationInformation
    );
    return $viewsData->getViewsData();
```

*Source: [views_field_default_views_data and related helpers have been deprecated or removed.](https://www.drupal.org/node/3489502), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
