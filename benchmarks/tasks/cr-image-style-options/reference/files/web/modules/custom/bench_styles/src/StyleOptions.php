<?php

declare(strict_types=1);

namespace Drupal\bench_styles;

use Drupal\image\ImageDerivativeUtilities;

/**
 * Builds image style options.
 */
final class StyleOptions {

  public function __construct(private readonly ImageDerivativeUtilities $utilities) {}

  public function options(bool $includeEmpty = TRUE): array {
    return $this->utilities->styleOptions($includeEmpty);
  }

}
