## Context

See `proposal.md` for motivation. Shell contains distinct authentication, login, layout, and shared UI behavior under `apps/shell/src/app`, while the current Nx graph contains only the application and its E2E project. Federation routes and authentication guards are public behavior that must remain stable during the source migration.

## Goals / Non-Goals

**Goals:**

- Make the application project a thin composition root.
- Give coherent Shell capabilities independent lint, test, build, cache, and ownership nodes.
- Enforce dependency direction with Nx project tags.
- Preserve route guards, lazy loading, component selectors, and runtime presentation.

**Non-Goals:**

- Split Shell into additional MFEs.
- Move CRM or Projects behavior into the host.
- Change Firebase credentials, manifests, route paths, or hosting.
- Add speculative domain layers.

## Decisions

### Create four feature-first libraries

`auth-data-access` owns Firebase authentication integration and guards; `auth-feature` owns login presentation; `shell-feature` owns the authenticated layout, navigation, and topbar; `shared-ui` owns presentation primitives with no feature state. This follows existing behavior instead of creating empty domain projects.

### Use buildable internal Angular libraries

Libraries use the supported Nx Angular package executor and Angular unit-test runner. This creates real build and test nodes, allows `dependsOn: ^build`, and demonstrates granular caching. Public entry points expose only APIs consumed across project boundaries.

### Enforce both type and scope

Every project receives `type:*` and `scope:*` tags. Data access cannot depend on features or UI; shared UI cannot depend on authentication or Shell features; authentication features may use authentication data access and shared UI; the Shell layout may use authentication and shared UI. The application may compose all Shell-owned libraries.

### Preserve lazy route boundaries through public aliases

The login route lazily imports the authentication feature public entry point. Runtime remote routes remain in the app composition root because it owns Native Federation integration.

## Risks / Trade-offs

- [Moving standalone components breaks relative resources] -> Move templates and styles with their components and keep selectors unchanged.
- [Buildable packages omit external peers] -> Declare Angular Material, CDK, RxJS, or Firebase peers in the library package that imports them and verify every library build.
- [Boundary rules reject intended composition] -> Define explicit scope/type matrices and exercise them through lint plus the Nx graph.
- [Federation behavior regresses despite unit success] -> Preserve route and manifest contracts and run production plus integrated startup checks.

## Migration Plan

1. Generate tagged library project scaffolds and install the matching `ng-packagr` version.
2. Move source and tests without changing observable behavior; expose deliberate public APIs and update app imports.
3. Add boundary constraints, project-wide lint/test scripts, CI updates, and feature-first guidance.
4. Run lint, all unit tests, all library builds, the production Shell build, and available E2E/integrated smoke validation.

Rollback restores source files under the app, removes aliases/projects, and removes `ng-packagr`; no persisted data or deployment migration exists.
