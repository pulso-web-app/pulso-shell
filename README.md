# Pulso Shell

Pulso Shell is the browser host for the Pulso web application. It authenticates users with Firebase Authentication, protects the product routes, renders the shared application frame, and loads the CRM and Projects applications at runtime through Native Federation.

The repository is an independent Angular 22 and Nx 23 workspace. It has its own dependencies, CI, Firebase Hosting target, tests, cache, and release lifecycle.

Within that repository, the shell app is a thin composition root and feature-first Nx libraries own authentication, the authenticated frame, and shared presentation. This gives Nx a real dependency and task graph without weakening the independent microfrontend repositories.

## Current responsibilities

- Email-and-password authentication backed by Firebase Authentication.
- Guest-only `/login` and authenticated `/crm` and `/projects` routes.
- Runtime loading of the `crm` and `projects` remotes through their `./Routes` exposure.
- Development federation mapping to CRM on port 4201 and Projects on port 4202.
- Shared navigation, application layout, loading feedback, and top-level error handling.

CRM and Projects business behavior belongs in their respective repositories. The shell coordinates those applications but must not become a shared product-feature implementation.

## Prerequisites

- Git.
- npm.
- Node.js `^22.22.3`, `^24.15.0`, or `^26.0.0`.
- Playwright browsers when running E2E tests: `npm exec playwright install`.

## Recommended integrated setup

Use the public [`pulso-tooling`](https://github.com/pulso-web-app/pulso-tooling) repository when working on more than one Pulso application.

1. Clone `pulso-tooling` beside this repository.
2. In `pulso-tooling`, run `npm ci`.
3. Run `npm run setup` to validate or clone the three app repositories and install their dependencies.
4. Run `npm run doctor`.
5. Run `npm run open` to open the multi-root VS Code workspace.
6. Start `Pulso: dev all` from **Terminal → Run Task**, or run `npm run dev` in `pulso-tooling`.
7. Open <http://localhost:4200>.

| Application | Role            | URL                     |
| ----------- | --------------- | ----------------------- |
| Shell       | Federation host | <http://localhost:4200> |
| CRM         | Remote          | <http://localhost:4201> |
| Projects    | Remote          | <http://localhost:4202> |

## Standalone setup

1. Clone this repository.
2. Run `npm ci`.
3. Confirm the environment with `node --version` and `npm run lint`.
4. Run `npm run dev`.
5. Open <http://localhost:4200>.

The shell itself starts independently, but navigation to a remote requires that remote to be running at the URL configured in `apps/shell/public/federation.manifest.json`.

## Commands

| Command                 | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `npm run dev`           | Serve the host on port 4200.                                     |
| `npm run build`         | Create a production build.                                       |
| `npm run lint`          | Run ESLint.                                                      |
| `npm test`              | Run Vitest once.                                                 |
| `npm run test:watch`    | Run unit tests in watch mode.                                    |
| `npm run e2e`           | Run the shell Playwright suite.                                  |
| `npm run format`        | Apply Nx formatting.                                             |
| `npm run format:check`  | Check formatting without writing.                                |
| `npm run docs:check`    | Lint authored Markdown.                                          |
| `npm run spec:validate` | Strictly validate all OpenSpec artifacts.                        |
| `npm run spec:update`   | Refresh OpenSpec-managed agent integrations.                     |
| `npm run check`         | Run docs, specs, lint, unit tests, and production build.         |
| `npm run graph`         | Open the Nx project graph.                                       |
| `npm run affected`      | Lint, test, and build projects affected by the current Git diff. |

## Nx project boundaries

- `auth-data-access` — Firebase initialization, session state, and guards.
- `auth-feature` — login flow.
- `shell-feature` — authenticated frame and navigation.
- `shared-ui` — shell-local, domain-neutral presentation.
- `shell` and `shell-e2e` — composition and host-level browser validation.

Cross-project imports use `@pulso-shell/*` public APIs. Nx tags enforce dependency direction, repository scripts run targets across all projects, and dependent libraries are built before the host. A new MFE still requires independent runtime ownership and deployment; a new route usually belongs in an existing or new feature library.

## Testing

Unit tests use Vitest. Playwright tests start or reuse the shell on port 4200. Install the browser once with `npm exec playwright install`, then run `npm run e2e`.

For authentication, route, manifest, or remote-loading changes, also run all three apps and verify:

1. Unauthenticated product navigation redirects to `/login`.
2. An authenticated user can open `/crm` and `/projects`.
3. Both remotes load without federation or console errors.
4. Stopping the aggregate development task releases ports 4200–4202.

## Spec-driven and agent-assisted work

`AGENTS.md` is the authoritative instruction file. Scoped instructions under the shell application add authentication and federation rules. Canonical Pulso Skills live in `.agents/skills`; Claude and Copilot mirrors are generated by `pulso-tooling`.

For meaningful behavior changes, use the local OpenSpec workflow:

1. Explore the existing behavior.
2. Propose a change and request human review.
3. Apply the approved tasks.
4. Run `npm run spec:validate` and `npm run check`.
5. Archive the completed change.

Cross-repository work uses the same kebab-case change ID in every affected repository, with an umbrella proposal in `pulso-tooling`.

## CI and deployment

Firebase workflows validate documentation, specifications, lint, unit tests, and a production build before preview or live hosting steps. Pull requests use Firebase Hosting preview channels; the main branch deploys the configured live target.

Do not run or change deployment, Firebase project selection, authentication providers, service credentials, or repository secrets without explicit approval.

## Troubleshooting

- **A remote does not load:** confirm its process and port, then inspect the federation manifest and browser network errors for `remoteEntry.json`.
- **Nx is not found:** run `npm ci` in this repository. Commands intentionally use the local installation.
- **Playwright cannot launch a browser:** run `npm exec playwright install`.
- **Authentication fails locally:** verify the approved Firebase environment configuration. Never add private credentials to source control.
- **The Nx Console shows the wrong project:** use the multi-root tasks for routine workflows; selecting a single Nx workspace remains an extension limitation.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/architecture.md](docs/architecture.md) before making architectural or federation changes.
