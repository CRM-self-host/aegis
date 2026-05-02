import { AEGIS_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/aegis-current-version.constant';
import { AEGIS_NEXT_VERSIONS } from 'src/engine/core-modules/upgrade/constants/aegis-next-versions.constant';
import { AEGIS_PREVIOUS_VERSIONS } from 'src/engine/core-modules/upgrade/constants/aegis-previous-versions.constant';

export const AEGIS_ALL_VERSIONS = [
  ...AEGIS_PREVIOUS_VERSIONS,
  AEGIS_CURRENT_VERSION,
  ...AEGIS_NEXT_VERSIONS,
] as const;

export type AegisAllVersion = (typeof AEGIS_ALL_VERSIONS)[number];
