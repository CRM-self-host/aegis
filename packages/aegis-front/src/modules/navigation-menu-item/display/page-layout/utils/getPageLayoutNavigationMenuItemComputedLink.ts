import { AppPath } from 'aegis-shared/types';
import { getAppPath, isDefined } from 'aegis-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const getPageLayoutNavigationMenuItemComputedLink = (
  item: Pick<NavigationMenuItem, 'pageLayoutId'>,
): string => {
  if (!isDefined(item.pageLayoutId)) {
    return '';
  }

  return getAppPath(AppPath.PageLayoutPage, {
    pageLayoutId: item.pageLayoutId,
  });
};
