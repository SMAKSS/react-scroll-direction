/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    '*.+(js|jsx|ts|tsx)': ['pnpm lint', () => 'pnpm typecheck'],
    '*.+(js|jsx|json|yml|yaml|css|ts|tsx|md|graphql|mdx)': ['pnpm format'],
}
