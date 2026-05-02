import { type Nullable } from 'aegis-shared/types';

export type RecordAggregateValueByRecordGroupValue = {
  recordGroupValue: string;
  recordAggregateValue: Nullable<string | number>;
};
