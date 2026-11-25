<?php

declare(strict_types=1);

namespace Drupal\modern_example\Hook;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\node\NodeInterface;

/**
 * Hook implementations for the Modern example module.
 */
final class ModernExampleHooks {

  use StringTranslationTrait;

  public function __construct(
    private readonly Connection $connection,
    private readonly MessengerInterface $messenger,
  ) {}

  /**
   * Implements hook_help().
   */
  #[Hook('help')]
  public function help(string $route_name, RouteMatchInterface $route_match): ?string {
    if ($route_name === 'help.page.modern_example') {
      return '<p>' . $this->t('Modern example.') . '</p>';
    }
    return NULL;
  }

  /**
   * Implements hook_theme().
   */
  #[Hook('theme')]
  public function theme(): array {
    return [
      'modern_example_greeting' => [
        'variables' => ['name' => NULL],
      ],
    ];
  }

  /**
   * Implements hook_page_attachments().
   */
  #[Hook('page_attachments')]
  public function pageAttachments(array &$attachments): void {
    $attachments['#attached']['library'][] = 'modern_example/greeting';
  }

  /**
   * Implements hook_ENTITY_TYPE_view() for node entities.
   */
  #[Hook('node_view')]
  public function nodeView(array &$build, NodeInterface $node, EntityViewDisplayInterface $display, string $view_mode): void {
    $count = $this->connection->query('SELECT COUNT(*) FROM {node_field_data} WHERE uid = :uid', [':uid' => $node->getOwnerId()])->fetchField();
    $build['modern_example_byline'] = [
      '#markup' => $this->t('@name has written @count posts.', [
        '@name' => $node->getOwner()->getDisplayName(),
        '@count' => $count,
      ]),
      '#prefix' => '<p class="byline">',
      '#suffix' => '</p>',
      '#cache' => ['tags' => ['node_list']],
    ];
    if ($view_mode === 'full') {
      $this->messenger->addStatus($this->t('You are viewing @title.', ['@title' => $node->label()]));
    }
  }

}
