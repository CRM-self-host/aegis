import { type CompositeProperty, FieldMetadataType } from 'aegis-shared/types';

export const isCompositePropertySupportedInGroupBy = (
  property: CompositeProperty,
): boolean => {
  return (
    property.hidden !== true && property.type !== FieldMetadataType.RAW_JSON
  );
};
