import { RuleTester } from 'oxlint/plugins-dev';

import { rule, RULE_NAME } from './enforce-module-boundaries';

const depConstraints = [
  {
    sourceTag: 'scope:frontend',
    onlyDependOnLibsWithTags: ['scope:shared', 'scope:frontend'],
  },
  {
    sourceTag: 'scope:backend',
    onlyDependOnLibsWithTags: ['scope:shared', 'scope:backend'],
  },
  {
    sourceTag: 'scope:shared',
    onlyDependOnLibsWithTags: ['scope:shared'],
  },
];

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: "import { isDefined } from 'aegis-shared';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-front/src/utils.ts',
    },
    {
      code: "import { Button } from 'aegis-ui';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-front/src/components.tsx',
    },
    {
      code: "import { isDefined } from 'aegis-shared';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-server/src/utils.ts',
    },
    {
      code: "import { helper } from './local';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-front/src/utils.ts',
    },
    {
      code: "import lodash from 'lodash';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-front/src/utils.ts',
    },
    {
      code: "import { isDefined } from 'aegis-shared';",
      options: [{ depConstraints: [] }],
      filename: '/project/packages/aegis-front/src/utils.ts',
    },
  ],
  invalid: [
    {
      code: "import { ServerService } from 'aegis-server';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-front/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { Component } from 'aegis-front';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-server/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { Component } from 'aegis-front';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-shared/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { ServerThing } from 'aegis-server';",
      options: [{ depConstraints }],
      filename: '/project/packages/aegis-shared/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
  ],
});
