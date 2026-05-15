export const Pages = {
  CaseStudies: 'caseStudies',
  ReleaseNotes: 'releaseNotes',
  Home: 'home',
  Partners: 'partners',
  Pricing: 'pricing',
  Product: 'product',
  WhyAegis: 'whyAegis',
} as const;

export type Page = (typeof Pages)[keyof typeof Pages];
