import { type ObjectsPermissions } from 'shared/types';
import { type PermissionFlagType } from 'shared/branding-constants';

export type UserWorkspacePermissions = {
  permissionFlags: Record<PermissionFlagType, boolean>;
  objectsPermissions: ObjectsPermissions;
};
