#!/usr/bin/env bash
# Reference solution: runs in the site root. $REF is this directory.
# Same result as ticking "Entity links" on the Basic HTML format form: the
# filter is enabled and CKEditor 5's entity links plugin adds its attributes
# to the allowed HTML of filter_html.
set -euo pipefail
vendor/bin/drush php:eval '
$f = \Drupal\filter\Entity\FilterFormat::load("basic_html");
$html = $f->filters("filter_html")->getConfiguration();
$html["settings"]["allowed_html"] = str_replace("<a hreflang href>", "<a hreflang href data-entity-type data-entity-uuid data-entity-metadata>", $html["settings"]["allowed_html"]);
$f->setFilterConfig("filter_html", $html);
$f->setFilterConfig("entity_links", ["status" => TRUE, "weight" => 20]);
$f->save();'
