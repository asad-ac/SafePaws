# Contributing Guidelines <!-- omit from toc -->

To ensure smooth collaboration, please follow these guidelines.

## Table of Contents <!-- omit from toc -->

- [Branching Strategy](#branching-strategy)
  - [Creating a Feature Branch](#creating-a-feature-branch)
  - [Pull Requests](#pull-requests)
- [Commit Message Conventions](#commit-message-conventions)
  - [Types](#types)
  - [Examples](#examples)
- [Tooling](#tooling)

## Branching Strategy

We follow a Feature Branch Workflow strategy. This means:

- **Main Branch:** The `main` branch always reflects the production-ready state.
- **Feature Branches:** For each new feature or bug fix, create a new branch off `main`. Use descriptive branch names that reflect the nature of the work being done.

### Creating a Feature Branch

When working on a new feature or bug fix:

1. Ensure you are on the `main` branch: `git checkout main`
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Implement your changes in this branch

### Pull Requests

When submitting a Pull Request:

1. Ensure your branch is up to date with `main`: `git pull origin main`
3. Submit your Pull Request targeting the `main` branch
4. Provide a clear description of the changes made and any relevant information for reviewers
5. Link your PR to an issue if applicable (eg.., closes issue #12)
6. When merging a Pull Request, please do `Squash and Merge` to merge all commits into a single commit

To learn more about Git, check out [Learn Git Branching](https://learngitbranching.js.org/).

## Commit Message Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. Each commit message consists of a type, a brief description, and an optional body.

A commit message follows this format:

```bash
<type>: <description>

[optional body]
```

### Types

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation changes
- **refactor:** Code refactoring
- **style:** Code style changes (formatting, indentation)
- **test:** Adding or modifying tests
- **chore:** Changes to the build process, dependencies, or other non-code modifications

### Examples

- `feat: adds user authentication feature`
- `fix: resolves issue with form validation`

- **With a body:**

  ```bash
  docs: update README with usage instructions

  - removes unneeded comments and adds a `TOC`
  - cleans up wording for the `Install w/ Linux` section
  ```