import { type PageLayoutTabManifest } from 'aegis-shared/application';

export type PageLayoutTabConfig = Omit<
  PageLayoutTabManifest,
  'pageLayoutUniversalIdentifier'
> & {
  pageLayoutUniversalIdentifier: string;
};
