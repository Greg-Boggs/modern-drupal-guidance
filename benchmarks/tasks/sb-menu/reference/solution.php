<?php

use Drupal\menu_link_content\Entity\MenuLinkContent;
use Drupal\node\Entity\Node;

$node = Node::create([
  'type' => 'page',
  'title' => 'About us',
  'body' => ['value' => '<p>We build Drupal sites.</p>', 'format' => 'basic_html'],
  'path' => ['alias' => '/about'],
  'status' => 1,
  'uid' => 1,
]);
$node->save();

MenuLinkContent::create([
  'title' => 'About us',
  'menu_name' => 'main',
  'link' => ['uri' => 'entity:node/' . $node->id()],
  'enabled' => TRUE,
])->save();
