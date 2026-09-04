## 1. Dependency and Icon Migration

- [x] 1.1 Add the Phosphor Web Components dependency while retaining Angular Material and CDK, and verify the lockfile resolves one intended version.
- [x] 1.2 Replace login authored Material icons with explicit Phosphor elements while preserving Material card, form-field, input, button, and spinner markup; verify focused login tests pass.
- [x] 1.3 Replace navigation and topbar authored Material icons with explicit Phosphor elements while preserving Material sidenav, list, toolbar, menu, and button markup; verify focused layout tests pass.
- [x] 1.4 Remove only unused Material icon module imports and the Material Icons font link, and verify source inventory contains no authored `mat-icon` or Material Icons font usage.

## 2. Validation

- [x] 2.1 Add regression assertions for Phosphor rendering and retained Material hosts, and verify the affected test suites pass.
- [x] 2.2 Run strict OpenSpec validation and `npm run check` successfully.
- [x] 2.3 Load the integrated shell at desktop and narrow viewports and verify icon sizing, alignment, responsive navigation, login controls, and authenticated layout remain visually coherent.

## 3. Alignment Refinement

- [x] 3.1 Normalize Phosphor host boxes and contextual spacing for Material field prefixes, icon buttons, and list icons without styling Material internals.
- [x] 3.2 Add regression assertions and visually verify the integrated shell and login controls at desktop and narrow viewports.
- [x] 3.3 Provide the complete Phosphor layout contract to federated remotes and verify uniform field and button padding in the integrated CRM.
