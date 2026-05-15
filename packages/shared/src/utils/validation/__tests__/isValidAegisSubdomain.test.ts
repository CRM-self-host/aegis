import { isValidAegisSubdomain } from '@/utils/validation/isValidAegisSubdomain';

describe('isValidAegisSubdomain', () => {
  describe('valid subdomains', () => {
    it('should accept standard alphanumeric subdomains', () => {
      expect(isValidAegisSubdomain('abc')).toBe(true);
      expect(isValidAegisSubdomain('test123')).toBe(true);
      expect(isValidAegisSubdomain('company1')).toBe(true);
      expect(isValidAegisSubdomain('workspace2024')).toBe(true);
    });

    it('should accept subdomains with hyphens in the middle', () => {
      expect(isValidAegisSubdomain('my-company')).toBe(true);
      expect(isValidAegisSubdomain('test-workspace')).toBe(true);
      expect(isValidAegisSubdomain('multi-word-subdomain')).toBe(true);
      expect(isValidAegisSubdomain('a-b-c-d-e')).toBe(true);
    });

    it('should accept minimum length subdomains (3 characters)', () => {
      expect(isValidAegisSubdomain('abc')).toBe(true);
      expect(isValidAegisSubdomain('a1b')).toBe(true);
      expect(isValidAegisSubdomain('a-b')).toBe(true);
    });

    it('should accept maximum length subdomains (30 characters)', () => {
      const exactly30 = 'a' + 'b'.repeat(28) + 'c';

      expect(exactly30.length).toBe(30);
      expect(isValidAegisSubdomain(exactly30)).toBe(true);
    });

    it('should accept numeric-only subdomains', () => {
      expect(isValidAegisSubdomain('123')).toBe(true);
      expect(isValidAegisSubdomain('456789')).toBe(true);
      expect(isValidAegisSubdomain('1-2-3')).toBe(true);
    });
  });

  describe('invalid subdomains', () => {
    it('should reject empty strings', () => {
      expect(isValidAegisSubdomain('')).toBe(false);
    });

    it('should reject subdomains shorter than 3 characters', () => {
      expect(isValidAegisSubdomain('a')).toBe(false);
      expect(isValidAegisSubdomain('ab')).toBe(false);
    });

    it('should reject subdomains longer than 30 characters', () => {
      const tooLong = 'a'.repeat(31);

      expect(isValidAegisSubdomain(tooLong)).toBe(false);
    });

    it('should reject subdomains starting with a hyphen', () => {
      expect(isValidAegisSubdomain('-test')).toBe(false);
      expect(isValidAegisSubdomain('-abc')).toBe(false);
    });

    it('should reject subdomains ending with a hyphen', () => {
      expect(isValidAegisSubdomain('test-')).toBe(false);
      expect(isValidAegisSubdomain('abc-')).toBe(false);
    });

    it('should reject subdomains with uppercase letters', () => {
      expect(isValidAegisSubdomain('Test')).toBe(false);
      expect(isValidAegisSubdomain('MyCompany')).toBe(false);
      expect(isValidAegisSubdomain('WORKSPACE')).toBe(false);
    });

    it('should reject subdomains with special characters', () => {
      expect(isValidAegisSubdomain('test@company')).toBe(false);
      expect(isValidAegisSubdomain('my_workspace')).toBe(false);
      expect(isValidAegisSubdomain('test.company')).toBe(false);
      expect(isValidAegisSubdomain('workspace#1')).toBe(false);
    });

    it('should reject subdomains with spaces', () => {
      expect(isValidAegisSubdomain('test company')).toBe(false);
      expect(isValidAegisSubdomain(' test')).toBe(false);
      expect(isValidAegisSubdomain('test ')).toBe(false);
    });

    it('should reject subdomains starting with "api-"', () => {
      expect(isValidAegisSubdomain('api-test')).toBe(false);
      expect(isValidAegisSubdomain('api-company')).toBe(false);
      expect(isValidAegisSubdomain('api-123')).toBe(false);
    });

    it('should accept subdomains containing "api" not as prefix', () => {
      expect(isValidAegisSubdomain('myapi')).toBe(true);
      expect(isValidAegisSubdomain('rapid')).toBe(true);
    });

    it('should reject subdomains with only hyphens', () => {
      expect(isValidAegisSubdomain('---')).toBe(false);
      expect(isValidAegisSubdomain('----')).toBe(false);
    });

    it('should reject whitespace-only strings', () => {
      expect(isValidAegisSubdomain('   ')).toBe(false);
      expect(isValidAegisSubdomain('\t')).toBe(false);
      expect(isValidAegisSubdomain('\n')).toBe(false);
    });

    it('should reject unicode characters', () => {
      expect(isValidAegisSubdomain('café')).toBe(false);
      expect(isValidAegisSubdomain('tëst')).toBe(false);
    });
  });
});
