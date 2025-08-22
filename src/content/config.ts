import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string().max(60),
    description: z.string().min(120).max(160),
    publishDate: z.coerce.date(),
    author: z.string(),
    category: z.enum([
      'getting-started',
      'success-stories',
      'maximizing-earnings',
      'smart-renting',
      'industry-insights',
      'platform-features',
      'seasonal-guides',
      'sustainability-impact'
    ]),
    
    // SEO fields
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
    
    // Content fields
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    
    // User targeting
    userType: z.enum(['for-renters', 'for-owners', 'for-everyone']).default('for-everyone').optional(),
    stage: z.enum(['pre-launch', 'new-user', 'active-user', 'power-user']).default('pre-launch').optional(),
    
    // Updates
    updateDate: z.coerce.date().optional(),
    
    // E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust)
    reviewedBy: z.string().optional(),
    expertise: z.array(z.string()).optional(),
  }),
});

const authorsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    social: z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      instagram: z.string().optional(),
    }).optional(),
    expertise: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
  'authors': authorsCollection,
};