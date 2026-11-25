<?php

declare(strict_types=1);

namespace Drupal\bench_decor;

use Drupal\Core\Logger\LoggerChannelFactoryInterface;

/**
 * Logs IP bans, then passes calls to the decorated ban IP manager.
 */
final class BanLogger {

  public function __construct(
    private readonly object $inner,
    private readonly LoggerChannelFactoryInterface $loggerFactory,
  ) {}

  public function banIp($ip): void {
    $this->loggerFactory->get('bench_decor')->notice('Banning @ip', ['@ip' => $ip]);
    $this->inner->banIp($ip);
  }

  public function __call(string $name, array $arguments): mixed {
    return $this->inner->$name(...$arguments);
  }

}
