import { Injectable } from '@nestjs/common';

import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'aegis-shared/utils';
import { type AiSdkPackage } from 'aegis-shared/ai';

import {
  AI_SDK_ANTHROPIC,
  AI_SDK_BEDROCK,
  AI_SDK_OPENAI,
} from 'src/engine/metadata-modules/ai/ai-models/constants/ai-sdk-package.const';
import { NodeEnvironment } from 'src/engine/core-modules/aegis-config/interfaces/node-environment.interface';
import { SupportDriver } from 'src/engine/core-modules/aegis-config/interfaces/support.interface';

import { MaintenanceModeService } from 'src/engine/core-modules/admin-panel/maintenance-mode.service';
import {
  type ClientAiModelConfig,
  type ClientConfig,
  type NativeModelCapabilities,
} from 'src/engine/core-modules/client-config/client-config.entity';
import { DomainServerConfigService } from 'src/engine/core-modules/domain/domain-server-config/services/domain-server-config.service';
import { PUBLIC_FEATURE_FLAGS } from 'src/engine/core-modules/feature-flag/constants/public-feature-flag.const';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';
import {
  AUTO_SELECT_FAST_MODEL_ID,
  AUTO_SELECT_SMART_MODEL_ID,
} from 'aegis-shared/branding-constants';
import { MODEL_FAMILY_LABELS } from 'src/engine/metadata-modules/ai/ai-models/constants/model-family-labels.const';
import { AiModelRegistryService } from 'src/engine/metadata-modules/ai/ai-models/services/ai-model-registry.service';

@Injectable()
export class ClientConfigService {
  constructor(
    private aegisConfigService: AegisConfigService,
    private domainServerConfigService: DomainServerConfigService,
    private aiModelRegistryService: AiModelRegistryService,
    private maintenanceModeService: MaintenanceModeService,
  ) {}

  private deriveNativeCapabilities(
    sdkPackage?: AiSdkPackage,
  ): NativeModelCapabilities | undefined {
    switch (sdkPackage) {
      case AI_SDK_OPENAI:
      case AI_SDK_ANTHROPIC:
      case AI_SDK_BEDROCK:
        return { webSearch: true };
      default:
        return undefined;
    }
  }

  private isCloudflareIntegrationEnabled(): boolean {
    return (
      !!this.aegisConfigService.get('CLOUDFLARE_API_KEY') &&
      !!this.aegisConfigService.get('CLOUDFLARE_ZONE_ID')
    );
  }

