import type {
  FieldPermissionManifest,
  ObjectPermissionManifest,
  RoleManifest,
} from 'aegis-shared/application';
import { type PermissionFlagType } from 'aegis-shared/constants';

export type RoleConfig = Omit<
  RoleManifest,
  'objectPermissions' | 'fieldPermissions' | 'permissionFlags'
> & {
  objectPermissions?: Omit<ObjectPermissionManifest, 'universalIdentifier'>[];
  fieldPermissions?: Omit<FieldPermissionManifest, 'universalIdentifier'>[];
  permissionFlags?: PermissionFlagType[];
};
