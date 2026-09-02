## Purpose

Defines equal authenticated access to shared Pulso business records while retaining isolated account profiles and denying unauthenticated access.

## Requirements

### Requirement: Authenticated shared business data

The database SHALL allow every authenticated user to read, create, update, and delete shared contacts and projects, including their descendants, without roles or ownership checks.

#### Scenario: another user accesses a business record

- **WHEN** an authenticated user accesses a contact, contact interaction, project, or project descendant created by another user
- **THEN** the same read and write operations are authorized

#### Scenario: unauthenticated access

- **WHEN** a client without authentication attempts to read or write shared business records
- **THEN** access is denied

### Requirement: Account profile isolation

The database SHALL keep `users/{uid}` profiles accessible only to their matching authenticated account and SHALL deny legacy user-scoped business collections and unknown root collections.

#### Scenario: account profile access

- **WHEN** an authenticated user reads or writes their own profile
- **THEN** access succeeds, while access to a different account's profile is denied

#### Scenario: obsolete business paths

- **WHEN** a client attempts a business-data operation beneath `users/{uid}` or in an undeclared root collection
- **THEN** access is denied
