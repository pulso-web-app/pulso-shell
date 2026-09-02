## Why

Existing rules restrict business data to its original user. All authenticated Pulso users need equal access to shared contacts, interactions, and projects.

## What Changes

- Permit authenticated read/write access to `contacts` and `projects`, including their descendants.
- Preserve private account profiles at `users/{uid}` and deny legacy user-scoped business paths.
- Add executable security-rule tests with two users and an unauthenticated client.
- Keep the deployed contacts indexes represented in the Shell-owned Firebase configuration.

## Capabilities

### New Capabilities

- `shared-business-data`: Shared authenticated business data and isolated account profiles.

### Modified Capabilities

None.

## Impact

Same-ID Tooling umbrella coordinates CRM's query and data migration and Projects' contract documentation. Publish only Firestore rules to the existing project after tests. Firebase Auth providers, protected routes, federation names, ports 4200/4201/4202, hosting, and CI remain unchanged. No roles or new business UI are introduced.
