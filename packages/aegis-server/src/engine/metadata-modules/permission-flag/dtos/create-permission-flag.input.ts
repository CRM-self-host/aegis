import { PermissionFlagType } from 'aegis-shared/constants';

export type CreatePermissionFlagInput = {
  roleId: string;
  flag: PermissionFlagType;
  universalIdentifier?: string;
};
