#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush role:create block_reviewer "Block reviewer"
vendor/bin/drush role:perm:add block_reviewer "view unpublished block content"
