# Auth Feature

`auth-feature` owns the user-facing authentication flow, currently the login screen. It may orchestrate `auth-data-access` and domain-neutral UI but must not own Firebase initialization or the authenticated shell frame.

Public imports use `@pulso-shell/auth-feature`.

Run `npx nx test auth-feature` for focused tests.
