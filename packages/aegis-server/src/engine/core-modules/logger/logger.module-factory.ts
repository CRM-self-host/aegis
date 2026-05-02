import {
  LoggerDriverType,
  type LoggerModuleOptions,
} from 'src/engine/core-modules/logger/interfaces';
import { type AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

/**
 * Logger Module factory
 * @returns LoggerModuleOptions
 * @param aegisConfigService
 */
export const loggerModuleFactory = async (
  aegisConfigService: AegisConfigService,
): Promise<LoggerModuleOptions> => {
  const driverType = aegisConfigService.get('LOGGER_DRIVER');
  const logLevels = aegisConfigService.get('LOG_LEVELS');

  switch (driverType) {
    case LoggerDriverType.CONSOLE: {
      return {
        type: LoggerDriverType.CONSOLE,
        logLevels: logLevels,
      };
    }
    default:
      throw new Error(
        `Invalid logger driver type (${driverType}), check your .env file`,
      );
  }
};
