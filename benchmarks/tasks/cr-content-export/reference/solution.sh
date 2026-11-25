#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
set -euo pipefail
nid=$(vendor/bin/drush php:eval '$n = \Drupal\node\Entity\Node::create(["type" => "page", "title" => "About us", "body" => ["value" => "We build websites.", "format" => "basic_html"], "status" => 1]); $n->save(); print $n->id();')
mkdir -p recipes/bench_about/content
printf "name: Bench about\ndescription: 'Adds the About us page.'\ntype: Content\n" > recipes/bench_about/recipe.yml
(cd web && php core/scripts/drupal content:export node "$nid" --dir=../recipes/bench_about/content)
