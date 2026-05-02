import { Module } from '@nestjs/common';

import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';
import { GoogleAPIRefreshAccessTokenService } from 'src/modules/connected-account/refresh-tokens-manager/drivers/google/services/google-api-refresh-tokens.service';

@Module({
  imports: [AegisConfigModule],
  providers: [GoogleAPIRefreshAccessTokenService],
  exports: [GoogleAPIRefreshAccessTokenService],
})
export class GoogleAPIRefreshAccessTokenModule {}
