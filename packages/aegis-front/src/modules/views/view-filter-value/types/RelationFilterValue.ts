import { type jsonRelationFilterValueSchema } from 'aegis-shared/utils';
import { type z } from 'zod';

export type RelationFilterValue = z.infer<typeof jsonRelationFilterValueSchema>;
