---
name: pulso-native-federation-change
description: Plan, implement, and validate Pulso Shell changes that affect Native Federation remotes, manifests, protected remote routes, or integrated host/remote startup. Use when changing remote names, exposed routes, manifest URLs, lazy routes, federation loading, or integration behavior across the shell and a remote.
---

# Pulso Native Federation Change

1. Read the root and shell application `AGENTS.md` files.
2. Identify every affected public contract: remote name, `./Routes` exposure, route path, guard, remote entry URL, and port.
3. For cross-repository work, create the same kebab-case OpenSpec change ID in tooling and every affected app. Keep shell requirements limited to host-owned behavior.
4. Update development and production manifests together unless the proposal explicitly limits the environment.
5. Preserve the ports: shell 4200, CRM 4201, Projects 4202.
6. Validate the shell in isolation, then start all three apps and confirm authenticated navigation loads each remote.
7. Run `npm run check` and capture any federation or deployment impact in the pull request.

Do not silently rename remotes, bypass authentication guards, embed secrets, or deploy.
