import { Injectable } from '@nestjs/common';

import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

import { type StorageDriver } from 'src/engine/core-modules/file-storage/drivers/interfaces/storage-driver.interface';
import { StorageDriverType } from 'src/engine/core-modules/file-storage/interfaces/file-storage.interface';

import { LocalDriver } from 'src/engine/core-modules/file-storage/drivers/local.driver';
import { S3Driver } from 'src/engine/core-modules/file-storage/drivers/s3.driver';
import { ValidatedStorageDriver } from 'src/engine/core-modules/file-storage/drivers/validated-storage.driver';
import { DriverFactoryBase } from 'src/engine/core-modules/aegis-config/dynamic-factory.base';
import { ConfigVariablesGroup } from 'src/engine/core-modules/aegis-config/enums/config-variables-group.enum';
import { ConfigGroupHashService } from 'src/engine/core-modules/aegis-config/services/config-group-hash.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';
import { resolveAbsolutePath } from 'src/utils/resolve-absolute-path';

@Injectable()
export class FileStorageDriverFactory extends DriverFactoryBase<StorageDriver> {
  constructor(
    aegisConfigService: AegisConfigService,
    configGroupHashService: ConfigGroupHashService,
  ) {
    super(aegisConfigService, configGroupHashService);
  }

  protected buildConfigKey(): string {
    const storageType = this.aegisConfigService.get('STORAGE_TYPE');

    if (storageType === StorageDriverType.LOCAL) {
      const storagePath = this.aegisConfigService.get('STORAGE_LOCAL_PATH');

      return `local|${storagePath}`;
    }

    if (storageType === StorageDriverType.S_3) {
      const storageConfigHash = this.configGroupHashService.computeHash(
        ConfigVariablesGroup.STORAGE_CONFIG,
      );

      return `s3|${storageConfigHash}`;
    }

    throw new Error(`Unsupported storage type: ${storageType}`);
  }

  protected createDriver(): StorageDriver {
    const storageType = this.aegisConfigService.get('STORAGE_TYPE');
    let rawDriver: StorageDriver;

    switch (storageType) {
      case StorageDriverType.LOCAL: {
        const storagePath = this.aegisConfigService.get('STORAGE_LOCAL_PATH');

        rawDriver = new LocalDriver({
          storagePath: resolveAbsolutePath(storagePath),
        });
        break;
      }

      case StorageDriverType.S_3: {
        const bucketName = this.aegisConfigService.get('STORAGE_S3_NAME');
        const endpoint = this.aegisConfigService.get('STORAGE_S3_ENDPOINT');
        const region = this.aegisConfigService.get('STORAGE_S3_REGION');
        const accessKeyId = this.aegisConfigService.get(
          'STORAGE_S3_ACCESS_KEY_ID',
        );
        const secretAccessKey = this.aegisConfigService.get(
          'STORAGE_S3_SECRET_ACCESS_KEY',
        );
        const presignEnabled = this.aegisConfigService.get(
          'STORAGE_S3_PRESIGNED_URL_ENABLED',
        );
        const presignEndpointOverride = this.aegisConfigService.get(
          'STORAGE_S3_PRESIGNED_URL_BASE',
        );

        rawDriver = new S3Driver({
          bucketName: bucketName ?? '',
          endpoint: endpoint,
          presignEnabled,
          presignEndpoint: presignEndpointOverride || undefined,
          credentials: accessKeyId
            ? { accessKeyId, secretAccessKey }
            : fromNodeProviderChain({ clientConfig: { region } }),
          forcePathStyle: true,
          region: region ?? '',
        });
        break;
      }

      default:
        throw new Error(`Invalid storage driver type: ${storageType}`);
    }

    return new ValidatedStorageDriver(rawDriver);
  }
}
