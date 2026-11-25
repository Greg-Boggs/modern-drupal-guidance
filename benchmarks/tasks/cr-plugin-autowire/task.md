---
id: cr-plugin-autowire
title: Block plugin with constructor injection and no factory method
kind: code
guides: [pluginbase-provides-create-factory-method-with-autowired, dependency-injection]
---

Create a module called `bench_users` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_users_count`, listed for admins as `User count`) that shows `Users: N`, the number of user accounts, not counting the anonymous user.
