## Why

Shell contributors and coding agents need accurate host documentation and repository-local rules for authentication and federation work. The previous generic Firebase Skill bundle was broad, duplicated, and not aligned with the shared Pulso workflow.

## What Changes

- Add English shell documentation, architecture guidance, contribution rules, and a practical pull-request template.
- Establish authoritative root and scoped agent instructions plus one focused federation Skill with generated Claude/Copilot mirrors.
- Adopt OpenSpec 1.10.0, documentation linting, public validation scripts, and CI gates.
- Remove all legacy Firebase Skills and `skills-lock.json`.

Non-goals include changing Firebase Authentication, protected routes, federation names, runtime manifests, hosting targets, application code, or deployment behavior.

## Capabilities

### New Capabilities

- `agent-ready-shell-development`: Repository instructions, specifications, documentation, and validation for safe shell development.

### Modified Capabilities

None.

## Impact

Development dependencies, repository documentation, agent integrations, OpenSpec artifacts, npm scripts, and the two Firebase workflows change. Runtime application and deployment contracts remain unchanged.
