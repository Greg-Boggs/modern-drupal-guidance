<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection\Form;

use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\mdg_dependency_injection\GreetingBuilderInterface;

/**
 * Shows a greeting and a button.
 */
class GreetingForm extends FormBase {

  use AutowireTrait;

  public function __construct(
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'mdg_dependency_injection_greeting_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['greeting'] = ['#markup' => $this->greetingBuilder->build()];
    $form['submit'] = ['#type' => 'submit', '#value' => $this->t('Thanks')];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->messenger()->addStatus($this->t('You are welcome.'));
  }

}
