import { AEGIS_STANDARD_APPLICATION } from 'src/engine/workspace-manager/aegis-standard-application/constants/aegis-standard-applications';
import { type WorkspaceMigrationBuilderOptions } from 'src/engine/workspace-manager/workspace-migration/workspace-migration-builder/types/workspace-migration-builder-options.type';

export const isCallerAegisStandardApp = (
  buildOptions: WorkspaceMigrationBuilderOptions,
) =>
  buildOptions.applicationUniversalIdentifier ===
  AEGIS_STANDARD_APPLICATION.universalIdentifier;
