# Expectations: Recent articles view with page and block

Checks read the view's active configuration and then load `/recent-articles` as an anonymous visitor after the grader creates six published articles, one unpublished article and one basic page.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `view-exists` | MUST | Outcome | Config `views.view.recent_articles` exists, is enabled and lists content (`base_table: node_field_data`). |
| `filters` | MUST | Outcome | The view filters on content type `article` and on published status. |
| `sort` | MUST | Outcome | The view sorts by authored on date (`created`), descending. |
| `pager` | MUST | Outcome | The view shows 5 items. |
| `page-display` | MUST | Outcome | A page display exists with the path `recent-articles`. |
| `block-display` | MUST | Outcome | A block display exists. |
| `renders` | MUST | Outcome | `/recent-articles` returns 200 and shows the five newest published articles, newest first, as links; it hides the oldest article, the unpublished article and the basic page. |
| `block-not-placed` | MUST NOT | Outcome | No block config places a `views_block:recent_articles-*` block. |
