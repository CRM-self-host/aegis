import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/aegis-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/aegis-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildCalendarEventParticipantStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  aegisStandardApplicationId,
}: Omit<
  CreateStandardIndexArgs<'calendarEventParticipant'>,
  'context'
>): Record<
  AllStandardObjectIndexName<'calendarEventParticipant'>,
  FlatIndexMetadata
> => ({
  calendarEventIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'calendarEventIdIndex',
      relatedFieldNames: ['calendarEvent'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  personIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'personIdIndex',
      relatedFieldNames: ['person'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  workspaceMemberIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'workspaceMemberIdIndex',
      relatedFieldNames: ['workspaceMember'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
});
