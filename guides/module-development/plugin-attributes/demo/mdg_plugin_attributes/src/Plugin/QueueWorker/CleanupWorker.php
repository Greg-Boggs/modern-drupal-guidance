<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes\Plugin\QueueWorker;

use Drupal\Core\Queue\Attribute\QueueWorker;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Processes cleanup items.
 */
#[QueueWorker(
  id: 'mdg_plugin_attributes_cleanup',
  title: new TranslatableMarkup('Cleanup'),
  cron: ['time' => 30],
)]
class CleanupWorker extends QueueWorkerBase {

  /**
   * {@inheritdoc}
   */
  public function processItem($data): void {
    // Process one item.
  }

}
