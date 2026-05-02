import { Module } from '@nestjs/common';

import { JwtModule } from 'src/engine/core-modules/jwt/jwt.module';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';
import { MicrosoftAPIRefreshAccessTokenService } from 'src/modules/connected-account/refresh-tokens-manager/drivers/microsoft/services/microsoft-api-refresh-tokens.service';

@Module({
  imports: [AegisConfigModule, JwtModule],
  providers: [MicrosoftAPIRefreshAccessTokenService],
  exports: [MicrosoftAPIRefreshAccessTokenService],
})
export class MicrosoftAPIRefreshAccessTokenModule {}
