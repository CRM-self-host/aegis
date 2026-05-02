import { getNodeTypename } from 'aegis-shared/utils';

export const getRefName = (objectNameSingular: string, id: string) => {
  const nodeTypeName = getNodeTypename(objectNameSingular);

  return `${nodeTypeName}:${id}`;
};
