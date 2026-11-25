---
name: prevent-log
title: "Concept: Log"
description: "Overview of logs and where to find recent log messages."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/prevent-log.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## What is a Log?

Your site captures system events in a log to be reviewed by an authorized
individual at a later time. The log is a list of recorded events
containing usage data, performance data, errors, warnings, and operational
information. It is vital to check the log on a regular basis as it is often the
only way to tell what is going on.

You can find your site's recent log messages in the _Manage_ administrative menu
by navigating to _Reports_ > _Recent log messages_ (_admin/reports/dblog_).
These logs may be cleared by administrators and automated cron tasks, so they
should not be used for [forensic logging](https://en.wikipedia.org/wiki/Audit_trail). For forensic purposes, use the Syslog module.

![Recent log messages of a basic site](https://www.drupal.org/docs/user_guide/en/images/prevent-log.png)

*Attributions*

Adapted by [Diána Lakatos](https://www.drupal.org/u/dianalakatos)
from ["Reports"](https://www.drupal.org/docs/7/monitoring-a-site/reports)
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation)

*Source: [Concept: Log](https://www.drupal.org/docs/user_guide/en/prevent-log.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
