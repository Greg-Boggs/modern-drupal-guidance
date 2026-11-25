---
id: sb-content-type
title: Event content type with fields
kind: site-building
guides: [structure-content-type, structure-fields, structure-form-editing, structure-content-display]
---

We want to list community events on the site. Add an Event content type (machine name `event`). Besides the title, each event needs a date (required, a day only, without a time), a location as one line of text, and a link to its registration page. Use the machine names `field_event_date`, `field_event_location` and `field_event_registration`. Editors should see all three when they add or edit an event, and visitors should see them on the event's page. Other content types should not get these fields.
