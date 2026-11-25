<?php

declare(strict_types=1);

namespace Drupal\bench_feedback\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Feedback form whose submit handler lives on a service.
 */
final class FeedbackForm extends FormBase {

  public function getFormId(): string {
    return 'bench_feedback_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['message'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Message'),
      '#required' => TRUE,
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Send'),
    ];
    $form['#submit'][] = 'bench_feedback.recorder:record';
    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
  }

}
