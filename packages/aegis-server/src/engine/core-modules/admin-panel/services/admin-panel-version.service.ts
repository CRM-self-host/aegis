import { Injectable } from '@nestjs/common';

import semver from 'semver';
import * as z from 'zod';

import { type VersionInfoDTO } from 'src/engine/core-modules/admin-panel/dtos/version-info.dto';
import { SecureHttpClientService } from 'src/engine/core-modules/secure-http-client/secure-http-client.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';

@Injectable()
export class AdminPanelVersionService {
  constructor(
    private readonly aegisConfigService: AegisConfigService,
    private readonly secureHttpClientService: SecureHttpClientService,
  ) {}

  async getVersionInfo(): Promise<VersionInfoDTO> {
    const currentVersion = this.aegisConfigService.get('APP_VERSION');

    try {
      const httpClient = this.secureHttpClientService.getHttpClient();

      const rawResponse = await httpClient.get<unknown>(
        'https://hub.docker.com/v2/repositories/u84u/aegis/tags?page_size=100',
      );
      const response = z
        .object({
          data: z.object({
            results: z.array(z.object({ name: z.string() })),
          }),
        })
        .parse(rawResponse);

      const versions = response.data.results
        .map((tag) => tag.name)
        .filter((name) => name !== 'latest' && semver.valid(name));

      if (versions.length === 0) {
        return { currentVersion, latestVersion: 'latest' };
      }

      versions.sort((a, b) => semver.compare(b, a));
      const latestVersion = versions[0];

      return { currentVersion, latestVersion };
    } catch {
      return { currentVersion, latestVersion: 'latest' };
    }
  }
}
