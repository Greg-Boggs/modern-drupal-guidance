<?php

declare(strict_types=1);

namespace Drupal\mdg_oop_hooks_legacy\Hook;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for mdg_oop_hooks_legacy.
 */
class MdgOopHooksLegacyHooks {

  use StringTranslationTrait;

  /**
   * Implements hook_form_FORM_ID_alter() for the user login form.
   *
   * Counts calls so a test can prove the hook runs exactly once.
   */
  #[Hook('form_user_login_form_alter')]
  public function userLoginFormAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $form['legacy_notice'][] = [
      '#markup' => $this->t('Legacy-compatible hook ran.'),
    ];
  }

}
