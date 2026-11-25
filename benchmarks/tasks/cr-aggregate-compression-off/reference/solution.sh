#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush config:set system.performance css.compress 0 -y
vendor/bin/drush config:set system.performance js.compress 0 -y
