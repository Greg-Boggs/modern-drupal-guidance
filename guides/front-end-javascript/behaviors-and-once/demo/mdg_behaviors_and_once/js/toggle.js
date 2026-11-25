((Drupal, once) => {
  Drupal.behaviors.mdgBehaviorsToggle = {
    attach(context, settings) {
      // Query inside context, through once(). The ID must be unique to this
      // behavior and contain no spaces.
      once('mdg-toggle', '[data-mdg-toggle]', context).forEach((button) => {
        button.addEventListener('click', () => {
          const target = document.getElementById(button.getAttribute('aria-controls'));
          const expanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', String(!expanded));
          target.hidden = expanded;
        });
      });
    },
    detach(context, settings, trigger) {
      // Clean up only when markup is removed, not on every serialize.
      if (trigger === 'unload') {
        once.remove('mdg-toggle', '[data-mdg-toggle]', context);
      }
    },
  };
})(Drupal, once);
