#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush role:create site_manager "Site manager"
vendor/bin/drush role:perm:add site_manager "rebuild node access permissions,access administration pages,view the administration theme"
