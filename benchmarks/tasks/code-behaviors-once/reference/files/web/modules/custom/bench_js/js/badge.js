/**
 * @file
 * Adds a "New" badge to each node content element, once.
 */
((Drupal, once) => {
  Drupal.behaviors.benchBadge = {
    attach(context) {
      once('bench-badge', '.node__content', context).forEach((element) => {
        const badge = document.createElement('span');
        badge.className = 'bench-badge';
        badge.textContent = Drupal.t('New');
        element.append(badge);
      });
    },
  };
})(Drupal, once);
