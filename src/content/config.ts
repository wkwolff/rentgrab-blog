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
      'guides',
      'industry-news',
      'success-stories',
      'tips',
      'updates'
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
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
    expertise: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
  'authors': authorsCollection,
};