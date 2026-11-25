#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush role:perm:add content_editor "administer node published status"
