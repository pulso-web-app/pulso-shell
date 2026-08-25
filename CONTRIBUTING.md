# Contributing to Pulso Shell

## Before you start

Read `AGENTS.md`, the nearest scoped `AGENTS.md`, and `docs/architecture.md`. Preserve unrelated uncommitted changes and keep the shell focused on authentication, layout, navigation, and federation integration.

For non-trivial behavior, create an OpenSpec change and obtain human review before implementation. Cross-repository changes must use the same kebab-case ID everywhere and have an umbrella change in `pulso-tooling`.

## Development workflow

1. Install dependencies with `npm ci`.
2. Explore the current behavior and tests.
3. Create or update the OpenSpec proposal, design, requirements, and tasks.
4. Implement small, reviewable changes with focused tests.
5. Run `npm run check`.
6. For federation or authentication changes, start all apps and verify the integrated routes.
7. Complete the pull-request template with test evidence and deployment impact.

Use `npm run format` only for intentional formatting. Do not mix unrelated mechanical rewrites into a feature change.

## Pull requests

Keep commits and the pull request focused. Link the OpenSpec change, explain user-visible behavior and non-goals, and include screenshots for visible UI changes. Call out authentication, federation, Firebase Hosting, configuration, and rollback considerations explicitly.

Never include credentials, tokens, service-account files, customer data, or local-only environment values.
