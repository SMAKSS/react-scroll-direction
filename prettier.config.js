/** @type {import("prettier").Options} */
export default {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: false,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: false,
    overrides: [
        {
            files: ['*.json'],
            options: {
                quoteProps: 'preserve',
                singleQuote: false,
                tabWidth: 2,
            },
        },
    ],
    plugins: ['prettier-plugin-organize-imports'],
    printWidth: 80,
    proseWrap: 'always',
    quoteProps: 'as-needed',
    requirePragma: false,
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
}
