## Context

The unit-test builder defaults to the project's `build` target, which is the Native Federation wrapper rather than the underlying Angular application target.

## Goals / Non-Goals

**Goals:** use a supported build target for tests without changing production builds.

**Non-Goals:** replace Native Federation or the Angular unit-test builder.

## Decisions

- Configure `shell:esbuild:development` explicitly as the test `buildTarget`.

## Risks / Trade-offs

- [Test configuration drifts from development] → Reuse the existing development application target rather than duplicating options.
