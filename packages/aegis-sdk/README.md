<div align="center">
  <a href="https://aegis.com">
    <picture>
      <img alt="Aegis logo" src="https://raw.githubusercontent.com/u84u/aegis/2f25922f4cd5bd61e1427c57c4f8ea224e1d552c/packages/aegis-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>Aegis SDK</h1>

<a href="https://www.npmjs.com/package/aegis-sdk"><img alt="NPM version" src="https://img.shields.io/npm/v/aegis-sdk.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/u84u/aegis/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Aegis&labelColor=000000&logoWidth=20"></a>

</div>

A CLI and SDK to develop, build, and publish applications that extend [Aegis CRM](https://aegis.com).

## Quick start

The recommended way to start is with [create-aegis-app](https://www.npmjs.com/package/create-aegis-app):

```bash
npx create-aegis-app@latest my-app
cd my-app
yarn aegis dev
```

## Documentation

Full documentation is available at **[docs.aegis.com/developers/extend/apps](https://docs.aegis.com/developers/extend/apps/getting-started)**:

- [Getting Started](https://docs.aegis.com/developers/extend/apps/getting-started) — scaffolding, local server, authentication, dev mode
- [Building Apps](https://docs.aegis.com/developers/extend/apps/building) — entity definitions, API clients, testing, CLI reference
- [Publishing](https://docs.aegis.com/developers/extend/apps/publishing) — deploy, npm publish, marketplace

## Manual installation

If you are adding `aegis-sdk` to an existing project instead of using `create-aegis-app`:

```bash
yarn add aegis-sdk aegis-client-sdk
```

Then add a `aegis` script to your `package.json`:

```json
{
  "scripts": {
    "aegis": "aegis"
  }
}
```

Run `yarn aegis help` to see all available commands.

## Configuration

The CLI stores credentials per remote in `~/.aegis/config.json`. Run `yarn aegis remote add` to configure a remote, or `yarn aegis remote list` to see existing ones.

## Troubleshooting

- Auth errors: run `yarn aegis remote add` to re-authenticate.
- Typings out of date: restart `yarn aegis dev` to refresh the client and types.
- Not seeing changes in dev: make sure dev mode is running (`yarn aegis dev`).

## Contributing

### Development setup

```bash
git clone https://github.com/u84u/aegis.git
cd aegis
yarn install
```

### Development mode

```bash
npx nx run aegis-sdk:dev
```

### Production build

```bash
npx nx run aegis-sdk:build
```

### Running the CLI locally

```bash
npx nx run aegis-sdk:start -- <command>
```

### Resources

- See our [GitHub](https://github.com/u84u/aegis)
- Join our [Discord](https://discord.gg/cx5n4Jzs57)
