<?php

declare(strict_types=1);

namespace Drupal\mdg_cache_metadata\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;

/**
 * Lists the five newest article titles.
 */
class LatestController extends ControllerBase {

  /**
   * Builds the list.
   */
  public function list(): array {
    $storage = $this->entityTypeManager()->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'article')
      ->condition('status', 1)
      ->sort('created', 'DESC')
      ->range(0, 5)
      ->execute();

    $build = ['#theme' => 'item_list', '#items' => []];
    $cacheability = new CacheableMetadata();
    $cacheability->addCacheTags(['node_list:article']);
    $cacheability->addCacheContexts(['user.permissions']);

    foreach ($storage->loadMultiple($ids) as $node) {
      $build['#items'][] = $node->label();
      $cacheability->addCacheableDependency($node);
    }

    $cacheability->applyTo($build);
    return $build;
  }

  /**
   * Checks access to the list.
   */
  public function access(AccountInterface $account): AccessResultInterface {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }

  /**
   * Returns the site name as JSON.
   */
  public function json(): CacheableJsonResponse {
    $config = $this->config('system.site');
    $response = new CacheableJsonResponse(['name' => $config->get('name')]);
    $response->addCacheableDependency($config);
    $response->addCacheableDependency((new CacheableMetadata())->addCacheContexts(['languages:language_interface']));
    return $response;
  }

}
