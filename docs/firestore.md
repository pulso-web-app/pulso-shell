# Shared Firestore Data

Shell owns the Firebase project configuration, authentication, `firestore.rules`, and `firestore.indexes.json`. Remotes own their domain schemas and queries. All business data belongs to the application and is shared by every signed-in account without roles or owner filters.

| Path | Access | Domain owner |
| --- | --- | --- |
| `contacts/{id}` and descendants | All authenticated users can read and write | CRM |
| `contacts/{id}/interactions/{id}` | Same shared access as contacts | CRM |
| `projects/{id}` and descendants | All authenticated users can read and write | Projects |
| `users/{uid}` | Only that authenticated user | Account profile |
| Legacy user business paths or unknown roots | Denied | No active contract |

The recursive business rules include nested interactions and future project children. No public access is granted. A new unrelated collection needs an explicit schema and rule; do not introduce a blanket authenticated wildcard across the database. Profile documents hold account information, not contacts or projects.

Projects currently exposes a placeholder; its shared storage contract is ready, but application project CRUD is not implemented. CRM currently implements listing and pagination; its creation and edit routes remain scaffolds.

## Rule tests

Install dependencies with `npm ci` and Java 21 or newer, then run:

```sh
npm run test:rules
```

The Firebase CLI starts an isolated Firestore emulator with `demo-pulso-rules`, loads the checked-in rules, and runs eight Node tests using `@firebase/rules-unit-testing`. Two distinct authenticated accounts exercise shared reads, writes, listing, counting, pagination, and descendants. Tests also cover unauthenticated denial, private account profiles, and rejection of obsolete nested business paths. These are backend rule tests, not browser E2E tests.

`npm run check` continues to run the application documentation, specifications, lint, unit tests, and production build. Run `test:rules` additionally when changing rules; it is separate so ordinary application checks do not require Java or an emulator download.

## Database changes

For an explicitly approved rules change, run the rule tests before publishing only Firestore rules:

```sh
npx firebase deploy --only firestore:rules --project pulso-web-app
```

For an approved index change, use `--only firestore:indexes` with the same explicit project and review the CLI plan. The index file includes the three CRM name/stage/status indexes; there is no competing index file in CRM. Neither command publishes hosting.

When moving legacy data, first migrate it with CRM's backed-up migration command and verify destination records, then publish the tested rules and use the updated CRM. See [the CRM migration and document contract](../../pulso-crm/docs/firestore-contacts.md) and the [application data map](../../pulso-tooling/docs/shared-data.md). Do not continue using an old CRM build that queries per-user paths after cutover.
