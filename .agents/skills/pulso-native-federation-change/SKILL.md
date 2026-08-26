---
name: pulso-native-federation-change
description: Plan, implement, and validate Pulso Shell changes that affect Native Federation remotes, manifests, protected remote routes, or integrated host/remote startup. Use when changing remote names, exposed routes, manifest URLs, lazy routes, federation loading, or integration behavior across the shell and a remote.
---

# Pulso Native Federation Change

Use `Pulso: Initialize Repository Here` from the Tooling folder when adding a standard remote. Review `pulso.repositories.json`; do not hand-edit `pulso-remotes.generated.ts` or one federation manifest in isolation. All remotes expose `REMOTE_ROUTES`; legacy route constants remain compatibility aliases.

1. Read the root and shell application `AGENTS.md` files.
2. Identify whether the change belongs to an existing feature-first Nx library or truly needs an independently owned and deployed microfrontend.
3. Identify every affected public contract: remote name, `./Routes` exposure, route path, guard, remote entry URL, and port.
4. For cross-repository work, create the same kebab-case OpenSpec change ID in tooling and every affected app. Keep shell requirements limited to host-owned behavior.
5. Update development and production manifests together unless the proposal explicitly limits the environment.
6. Preserve the ports: shell 4200, CRM 4201, Projects 4202.
7. Validate affected Nx projects, then the shell in isolation, and finally all three apps with authenticated remote navigation.
8. Run `npm run check` and capture graph, federation, and deployment impact in the pull request.

Do not silently rename remotes, bypass authentication guards, embed secrets, or deploy.
