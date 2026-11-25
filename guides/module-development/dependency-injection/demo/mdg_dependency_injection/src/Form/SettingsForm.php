<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\TypedConfigManagerInterface;
use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\mdg_dependency_injection\GreetingBuilderInterface;

/**
 * Configures the greeting suffix.
 */
class SettingsForm extends ConfigFormBase {

  use AutowireTrait;

  public function __construct(
    ConfigFactoryInterface $config_factory,
    TypedConfigManagerInterface $typed_config_manager,
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {
    parent::__construct($config_factory, $typed_config_manager);
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'mdg_dependency_injection_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return ['mdg_dependency_injection.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['preview'] = ['#markup' => $this->greetingBuilder->build()];
    $form['suffix'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Suffix'),
      '#config_target' => 'mdg_dependency_injection.settings:suffix',
    ];
    return parent::buildForm($form, $form_state);
  }

}
