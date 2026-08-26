## MODIFIED Requirements

### Requirement: Shell-specific agent safety

The authoritative instructions SHALL preserve authentication guards, remote names, `./Routes` contracts, environment-safe Firebase configuration, feature-first Nx ownership and dependency direction, and explicit approval for deployment or secret changes.

#### Scenario: Agent plans a federation change

- **WHEN** work affects authentication, layout, shared UI, a remote name, manifest, exposed route, or protected mount point
- **THEN** the agent identifies the owning Nx project, observes its type and scope boundary, identifies any cross-repository contract, and requires focused plus integrated validation where relevant

### Requirement: Local specification and documentation gates

The repository SHALL provide strict OpenSpec validation and authored Markdown validation before project-wide boundary lint, all application and library unit tests, and the production build in the public check and Firebase workflows.

#### Scenario: Pull request contains invalid documentation or specifications

- **WHEN** a pull-request workflow runs
- **THEN** it fails before deployment steps and reports the documentation, specification, boundary, library test, or application quality gate
