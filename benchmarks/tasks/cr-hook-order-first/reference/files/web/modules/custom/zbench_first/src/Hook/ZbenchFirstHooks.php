<?php

declare(strict_types=1);

namespace Drupal\zbench_first\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Hook\Order\Order;

/**
 * Hook implementations for zbench_first.
 */
final class ZbenchFirstHooks {

  #[Hook('form_alter', order: Order::First)]
  public function formAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $form['#zbench_first'] = TRUE;
  }

}
