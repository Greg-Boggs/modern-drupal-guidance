<?php

declare(strict_types=1);

namespace Drupal\bench_nodeform\Hook;

use Drupal\bench_nodeform\Form\BenchNodeForm;
use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_nodeform.
 */
final class BenchNodeformHooks {

  #[Hook('entity_type_alter')]
  public function entityTypeAlter(array &$entity_types): void {
    if (isset($entity_types['node'])) {
      $entity_types['node']->setFormClass('default', BenchNodeForm::class);
      $entity_types['node']->setFormClass('edit', BenchNodeForm::class);
    }
  }

}
