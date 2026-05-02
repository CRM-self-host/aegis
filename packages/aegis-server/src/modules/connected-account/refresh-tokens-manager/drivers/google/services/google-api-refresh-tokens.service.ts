import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { isDefined } from 'aegis-shared/utils';

import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';
import {
  ConnectedAccountRefreshAccessTokenException,
  ConnectedAccountRefreshAccessTokenExceptionCode,
} from 'src/modules/connected-account/refresh-tokens-manager/exceptions/connected-account-refresh-tokens.exception';
import { type ConnectedAccountTokens } from 'src/modules/connected-account/refresh-tokens-manager/services/connected-account-refresh-tokens.service';
import { parseGoogleOAuthError } from 'src/modules/connected-account/refresh-tokens-manager/drivers/google/utils/parse-google-oauth-error.util';

@Injectable()
export class GoogleAPIRefreshAccessTokenService {
  constructor(private readonly aegisConfigService: AegisConfigService) {}

  async refreshTokens(refreshToken: string): Promise<ConnectedAccountTokens> {
    const oAuth2Client = new google.auth.OAuth2(
      this.aegisConfigService.get('AUTH_GOOGLE_CLIENT_ID'),
      this.aegisConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'),
    );

    oAuth2Client.setCredentials({
      refresh_token: refreshToken,
    });
    try {
      const { token } = await oAuth2Client.getAccessToken();

      if (!isDefined(token)) {
        throw new ConnectedAccountRefreshAccessTokenException(
          'Error refreshing Google tokens: Invalid refresh token',
          ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN,
        );
      }

      return {
        accessToken: token,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof ConnectedAccountRefreshAccessTokenException) {
        throw error;
      }

      throw parseGoogleOAuthError(error);
    }
  }
}
