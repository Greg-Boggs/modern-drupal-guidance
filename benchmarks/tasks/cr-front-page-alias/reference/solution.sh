#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
vendor/bin/drush php:eval '$n = \Drupal\node\Entity\Node::create(["type" => "page", "title" => "Welcome", "body" => ["value" => "Hello from the welcome page.", "format" => "basic_html"], "status" => 1, "path" => ["alias" => "/welcome"]]); $n->save();'
vendor/bin/drush config:set system.site page.front /welcome -y