  async getClientConfig(): Promise<ClientConfig> {
    const captchaProvider = this.aegisConfigService.get('CAPTCHA_DRIVER');
    const supportDriver = this.aegisConfigService.get('SUPPORT_DRIVER');
    const calendarBookingPageId = this.aegisConfigService.get(
      'CALENDAR_BOOKING_PAGE_ID',
    );

    const availableModels =
      this.aiModelRegistryService.getAdminFilteredModels();
    const recommendedModelIds =
      this.aiModelRegistryService.getRecommendedModelIds();
    const resolvedProviders =
      this.aiModelRegistryService.getResolvedProvidersForAdmin();

    const getProviderLabel = (providerName?: string | null) =>
      providerName
        ? (resolvedProviders[providerName]?.label ?? providerName)
        : undefined;

    const aiModels: ClientAiModelConfig[] = availableModels.map(
      (registeredModel) => {
        const modelConfig = this.aiModelRegistryService.getModelConfig(
          registeredModel.modelId,
        );

        const modelFamily = modelConfig?.modelFamily;
        const providerName = registeredModel.providerName;

        return {
          modelId: registeredModel.modelId,
          label: modelConfig?.label || registeredModel.modelId,
          modelFamily,
          modelFamilyLabel: modelFamily
            ? MODEL_FAMILY_LABELS[modelFamily]
            : undefined,
          sdkPackage: registeredModel.sdkPackage,
          providerName,
          providerLabel: getProviderLabel(providerName),
          nativeCapabilities: this.deriveNativeCapabilities(
            registeredModel.sdkPackage,
          ),
          inputCostPerMillionTokens: modelConfig?.inputCostPerMillionTokens,
          outputCostPerMillionTokens: modelConfig?.outputCostPerMillionTokens,
          contextWindowTokens: modelConfig?.contextWindowTokens,
          maxOutputTokens: modelConfig?.maxOutputTokens,
          isDeprecated: modelConfig?.isDeprecated,
          isRecommended: recommendedModelIds.has(registeredModel.modelId),
          dataResidency: modelConfig?.dataResidency,
        };
      },
    );

    if (aiModels.length > 0) {
      const defaultSpeedModel =
        this.aiModelRegistryService.getDefaultSpeedModel();
      const defaultSpeedModelConfig =
        this.aiModelRegistryService.getModelConfig(defaultSpeedModel?.modelId);

      const defaultPerformanceModel =
        this.aiModelRegistryService.getDefaultPerformanceModel();
      const defaultPerformanceModelConfig =
        this.aiModelRegistryService.getModelConfig(
          defaultPerformanceModel?.modelId,
        );

      aiModels.unshift(
        {
          modelId: AUTO_SELECT_SMART_MODEL_ID,
          label:
            defaultPerformanceModelConfig?.label ||
            defaultPerformanceModel?.modelId ||
            'Default',
          modelFamily: defaultPerformanceModelConfig?.modelFamily,
          providerName: defaultPerformanceModel?.providerName,
          providerLabel: getProviderLabel(
            defaultPerformanceModel?.providerName,
          ),
          sdkPackage: defaultPerformanceModel?.sdkPackage ?? null,
          inputCostPerMillionTokens:
            defaultPerformanceModelConfig?.inputCostPerMillionTokens,
          outputCostPerMillionTokens:
            defaultPerformanceModelConfig?.outputCostPerMillionTokens,
          contextWindowTokens:
            defaultPerformanceModelConfig?.contextWindowTokens,
          maxOutputTokens: defaultPerformanceModelConfig?.maxOutputTokens,
        },
        {
          modelId: AUTO_SELECT_FAST_MODEL_ID,
          label:
            defaultSpeedModelConfig?.label ||
            defaultSpeedModel?.modelId ||
            'Default',
          modelFamily: defaultSpeedModelConfig?.modelFamily,
          providerName: defaultSpeedModel?.providerName,
          providerLabel: getProviderLabel(defaultSpeedModel?.providerName),
          sdkPackage: defaultSpeedModel?.sdkPackage ?? null,
          inputCostPerMillionTokens:
            defaultSpeedModelConfig?.inputCostPerMillionTokens,
          outputCostPerMillionTokens:
            defaultSpeedModelConfig?.outputCostPerMillionTokens,
          contextWindowTokens: defaultSpeedModelConfig?.contextWindowTokens,
          maxOutputTokens: defaultSpeedModelConfig?.maxOutputTokens,
        },
      );
    }

    const clientConfig: ClientConfig = {
      appVersion: this.aegisConfigService.get('APP_VERSION'),
      billing: {
        isBillingEnabled: this.aegisConfigService.get('IS_BILLING_ENABLED'),
        billingUrl: this.aegisConfigService.get('BILLING_PLAN_REQUIRED_LINK'),
        trialPeriods: [
          {
            duration: this.aegisConfigService.get(
              'BILLING_FREE_TRIAL_WITH_CREDIT_CARD_DURATION_IN_DAYS',
            ),
            isCreditCardRequired: true,
          },
          {
            duration: this.aegisConfigService.get(
              'BILLING_FREE_TRIAL_WITHOUT_CREDIT_CARD_DURATION_IN_DAYS',
            ),
            isCreditCardRequired: false,
          },
        ],
      },
      aiModels,
      authProviders: {
        google: this.aegisConfigService.get('AUTH_GOOGLE_ENABLED'),
        magicLink: false,
        password: this.aegisConfigService.get('AUTH_PASSWORD_ENABLED'),
        microsoft: this.aegisConfigService.get('AUTH_MICROSOFT_ENABLED'),
        sso: [],
      },
      signInPrefilled: this.aegisConfigService.get('SIGN_IN_PREFILLED'),
      isMultiWorkspaceEnabled: this.aegisConfigService.get(
        'IS_MULTIWORKSPACE_ENABLED',
      ),
      isEmailVerificationRequired: this.aegisConfigService.get(
        'IS_EMAIL_VERIFICATION_REQUIRED',
      ),
      defaultSubdomain: this.aegisConfigService.get('DEFAULT_SUBDOMAIN'),
      frontDomain: this.domainServerConfigService.getFrontUrl().hostname,
      support: {
        supportDriver: supportDriver ? supportDriver : SupportDriver.NONE,
        supportFrontChatId: this.aegisConfigService.get(
          'SUPPORT_FRONT_CHAT_ID',
        ),
      },
      sentry: {
        environment: this.aegisConfigService.get('SENTRY_ENVIRONMENT'),
        release: this.aegisConfigService.get('APP_VERSION'),
        dsn: this.aegisConfigService.get('SENTRY_FRONT_DSN'),
      },
      captcha: {
        provider: captchaProvider ? captchaProvider : undefined,
        siteKey: this.aegisConfigService.get('CAPTCHA_SITE_KEY'),
      },
      api: {
        mutationMaximumAffectedRecords: this.aegisConfigService.get(
          'MUTATION_MAXIMUM_AFFECTED_RECORDS',
        ),
      },
      isAttachmentPreviewEnabled: this.aegisConfigService.get(
        'IS_ATTACHMENT_PREVIEW_ENABLED',
      ),
      analyticsEnabled: this.aegisConfigService.get('ANALYTICS_ENABLED'),
      canManageFeatureFlags:
        this.aegisConfigService.get('NODE_ENV') ===
          NodeEnvironment.DEVELOPMENT ||
        this.aegisConfigService.get('IS_BILLING_ENABLED'),
      publicFeatureFlags: PUBLIC_FEATURE_FLAGS,
      isMicrosoftMessagingEnabled: this.aegisConfigService.get(
        'MESSAGING_PROVIDER_MICROSOFT_ENABLED',
      ),
      isMicrosoftCalendarEnabled: this.aegisConfigService.get(
        'CALENDAR_PROVIDER_MICROSOFT_ENABLED',
      ),
      isGoogleMessagingEnabled: this.aegisConfigService.get(
        'MESSAGING_PROVIDER_GMAIL_ENABLED',
      ),
      isGoogleCalendarEnabled: this.aegisConfigService.get(
        'CALENDAR_PROVIDER_GOOGLE_ENABLED',
      ),
      isConfigVariablesInDbEnabled: this.aegisConfigService.get(
        'IS_CONFIG_VARIABLES_IN_DB_ENABLED',
      ),
      isImapSmtpCaldavEnabled: this.aegisConfigService.get(
        'IS_IMAP_SMTP_CALDAV_ENABLED',
      ),
      allowRequestsToAegisIcons: this.aegisConfigService.get(
        'ALLOW_REQUESTS_TO_AEGIS_ICONS',
      ),
      calendarBookingPageId: isNonEmptyString(calendarBookingPageId)
        ? calendarBookingPageId
        : undefined,
      isCloudflareIntegrationEnabled: this.isCloudflareIntegrationEnabled(),
      isClickHouseConfigured: !!this.aegisConfigService.get('CLICKHOUSE_URL'),
      isWorkspaceSchemaDDLLocked: this.aegisConfigService.get(
        'WORKSPACE_SCHEMA_DDL_LOCKED',
      ),
    };

    const maintenanceMode =
      await this.maintenanceModeService.getMaintenanceMode();

    if (isDefined(maintenanceMode)) {
      clientConfig.maintenance = {
        startAt: new Date(maintenanceMode.startAt),
        endAt: new Date(maintenanceMode.endAt),
        link: maintenanceMode.link,
      };
    }

    return clientConfig;
  }
}
