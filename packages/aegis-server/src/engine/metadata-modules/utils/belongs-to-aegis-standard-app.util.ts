import { AEGIS_STANDARD_APPLICATION } from 'src/engine/workspace-manager/aegis-standard-application/constants/aegis-standard-applications';
import { type UniversalSyncableFlatEntity } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-entity-from.type';

export const belongsToAegisStandardApp = <
  T extends UniversalSyncableFlatEntity,
>({
  applicationUniversalIdentifier,
}: T) =>
  applicationUniversalIdentifier ===
  AEGIS_STANDARD_APPLICATION.universalIdentifier;
