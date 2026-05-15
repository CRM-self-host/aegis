/* @license Enterprise */

import { Injectable, Logger } from '@nestjs/common';

import { isDefined } from 'shared/utils';

import type Stripe from 'stripe';

import { StripeSDKService } from 'src/engine/core-modules/billing/stripe/stripe-sdk/services/stripe-sdk.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class StripeSubscriptionItemService {
  protected readonly logger = new Logger(StripeSubscriptionItemService.name);
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

  async updateSubscriptionItem(
    stripeItemId: string,
    updateData: Stripe.SubscriptionItemUpdateParams,
  ) {
    await this.stripe.subscriptionItems.update(stripeItemId, updateData);
  }

  async createSubscriptionItem(
    stripeSubscriptionId: string,
    stripePriceId: string,
    quantity?: number,
  ) {
    return this.stripe.subscriptionItems.create({
      subscription: stripeSubscriptionId,
      price: stripePriceId,
      ...(isDefined(quantity) ? { quantity } : {}),
    });
  }

  async deleteSubscriptionItem(stripeItemId: string, clearUsage = false) {
    return this.stripe.subscriptionItems.del(stripeItemId, {
      clear_usage: clearUsage,
    });
  }
}
