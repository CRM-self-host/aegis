import { RATING_VALUES } from 'aegis-shared/branding-constants';
import { type FieldRatingValue } from 'aegis-shared/types';

export const isFieldRatingValue = (
  fieldValue: unknown,
): fieldValue is FieldRatingValue =>
  RATING_VALUES.includes(fieldValue as NonNullable<FieldRatingValue>);
