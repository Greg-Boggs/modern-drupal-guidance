#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
chmod u+w web/sites/default
cp "$REF/files/web/sites/default/services.yml" web/sites/default/services.yml
vendor/bin/drush cache:rebuild
