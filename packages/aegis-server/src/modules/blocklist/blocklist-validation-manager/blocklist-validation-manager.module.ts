import { Module } from '@nestjs/common';

import { ObjectMetadataRepositoryModule } from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { AegisORMModule } from 'src/engine/aegis-orm/aegis-orm.module';
import { BlocklistValidationService } from 'src/modules/blocklist/blocklist-validation-manager/services/blocklist-validation.service';
import { BlocklistWorkspaceEntity } from 'src/modules/blocklist/standard-objects/blocklist.workspace-entity';

@Module({
  imports: [
    ObjectMetadataRepositoryModule.forFeature([BlocklistWorkspaceEntity]),
    AegisORMModule,
  ],
  providers: [BlocklistValidationService],
  exports: [BlocklistValidationService],
})
export class BlocklistValidationManagerModule {}
