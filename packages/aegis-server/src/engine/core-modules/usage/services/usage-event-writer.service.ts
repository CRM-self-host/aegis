/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import { ClickHouseService } from 'src/database/clickHouse/clickHouse.service';
import { formatDateForClickHouse } from 'src/database/clickHouse/clickHouse.util';
import { type UsageEvent } from 'src/engine/core-modules/usage/types/usage-event.type';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class UsageEventWriterService {
  private readonly logger = new Logger(UsageEventWriterService.name);

  constructor(
    private readonly clickHouseService: ClickHouseService,
    private readonly aegisConfigService: AegisConfigService,
  ) {}

  writeToClickHouse(workspaceId: string, usageEvents: UsageEvent[]): void {
    if (!this.aegisConfigService.get('CLICKHOUSE_URL')) {
      return;
    }

    const now = formatDateForClickHouse(new Date());

    const rows = usageEvents.map((usageEvent) => ({
      timestamp: now,
      workspaceId,
      userWorkspaceId: usageEvent.userWorkspaceId ?? '',
      resourceType: usageEvent.resourceType,
      operationType: usageEvent.operationType,
      quantity: usageEvent.quantity,
      unit: usageEvent.unit,
      creditsUsedMicro: usageEvent.creditsUsedMicro,
      resourceId: usageEvent.resourceId ?? '',
      resourceContext: usageEvent.resourceContext ?? '',
      metadata: {},
    }));

    this.clickHouseService.insert('usageEvent', rows).catch((error) => {
      this.logger.error('Failed to write usage events to ClickHouse', error);
    });
  }
}
