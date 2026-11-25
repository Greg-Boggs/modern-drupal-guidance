<?php

declare(strict_types=1);

namespace Drupal\bench_wordcount\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_wordcount.
 */
final class BenchWordcountHooks {

  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    if (($variables['view_mode'] ?? '') !== 'full') {
      return;
    }
    $title = (string) $variables['node']->label();
    $variables['attributes']['data-words'] = (string) str_word_count($title);
  }

}
