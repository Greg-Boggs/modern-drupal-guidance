#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
chmod u+w web/sites/default web/sites/default/settings.php
cat >> web/sites/default/settings.php <<'PHP'

// nginx protects the file directories; do not write .htaccess files.
$settings['auto_create_htaccess'] = FALSE;
PHP
