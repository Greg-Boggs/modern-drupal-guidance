# Expectations: Recipe that adds two CKEditor toolbar buttons

Checks parse the recipe file and read the active editor configuration.

Source: the change record [node/3624154](https://www.drupal.org/node/3624154), imported as the guide `ckeditor-5-additemtotoolbar-now-supports-adding-multiple`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_editor_tools/recipe.yml exists and is named "Bench editor tools". |
| `one-action` | MUST | Practice | The recipe has one config action entry for editor.editor.full_html that adds both items as a list (addItemToToolbar or addItemsToToolbar). |
| `applied` | MUST | Outcome | The active full_html editor toolbar contains specialCharacters and code and still contains bold, link and sourceEditing. |
| `no-config-copy` | MUST NOT | Practice | The recipe ships editor.editor.full_html.yml in its config folder. |
