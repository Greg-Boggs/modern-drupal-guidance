<?php

declare(strict_types=1);

namespace Drupal\bench_text;

/**
 * Formats text through the basic_html format.
 */
final class TextFormatter {

  public function format(string $text): array {
    return [
      '#type' => 'processed_text',
      '#text' => $text,
      '#format' => 'basic_html',
    ];
  }

}
