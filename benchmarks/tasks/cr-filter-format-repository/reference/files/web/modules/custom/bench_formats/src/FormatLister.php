<?php

declare(strict_types=1);

namespace Drupal\bench_formats;

use Drupal\Core\Session\AccountInterface;
use Drupal\filter\FilterFormatRepositoryInterface;

/**
 * Lists text formats for accounts.
 */
final class FormatLister {

  public function __construct(private readonly FilterFormatRepositoryInterface $formats) {}

  public function formatIds(AccountInterface $account): array {
    return array_keys($this->formats->getFormatsForAccount($account));
  }

  public function defaultFormatId(AccountInterface $account): string {
    return (string) $this->formats->getDefaultFormat($account)->id();
  }

}
