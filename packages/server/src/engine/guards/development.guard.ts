import {
  type CanActivate,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { NodeEnvironment } from 'src/engine/core-modules/aegis-config/interfaces/node-environment.interface';

import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class DevelopmentGuard implements CanActivate {
  constructor(private readonly aegisConfigService: AegisConfigService) {}

  canActivate(): boolean {
    const nodeEnv = this.aegisConfigService.get('NODE_ENV');

    if (
      nodeEnv !== NodeEnvironment.DEVELOPMENT &&
      nodeEnv !== NodeEnvironment.TEST
    ) {
      throw new ForbiddenException(
        'This endpoint is only available in development or test environments',
      );
    }

    return true;
  }
}
