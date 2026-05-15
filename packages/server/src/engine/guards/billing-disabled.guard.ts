import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class BillingDisabledGuard implements CanActivate {
  constructor(private readonly aegisConfigService: AegisConfigService) {}

  canActivate(_context: ExecutionContext): boolean {
    return !this.aegisConfigService.isBillingEnabled();
  }
}
