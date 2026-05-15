import { AEGIS_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/aegis-current-version.constant';
import { AEGIS_PREVIOUS_VERSIONS } from 'src/engine/core-modules/upgrade/constants/aegis-previous-versions.constant';

export const AEGIS_CROSS_UPGRADE_SUPPORTED_VERSIONS = [
  ...AEGIS_PREVIOUS_VERSIONS,
  AEGIS_CURRENT_VERSION,
] as const;

export type AegisCrossUpgradeSupportedVersion =
  (typeof AEGIS_CROSS_UPGRADE_SUPPORTED_VERSIONS)[number];
