---
name: security-cron-concept
title: "Concept: Cron"
description: "Overview of cron and how it is different from Unix cron."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/security-cron-concept.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## What are cron tasks?

To ensure that your site and its modules continue to function well, a group
of administrative operations should be run periodically. These operations are
called _cron_ tasks. Examples of cron tasks are: checking for module and theme
updates, indexing content for search, or cleaning up temporary files.
## What is the relationship between the site's cron tasks and Unix cron?

Linux/Unix-based operating systems have a cron scheduler that can be used to run
periodic tasks. You can use the server’s cron scheduler to schedule runs of the
site’s cron tasks. Alternatively, you can use the core Automated Cron module to
run tasks. You can check the site’s cron tasks' status in the status report.
## Related topics

* {{ GUIDE_REF("security-cron") }}
* {{ GUIDE_REF("prevent-status") }}
## Additional resources

[_Drupal.org_ community documentation page "Setting up cron"](https://www.drupal.org/docs/7/setting-up-cron/overview)

*Attributions*

Written and edited by
[Diána Lakatos](https://www.drupal.org/u/dianalakatos) at
[Pronovix](https://pronovix.com/),
[Dave Hansen-Lange](https://www.drupal.org/u/dalin) at
[Advomatic](https://www.advomatic.com/),
and [Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Concept: Cron](https://www.drupal.org/docs/user_guide/en/security-cron-concept.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
