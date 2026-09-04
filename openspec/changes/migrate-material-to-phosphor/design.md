## Context

See `proposal.md` for motivation and `specs/shell-iconography/spec.md` for observable requirements. The shell currently uses Material icon font ligatures inside otherwise-correct Material components.

## Goals / Non-Goals

**Goals:**

- Replace only authored icon elements and their icon-font dependency.
- Keep icon imports explicit and tree-shakeable.
- Preserve Material DOM hosts, directives, themes, and behavior.

**Non-Goals:**

- Replace or restyle Material cards, fields, buttons, sidenav, toolbar, list, menu, or spinner.
- Change authentication, route guards, navigation contracts, federation configuration, or responsive layout.

## Decisions

- Use `@phosphor-icons/webcomponents` with explicit per-icon module imports. This provides the required brand-capable icon catalog and avoids loading the full set. A CSS-font integration was considered but rejected because explicit custom elements are easier to inventory and type-check.
- Register `CUSTOM_ELEMENTS_SCHEMA` only in standalone components that render Phosphor elements. Material modules remain wherever their components or directives are used.
- Map generated navigation icon keys at the rendering boundary instead of editing generated remote configuration.
- Apply a small shared icon class for host sizing and alignment, plus narrowly scoped spacing rules where Material previously styled `mat-icon` directly.

## Risks / Trade-offs

- [Custom elements do not automatically receive Material's `mat-icon` spacing rules] -> Add explicit icon-only spacing classes and verify button, field, list, and toolbar alignment visually.
- [Host and remote can register the same web component] -> Keep one package version and rely on the existing singleton federation sharing behavior, then verify integrated startup.

## Migration Plan

1. Add the Phosphor package without removing Material or CDK.
2. Replace shell-owned `mat-icon` elements and remove now-unused `MatIconModule` imports.
3. Remove the Material Icons font link after the authored icon inventory is empty.
4. Run focused tests, the repository check, and federated visual inspection.
5. Roll back by reverting only these icon-focused edits; no state migration is required.
