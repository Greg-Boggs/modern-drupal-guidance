---
name: the-long-format-filter-tips-are-deprecated
title: "The long format 'filter tips' are deprecated"
description: "The long format 'filter tips' are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567879
change-record-nid: 3567879
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3505370](https://www.drupal.org/node/3505370)

Before CKEditor was widely used, content authors were expected to enter HTML tags directly. To give hints to users about what formatting is allowed, text filters could provide tips in both short and long formats. The short format is displayed below the text area. An "About text formats" link takes the user to a page giving more information on how to write successful HTML with the long format tips.

Now most formatted text areas use CKEditor, the tips are no longer useful. The long format of the tips has been deprecated, along with the page that displays them.

Custom filters could previously implement both tip variants via the `$long` parameter:

```php
  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    if ($long) {
      return $this->t('Lines and paragraphs are automatically recognized. The &lt;br /&gt; line break, &lt;p&gt; paragraph and &lt;/p&gt; close paragraph tags are inserted automatically. If paragraphs are not recognized simply add a couple of blank lines.');
    }
    else {
      return $this->t('Lines and paragraphs break automatically.');
    }
  }
```

The argument has been deprecated and only the short tip should be returned:

```php
  /**
   * {@inheritdoc}
   */
  public function tips() {
    return $this->t('Lines and paragraphs break automatically.');
  }
```

*Source: [The long format 'filter tips' are deprecated](https://www.drupal.org/node/3567879), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
