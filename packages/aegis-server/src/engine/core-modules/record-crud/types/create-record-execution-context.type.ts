import { type ActorMetadata } from 'aegis-shared/types';

import { type RecordCrudExecutionContext } from './record-crud-execution-context.type';

export type CreateRecordExecutionContext = RecordCrudExecutionContext & {
  createdBy?: ActorMetadata;
};
