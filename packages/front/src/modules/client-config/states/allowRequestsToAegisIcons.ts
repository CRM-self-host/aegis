import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

export const allowRequestsToAegisIconsState = createAtomState<boolean>({
  key: 'allowRequestsToAegisIcons',
  defaultValue: true,
});
