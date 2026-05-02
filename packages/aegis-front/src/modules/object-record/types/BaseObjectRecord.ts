import { type ObjectRecord as SharedObjectRecord } from 'aegis-shared/types';

export type BaseObjectRecord = SharedObjectRecord & {
  __typename: string;
};
