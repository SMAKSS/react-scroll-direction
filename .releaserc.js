/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ['master', {name: 'develop', prerelease: true, channel: 'dev'}],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        [
            '@semantic-release/github',
            {
                assets: ['dist/**'],
            },
        ],
    ],
}
