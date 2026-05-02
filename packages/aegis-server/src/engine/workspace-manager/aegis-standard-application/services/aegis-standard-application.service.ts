import { Injectable } from '@nestjs/common';

import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { MetadataFlatEntity } from 'src/engine/metadata-modules/flat-entity/types/metadata-flat-entity.type';
import { getMetadataFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util';
import { getSubFlatEntityMapsByApplicationIdsOrThrow } from 'src/engine/metadata-modules/flat-entity/utils/get-sub-flat-entity-maps-by-application-ids-or-throw.util';
import { GlobalWorkspaceOrmManager } from 'src/engine/aegis-orm/global-workspace-datasource/global-workspace-orm.manager';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { AEGIS_STANDARD_ALL_METADATA_NAME } from 'src/engine/workspace-manager/aegis-standard-application/constants/aegis-standard-all-metadata-name.constant';
import { computeAegisStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/aegis-standard-application/utils/aegis-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationBuilderException } from 'src/engine/workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';
import { FromToAllUniversalFlatEntityMaps } from 'src/engine/workspace-manager/workspace-migration/types/workspace-migration-orchestrator.type';

// TODO completely deprecate this file once we've created the aegis-standard aegis-app manifest
@Injectable()
export class AegisStandardApplicationService {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly workspaceMigrationValidateBuildAndRunService: WorkspaceMigrationValidateBuildAndRunService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly globalWorkspaceOrmManager: GlobalWorkspaceOrmManager,
  ) {}

  async synchronizeAegisStandardApplicationOrThrow({
    workspaceId,
  }: {
    workspaceId: string;
  }) {
    const { aegisStandardFlatApplication } =
      await this.applicationService.findWorkspaceAegisStandardAndCustomApplicationOrThrow(
        {
          workspaceId,
        },
      );
    const { featureFlagsMap, ...fromAegisStandardAllFlatEntityMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        ...AEGIS_STANDARD_ALL_METADATA_NAME.map(getMetadataFlatEntityMapsKey),
        'featureFlagsMap',
      ]);

    const {
      allFlatEntityMaps: toAegisStandardAllFlatEntityMaps,
      idByUniversalIdentifierByMetadataName,
    } = computeAegisStandardApplicationAllFlatEntityMaps({
      now: new Date().toISOString(),
      workspaceId,
      aegisStandardApplicationId: aegisStandardFlatApplication.id,
    });

    const fromToAllFlatEntityMaps: FromToAllUniversalFlatEntityMaps = {};

    for (const metadataName of AEGIS_STANDARD_ALL_METADATA_NAME) {
      const flatEntityMapsKey = getMetadataFlatEntityMapsKey(metadataName);
      const fromFlatEntityMaps =
        fromAegisStandardAllFlatEntityMaps[flatEntityMapsKey];
      const fromTo = {
        from: getSubFlatEntityMapsByApplicationIdsOrThrow<
          MetadataFlatEntity<typeof metadataName>
        >({
          applicationIds: [aegisStandardFlatApplication.id],
          flatEntityMaps: fromFlatEntityMaps,
        }),
        to: toAegisStandardAllFlatEntityMaps[flatEntityMapsKey],
      };

      // @ts-expect-error Metadata flat entity maps cache key and metadataName colliding
      fromToAllFlatEntityMaps[flatEntityMapsKey] = fromTo;
    }

    const validateAndBuildResult =
      await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigrationFromTo(
        {
          buildOptions: {
            isSystemBuild: true,
            inferDeletionFromMissingEntities: true,
            applicationUniversalIdentifier:
              aegisStandardFlatApplication.universalIdentifier,
          },
          fromToAllFlatEntityMaps,
          workspaceId,
          additionalCacheDataMaps: {
            featureFlagsMap,
          },
          idByUniversalIdentifierByMetadataName,
        },
      );

    if (validateAndBuildResult.status === 'fail') {
      throw new WorkspaceMigrationBuilderException(
        validateAndBuildResult,
        'Multiple validation errors occurred while synchronizing aegis-standard application',
      );
    }
  }
}
