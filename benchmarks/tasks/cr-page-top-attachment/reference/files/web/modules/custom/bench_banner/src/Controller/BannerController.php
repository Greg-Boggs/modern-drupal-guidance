<?php

declare(strict_types=1);

namespace Drupal\bench_banner\Controller;

/**
 * A page that adds a notice to page_top through its attachments.
 */
final class BannerController {

  public function __invoke(): array {
    return [
      '#markup' => 'Main content here.',
      '#attached' => [
        'page_top' => [
          'bench_banner' => ['#markup' => '<div class="bench-notice">Site-wide notice: maintenance tonight.</div>'],
        ],
      ],
    ];
  }

}
