<?php

declare(strict_types=1);

namespace Drupal\bench_block\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Shows a configurable greeting.
 */
#[Block(
  id: 'bench_greeting',
  admin_label: new TranslatableMarkup('Bench greeting'),
)]
final class GreetingBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration(): array {
    return ['greeting' => ''];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state): array {
    $form['greeting'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Greeting'),
      '#default_value' => $this->configuration['greeting'],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state): void {
    $this->configuration['greeting'] = (string) $form_state->getValue('greeting');
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $greeting = $this->configuration['greeting'] !== '' ? $this->configuration['greeting'] : $this->t('Hello from the benchmark');
    return ['#plain_text' => (string) $greeting];
  }

}
