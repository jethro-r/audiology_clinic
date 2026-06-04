// Database-driven data fetching functions

import { unstable_cache } from 'next/cache';
import { cache as reactCache } from 'react';
import { prisma } from '@/lib/db';

// Direct Prisma queries for server components
export async function getServicesDirect(options?: { homepage?: boolean; footer?: boolean }): Promise<Service[]> {
  const where: Record<string, boolean> = {};
  if (options?.homepage) where.showOnHomepage = true;
  if (options?.footer) where.showInFooter = true;
  const results = await prisma.service.findMany({ where, orderBy: { sortOrder: 'asc' } });
  return results.map((r) => ({
    ...r,
    featureTooltips: r.featureTooltips as Record<string, string> | null,
  }));
}

export async function getTeamMembersDirect(): Promise<TeamMember[]> {
  return prisma.teamMember.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
}

export async function getArticlesDirect(): Promise<Article[]> {
  return prisma.article.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } }) as Promise<Article[]>;
}

export async function getArticleBySlugDirect(slug: string): Promise<Article | null> {
  return prisma.article.findUnique({ where: { slug, published: true } }) as Promise<Article | null>;
}

export async function getFaqsDirect(): Promise<FAQ[]> {
  return prisma.faq.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
}

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
  categories: string[];
  author?: string | null;
  imageUrl?: string | null;
  published: boolean;
  publishedAt?: Date | null;
  sortOrder: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Service names for contact form dropdown
export const serviceNames = [
  'Comprehensive Hearing Assessment',
  'Hearing Aid Solutions & Packages',
  'Ongoing Hearing Care',
  'Ear Wax Removal',
  'Other',
];

// Cached footer services — used in root layout, cached for 1 hour
const cachedFooterServices = unstable_cache(
  async () => getServicesDirect({ footer: true }),
  ['footer-services'],
  { revalidate: 3600, tags: ['services'] }
);

export const getFooterServices = reactCache(cachedFooterServices);
