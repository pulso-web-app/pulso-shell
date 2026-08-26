## 1. Nx Project Architecture

- [x] 1.1 Create tagged buildable projects for authentication data access, login, Shell layout, and shared UI and verify they appear in `nx show projects`.
- [x] 1.2 Move existing source and tests behind deliberate public entry points and verify route, component, and guard tests remain green.
- [x] 1.3 Reduce `apps/shell` to composition concerns and verify the production Native Federation build succeeds.

## 2. Enforcement and Developer Experience

- [x] 2.1 Configure type and scope dependency constraints and verify lint passes for the intended graph.
- [x] 2.2 Update public scripts and CI to lint and test all applicable Nx projects and verify failures propagate.
- [x] 2.3 Update architecture docs, README, contributor guidance, AGENTS, and the canonical federation Skill and verify Markdown and agent synchronization.

## 3. Validation

- [x] 3.1 Run strict OpenSpec validation, lint, all unit tests, library builds, and the production Shell build.
- [x] 3.2 Verify port 4200 startup and integrated CRM/Projects remote loading without changing public federation contracts.
