import { extractDomainFromLink } from 'src/modules/contact-creation-manager/utils/extract-domain-from-link.util';

describe('extractDomainFromLink', () => {
  it('should extract domain from link', () => {
    const link = 'https://www.aegis.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('aegis.com');
  });

  it('should extract domain from link without www', () => {
    const link = 'https://aegis.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('aegis.com');
  });

  it('should extract domain from link without protocol', () => {
    const link = 'aegis.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('aegis.com');
  });

  it('should extract domain from link with path', () => {
    const link = 'https://aegis.com/about';
    const result = extractDomainFromLink(link);

    expect(result).toBe('aegis.com');
  });
});
