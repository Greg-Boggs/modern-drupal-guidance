# Expectations: About us page in the main menu

Checks read the content manifest saved with the trial (`bench-state/content.json`) and the rendered front page.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `page` | MUST | Outcome | Exactly one published node of type `page` is titled "About us". |
| `alias` | MUST | Outcome | That node has the URL alias `/about`. |
| `menu-link` | MUST | Outcome | An enabled menu link in menu `main`, titled "About us", points to that node (`entity:node/<nid>`, `internal:/node/<nid>` or `internal:/about`). |
| `renders` | MUST | Outcome | The front page shows a link to `/about` with the text "About us". Re-grades keep the recorded result, because a diff cannot recreate the node and menu link. |
| `no-other-menus` | MUST NOT | Outcome | An "About us" link exists in a menu other than `main`. |
