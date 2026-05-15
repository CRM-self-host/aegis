import { RESERVED_SUBDOMAINS } from 'shared/branding-constants';
import { isValidAegisSubdomain } from 'shared/utils';

export const isSubdomainValid = (subdomain: string) => {
  return (
    isValidAegisSubdomain(subdomain) &&
    !RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
  );
};
