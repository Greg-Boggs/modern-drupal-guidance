#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush php:eval '
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\node\Entity\NodeType;
NodeType::create(["type" => "event", "name" => "Event"])->save();
FieldConfig::create(["field_storage" => FieldStorageConfig::loadByName("node", "body"), "bundle" => "event", "label" => "Body"])->save();
$repo = \Drupal::service("entity_display.repository");
$repo->getFormDisplay("node", "event")->setComponent("body", ["type" => "text_textarea_with_summary"])->save();
$repo->getViewDisplay("node", "event")->setComponent("body", ["type" => "text_default", "label" => "hidden"])->save();
'
