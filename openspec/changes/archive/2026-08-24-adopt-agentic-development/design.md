## Context

The shell already implements authentication, protected remote routes, Native Federation, tests, and Firebase Hosting workflows. Its previous agent bundle contained broad Firebase guidance not curated for the repository.

## Goals / Non-Goals

**Goals:** provide accurate English documentation, hierarchical safety rules, a focused federation Skill, local OpenSpec, and pre-build documentation/specification gates.

**Non-Goals:** change runtime authentication, routes, manifests, federation contracts, hosting, or deployment behavior.

## Decisions

- Scope application rules at `apps/shell/src/app` because authentication and route composition need stricter guidance than repository configuration.
- Replace the legacy bundle with one instruction-only federation Skill to minimize stale or irrelevant guidance.
- Exclude generated OpenSpec files from markdownlint and update them only through the pinned CLI.
- Add docs/spec gates before existing Firebase lint, test, build, and deploy steps.

## Risks / Trade-offs

- [Documentation becomes stale] → Public commands and CI checks validate structure; architecture facts are kept repository-specific.
- [A contract change passes standalone tests] → Scoped instructions require an integrated three-app smoke test.

## Migration Plan

Remove legacy Skills, initialize OpenSpec, add the curated instruction layer and documentation, synchronize mirrors, run repository and integrated checks, and archive this local change before the tooling umbrella.
