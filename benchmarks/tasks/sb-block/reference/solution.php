<?php

use Drupal\block\Entity\Block;
use Drupal\block_content\Entity\BlockContent;

$content = BlockContent::create([
  'type' => 'basic',
  'info' => 'Office hours',
  'body' => ['value' => '<p>Open Monday to Friday, 9:00 to 17:00</p>', 'format' => 'basic_html'],
]);
$content->save();

Block::create([
  'id' => 'olivero_office_hours',
  'theme' => 'olivero',
  'region' => 'footer_top',
  'plugin' => 'block_content:' . $content->uuid(),
  'settings' => ['label' => 'Office hours', 'label_display' => 'visible'],
  'weight' => 0,
])->save();
