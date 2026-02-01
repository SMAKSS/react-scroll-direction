module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: ['dist/**']
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml']
      }
    ]
  ]
};
