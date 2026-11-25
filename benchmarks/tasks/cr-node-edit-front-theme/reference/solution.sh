#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush config:set node.settings use_admin_theme 0 -y
vendor/bin/drush cache:rebuild
