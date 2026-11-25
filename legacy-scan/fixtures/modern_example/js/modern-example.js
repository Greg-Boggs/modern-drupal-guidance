((Drupal, once) => {
  Drupal.behaviors.modernExample = {
    attach(context) {
      once('modern-example', '.modern-example-greeting', context).forEach((element) => {
        element.classList.add('is-processed');
      });
    },
  };
})(Drupal, once);
