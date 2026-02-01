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
                    'NPM_CONFIG_REGISTRY=https://npm.pkg.github.com/ NPM_CONFIG_@smakss:registry=https://npm.pkg.github.com/ NODE_AUTH_TOKEN=$GITHUB_TOKEN npm publish --tag ${nextRelease.channel} --access public',
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
