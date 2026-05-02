import { type ObjectRecord } from 'aegis-shared/types';

export type PartialObjectRecordWithId = Partial<ObjectRecord> & { id: string };
