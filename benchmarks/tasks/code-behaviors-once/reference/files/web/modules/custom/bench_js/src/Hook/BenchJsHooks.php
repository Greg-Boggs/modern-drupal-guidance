<?php

declare(strict_types=1);

namespace Drupal\bench_js\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Routing\AdminContext;

/**
 * Attaches the badge library to front-end pages.
 */
final class BenchJsHooks {

  public function __construct(
    private readonly AdminContext $adminContext,
  ) {}

  #[Hook('page_attachments')]
  public function pageAttachments(array &$attachments): void {
    if (!$this->adminContext->isAdminRoute()) {
      $attachments['#attached']['library'][] = 'bench_js/badge';
    }
  }

}
