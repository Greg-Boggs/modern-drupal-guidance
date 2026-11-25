# Expectations: Office hours custom block

Checks read the content manifest saved with the trial (`bench-state/content.json`), the active block configuration and two rendered pages.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `block-content` | MUST | Outcome | A `basic` custom block (block_content) has the description "Office hours" and a body containing "Open Monday to Friday, 9:00 to 17:00". |
| `placed` | MUST | Outcome | An enabled `block.block.*` config in theme `olivero`, region `footer_top`, uses plugin `block_content:<uuid of that block>`. |
| `title-visible` | MUST | Outcome | That placement displays its title (`label_display: visible`). |
| `all-pages` | MUST | Outcome | That placement has no visibility conditions. |
| `renders` | MUST | Outcome | The front page and `/user/login` both show "Open Monday to Friday, 9:00 to 17:00". Re-grades keep the recorded result, because a diff cannot recreate the custom block entity. |
| `not-in-admin-theme` | MUST NOT | Outcome | The block is not placed in the Claro admin theme. |
