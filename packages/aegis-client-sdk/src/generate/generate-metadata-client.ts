import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

import { generate } from '@genql/cli';
import { DEFAULT_API_URL_NAME } from 'aegis-shared/application';

import { buildClientWrapperSource } from './client-wrapper';
import { emptyDir, ensureDir } from './fs-utils';
import aegisClientTemplateSource from './aegis-client-template.ts?raw';

const COMMON_SCALAR_TYPES = {
  DateTime: 'string',
  JSON: 'Record<string, unknown>',
  UUID: 'string',
};

export const generateMetadataClient = async ({
  schema,
  outputPath,
  clientWrapperTemplateSource,
}: {
  schema: string;
  outputPath: string;
  clientWrapperTemplateSource?: string;
}): Promise<void> => {
  const templateSource =
    clientWrapperTemplateSource ?? aegisClientTemplateSource;

  await ensureDir(outputPath);
  await emptyDir(outputPath);

  await generate({
    schema,
    output: outputPath,
    scalarTypes: {
      ...COMMON_SCALAR_TYPES,
      Upload: 'File',
    },
  });

  const clientContent = buildClientWrapperSource(templateSource, {
    apiClientName: 'MetadataApiClient',
    defaultUrl: `\`\${process.env.${DEFAULT_API_URL_NAME}}/metadata\``,
    includeUploadFile: true,
  });

  await appendFile(join(outputPath, 'index.ts'), clientContent);
};
