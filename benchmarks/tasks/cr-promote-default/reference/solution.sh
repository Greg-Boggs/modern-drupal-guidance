#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush php:eval '
\Drupal\node\Entity\NodeType::create(["type" => "news", "name" => "News"])->save();
$fields = \Drupal::service("entity_field.manager")->getFieldDefinitions("node", "news");
$fields["promote"]->getConfig("news")->setDefaultValue(TRUE)->save();
\Drupal::service("entity_display.repository")->getFormDisplay("node", "news")->setComponent("promote", ["type" => "boolean_checkbox", "settings" => ["display_label" => TRUE], "weight" => 15])->save();
'
