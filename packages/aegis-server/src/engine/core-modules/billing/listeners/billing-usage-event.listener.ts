/* @license Enterprise */

import { Injectable } from '@nestjs/common';

import { isDefined } from 'aegis-shared/utils';

import { OnCustomBatchEvent } from 'src/engine/api/graphql/graphql-query-runner/decorators/on-custom-batch-event.decorator';
import { USAGE_RECORDED } from 'src/engine/core-modules/usage/constants/usage-recorded.constant';
import { BillingUsageService } from 'src/engine/core-modules/billing/services/billing-usage.service';
import { type UsageEvent } from 'src/engine/core-modules/usage/types/usage-event.type';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';
import { CustomWorkspaceEventBatch } from 'src/engine/workspace-event-emitter/types/custom-workspace-batch-event.type';

@Injectable()
export class BillingUsageEventListener {
  constructor(
    private readonly billingUsageService: BillingUsageService,
    private readonly aegisConfigService: AegisConfigService,
  ) {}

  @OnCustomBatchEvent(USAGE_RECORDED)
  async handleUsageRecordedEvent(
    payload: CustomWorkspaceEventBatch<UsageEvent>,
  ) {
    if (!isDefined(payload.workspaceId)) {
      return;
    }

    if (!this.aegisConfigService.get('IS_BILLING_ENABLED')) {
      return;
    }

    const canFeatureBeUsed = await this.billingUsageService.canFeatureBeUsed(
      payload.workspaceId,
    );

    if (!canFeatureBeUsed) {
      return;
    }

    await this.billingUsageService.billUsage({
      workspaceId: payload.workspaceId,
      usageEvents: payload.events,
    });
  }
}
