# Canary

Welcome to the Harness Canary monorepo! This repository contains multiple projects for Harness' next generation Unified UI.

# Repository Structure

- [packages](./packages/): Contains projects for Harness next generation Unified UI projects. They are published as npm packages.
- [apps](./apps/): Contains deployable/executable standalone applications.

# Projects

- [@harnessio/svg-icon](./packages/svg-icon) - a small library to render SVG in a web component.
- [@harnessio/svg-icons-react](./packages/svg-icon-react/) - a React binding library for [svg-icon](./libs/svg-icon).
- [@harnessio/svg-icons-cli](./packages/svg-icon-cli/) - CLI commands to generate icon components from raw svg icons set.
- [@harnessio/icons-noir](./packages/icons-noir/) - Noir icon set React components generated from [Iconoir](https://iconoir.com/).
- [@harnessio/canary](./packages/canary/) - Harness Canary UI components library built on top of [Radix UI](https://www.radix-ui.com/) and [ShadCN UI](https://ui.shadcn.com/).
- [@harnessio/unified-pipeline](./packages/unified-pipeline/) - Harness Unified Pipeline library.

# Getting Started

## Prerequisites

Before getting started with this repository, ensure you have the following prerequisites:

**Node.js**: You'll need `Node` version `18.20.4` or newer.
We use `pnpm` to manage this monorepo. To install `pnpm`, visit the [pnpm installation page](https://pnpm.io/installation).

## Installation

To set up the necessary dependencies for this monorepo, follow these steps:

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the root folder of the cloned repository.
3. Run the following command to install dependencies:

```sh
pnpm install
pnpm deps
```

## Building

To build all projects, execute the following command from the repository root folder:

```sh
pnpm run build
```

Or you can build individual project by running `pnpm run build` from each project folder root folder.

## Local Development

To view Canary StoryBook, run:

```sh
pnpm dev
```

## Note for Visual Studio Code Users

If you're using Visual Studio Code (VSCode) and encounter issues with package recognition or type definitions after rebuilding the workspace, follow these steps to resolve them:

1. Open VSCode.
2. Press `Cmd-Shift-P` to open the command palette.
3. Type `Reload Project` and select it from the list.

This process helps to resolve any issues related to package recognition and type checking.

If you have any questions or encounter any problems, please don't hesitate to reach out for assistance. Happy coding!

## License

Apache License 2.0, see [LICENSE](https://github.com/harness/gitness/blob/main/LICENSE).
