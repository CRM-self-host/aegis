import { t } from '@lingui/core/macro';

export const getStandardApplicationDescription =
  (): string => t`The base data model every Aegis workspace runs on.

#### What "foundation" means

Every Aegis workspace starts with this set of objects. They define the shape of your CRM, including relationships, activity, and reporting. Everything else, including marketplace apps, AI agents, and custom objects, plugs into them.

#### Included objects
- **People & Companies**: contact and account records
- **Opportunities**: your sales pipeline
- **Notes & Tasks**: activity and follow-ups
- **Workflows & Dashboards**: automation and reporting

Remove this app and the rest of Aegis has nothing to hang off.

#### Build your own app

Extend Aegis with your own objects, fields, logic functions, or AI skills. Scaffold a new app in one command:

\`\`\`bash
npx create-aegis-app@latest my-aegis-app
\`\`\`

Then inside the folder:

\`\`\`bash
cd my-aegis-app
yarn aegis dev
\`\`\`

See the [Getting Started guide](https://aegis.com/developers/extend/apps/getting-started) for the full walkthrough, and [Building Apps](https://aegis.com/developers/extend/apps/building) for the \`defineApplication\` / \`defineEntity\` APIs.`;
