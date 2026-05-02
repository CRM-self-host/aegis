import { type FeatureFlagKey } from 'aegis-shared/types';

export type FeatureFlagMap = Record<`${FeatureFlagKey}`, boolean>;
