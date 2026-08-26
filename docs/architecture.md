# Pulso Shell Architecture

## System role

Pulso Shell is the browser composition root. It authenticates users, owns protected top-level navigation and the authenticated frame, and loads independently deployed CRM and Projects remotes.

The repository is an independent Nx workspace. A repository is the team, deployment, dependency, and CI boundary; an Nx project is a smaller internal ownership, dependency-graph, test, build, and cache boundary. A feature does not become a microfrontend merely because it has a route.

## Feature-first project map

```text
apps/
  shell/                         # bootstrap, providers, routes, federation
  shell-e2e/                     # host-level browser behavior
libs/
  auth/
    data-access/                 # Firebase auth state, operations, guards
    feature/                     # login experience
  shell/
    feature/                     # authenticated frame and navigation
  shared/
    ui/                          # shell-local, domain-neutral primitives
```

Code is grouped by capability first and technical type second. `apps/shell` stays thin and imports library public APIs through `@pulso-shell/*`. Each library is a real Nx project with its own targets, tags, cache inputs, and public `src/index.ts`.

## Dependency direction

Nx module-boundary rules enforce type and scope tags. Applications and end-to-end projects compose libraries; feature libraries may orchestrate data access and UI; data-access and UI libraries cannot depend on feature libraries. Authentication libraries cannot depend on shell-owned feature code.

Create a library when a capability has coherent ownership or deserves an independently testable/cacheable boundary. Do not create empty `domain` or `data-access` projects before real rules, state, or integrations exist.

## Authentication and federation

Firebase Authentication is encapsulated by `auth-data-access`. `/login` is guest-only, while `/crm` and `/projects` are authenticated and rendered inside `shell-feature`.

During development the shell runs on port 4200, resolving `crm` on 4201 and `projects` on 4202. Remote names, `./Routes` exposures, route paths, ports, and manifests are public integration contracts. Splitting another MFE requires a meaningful independent ownership and deployment boundary, not only another screen.

## Why Nx is material here

Nx now models dependencies that actually exist. Repository scripts run targets across the project graph, library builds precede the Native Federation build, unchanged test/build targets can be restored from cache, and `nx affected` can select only projects touched by a change. Tags prevent architecture drift that folder conventions alone would merely document.

Native Federation still owns runtime composition; Nx owns development-time structure and task orchestration. Keeping those responsibilities separate makes both technologies demonstrable rather than decorative.

## Generated architecture inputs

Capability permissions live in `architecture.config.json`; ESLint translates them into `scope:*` constraints while retaining fixed `type:*` direction. Tooling renders `pulso-remotes.generated.ts` and both federation manifests from `pulso.repositories.json`. Those outputs supply protected routes, the default redirect, navigation, and the uniform `REMOTE_ROUTES` contract and must not be edited separately.

## Testing and delivery

Vitest runs per project, Playwright verifies host behavior, and production builds traverse library dependencies. Federation changes also require an integrated smoke test with all three development servers. Firebase workflows call the public repository scripts so new Nx libraries enter quality gates automatically.

This repository retains its own lockfile, dependencies, cache, CI, and hosting target. The parent directory and `pulso-tooling` coordinate repositories without joining their Nx workspaces.
