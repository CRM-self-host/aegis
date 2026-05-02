import { type AllMetadataName } from 'aegis-shared/metadata';

export type InferDeletionFromMissingEntities =
  | true
  | Partial<Record<AllMetadataName, boolean>>
  | undefined;
