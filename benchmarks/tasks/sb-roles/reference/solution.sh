#!/usr/bin/env bash
# Reference solution: runs in the site root.
set -euo pipefail
drush=vendor/bin/drush
$drush role:create reviewer Reviewer
$drush role:perm:add reviewer 'access content overview,view all revisions'
$drush user:create rita --mail=rita@example.com --password="$(head -c 12 /dev/urandom | base64)"
$drush user:role:add reviewer rita
