<?php

declare(strict_types=1);

namespace Drupal\bench_filehdr;

use Drupal\file\FileInterface;

/**
 * Returns download headers for files.
 */
final class DownloadHeaders {

  public function forFile(FileInterface $file): array {
    return $file->getDownloadHeaders();
  }

}
