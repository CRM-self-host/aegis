import { NavigationMenuItemType } from 'aegis-shared/types';

export const hasNavigationMenuItemOwnColor = (item: { type?: string | null }) =>
  item.type === NavigationMenuItemType.FOLDER;
