import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/aegis-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/aegis-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildTimelineActivityStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  aegisStandardApplicationId,
}: Omit<CreateStandardIndexArgs<'timelineActivity'>, 'context'>): Record<
  AllStandardObjectIndexName<'timelineActivity'>,
  FlatIndexMetadata
> => ({
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
  personIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'personIdIndex',
      relatedFieldNames: ['targetPerson'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  companyIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'companyIdIndex',
      relatedFieldNames: ['targetCompany'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  opportunityIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'opportunityIdIndex',
      relatedFieldNames: ['targetOpportunity'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  noteIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'noteIdIndex',
      relatedFieldNames: ['targetNote'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  taskIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'taskIdIndex',
      relatedFieldNames: ['targetTask'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  workflowIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'workflowIdIndex',
      relatedFieldNames: ['targetWorkflow'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  workflowVersionIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'workflowVersionIdIndex',
      relatedFieldNames: ['targetWorkflowVersion'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  workflowRunIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'workflowRunIdIndex',
      relatedFieldNames: ['targetWorkflowRun'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
  dashboardIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'dashboardIdIndex',
      relatedFieldNames: ['targetDashboard'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    aegisStandardApplicationId,
    now,
  }),
});
