## Why

Shell authentication, login, layout, and shared presentation currently live inside one application project, so Nx cannot represent or enforce their intended ownership boundaries. Moving coherent behavior into tagged internal projects makes the host architecture explicit while keeping its federation and authentication behavior unchanged.

## What Changes

- Keep `apps/shell` as the bootstrap, configuration, route, and Native Federation composition root.
- Introduce buildable, independently testable Nx libraries for authentication data access, the login feature, the application-shell feature, and shared UI.
- Add effective type and scope tags plus module-boundary constraints.
- Run lint and unit tests across application, library, and E2E projects while preserving existing public commands.
- Update architecture, contributor, agent, Skill, and CI guidance for feature-first development.

## Capabilities

### New Capabilities

- `feature-first-shell-architecture`: Defines stable composition-root, feature-library, dependency-boundary, and validation behavior for Shell development.

### Modified Capabilities

- `agent-ready-shell-development`: Agent guidance and quality gates cover the tagged Nx library architecture as well as federation and authentication safety.

## Impact

The Shell Nx graph, TypeScript import aliases, source paths, task scripts, CI validation, documentation, tests, and development guidance change. The `shell` remote name, port 4200, login and protected routes, CRM and Projects manifest contracts, Firebase project, hosting target, and observable UI behavior remain unchanged. `ng-packagr` is added as a development dependency for buildable internal libraries.
