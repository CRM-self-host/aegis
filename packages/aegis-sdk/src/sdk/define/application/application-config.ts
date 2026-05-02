import { type ApplicationManifest } from 'aegis-shared/application';

export type ApplicationConfig = Omit<
  ApplicationManifest,
  | 'packageJsonChecksum'
  | 'yarnLockChecksum'
  | 'postInstallLogicFunction'
  | 'preInstallLogicFunction'
>;
