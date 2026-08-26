## Purpose

Defines shell participation in generated Pulso architecture.

## ADDED Requirements

### Requirement: Generated remote integration

The Shell SHALL derive protected remote routes, navigation entries, its default redirect, and federation manifests from generated remote registry artifacts.

#### Scenario: a registered remote is rendered

- **WHEN** a registered remote is rendered
- **THEN** routing, visible navigation metadata, and both manifest endpoints describe the same remote
