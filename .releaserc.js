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
            '@semantic-release/exec',
            {
                publishCmd:
                    'NODE_AUTH_TOKEN=$GITHUB_TOKEN npm publish --registry https://npm.pkg.github.com/ --tag ${nextRelease.channel}',
            },
        ],
        [
            '@semantic-release/github',
            {
                assets: ['dist/**'],
            },
        ],
    ],
}
