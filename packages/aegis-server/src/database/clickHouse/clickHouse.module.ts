import { Module } from '@nestjs/common';

import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';

import { ClickHouseService } from './clickHouse.service';

@Module({
  imports: [AegisConfigModule],
  providers: [ClickHouseService],
  exports: [ClickHouseService],
})
export class ClickHouseModule {}
