#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
cp -R "$REF/files/." .
vendor/bin/drush pm:install bench_block -y
vendor/bin/drush php:eval "\Drupal\block\Entity\Block::create(['id' => 'olivero_bench_greeting', 'theme' => 'olivero', 'region' => 'content', 'plugin' => 'bench_greeting', 'settings' => ['label' => 'Bench greeting', 'label_display' => '0'], 'weight' => -10])->save();"
