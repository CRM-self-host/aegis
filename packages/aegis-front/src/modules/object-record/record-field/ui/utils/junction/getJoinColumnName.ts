import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isDefined } from 'aegis-shared/utils';

export const getJoinColumnName = (
  settings: FieldMetadataItem['settings'],
): string | undefined => {
  if (
    isDefined(settings) &&
    typeof settings === 'object' &&
    'joinColumnName' in settings &&
    typeof settings.joinColumnName === 'string'
  ) {
    return settings.joinColumnName;
  }
  return undefined;
};
