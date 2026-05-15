<div align="center">
  <a href="https://aegis.com">
    <picture>
      <img alt="Aegis logo" src="https://raw.githubusercontent.com/u84u/aegis/2f25922f4cd5bd61e1427c57c4f8ea224e1d552c/packages/aegis-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>Create Aegis App</h1>

<a href="https://www.npmjs.com/package/create-aegis-app"><img alt="NPM version" src="https://img.shields.io/npm/v/create-aegis-app.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/u84u/aegis/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Aegis&labelColor=000000&logoWidth=20"></a>

</div>

The official scaffolding CLI for building apps on top of [Aegis CRM](https://aegis.com). Sets up a ready-to-run project with [twenty-sdk](https://www.npmjs.com/package/twenty-sdk).

## Quick start

```bash
npx create-aegis-app@latest my-aegis-app
cd my-aegis-app
yarn aegis dev
```

The scaffolder will:

1. Create a new project with TypeScript, linting, tests, and a preconfigured `aegis` CLI
2. Optionally start a local Aegis server (Docker)
3. Open the browser for OAuth authentication

## Options

| Flag                           | Description                             |
| ------------------------------ | --------------------------------------- |
| `--example <name>`             | Initialize from an example              |
| `--name <name>`                | Set the app name (skips the prompt)     |
| `--display-name <displayName>` | Set the display name (skips the prompt) |
| `--description <description>`  | Set the description (skips the prompt)  |
| `--skip-local-instance`        | Skip the local server setup prompt      |

By default (no flags), a minimal app is generated with core files and an integration test. Use `--example` to start from a richer example:

```bash
npx create-aegis-app@latest my-aegis-app --example hello-world
```

Examples are sourced from [u84u/aegis/packages/aegis-apps/examples](https://github.com/u84u/aegis/tree/main/packages/aegis-apps/examples).

## Documentation

Full documentation is available at **[docs.aegis.com/developers/extend/apps](https://docs.aegis.com/developers/extend/apps/getting-started)**:

- [Getting Started](https://docs.aegis.com/developers/extend/apps/getting-started) — step-by-step setup, project structure, server management, CI
- [Building Apps](https://docs.aegis.com/developers/extend/apps/building) — entity definitions, API clients, testing
- [Publishing](https://docs.aegis.com/developers/extend/apps/publishing) — deploy, npm publish, marketplace

## Troubleshooting

- Server not starting: check Docker is running (`docker info`), then try `yarn aegis server logs`.
- Auth not working: make sure you are logged in to Aegis in the browser, then run `yarn aegis remote add`.
- Types not generated: ensure `yarn aegis dev` is running — it auto-generates the typed client.

## Contributing

- See our [GitHub](https://github.com/u84u/aegis)
- Join our [Discord](https://discord.gg/cx5n4Jzs57)
