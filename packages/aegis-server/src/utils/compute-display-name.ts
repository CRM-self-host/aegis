import { isDefined } from 'aegis-shared/utils';
import { type FullNameMetadata } from 'aegis-shared/types';

export const computeDisplayName = (
  name: FullNameMetadata | null | undefined,
) => {
  if (!name) {
    return '';
  }

  return Object.values(name).filter(isDefined).join(' ');
};
