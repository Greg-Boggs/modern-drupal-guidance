---
name: recipeinputformtrait-lets-you-collect-recipe-inputs-in-a
title: "RecipeInputFormTrait lets you collect recipe inputs in a form"
description: "RecipeInputFormTrait lets you collect recipe inputs in a form"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3489030
change-record-nid: 3489030
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3483435](https://www.drupal.org/node/3483435)

The new trait, `Drupal\Core\Recipe\RecipeInputFormTrait`, can be added to form classes if you want to create a UI that collects input values for a recipe which needs them.

### For recipe authors

To work with forms, your recipe needs to define how it wants its inputs to look when rendered in a form. For example, from core's `feedback_contact_form` recipe:

```php
input:
  recipient:
    data_type: email
    description: 'The email address that should receive submissions from the feedback form.'
    constraints:
      NotBlank: []
    prompt:
      method: ask
      arguments:
        question: 'What email address should receive website feedback?'
    form:
      '#type': email
      '#title': 'Feedback form email address'
    default:
      source: config
      config: ['system.site', 'mail']
```

Anything under the `form` key will be used to build the form element for this input. If `form` is not present, the input will never be shown in a form at all. If it is present, it must be an array containing only form element properties (i.e., every key must begin with `#`) -- it cannot contain any child elements.

### For developers building a recipe UI

In your form class, load the recipe as an object using `\Drupal\Core\Recipe\Recipe::createFromDirectory()`, and then generate a set of elements for the recipe's inputs and all of its dependencies, validate them, and apply the recipe programmatically with the submitted values:

```php
class MyRecipeForm extends FormBase {

  use RecipeInputFormTrait;

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $recipe = Recipe::createFromDirectory('core/recipes/feedback_contact_form');
    $form += $this->buildRecipeInputForm($recipe);

    // $form['feedback_contact_form']['recipient'] will now exist, and have '#type' => 'email'.

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $recipe = Recipe::createFromDirectory('core/recipes/feedback_contact_form');
    $this->validateRecipeInput($recipe, $form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $recipe = Recipe::createFromDirectory('core/recipes/feedback_contact_form');
    $this->setRecipeInput($recipe, $form_state);
    RecipeRunner::processRecipe($recipe);
  }

}
```

See `core/modules/system/tests/modules/form_test/src/Form/FormTestRecipeInputForm.php` for an example of how this works.

*Source: [RecipeInputFormTrait lets you collect recipe inputs in a form](https://www.drupal.org/node/3489030), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
