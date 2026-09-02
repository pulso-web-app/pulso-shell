## Context

Shell owns the existing Firestore deployment configuration and authentication. The user approved shared business data with no per-user permissions.

## Goals / Non-Goals

Apply and verify shared database authorization without changing authentication providers, federation, hosting, or business UI.

## Decisions

Use recursive rules only beneath the explicit `contacts` and `projects` roots. Require a non-null authenticated identity for all operations. Keep profile access at `users/{uid}` tied to that UID; remove legacy business matches. Add Firestore emulator unit tests with two identities and an unauthenticated client, separate from browser e2e. Keep the canonical index definitions beside the canonical rules. Publish only Firestore rules after tests and data migration.

## Risks / Trade-offs

Rules deliberately authorize shared writes even though CRM's write UI remains out of scope. Tests must exercise reads, queries, creates, updates, deletes, descendants, private profiles, and obsolete paths. Rule tests require Java and remain an explicit `test:rules` command; ordinary Angular checks do not require an emulator.
