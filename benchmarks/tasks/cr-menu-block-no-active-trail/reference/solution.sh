#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush config:set block.block.olivero_main_menu settings.ignore_active_trail true --input-format=yaml -y
