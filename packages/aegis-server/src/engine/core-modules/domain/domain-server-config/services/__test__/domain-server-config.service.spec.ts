import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ApprovedAccessDomainEntity } from 'src/engine/core-modules/approved-access-domain/approved-access-domain.entity';
import { DomainServerConfigService } from 'src/engine/core-modules/domain/domain-server-config/services/domain-server-config.service';
import { AegisConfigService } from 'src/engine/core-modules/aegis-config/aegis-config.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

describe('SubdomainManagerService', () => {
  let domainServerConfigService: DomainServerConfigService;
  let aegisConfigService: AegisConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainServerConfigService,
        {
          provide: getRepositoryToken(WorkspaceEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ApprovedAccessDomainEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: AegisConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    domainServerConfigService = module.get<DomainServerConfigService>(
      DomainServerConfigService,
    );
    aegisConfigService = module.get<AegisConfigService>(AegisConfigService);
  });

  describe('buildBaseUrl', () => {
    it('should build the base URL from environment variables', () => {
      jest
        .spyOn(aegisConfigService, 'get')
        .mockImplementation((key: string) => {
          const env = {
            FRONTEND_URL: 'https://example.com',
          };

          // @ts-expect-error legacy noImplicitAny
          return env[key];
        });

      const result = domainServerConfigService.getBaseUrl();

      expect(result.toString()).toBe('https://example.com/');
    });

    it('should append default subdomain if multiworkspace is enabled', () => {
      jest
        .spyOn(aegisConfigService, 'get')
        .mockImplementation((key: string) => {
          const env = {
            FRONTEND_URL: 'https://example.com',
            IS_MULTIWORKSPACE_ENABLED: true,
            DEFAULT_SUBDOMAIN: 'test',
          };

          // @ts-expect-error legacy noImplicitAny
          return env[key];
        });

      const result = domainServerConfigService.getBaseUrl();

      expect(result.toString()).toBe('https://test.example.com/');
    });
  });
});
