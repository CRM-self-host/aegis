import { type ObjectsPermissions } from 'aegis-shared/types';
import { type PermissionFlagType } from 'aegis-shared/constants';

export type UserWorkspacePermissions = {
  permissionFlags: Record<PermissionFlagType, boolean>;
  objectsPermissions: ObjectsPermissions;
};
