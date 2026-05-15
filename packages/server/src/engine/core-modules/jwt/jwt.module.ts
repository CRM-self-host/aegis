import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtWrapperService } from 'src/engine/core-modules/jwt/services/jwt-wrapper.service';
import { AegisConfigModule } from 'src/engine/core-modules/aegis-config/aegis-config.module';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

const InternalJwtModule = NestJwtModule.registerAsync({
  useFactory: async (aegisConfigService: AegisConfigService) => {
    return {
      secret: aegisConfigService.get('APP_SECRET'),
      signOptions: {
        algorithm: 'HS256',
        expiresIn: aegisConfigService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    };
  },
  inject: [AegisConfigService],
});

@Module({
  imports: [InternalJwtModule, AegisConfigModule],
  controllers: [],
  providers: [JwtWrapperService],
  exports: [JwtWrapperService],
})
export class JwtModule {}
