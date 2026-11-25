<?php

declare(strict_types=1);

namespace Drupal\bench_autoform\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;

/**
 * Saves a note to state.
 */
final class NoteForm extends FormBase {

  public function __construct(private readonly StateInterface $state) {}

  public function getFormId(): string {
    return 'bench_autoform';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['last'] = ['#markup' => $this->t('Last saved: @v', ['@v' => $this->state->get('bench_autoform.last', 'never')])];
    $form['note'] = ['#type' => 'textfield', '#title' => $this->t('Note')];
    $form['actions']['submit'] = ['#type' => 'submit', '#value' => $this->t('Save')];
    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->state->set('bench_autoform.last', $form_state->getValue('note'));
  }

}
