#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush php:eval '$t = \Drupal\node\Entity\NodeType::load("article"); $t->setPreviewMode(\Drupal\node\NodePreviewMode::Required); $t->save();'
