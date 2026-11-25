#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
cp -R "$REF/files/." .
vendor/bin/drush pm:install bench_cache -y
vendor/bin/drush php:eval "\Drupal\block\Entity\Block::create(['id' => 'olivero_article_count', 'theme' => 'olivero', 'region' => 'sidebar', 'plugin' => 'bench_article_count', 'settings' => ['label' => 'Article count', 'label_display' => '0'], 'weight' => 0])->save();"
