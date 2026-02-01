# Contributing to @smakss/react-scroll-direction

First and foremost, thank you for considering contributing to
@smakss/react-scroll-direction! Your efforts help make this project better for
everyone.

## Getting Started

- Please first discuss the change you wish to make via issue, email, or any
  other method with the maintainers of this repository before making a change.
- Ensure that your contribution is in line with the project's coding and
  documentation standards.

## Development Setup

Before you start working on your contribution, you need to set up your
development environment. After cloning the repository, run the following
commands:

```bash
pnpm setup
```

This will install all the necessary development dependencies and set up Git
hooks using Husky.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the
   layer when doing a build.
2. Update the `README.md` or relevant documentation with details of changes,
   including:
    - New environment variables
    - New database migrations
    - Any other relevant information
3. Ensure your PR has a single purpose. If it addresses more than one issue or
   introduces more than one feature, split them into separate PRs.
4. Describe your PR thoroughly. Explain the purpose of your PR, how you
   approached the problem, and include any relevant information or screenshots
   for context.

## Release Process

Releases are automated with semantic-release on every push to the `master` and
`develop` branches.

- Do not manually bump versions or edit a changelog; releases are published on
  GitHub without committing files back to the repo.
- Follow Conventional Commits so the release type can be inferred.
- Releases use npm trusted publishing (OIDC) for the npm registry and also
  publish to GitHub Packages. Configure the repository as a trusted publisher in
  npm (using this workflow file) and ensure the workflow has `id-token: write`
  and npm CLI >= 11.5.1.
- `GITHUB_TOKEN` is used to create GitHub releases and to publish to GitHub
  Packages.

To run a local dry run:

```bash
pnpm release --dry-run
```

## Coding Standards

- Follow
  [Typescript specific conventions](https://google.github.io/styleguide/tsguide.html)
  and @smakss/react-scroll-direction's established coding style.
- Write tests for any new functionality.
- Comment your code where necessary.

## Reporting Issues

- Use the provided issue templates if applicable.
- Be as descriptive as possible. Attach screenshots, logs, or any other relevant
  information.
- Check existing issues before submitting a new one to avoid duplicates.

## Code of Conduct

Please refer to our [Code of Conduct](CODE_OF_CONDUCT.md) to understand what
kind of behavior is expected within our community.
