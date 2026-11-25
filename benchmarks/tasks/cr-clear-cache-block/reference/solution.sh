#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush php:eval '\Drupal\block\Entity\Block::create(["id" => "claro_clear_cache", "theme" => "claro", "region" => "content", "plugin" => "system_clear_cache_block", "weight" => -10, "settings" => ["id" => "system_clear_cache_block", "label" => "Clear cache", "label_display" => "visible", "provider" => "system"]])->save();'
