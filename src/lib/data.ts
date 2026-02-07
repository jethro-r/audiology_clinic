// Database-driven data fetching functions
// Replaces the static data with API calls

import { unstable_cache } from 'next/cache';

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image?: string | null;
  features: string[];
  sortOrder: number;
  showOnHomepage: boolean;
  showInFooter: boolean;
  buttonText?: string | null;
  idealFor?: string | null;
  note?: string | null;
  featureTooltips?: Record<string, string> | null;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  credentials?: string | null;
  imageUrl?: string | null;
  bio: string;
  specialisations: string[];
  email?: string | null;
  phone?: string | null;
  sortOrder: number;
  active: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  author?: string | null;
  imageUrl?: string | null;
  published: boolean;
  publishedAt?: Date | null;
  sortOrder: number;
}

// Fetch services with caching
export const getServices = unstable_cache(
  async (options: { homepage?: boolean; footer?: boolean } = {}): Promise<Service[]> => {
    try {
      const params = new URLSearchParams();
      if (options.homepage) params.set('homepage', 'true');
      if (options.footer) params.set('footer', 'true');

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const url = `${baseUrl}/api/services?${params.toString()}`;
      
      const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
      if (!res.ok) throw new Error('Failed to fetch services');
      
      return res.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },
  ['services'],
  { revalidate: 3600, tags: ['services'] }
);

// Fetch single service by slug
export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/services/${slug}`, {
        next: { revalidate: 3600 },
      });
      
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  },
  ['service'],
  { revalidate: 3600, tags: ['services'] }
);

// Fetch team members with caching
export const getTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/team`, {
        next: { revalidate: 3600 },
      });
      
      if (!res.ok) throw new Error('Failed to fetch team members');
      return res.json();
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },
  ['team-members'],
  { revalidate: 3600, tags: ['team'] }
);

// Fetch articles with caching
export const getArticles = unstable_cache(
  async (): Promise<Article[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/articles`, {
        next: { revalidate: 3600 },
      });
      
      if (!res.ok) throw new Error('Failed to fetch articles');
      return res.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },
  ['articles'],
  { revalidate: 3600, tags: ['articles'] }
);

// Service names for contact form dropdown
export const serviceNames = [
  'Comprehensive Hearing Assessment',
  'Hearing Aid Solutions & Packages',
  'Ongoing Hearing Care',
  'Ear Wax Removal',
  'Other',
];
