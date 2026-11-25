<?php

declare(strict_types=1);

namespace Drupal\bench_feedback;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;

/**
 * Stores submitted feedback.
 */
final class FeedbackRecorder {

  public function __construct(private readonly StateInterface $state) {}

  public function record(array &$form, FormStateInterface $form_state): void {
    $this->state->set('bench_feedback.last', $form_state->getValue('message'));
  }

}
