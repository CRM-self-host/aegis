import { type FieldMetadataType } from 'aegis-shared/types';

export type WorkflowFormFieldType =
  | FieldMetadataType.TEXT
  | FieldMetadataType.NUMBER
  | FieldMetadataType.DATE
  | FieldMetadataType.SELECT
  | FieldMetadataType.MULTI_SELECT
  | 'RECORD';
