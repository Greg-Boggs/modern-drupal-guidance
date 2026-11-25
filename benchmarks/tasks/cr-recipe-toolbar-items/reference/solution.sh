#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
cp -R "$REF/files/." .
vendor/bin/drush recipe "$PWD/recipes/bench_editor_tools" -y
