<?php

use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\node\Entity\NodeType;

NodeType::create(['type' => 'event', 'name' => 'Event'])->save();

$fields = [
  'field_event_date' => ['datetime', ['datetime_type' => 'date'], 'Date', TRUE, 'datetime_default', 'datetime_default'],
  'field_event_location' => ['string', ['max_length' => 255], 'Location', FALSE, 'string_textfield', 'string'],
  'field_event_registration' => ['link', [], 'Registration', FALSE, 'link_default', 'link'],
];

$repo = \Drupal::service('entity_display.repository');
$form = $repo->getFormDisplay('node', 'event');
$view = $repo->getViewDisplay('node', 'event');
foreach ($fields as $name => [$type, $settings, $label, $required, $widget, $formatter]) {
  FieldStorageConfig::create(['field_name' => $name, 'entity_type' => 'node', 'type' => $type, 'settings' => $settings])->save();
  FieldConfig::create(['field_name' => $name, 'entity_type' => 'node', 'bundle' => 'event', 'label' => $label, 'required' => $required])->save();
  $form->setComponent($name, ['type' => $widget]);
  $view->setComponent($name, ['type' => $formatter, 'label' => 'above']);
}
$form->save();
$view->save();
