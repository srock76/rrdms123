export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  primaryColor: string; // Hex code
  secondaryColor: string; // Hex code
  font: 'sans' | 'serif' | 'mono';
  socials: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Mapping to Lucide icon
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  status: 'published' | 'draft';
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  imageUrl: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  serviceInterest: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface AppState {
  config: SiteConfig;
  services: Service[];
  posts: BlogPost[];
  caseStudies: CaseStudy[];
  leads: Lead[];
}

export type Action =
  | { type: 'UPDATE_CONFIG'; payload: Partial<SiteConfig> }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_LEAD_STATUS'; payload: { id: string; status: Lead['status'] } }
  | { type: 'ADD_POST'; payload: BlogPost }
  | { type: 'UPDATE_POST'; payload: BlogPost }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'UPDATE_SERVICE'; payload: Service };
