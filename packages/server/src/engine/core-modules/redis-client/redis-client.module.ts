import { Global, Module } from '@nestjs/common';

import { RedisClientService } from 'src/engine/core-modules/redis-client/redis-client.service';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';

@Global()
@Module({
  imports: [AegisConfigModule],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
