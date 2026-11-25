---
id: cr-access-neutral-reason
title: Members-only access result with a reason
kind: code
guides: [accessresult-allowedif-and-accessresult-forbiddenif-now]
---

Create a module called `bench_members` in `web/modules/custom` and turn it on. Our members-only pages will ask it who may see member content: other code calls `check($account)` on `bench_members.access` and gets an access result back. Accounts with the `member` role are allowed. A blocked account is forbidden, with the reason `Blocked accounts cannot see member content.` Everyone else gets a neutral result (so other access rules can still decide) with the reason `Only members can see this content.` The answer depends on the account's roles, so it must never be reused for someone with different roles.
