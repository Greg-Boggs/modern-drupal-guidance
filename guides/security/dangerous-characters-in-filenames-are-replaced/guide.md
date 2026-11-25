---
name: dangerous-characters-in-filenames-are-replaced
title: "Dangerous characters in filenames are replaced"
description: "Dangerous characters in filenames are replaced"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3624076
change-record-nid: 3624076
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3516706](https://www.drupal.org/node/3516706)

Drupal core sanitizes a set of dangerous characters (for example shell metacharacters) in filenames for security reasons; they are replaced by underscores.

Although Drupal core itself handles filenames safely, leaving dangerous characters in filenames increases the risk of contrib or custom code failing to do so and introducing a vulnerability.

Accents, spaces, and most safe unicode characters (e.g. emojis) are preserved in filenames by default; this behavior can be configured in Transliteration settings.

The change also applies only to new file uploads. Existing filenames on the site will not be changed.

Examples:

- `a;b|c&d.txt` becomes `a_b_c_d.txt`
- `Love&War.pdf` becomes `Love_War.pdf`
- `<>|.txt` becomes `___.txt`
- `---.txt` becomes `unnamed.txt`

*Source: [Dangerous characters in filenames are replaced](https://www.drupal.org/node/3624076), a Drupal core change record by [mcdruid](https://www.drupal.org/user/255969) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
