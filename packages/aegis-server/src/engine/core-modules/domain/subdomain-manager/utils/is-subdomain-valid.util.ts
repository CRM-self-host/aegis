import { RESERVED_SUBDOMAINS } from 'aegis-shared/branding-constants';
import { isValidAegisSubdomain } from 'aegis-shared/utils';

export const isSubdomainValid = (subdomain: string) => {
  return (
    isValidAegisSubdomain(subdomain) &&
    !RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
  );
};
