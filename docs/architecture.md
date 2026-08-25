# Pulso Shell Architecture

## System role

Pulso Shell is the composition root for the browser experience. It bootstraps Angular, initializes Firebase Authentication, decides whether a top-level route is accessible, renders the shared frame, and delegates product routes to independently deployed remotes.

## Runtime topology

The host runs on port 4200 during development. The federation manifest resolves `crm` to port 4201 and `projects` to port 4202. Each remote exposes `./Routes`, which the shell loads lazily for its protected route.

The shell owns the route boundary but not the remote feature implementation. A contract change therefore requires coordinated specifications and validation in the shell and affected remote.

## Authentication boundary

Firebase Authentication is the identity provider. Authentication services own session state and sign-in or sign-out operations. Guards enforce guest-only and authenticated routes. Product code must not bypass these guards, persist credentials, or log tokens and user secrets.

## Federation boundary

Remote names, exposed modules, route paths, ports, and manifest URLs are public integration contracts. Development and production manifests must remain aligned with their intended environments. Remote failures should be diagnosable without moving remote business logic into the host.

## Testing and delivery

Vitest covers isolated behavior. Playwright verifies user-observable host behavior. Federation changes also require an integrated smoke test with all three development servers. Firebase Hosting workflows produce pull-request previews and main-branch deployments after the quality gates pass.

## Repository boundary

This repository has its own Nx configuration, package lock, dependencies, cache, CI, and hosting target. The parent directory and `pulso-tooling` are coordinators, not Nx or npm workspaces.
