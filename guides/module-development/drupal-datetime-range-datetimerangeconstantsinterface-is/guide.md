---
name: drupal-datetime-range-datetimerangeconstantsinterface-is
title: "\\Drupal\\datetime_range\\DateTimeRangeConstantsInterface is deprecated"
description: "\\Drupal\\datetime_range\\DateTimeRangeConstantsInterface is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3495241
change-record-nid: 3495241
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3425141](https://www.drupal.org/node/3425141)

`DateTimeRangeConstantsInterface` is deprecated and the constants are converted to an `enum`.

Before

```php
    $element[DateTimeRangeConstantsInterface::START_DATE] = $this->buildDate($start_date);
    $element[DateTimeRangeConstantsInterface::END_DATE] = $this->buildDate($end_date);
```

```php
    return [
      'from_to' => DateTimeRangeConstantsInterface::BOTH,
      'separator' => '-',
    ];
```

After

```php
    $element[DateTimeRangeDisplayOptions::StartDate->value] = $this->buildDate($start_date);
    $element[DateTimeRangeDisplayOptions::EndDate->value] = $this->buildDate($end_date);
```

```php
    return [
      'from_to' => DateTimeRangeDisplayOptions::Both->value,
      'separator' => '-',
    ];
```

*Source: [\Drupal\datetime_range\DateTimeRangeConstantsInterface is deprecated](https://www.drupal.org/node/3495241), a Drupal core change record by [mrshowerman](https://www.drupal.org/user/3558410) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
