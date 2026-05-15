import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationPackageFetcherService } from 'src/engine/core-modules/application/application-package/application-package-fetcher.service';
import { ApplicationEntity } from 'src/engine/core-modules/application/application.entity';
import { FileStorageModule } from 'src/engine/core-modules/file-storage/file-storage.module';
import { FileEntity } from 'src/engine/core-modules/file/entities/file.entity';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';

@Module({
  imports: [
    FileStorageModule,
    AegisConfigModule,
    TypeOrmModule.forFeature([FileEntity, ApplicationEntity]),
  ],
  providers: [ApplicationPackageFetcherService],
  exports: [ApplicationPackageFetcherService],
})
export class ApplicationPackageModule {}
