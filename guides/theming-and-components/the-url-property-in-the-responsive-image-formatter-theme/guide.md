---
name: the-url-property-in-the-responsive-image-formatter-theme
title: "The '#url' property in the responsive_image_formatter theme element is now a Url object"
description: "The '#url' property in the responsive_image_formatter theme element is now a Url object"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3291487
change-record-nid: 3291487
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3064751](https://www.drupal.org/node/3064751)

The `#url` variable in the responsive image theme element is now a `Drupal\Core\Url`object, which allows for manipulating URL options. Previously the variable was a string.

This variable is available as `url` in the response-image-formatter.html.twig template.

### Before

```php
  #[Hook('preprocess_responsive_image_formatter')]
  public function preprocessResponsiveImageFormatter(array &$variables): void {
    $url = $variables['#url'];
    // E.g., $url === 'https://drupal.org'.
  }
```

### After

```php
  #[Hook('preprocess_responsive_image_formatter')]
  public function preprocessResponsiveImageFormatter(array &$variables): void {
    $url = $variables['#url'];
    // E.g., $url->toString() === 'https://drupal.org'.
  }
}
```

### Impact on themes and modules

Any theme or module that implements a `preprocess_response_image_formatter` hook that uses the `#url` property will need to be updated to account for the new variable type.

Use in Twig templates is generally not affected, as `{{ url }}` outputs the URL string as before.

*Source: [The '#url' property in the responsive_image_formatter theme element is now a Url object](https://www.drupal.org/node/3291487), a Drupal core change record by [idebr](https://www.drupal.org/user/1879760) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
