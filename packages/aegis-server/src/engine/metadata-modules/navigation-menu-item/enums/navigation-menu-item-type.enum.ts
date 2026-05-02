import { registerEnumType } from '@nestjs/graphql';

import { NavigationMenuItemType } from 'aegis-shared/types';

registerEnumType(NavigationMenuItemType, {
  name: 'NavigationMenuItemType',
});

export { NavigationMenuItemType };
