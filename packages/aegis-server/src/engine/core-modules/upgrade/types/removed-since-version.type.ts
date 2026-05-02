import {
  AEGIS_ALL_VERSIONS,
  AegisAllVersion,
} from 'src/engine/core-modules/upgrade/constants/aegis-all-versions.constant';
import { AEGIS_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/aegis-current-version.constant';
import { IndexOf, IsGreaterOrEqual } from 'aegis-shared/types';

export type RemovedSinceVersion<RemoveAtVersion extends AegisAllVersion, T> =
  IsGreaterOrEqual<
    IndexOf<typeof AEGIS_CURRENT_VERSION, typeof AEGIS_ALL_VERSIONS>,
    IndexOf<RemoveAtVersion, typeof AEGIS_ALL_VERSIONS>
  > extends true
    ? never
    : T;
