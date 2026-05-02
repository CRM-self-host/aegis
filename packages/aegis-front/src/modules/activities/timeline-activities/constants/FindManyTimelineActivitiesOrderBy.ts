import { type RecordGqlOperationOrderBy } from 'aegis-shared/types';

export const FIND_MANY_TIMELINE_ACTIVITIES_ORDER_BY: RecordGqlOperationOrderBy =
  [
    {
      createdAt: 'DescNullsFirst',
    },
  ];
