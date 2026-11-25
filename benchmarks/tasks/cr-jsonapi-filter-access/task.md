---
id: cr-jsonapi-filter-access
title: JSON:API filter access for published users
kind: code
guides: [json-api-filter-constants-have-been-deprecated, oop-hooks]
---

Turn on core's JSON:API module. Create a module called `bench_apifilter` in `web/modules/custom` and turn it on. API users with the `access user profiles` permission should be able to filter the JSON:API list of users, limited to active (not blocked) accounts. Users without that permission get no such access.
