# Expectations: Reviewer role, permissions and user

Checks read the role's active configuration, the content manifest saved with the trial (`bench-state/content.json`) and Drupal's access checks for the new user.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `role-exists` | MUST | Outcome | Config `user.role.reviewer` exists with the label "Reviewer". |
| `permissions` | MUST | Outcome | The role has `access content overview` and `view all revisions`. |
| `user-rita` | MUST | Outcome | An active user `rita` exists with the `reviewer` role. |
| `access` | MUST | Outcome | Drupal grants `rita` access to `/admin/content` and to an article's revisions page, and denies editing the article. Re-grades keep the recorded result, because a diff cannot recreate the user account. |
| `no-admin` | MUST NOT | Outcome | The role is an admin role, or has any `administer *` permission or `bypass node access`. |
| `no-editing` | MUST NOT | Outcome | The role has any `create *`, `edit *`, `delete *` or `revert *` content permission. |
