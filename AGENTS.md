# AGENTS

Use these instructions for automation and assistant behavior in this repo.

## Project overview

- Package: `@smakss/react-scroll-direction`
- Build: Vite library build
- Package manager: pnpm
- Linting: ESLint (main + playground configs)

## Working rules

- Prefer pnpm scripts (`pnpm run <script>`).
- Keep changes ESM-friendly (`type: "module"`).
- Preserve existing file structure and naming conventions.
- Avoid large refactors unless requested.
- Keep output in `dist/` only.

## Commands

- Build: `pnpm build`
- Lint (all): `pnpm lint`
- Lint (main): `pnpm lint:main`
- Lint (playground): `pnpm lint:playground`
- Typecheck (all): `pnpm typecheck`
- Typecheck (main): `pnpm typecheck:main`
- Typecheck (playground): `pnpm typecheck:playground`

## Playground

- Location: `playground/`
- Run dev server: `pnpm -C playground dev`
