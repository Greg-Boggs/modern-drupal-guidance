<?php

declare(strict_types=1);

namespace Drupal\zbench_reorder\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Hook\Attribute\ReorderHook;
use Drupal\Core\Hook\Order\Order;
use Drupal\field_ui\Hook\FieldUiHooks;

/**
 * Hook implementations for zbench_reorder.
 */
final class ZbenchReorderHooks {

  #[Hook('form_alter')]
  #[ReorderHook('form_alter', class: FieldUiHooks::class, method: 'formAlter', order: Order::Last)]
  public function formAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $form['#zbench_reorder'] = TRUE;
  }

}
