<?php

declare(strict_types=1);

namespace Drupal\bench_nodeform\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Form\NodeForm;

/**
 * Node form with a proofreading reminder.
 */
class BenchNodeForm extends NodeForm {

  public function form(array $form, FormStateInterface $form_state): array {
    $form = parent::form($form, $form_state);
    $form['bench_reminder'] = [
      '#markup' => $this->t('Remember to proofread.'),
      '#weight' => -100,
    ];
    return $form;
  }

}
