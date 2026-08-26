# Shell Composition Rules

- Keep this project a thin composition root: bootstrap, providers, top-level routes, federation wiring, and application-wide error handling.
- Put authentication state and guards in `auth-data-access`, login behavior in `auth-feature`, the authenticated frame in `shell-feature`, and domain-neutral primitives in `shared-ui`.
- Import library APIs through `@pulso-shell/*`; never import another project's `src/lib` internals.
- Never bypass an authentication guard to make navigation pass.
- Preserve `/login` as a guest route and `/crm` and `/projects` as authenticated remote routes.
- Treat the remote names `crm`, `projects`, and their `./Routes` exposure as integration contracts.
- Update the development and production federation manifests together when a remote endpoint changes.
- Cover guard, redirect, login, and remote-loading changes with focused tests plus an integrated smoke check.
- Do not log tokens, user credentials, Firebase user objects, or sensitive authentication errors.
