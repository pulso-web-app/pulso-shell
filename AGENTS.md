# Pulso Shell Agent Instructions

## Purpose

This repository is the Angular/Nx host for Pulso. It owns authentication, protected top-level navigation, the Native Federation manifest, and integration of the CRM and Projects remotes.

## Working Agreement

- Read the nearest scoped `AGENTS.md` before changing files below it.
- Preserve the independent-repository architecture; do not add a parent Nx or npm workspace.
- Use the repository-local Nx installation through the documented npm scripts.
- Keep authored documentation, OpenSpec artifacts, code, and user-facing copy in English unless a product requirement says otherwise.
- Prefer focused changes. Do not refactor unrelated code or overwrite uncommitted work.

## Architecture Boundaries

- The shell may coordinate authentication, navigation, layout, and remote loading.
- Keep `apps/shell` as the composition root and place owned behavior in feature-first projects under `libs/<capability>/<type>`.
- Import Nx projects only through `@pulso-shell/*` public entry points and preserve the enforced scope/type dependency direction.
- Create libraries for coherent ownership and test/cache boundaries; do not create speculative layers or split a microfrontend solely because a feature has a route.
- Product features belong in their remotes; do not move CRM or Projects domain logic into the host.
- Treat exposed remote routes and manifest names as public contracts.
- Keep Firebase configuration environment-based and free of private credentials.

## Commands

- `npm run dev` — serve the host on port 4200.
- `npm test` — run unit tests once.
- `npm run e2e` — run Playwright against the host.
- `npm run check` — documentation, specifications, lint, unit tests, and production build.
- `npm run spec:validate` — strict OpenSpec validation.
- `npm run affected` — run lint, tests, and builds only for projects affected by the current Git diff.

## Spec-Driven Development

- For non-trivial behavior changes, use OpenSpec: explore, propose, obtain human review, apply, validate, and archive.
- Do not implement an unapproved proposal unless the user explicitly asks for direct implementation.
- A cross-repository change uses the same kebab-case change ID in every affected repository and an umbrella change in `pulso-tooling`.
- Keep specifications local to this repository and describe only shell-owned behavior.

## Validation

- Add or update tests for changed behavior; do not weaken assertions to obtain a pass.
- Run the narrowest relevant tests while iterating and `npm run check` before handoff.
- For federation changes, also verify integrated startup with ports 4200, 4201, and 4202.
- For UI changes, provide screenshot evidence when practical.

## Security and Prohibited Actions

- Never commit secrets, service-account keys, tokens, or production credentials.
- Do not change Firebase projects, authentication providers, hosting targets, CI secrets, or deployment configuration without explicit approval.
- Do not deploy, push, pull, switch branches, rewrite history, or discard user changes unless explicitly requested.
- Do not edit OpenSpec-managed integration files manually; use `npm run spec:update`.
