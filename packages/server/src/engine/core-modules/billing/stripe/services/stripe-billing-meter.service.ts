/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import type Stripe from 'stripe';

import { StripeSDKService } from 'src/engine/core-modules/billing/stripe/stripe-sdk/services/stripe-sdk.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class StripeBillingMeterService {
  protected readonly logger = new Logger(StripeBillingMeterService.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly aegisConfigService: AegisConfigService,
    private readonly stripeSDKService: StripeSDKService,
  ) {
    if (!this.aegisConfigService.get('IS_BILLING_ENABLED')) {
      return;
    }
    this.stripe = this.stripeSDKService.getStripe(
      this.aegisConfigService.get('BILLING_STRIPE_API_KEY'),
    );
  }

  async getMeter(stripeMeterId: string) {
    return await this.stripe.billing.meters.retrieve(stripeMeterId);
  }

  async getAllMeters() {
    const meters = await this.stripe.billing.meters.list();

    return meters.data;
  }
}
