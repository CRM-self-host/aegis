import { computeMetadataNameFromLabel } from 'aegis-shared/metadata';

import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { isCallerAegisStandardApp } from 'src/engine/metadata-modules/utils/is-caller-aegis-standard-app.util';
import { type WorkspaceMigrationBuilderOptions } from 'src/engine/workspace-manager/workspace-migration/workspace-migration-builder/types/workspace-migration-builder-options.type';

export const isFlatFieldMetadataNameSyncedWithLabel = ({
  flatFieldMetadata,
  buildOptions,
}: {
  flatFieldMetadata: Pick<
    FlatFieldMetadata,
    'name' | 'isLabelSyncedWithName' | 'label'
  >;
  buildOptions: WorkspaceMigrationBuilderOptions;
}) => {
  const computedName = computeMetadataNameFromLabel({
    label: flatFieldMetadata.label,
    applyCustomSuffix: !isCallerAegisStandardApp(buildOptions),
  });

  return flatFieldMetadata.name === computedName;
};
