This is a [Aegis](https://aegis.com) application project bootstrapped with [`create-aegis-app`](https://www.npmjs.com/package/create-aegis-app).

## Getting Started

First, authenticate to your workspace:

```bash
yarn aegis remote add --api-url http://localhost:2020 --as local
```

Then, start development mode to sync your app and watch for changes:

```bash
yarn aegis dev
```

Open your Aegis instance and go to `/settings/applications` section to see the result.

## Available Commands

Run `yarn aegis help` to list all available commands. Common commands:

```bash
# Remotes & Authentication
yarn aegis remote add --api-url http://localhost:2020 --as local     # Authenticate with Aegis
yarn aegis remote status         # Check auth status
yarn aegis remote switch         # Switch default remote
yarn aegis remote list           # List all configured remotes
yarn aegis remote remove <name>  # Remove a remote

# Application
yarn aegis dev        # Start dev mode (watch, build, sync, and auto-generate typed client)
yarn aegis add     # Add a new entity (object, field, function, front-component, role, view, navigation-menu-item)
yarn aegis logs  # Stream function logs
yarn aegis exec  # Execute a function with JSON payload
yarn aegis uninstall  # Uninstall app from workspace
```

## Integration Tests

If your project includes the example integration test (`src/__tests__/app-install.integration-test.ts`), you can run it with:

```bash
# Make sure a Aegis server is running at http://localhost:3000
yarn test
```

The test builds and installs the app, then verifies it appears in the applications list. Test configuration (API URL and API key) is defined in `vitest.config.ts`.

## LLMs instructions

Main docs and pitfalls are available in LLMS.md file.

## Learn More

To learn more about Aegis applications, take a look at the following resources:

- [twenty-sdk](https://www.npmjs.com/package/twenty-sdk) - learn about `twenty-sdk` tool.
- [Aegis doc](https://docs.aegis.com/) - Aegis's documentation.
- Join our [Discord](https://discord.gg/cx5n4Jzs57)

You can check out [the Aegis GitHub repository](https://github.com/u84u/aegis) - your feedback and contributions are welcome!
