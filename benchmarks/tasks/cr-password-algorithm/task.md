---
id: cr-password-algorithm
title: Hash passwords with bcrypt cost 12
kind: site-building
guides: [password-hashing-is-configurable-using-kernel-parameters]
---

A compliance rule says new and changed user passwords must be hashed with bcrypt (`$2y$`) at cost 12 instead of Drupal's default. Make the site do that without writing custom code.
