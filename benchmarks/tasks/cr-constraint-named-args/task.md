---
id: cr-constraint-named-args
title: Validation constraint plugin with named arguments
kind: code
guides: [constraint-plugins-must-use-named-arguments-instead-of-an]
---

Create a module called `bench_zip` in `web/modules/custom` and turn it on. Add a postal code validation rule called `BenchZip` that accepts only five-digit codes and otherwise reports `%value is not a valid postal code.` Our import code also creates the rule directly with its own message, as `new \Drupal\bench_zip\Plugin\Validation\Constraint\BenchZipConstraint(message: 'Bad code')`, and expects that message when a code is rejected.
