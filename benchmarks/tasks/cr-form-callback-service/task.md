---
id: cr-form-callback-service
title: Form submit handler on an injected service
kind: code
guides: [form-api-callbacks-now-support-callables-supported-by-the, dependency-injection]
---

Create a module called `bench_feedback` in `web/modules/custom` and turn it on. Add a feedback form at `/feedback` (form ID `bench_feedback_form`) with a required `message` text area and a submit button. Saving feedback is the job of `bench_feedback.recorder`, which other forms will reuse: its `record(array &$form, FormStateInterface $form_state)` saves the submitted `message` to the site state value `bench_feedback.last`. The feedback form should hand its submissions to that recorder.
