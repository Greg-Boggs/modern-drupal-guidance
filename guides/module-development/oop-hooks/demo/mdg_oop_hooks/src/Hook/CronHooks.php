<?php

declare(strict_types=1);

namespace Drupal\mdg_oop_hooks\Hook;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Cron hook implementations for mdg_oop_hooks.
 */
class CronHooks {

  public function __construct(
    protected readonly StateInterface $state,
    protected readonly TimeInterface $time,
    #[Autowire(service: 'logger.channel.mdg_oop_hooks')]
    protected readonly LoggerInterface $logger,
  ) {}

  /**
   * Implements hook_cron().
   */
  #[Hook('cron')]
  public function cron(): void {
    $this->state->set('mdg_oop_hooks.last_cron', $this->time->getRequestTime());
    $this->logger->info('mdg_oop_hooks cron ran.');
  }

}
