# Feature-First Shell Architecture Specification

## Purpose

Defines the developer-visible project boundaries and validation guarantees that keep the Pulso Shell feature-first, independently testable, and safe to evolve.

## Requirements

### Requirement: Thin Shell composition root

The Shell application project SHALL own bootstrap, application configuration, top-level routes, and Native Federation composition while authentication implementation, login presentation, layout behavior, and shared presentation primitives are owned by explicit internal projects.

#### Scenario: Contributor locates Shell behavior

- **WHEN** a contributor inspects the Nx workspace or architecture documentation
- **THEN** each existing Shell capability has one discoverable project owner and `apps/shell` contains only composition concerns

### Requirement: Enforced Shell dependency direction

The Shell workspace SHALL reject imports that cross declared feature-first type or scope boundaries, while allowing the application composition root to assemble Shell-owned projects.

#### Scenario: Shared UI attempts to import authentication behavior

- **WHEN** lint evaluates an import from the shared UI project to an authentication or layout project
- **THEN** the module-boundary quality gate fails before build or deployment

### Requirement: Project-aware validation

Public Shell quality commands SHALL lint and test every applicable application, library, and E2E project and SHALL build library dependencies before the production application.

#### Scenario: Library test or boundary fails

- **WHEN** a contributor runs the documented Shell check
- **THEN** the command returns a non-zero result and identifies the failing Nx project

### Requirement: Stable host behavior during internal evolution

Internal project organization SHALL preserve the login route, authentication guards, protected CRM and Projects mounts, remote names and `./Routes` contracts, and port 4200 behavior unless a separate approved contract change modifies them.

#### Scenario: Feature-first migration completes

- **WHEN** Shell runs standalone and with the configured remotes
- **THEN** login, protected navigation, layout, and remote loading remain observably equivalent to the pre-migration behavior
