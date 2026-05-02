import { capitalize } from 'aegis-shared/utils';

export const buildTimelineActivityRelatedMorphFieldMetadataName = (
  name: string,
) => {
  return `target${capitalize(name)}`;
};
