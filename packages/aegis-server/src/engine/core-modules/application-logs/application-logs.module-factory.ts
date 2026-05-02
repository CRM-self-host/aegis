import { type AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

import { type OPTIONS_TYPE } from 'src/engine/core-modules/application-logs/application-logs.module-definition';
import { ApplicationLogDriver } from 'src/engine/core-modules/application-logs/interfaces/application-log-driver.enum';

export const applicationLogsModuleFactory = async (
  aegisConfigService: AegisConfigService,
): Promise<typeof OPTIONS_TYPE> => {
  const driverType = aegisConfigService.get('APPLICATION_LOG_DRIVER');

  return {
    type: driverType as ApplicationLogDriver,
  };
};
