import { CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX } from 'aegis-shared/workflow';

export const removeVariablesFromJson = (json: string): string => {
  return json.replaceAll(CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX, 'null');
};
