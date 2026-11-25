<?php

declare(strict_types=1);

namespace Drupal\mdg_oop_hooks\Hook;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for mdg_oop_hooks.
 */
class MdgOopHooksHooks {

  use StringTranslationTrait;

  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
  ) {}

  /**
   * Implements hook_help().
   */
  #[Hook('help')]
  public function help(string $route_name, RouteMatchInterface $route_match): ?string {
    if ($route_name === 'help.page.mdg_oop_hooks') {
      return '<p>' . $this->t('Adds a site name notice to the login form.') . '</p>';
    }
    return NULL;
  }

  /**
   * Implements hook_form_FORM_ID_alter() for the user login form.
   */
  #[Hook('form_user_login_form_alter')]
  public function userLoginFormAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $site_name = $this->configFactory->get('system.site')->get('name');
    $form['site_notice'] = [
      '#markup' => $this->t('You are logging in to @site.', ['@site' => $site_name]),
      '#weight' => -100,
    ];
  }

}
