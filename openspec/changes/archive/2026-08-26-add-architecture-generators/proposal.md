## Why

Shell remote routes and navigation are currently duplicated across TypeScript, HTML, and two manifests.

## What Changes

- Consume deterministic remote metadata for protected routes and navigation.
- Keep development and production federation manifests synchronized from the Tooling registry.

## Capabilities

### New Capabilities

- `generated-remote-integration`: repository-owned architecture behavior required by the shared generator workflow.

### Modified Capabilities

None.

## Impact

Configuration, route contracts, and focused tests change. Product behavior and deployment ownership remain unchanged.
