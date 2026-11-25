<?php

declare(strict_types=1);

namespace Drupal\bench_termlinks\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_termlinks.
 */
final class BenchTermlinksHooks {

  #[Hook('entity_bundle_info_alter')]
  public function entityBundleInfoAlter(array &$bundles): void {
    if (isset($bundles['taxonomy_term']['tags'])) {
      $bundles['taxonomy_term']['tags']['ckeditor5_link_suggestions'] = TRUE;
    }
  }

}
