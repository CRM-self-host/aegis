import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { IndexType } from 'src/engine/metadata-modules/index-metadata/types/indexType.types';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/aegis-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/aegis-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildCompanyStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  aegisStandardApplicationId,
}: Omit<CreateStandardIndexArgs<'company'>, 'context'>): Record<
  AllStandardObjectIndexName<'company'>,
  FlatIndexMetadata
> => ({
  accountOwnerIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'accountOwnerIdIndex',
      relatedFieldNames: ['accountOwner'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  domainNameUniqueIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'domainNameUniqueIndex',
      relatedFieldNames: ['domainName'],
      isUnique: true,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  searchVectorGinIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'searchVectorGinIndex',
      relatedFieldNames: ['searchVector'],
      indexType: IndexType.GIN,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
});
