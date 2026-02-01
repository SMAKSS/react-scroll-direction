export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Scope rules
        'scope-empty': [2, 'never'],
        'scope-case': [2, 'always', 'kebab-case'],

        // Header rules - more flexible
        'header-case': [0],
        'header-max-length': [2, 'always', 150],
        'header-min-length': [1, 'always', 3],
        'header-full-stop': [2, 'never', '.'],

        // subject rules - more flexible
        'subject-case': [0],
        'subject-empty': [2, 'never'],
        'subject-max-length': [2, 'always', 150],
        'subject-min-length': [1, 'always', 3],
        'subject-full-stop': [2, 'never', '.'],

        // Body rules
        'body-max-line-length': [0],
        'body-leading-blank': [2, 'always'],

        // Type rules
        'type-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'type-enum': [
            2,
            'always',
            [
                'feat', // New feature
                'fix', // Bug fix
                'docs', // Documentation
                'style', // Code style (formatting, etc)
                'refactor', // Code refactoring
                'perf', // Performance improvements
                'test', // Adding or updating tests
                'chore', // Maintenance tasks
                'ci', // CI/CD changes
                'build', // Build system changes
                'revert', // Revert previous commit
                'wip', // Work in progress
                'hotfix', // Critical fixes
                'test', // Tests
            ],
        ],

        // Footer rules - flexible
        'footer-max-line-length': [0],
    },
}
