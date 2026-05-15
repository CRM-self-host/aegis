import { PermissionFlagType } from 'shared/branding-constants';

export type CreatePermissionFlagInput = {
  roleId: string;
  flag: PermissionFlagType;
  universalIdentifier?: string;
};
