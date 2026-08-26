# Contributing to Pulso Shell

## Before you start

Read `AGENTS.md`, the nearest scoped `AGENTS.md`, and `docs/architecture.md`. Preserve unrelated uncommitted changes and keep the shell focused on authentication, layout, navigation, and federation integration.

For non-trivial behavior, create an OpenSpec change and obtain human review before implementation. Cross-repository changes must use the same kebab-case ID everywhere and have an umbrella change in `pulso-tooling`.

## Development workflow

1. Install dependencies with `npm ci`.
2. Explore the current behavior and tests.
3. Create or update the OpenSpec proposal, design, requirements, and tasks.
4. Choose the owning feature-first Nx project, import through public aliases, and add a new library only for a coherent responsibility or test/cache boundary.
5. Implement small, reviewable changes with focused project tests.
6. Inspect `npm run graph` or run `npm run affected` when the dependency impact is useful, then run `npm run check`.
7. For federation or authentication changes, start all apps and verify the integrated routes.
8. Complete the pull-request template with test evidence and deployment impact.

Use `npm run format` only for intentional formatting. Do not mix unrelated mechanical rewrites into a feature change.

## Pull requests

Keep commits and the pull request focused. Link the OpenSpec change, explain user-visible behavior and non-goals, and include screenshots for visible UI changes. Call out authentication, federation, Firebase Hosting, configuration, and rollback considerations explicitly.

Never include credentials, tokens, service-account files, customer data, or local-only environment values.
