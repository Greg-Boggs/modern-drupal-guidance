<?php

declare(strict_types=1);

namespace Drupal\bench_fonts\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_fonts.
 */
final class BenchFontsHooks {

  #[Hook('page_attachments_alter')]
  public function pageAttachmentsAlter(array &$attachments): void {
    $attachments['#attached']['library'][] = 'bench_fonts/typography';
  }

}
