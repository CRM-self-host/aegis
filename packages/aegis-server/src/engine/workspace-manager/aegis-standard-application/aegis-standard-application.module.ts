import { Module } from '@nestjs/common';

import { ApplicationModule } from 'src/engine/core-modules/application/application.module';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';
import { WorkspaceManyOrAllFlatEntityMapsCacheModule } from 'src/engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module';
import { GlobalWorkspaceDataSourceModule } from 'src/engine/aegis-orm/global-workspace-datasource/global-workspace-datasource.module';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';
import { WorkspaceMigrationModule } from 'src/engine/workspace-manager/workspace-migration/workspace-migration.module';

import { AegisStandardApplicationService } from './services/aegis-standard-application.service';

@Module({
  providers: [AegisStandardApplicationService],
  imports: [
    ApplicationModule,
    AegisConfigModule,
    WorkspaceCacheModule,
    WorkspaceMigrationModule,
    GlobalWorkspaceDataSourceModule,
    WorkspaceManyOrAllFlatEntityMapsCacheModule,
  ],
  exports: [AegisStandardApplicationService],
})
export class AegisStandardApplicationModule {}
