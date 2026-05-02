import { SettingsPath } from 'aegis-shared/types';
import { getSettingsPath } from 'aegis-shared/utils';

export const AI_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'ai',
);
