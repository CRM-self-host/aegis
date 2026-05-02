import { type DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationEntity } from 'src/engine/core-modules/application/application.entity';
import { FileStorageDriverFactory } from 'src/engine/core-modules/file-storage/file-storage-driver.factory';
import { FileStorageService } from 'src/engine/core-modules/file-storage/file-storage.service';
import { FileEntity } from 'src/engine/core-modules/file/entities/file.entity';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';

@Global()
export class FileStorageModule {
  static forRoot(): DynamicModule {
    return {
      module: FileStorageModule,
      imports: [
        AegisConfigModule,
        TypeOrmModule.forFeature([FileEntity, ApplicationEntity]),
      ],
      providers: [FileStorageDriverFactory, FileStorageService],
      exports: [FileStorageDriverFactory, FileStorageService],
    };
  }
}
