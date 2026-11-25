---
id: cr-one-time-login-url
title: Generate one-time login links
kind: code
guides: [user-pass-rehash-user-cancel-url-user-mail-tokens-and-user]
---

Create a module called `bench_login` in `web/modules/custom` and turn it on. Support staff need to send people one-time login links. `loginUrl($account)` on `bench_login.links` returns an absolute one-time login link for that account, the same kind of `/user/reset/...` link Drupal emails for password resets, and Drupal must accept it.
