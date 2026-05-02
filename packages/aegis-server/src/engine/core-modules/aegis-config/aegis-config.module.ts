import { type DynamicModule, Global, Module } from '@nestjs/common';

import { ConfigVariables } from 'src/engine/core-modules/aegis-config/config-variables';
import { CONFIG_VARIABLES_INSTANCE_TOKEN } from 'src/engine/core-modules/aegis-config/constants/config-variables-instance-tokens.constants';
import { DatabaseConfigModule } from 'src/engine/core-modules/aegis-config/drivers/database-config.module';
import { ConfigGroupHashService } from 'src/engine/core-modules/aegis-config/services/config-group-hash.service';
import { ConfigurableModuleClass } from 'src/engine/core-modules/aegis-config/aegis-config.module-definition';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Global()
@Module({})
export class AegisConfigModule extends ConfigurableModuleClass {
  static forRoot(): DynamicModule {
    const isConfigVariablesInDbEnabled =
      process.env.IS_CONFIG_VARIABLES_IN_DB_ENABLED !== 'false';

    const imports = isConfigVariablesInDbEnabled
      ? [DatabaseConfigModule.forRoot()]
      : [];

    return {
      module: AegisConfigModule,
      imports,
      providers: [
        AegisConfigService,
        ConfigGroupHashService,
        {
          provide: CONFIG_VARIABLES_INSTANCE_TOKEN,
          useValue: new ConfigVariables(),
        },
      ],
      exports: [AegisConfigService, ConfigGroupHashService],
    };
  }
}
