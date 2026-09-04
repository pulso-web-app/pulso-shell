## Purpose

Defines coherent shell iconography for authentication and navigation surfaces without changing the established Material component experience.

## ADDED Requirements

### Requirement: Shell surfaces render Phosphor icons

The shell SHALL render Phosphor icons for authored icons in the login screen, topbar, primary navigation, and session actions.

#### Scenario: User views shell-owned surfaces

- **WHEN** the login or authenticated layout is displayed
- **THEN** every authored interface icon is rendered from the Phosphor icon set
- **AND** no Material Icons font glyph is required

### Requirement: Material shell components are preserved

The icon migration SHALL preserve existing Angular Material components, theme styling, layout, accessibility labels, and interactions.

#### Scenario: User interacts with shell controls

- **WHEN** the user operates login fields, password visibility, navigation, the responsive menu, or session actions
- **THEN** the same Material cards, form fields, buttons, sidenav, list, toolbar, menu, and progress feedback remain available
- **AND** only their authored icon rendering differs

### Requirement: Icons align with their Material hosts

Shell icons MUST retain appropriate size, color inheritance, spacing, and accessible treatment within Material controls.

#### Scenario: Icon is displayed inside a Material control

- **WHEN** a Phosphor icon appears as a field prefix, button graphic, list graphic, or toolbar action
- **THEN** it is visually centered and proportionate to that control
- **AND** decorative icons are hidden from assistive technology when the control already has an accessible name
