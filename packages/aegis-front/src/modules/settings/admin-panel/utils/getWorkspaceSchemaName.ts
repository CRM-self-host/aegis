import { uuidToBase36 } from 'aegis-shared/utils';

export const getWorkspaceSchemaName = (workspaceId: string): string => {
  return `workspace_${uuidToBase36(workspaceId)}`;
};
