# Shell Application Rules

- Keep authentication state and guards in the authentication/core boundary; never bypass a guard to make navigation pass.
- Preserve `/login` as a guest route and `/crm` and `/projects` as authenticated remote routes.
- Treat the remote names `crm`, `projects`, and their `./Routes` exposure as integration contracts.
- Update the development and production federation manifests together when a remote endpoint changes.
- Cover guard, redirect, login, and remote-loading changes with focused tests plus an integrated smoke check.
- Do not log tokens, user credentials, Firebase user objects, or sensitive authentication errors.
