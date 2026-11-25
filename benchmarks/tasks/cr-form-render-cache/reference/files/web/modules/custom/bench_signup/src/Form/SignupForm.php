<?php

declare(strict_types=1);

namespace Drupal\bench_signup\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * A signup form that opts in to render caching.
 */
final class SignupForm extends FormBase {

  public function getFormId(): string {
    return 'bench_signup_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email'),
      '#required' => TRUE,
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Sign up'),
    ];
    // A non-zero max-age opts the form in to render caching.
    $form['#cache']['max-age'] = 3600;
    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->messenger()->addStatus($this->t('Thanks for signing up.'));
  }

}
