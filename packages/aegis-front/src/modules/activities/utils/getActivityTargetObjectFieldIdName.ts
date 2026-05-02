import { capitalize } from 'aegis-shared/utils';

export const getActivityTargetObjectFieldIdName = ({
  nameSingular,
}: {
  nameSingular: string;
}) => {
  return `target${capitalize(nameSingular)}Id`;
};
