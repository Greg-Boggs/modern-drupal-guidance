<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Formats a plain text field in upper case.
 */
#[FieldFormatter(
  id: 'mdg_plugin_attributes_shout',
  label: new TranslatableMarkup('Shout'),
  field_types: ['string'],
)]
class ShoutFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = ['#plain_text' => mb_strtoupper((string) $item->value)];
    }
    return $elements;
  }

}
