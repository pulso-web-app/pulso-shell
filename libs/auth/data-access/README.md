# Auth Data Access

`auth-data-access` owns the shell's Firebase initialization, authentication state and route guards. It has no dependency on routed feature or layout code.

Public imports use `@pulso-shell/auth-data-access`. Keep credentials and environment-specific configuration outside source control.

Run `npx nx test auth-data-access` for focused tests.
