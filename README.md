# Harness Icons Framework

This is a monorepo that implements Harness Icons Framework.

## Prerequisites

You'll need `node` `16.20.2` or newer.

This monorepo requires `pnpm`. Activate latest `pnpm` using `corepack`:

```sh
corepack prepare pnpm@latest --activate
```

## Install dependencies

From the repository root folder, run:

```sh
pnpm deps
```

## Build

```sh
pnpm build
```

## Note on using vscode

When the workspace is rebuilt, vscode could have some issue recognizing packages and types. To fix this, reload project (Cmd-Shift-P > Reload Project)
