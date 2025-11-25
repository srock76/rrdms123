import { AppState, SiteConfig } from './types';

export const DEFAULT_CONFIG: SiteConfig = {
  name: 'RRDMS Agency',
  description: 'Data-driven digital marketing solutions for modern businesses.',
  email: 'hello@rrdms.agency',
  phone: '+1 (555) 123-4567',
  address: '101 Market St, Suite 400, San Francisco, CA',
  primaryColor: '#2563eb', // Blue-600
  secondaryColor: '#0f172a', // Slate-900
  font: 'sans',
  socials: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
    instagram: '#',
  },
};

export const INITIAL_STATE: AppState = {
  config: DEFAULT_CONFIG,
  leads: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@techstart.com',
      phone: '555-0101',
      company: 'TechStart Inc',
      serviceInterest: 'SEO',
      message: 'Need help improving our organic ranking.',
      date: '2023-10-25',
      status: 'new',
    },
  ],
  services: [
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      shortDescription: 'Dominate search results and drive organic traffic.',
      fullDescription: 'Our data-driven SEO strategies help you climb the rankings.',
      iconName: 'Search',
      features: ['Technical Audit', 'Keyword Research', 'On-Page Optimization', 'Backlink Building'],
    },
    {
      id: 'ppc',
      title: 'Pay-Per-Click Ads',
      shortDescription: 'Instant traffic and high-conversion campaigns.',
      fullDescription: 'Maximize ROI with targeted Google and Social ads.',
      iconName: 'MousePointerClick',
      features: ['Campaign Strategy', 'A/B Testing', 'Conversion Tracking', 'Retargeting'],
    },
    {
      id: 'social',
      title: 'Social Media Marketing',
      shortDescription: 'Build a community and engage your audience.',
      fullDescription: 'Creative content strategies for LinkedIn, Instagram, and more.',
      iconName: 'Share2',
      features: ['Content Creation', 'Community Management', 'Influencer Outreach', 'Analytics'],
    },
    {
      id: 'web',
      title: 'Web Design & Dev',
      shortDescription: 'High-performance websites that convert.',
      fullDescription: 'Modern, responsive, and accessible web experiences.',
      iconName: 'Monitor',
      features: ['UI/UX Design', 'Full-Stack Development', 'Speed Optimization', 'CMS Integration'],
    },
  ],
  posts: [
    {
      id: '1',
      title: '5 SEO Trends to Watch in 2024',
      slug: 'seo-trends-2024',
      excerpt: 'Stay ahead of the curve with these emerging search engine optimization strategies.',
      content: 'Search engines are evolving faster than ever. From AI-generated answers to voice search dominance...',
      author: 'Sarah Jenkins',
      date: '2023-11-15',
      category: 'SEO',
      imageUrl: 'https://picsum.photos/800/400?random=1',
      status: 'published',
    },
    {
      id: '2',
      title: 'The ROI of Social Media for B2B',
      slug: 'social-media-b2b-roi',
      excerpt: 'Why LinkedIn is the new cold call for modern sales teams.',
      content: 'Gone are the days when social media was just for B2C brands...',
      author: 'Mike Ross',
      date: '2023-11-10',
      category: 'Social Media',
      imageUrl: 'https://picsum.photos/800/400?random=2',
      status: 'published',
    },
  ],
  caseStudies: [
    {
      id: 'cs1',
      client: 'EcoWare',
      industry: 'E-commerce',
      challenge: 'Low organic traffic and high cart abandonment.',
      solution: 'Implemented comprehensive SEO audit and email retargeting.',
      results: [
        { label: 'Traffic Increase', value: '+150%' },
        { label: 'Revenue Growth', value: '+45%' },
      ],
      imageUrl: 'https://picsum.photos/600/400?random=10',
    },
    {
      id: 'cs2',
      client: 'MediCare Plus',
      industry: 'Healthcare',
      challenge: 'Need for qualified patient leads in local area.',
      solution: 'Localized PPC campaigns and GMB optimization.',
      results: [
        { label: 'Cost Per Lead', value: '-30%' },
        { label: 'Appointments', value: '+200%' },
      ],
      imageUrl: 'https://picsum.photos/600/400?random=11',
    },
  ],
};
