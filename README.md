# Harness Icons Framework

Welcome to the Harness Icons Framework monorepo. This repository is dedicated to implementing and managing the Harness Icons Framework.

## Prerequisites

Before getting started with this repository, ensure you have the following prerequisites:

**Node.js**: You'll need `Node` version `16.20.2` or newer.
We use `pnpm` to manage this monorepo. You can activate the latest version of `pnpm` using `corepack`:

```sh
corepack prepare pnpm@latest --activate
```

## Installation

To set up the necessary dependencies for this monorepo, follow these steps:

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the root folder of the cloned repository.
3. Run the following command to install dependencies:

```sh
pnpm deps
```

## Building

To build the Harness Icons Framework, execute the following command from the repository root folder:

```sh
pnpm build
```

## Local Development

To explore and test the icon sets locally, use the following command:

```sh
pnpm dev
```

## Note for Visual Studio Code Users

If you're using Visual Studio Code (VSCode) and encounter issues with package recognition or type definitions after rebuilding the workspace, follow these steps to resolve them:

1. Open VSCode.
2. Press `Cmd-Shift-P` to open the command palette.
3. Type `Reload Project` and select it from the list.

This will refresh your VSCode project and help resolve any issues related to package recognition and type checking.

If you have any questions or encounter any problems, please don't hesitate to reach out for assistance. Happy coding!
