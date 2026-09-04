## Why

The shell needs richer, more expressive icons while preserving the established Angular Material login, navigation, and toolbar experience.

## What Changes

- Replace authored Material icon glyphs in login and authenticated layout surfaces with equivalent Phosphor icons.
- Keep every Angular Material component, directive, theme, and interaction intact.
- Remove the Material Icons font link only after authored `mat-icon` usage is eliminated.
- Add focused tests and integrated visual verification for icon rendering and Material component preservation.

## Capabilities

### New Capabilities

- `shell-iconography`: Defines the Phosphor icon presentation for shell-owned login, navigation, and topbar surfaces while preserving Material components.

### Modified Capabilities

None.

## Impact

- UI: icon elements and icon-specific sizing/spacing only; authentication, routes, layout, and interaction behavior are unchanged.
- Dependencies: add Phosphor Web Components; retain Angular Material and CDK.
- Federation: remote manifest, remote contracts, and shared Material configuration remain unchanged.
- Non-goals: replacing Material buttons, cards, form fields, sidenav, toolbar, menus, progress indicators, themes, or CDK facilities.
- Deployment: no environment or hosting changes.
