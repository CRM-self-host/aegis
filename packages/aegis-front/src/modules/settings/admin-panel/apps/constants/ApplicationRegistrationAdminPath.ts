import { SettingsPath } from 'aegis-shared/types';
import { getSettingsPath } from 'aegis-shared/utils';

export const APPLICATION_REGISTRATION_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'apps',
);
