---
id: cr-user-load-by-properties
title: Find accounts by e-mail and name
kind: code
guides: [user-load-by-mail-and-user-load-by-name-are-deprecated]
---

Create a module called `bench_finder` in `web/modules/custom` and turn it on. `bench_finder.users` has `byMail($mail)` and `byName($name)`, which return the user account with that email address or user name, or NULL when there is none.
