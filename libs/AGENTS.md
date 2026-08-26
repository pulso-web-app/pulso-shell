# Shell Library Rules

- Organize product code feature-first under `libs/<capability>/<type>` and expose only intentional entry points from each library's `src/index.ts`.
- Use `feature` libraries for user-facing orchestration, `data-access` for state and external integrations, and `shared/ui` only for domain-neutral presentation.
- Import libraries through `@pulso-shell/*` aliases; never reach into another library's internal files.
- Keep dependency direction compatible with the enforced Nx tags: apps may compose libraries, features may depend on data access and UI, and data access must not depend on features.
- Add a new library only when it owns a coherent capability, boundary, or independently testable work unit; do not create layers speculatively.
- Run the affected library tests while iterating and the repository-level scripts before handoff.
