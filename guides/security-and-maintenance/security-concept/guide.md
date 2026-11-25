---
name: security-concept
title: "Concept: Security and Regular Updates"
description: "Overview of security updates, how bugs are handled, and non-security updates."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/security-concept.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

* {{ GUIDE_REF("understanding-drupal") }}
* {{ GUIDE_REF("understanding-modules") }}
* {{ GUIDE_REF("understanding-themes") }}
* {{ GUIDE_REF("understanding-project") }}
## What are security updates?

Any software occasionally has bugs, and sometimes these bugs have security
implications. When security bugs are fixed in the core software, modules, or
themes that your site uses, they are released in a _security update_. When
critical security updates are announced, they will be shown in the
administration pages of your website. You will need to apply security updates in
order to keep your site secure. See {{ GUIDE_REF("security-announce") }} to learn how to be
notified of security updates by email, and {{ GUIDE_REF("security-update-core") }},
{{ GUIDE_REF("security-update-module") }}, and {{ GUIDE_REF("security-update-theme") }} to learn how to make
updates.
## What is the security team?

The Drupal open-source project has a team of volunteers who track
security-related bugs and release security updates. They also help other
developers fix bugs, and maintain information for users on how to keep their
websites secure. You can learn more about the security team and their practices
and processes at the
[_Drupal.org_ Security Team](https://www.drupal.org/drupal-security-team/general-information) page.
## How are security bugs reported?

It is important that security problems be kept confidential until they are
fixed, so that sites are less likely to be compromised before they can be
secured. If you find a potential security problem in any of the software you
downloaded from the _Drupal.org_ website, follow the procedures on the
[_Drupal.org_ Security Team](https://www.drupal.org/drupal-security-team/general-information) page to report
it.
## What are regular (non-security) updates?

The core software, modules, and themes also periodically have regular updates to
add new features and fix bugs. These updates are less critical than security
updates. As a general best practice, updates should be applied as long as they
do not cause problems with your site. Testing on a development copy of your site
is always a good idea before applying updates on a live site. This is because
some updates may include changes that are not compatible with the modules or
themes on your site, or that will break a particular functionality on your site.
## Related topics

* {{ GUIDE_REF("security-announce") }}
* {{ GUIDE_REF("security-update-core") }}
* {{ GUIDE_REF("security-update-module") }}
* {{ GUIDE_REF("security-update-theme") }}
* {{ GUIDE_REF("install-dev-making") }}
## Additional resources

* [_Drupal.org_ community documentation page "Securing your site"](https://www.drupal.org/security/secure-configuration)
* ["Security advisories" on Drupal.org](https://www.drupal.org/security)
* [_Drupal.org_ Security team](https://www.drupal.org/drupal-security-team/general-information)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix)
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Concept: Security and Regular Updates](https://www.drupal.org/docs/user_guide/en/security-concept.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
