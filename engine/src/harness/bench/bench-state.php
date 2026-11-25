<?php

/**
 * @file
 * Prints the site's active configuration and a small content manifest as JSON.
 *
 * Run with: drush php:script bench-state.php
 * Graders read site-building results from this output. The content part is
 * also saved to bench-state/content.json in each trial so that a recorded diff
 * carries the content an agent created.
 */

$storage = \Drupal::service('config.storage');
$config = $storage->readMultiple($storage->listAll());
ksort($config);

$etm = \Drupal::entityTypeManager();
$content = [];
$alias_manager = \Drupal::service('path_alias.manager');

if ($etm->hasDefinition('node')) {
  $content['node'] = [];
  foreach ($etm->getStorage('node')->loadMultiple() as $node) {
    $path = '/node/' . $node->id();
    $content['node'][] = [
      'id' => (int) $node->id(),
      'type' => $node->bundle(),
      'title' => $node->label(),
      'status' => (int) $node->isPublished(),
      'alias' => $alias_manager->getAliasByPath($path),
    ];
  }
}

if ($etm->hasDefinition('block_content')) {
  $content['block_content'] = [];
  foreach ($etm->getStorage('block_content')->loadMultiple() as $block) {
    $content['block_content'][] = [
      'id' => (int) $block->id(),
      'uuid' => $block->uuid(),
      'type' => $block->bundle(),
      'info' => $block->label(),
      'body' => $block->hasField('body') ? (string) $block->get('body')->value : '',
    ];
  }
}

if ($etm->hasDefinition('menu_link_content')) {
  $content['menu_link_content'] = [];
  foreach ($etm->getStorage('menu_link_content')->loadMultiple() as $link) {
    $content['menu_link_content'][] = [
      'id' => (int) $link->id(),
      'title' => $link->label(),
      'menu' => $link->getMenuName(),
      'uri' => $link->get('link')->uri,
      'enabled' => (int) $link->isEnabled(),
      'parent' => (string) $link->getParentId(),
    ];
  }
}

if ($etm->hasDefinition('user')) {
  $content['user'] = [];
  foreach ($etm->getStorage('user')->loadMultiple() as $account) {
    if ((int) $account->id() === 0) {
      continue;
    }
    $content['user'][] = [
      'id' => (int) $account->id(),
      'name' => $account->getAccountName(),
      'status' => (int) $account->isActive(),
      'roles' => array_values($account->getRoles(TRUE)),
    ];
  }
}

if ($etm->hasDefinition('path_alias')) {
  $content['path_alias'] = [];
  foreach ($etm->getStorage('path_alias')->loadMultiple() as $alias) {
    $content['path_alias'][] = ['path' => $alias->getPath(), 'alias' => $alias->getAlias()];
  }
}

if ($etm->hasDefinition('taxonomy_term')) {
  $content['taxonomy_term'] = [];
  foreach ($etm->getStorage('taxonomy_term')->loadMultiple() as $term) {
    $content['taxonomy_term'][] = ['id' => (int) $term->id(), 'vid' => $term->bundle(), 'name' => $term->label()];
  }
}

$modules = array_keys(\Drupal::moduleHandler()->getModuleList());
sort($modules);

print json_encode(['config' => $config, 'content' => $content, 'modules' => $modules], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
