# Expectations: Reviewers can see unpublished custom blocks

Checks read the role configuration and check entity access for a test user through Drush.

Source: the change record [node/3533073](https://www.drupal.org/node/3533073), imported as the guide `new-permission-available-to-view-unpublished-block-content`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `role` | MUST | Outcome | The role block_reviewer exists with the label "Block reviewer". |
| `view-unpublished` | MUST | Outcome | A user with only block_reviewer has view access to an unpublished basic block_content entity. |
| `no-admin` | MUST NOT | Outcome | block_reviewer has administer block content or access block library. |
