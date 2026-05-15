import { Injectable } from '@nestjs/common';

import {
  SESv2Client as SESClient,
  type SESv2ClientConfig as SESClientConfig,
} from '@aws-sdk/client-sesv2';

import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class AwsSesClientProvider {
  private sesClient: SESClient | null = null;

  constructor(private readonly aegisConfigService: AegisConfigService) {}

  public getSESClient(): SESClient {
    if (!this.sesClient) {
      const config: SESClientConfig = {
        region: this.aegisConfigService.get('AWS_SES_REGION'),
      };

      const accessKeyId = this.aegisConfigService.get('AWS_SES_ACCESS_KEY_ID');
      const secretAccessKey = this.aegisConfigService.get(
        'AWS_SES_SECRET_ACCESS_KEY',
      );
      const sessionToken = this.aegisConfigService.get('AWS_SES_SESSION_TOKEN');

      if (accessKeyId && secretAccessKey && sessionToken) {
        config.credentials = {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        };
      }

      this.sesClient = new SESClient(config);
    }

    return this.sesClient;
  }
}
