# agent-ready-shell-development Specification

## Purpose

Defines the repository guidance and validation needed for safe agent-assisted development of the Pulso authentication and federation host.

## Requirements

### Requirement: Accurate shell documentation

The repository SHALL document its host role, authentication boundary, protected routes, remote contracts, integrated and standalone startup, commands, testing, CI, hosting, maturity, and troubleshooting in English.

#### Scenario: New contributor starts the host

- **WHEN** a contributor follows the root README in a prepared environment
- **THEN** the shell starts on port 4200 and the contributor understands that remote routes require CRM on 4201 and Projects on 4202

### Requirement: Shell-specific agent safety

The authoritative instructions SHALL preserve authentication guards, remote names, `./Routes` contracts, environment-safe Firebase configuration, and explicit approval for deployment or secret changes.

#### Scenario: Agent plans a federation change

- **WHEN** work affects a remote name, manifest, exposed route, or protected mount point
- **THEN** the agent identifies the cross-repository contract and requires focused plus integrated validation

### Requirement: Local specification and documentation gates

The repository SHALL provide strict OpenSpec validation and authored Markdown validation before lint, unit tests, and production build in the public check and Firebase workflows.

#### Scenario: Pull request contains invalid documentation or specifications

- **WHEN** a pull-request workflow runs
- **THEN** it fails before deployment steps and reports the documentation or specification gate

### Requirement: Focused portable Skill

The repository SHALL provide one canonical Pulso Skill for Native Federation changes and equivalent synchronized discovery layouts for supported coding tools.

#### Scenario: Supported agent handles remote integration

- **WHEN** Codex, Claude Code, or GitHub Copilot discovers repository Skills
- **THEN** it receives the same focused federation workflow without the removed generic Firebase Skill bundle
