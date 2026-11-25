#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
chmod u+w web/sites/default web/sites/default/settings.php
cat >> web/sites/default/settings.php <<'PHP'

// Delete CSS/JS aggregates older than ten days on cache clear.
$settings['asset_gc_threshold'] = 10 * 86400;
PHP
