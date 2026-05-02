import { Injectable } from '@nestjs/common';

import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

import {
  type LogicFunctionDriver,
  LogicFunctionDriverType,
} from 'src/engine/core-modules/logic-function/logic-function-drivers/interfaces/logic-function-driver.interface';

import { CacheLockService } from 'src/engine/core-modules/cache-lock/cache-lock.service';
import { DisabledDriver } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/disabled.driver';
import { LambdaDriver } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/lambda.driver';
import { LocalDriver } from 'src/engine/core-modules/logic-function/logic-function-drivers/drivers/local.driver';
import { LogicFunctionResourceService } from 'src/engine/core-modules/logic-function/logic-function-resource/logic-function-resource.service';
import { SdkClientArchiveService } from 'src/engine/core-modules/sdk-client/sdk-client-archive.service';
import { DriverFactoryBase } from 'src/engine/core-modules/aegis-config/dynamic-factory.base';
import { ConfigVariablesGroup } from 'src/engine/core-modules/aegis-config/enums/config-variables-group.enum';
import { ConfigGroupHashService } from 'src/engine/core-modules/aegis-config/services/config-group-hash.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class LogicFunctionDriverFactory extends DriverFactoryBase<LogicFunctionDriver> {
  constructor(
    aegisConfigService: AegisConfigService,
    configGroupHashService: ConfigGroupHashService,
    private readonly logicFunctionResourceService: LogicFunctionResourceService,
    private readonly sdkClientArchiveService: SdkClientArchiveService,
    private readonly cacheLockService: CacheLockService,
  ) {
    super(aegisConfigService, configGroupHashService);
  }

  protected buildConfigKey(): string {
    const driverType = this.aegisConfigService.get('LOGIC_FUNCTION_TYPE');

    if (driverType === LogicFunctionDriverType.LAMBDA) {
      return `lambda|${this.configGroupHashService.computeHash(ConfigVariablesGroup.LOGIC_FUNCTION_CONFIG)}`;
    }

    return driverType;
  }

  protected createDriver(): LogicFunctionDriver {
    const driverType = this.aegisConfigService.get('LOGIC_FUNCTION_TYPE');

    switch (driverType) {
      case LogicFunctionDriverType.DISABLED:
        return new DisabledDriver();

      case LogicFunctionDriverType.LOCAL:
        return new LocalDriver({
          logicFunctionResourceService: this.logicFunctionResourceService,
          sdkClientArchiveService: this.sdkClientArchiveService,
        });

      case LogicFunctionDriverType.LAMBDA: {
        const region = this.aegisConfigService.get(
          'LOGIC_FUNCTION_LAMBDA_REGION',
        );
        const accessKeyId = this.aegisConfigService.get(
          'LOGIC_FUNCTION_LAMBDA_ACCESS_KEY_ID',
        );
        const secretAccessKey = this.aegisConfigService.get(
          'LOGIC_FUNCTION_LAMBDA_SECRET_ACCESS_KEY',
        );
        const lambdaRole = this.aegisConfigService.get(
          'LOGIC_FUNCTION_LAMBDA_ROLE',
        );
        const subhostingRole = this.aegisConfigService.get(
          'LOGIC_FUNCTION_LAMBDA_SUBHOSTING_ROLE',
        );
        const s3BucketName = this.aegisConfigService.get('STORAGE_S3_NAME');
        const layerBucket =
          this.aegisConfigService.get('LOGIC_FUNCTION_LAMBDA_LAYER_BUCKET') ??
          s3BucketName ??
          'aegis-lambda-layer';
        const layerBucketRegion =
          this.aegisConfigService.get(
            'LOGIC_FUNCTION_LAMBDA_LAYER_BUCKET_REGION',
          ) ?? region;

        return new LambdaDriver({
          logicFunctionResourceService: this.logicFunctionResourceService,
          cacheLockService: this.cacheLockService,
          credentials: accessKeyId
            ? { accessKeyId, secretAccessKey }
            : fromNodeProviderChain({ clientConfig: { region } }),
          region,
          lambdaRole,
          subhostingRole,
          layerBucket,
          layerBucketRegion,
          sdkClientArchiveService: this.sdkClientArchiveService,
        });
      }

      default:
        throw new Error(
          `Invalid logic function driver type (${driverType}), check your .env file`,
        );
    }
  }
}
