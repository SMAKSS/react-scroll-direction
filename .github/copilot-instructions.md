# Copilot Instructions

Follow the repo’s existing patterns and tooling:

- Use pnpm for scripts and installs.
- Keep ESM imports/exports (`type: "module"`).
- Prefer Vite library build for package output.
- Use existing ESLint configs (root + `playground/`).
- Keep build output under `dist/`.
- Avoid changes to public APIs unless requested.

Helpful commands:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

