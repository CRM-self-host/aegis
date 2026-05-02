import { Module } from '@nestjs/common';

import { AegisORMModule } from 'src/engine/aegis-orm/aegis-orm.module';

import { RecordPositionService } from './services/record-position.service';

@Module({
  imports: [AegisORMModule],
  providers: [RecordPositionService],
  exports: [RecordPositionService],
})
export class RecordPositionModule {}
