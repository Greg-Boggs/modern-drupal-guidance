#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
chmod u+w web/sites/default web/sites/default/settings.php
cat >> web/sites/default/settings.php <<'PHP'

// Let Drupal's server-side validation messages show instead of the browser's.
$settings['enable_html5_validation'] = FALSE;
PHP
