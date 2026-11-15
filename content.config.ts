import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { companySchema } from './schemas/company'
import { homeSchema } from './schemas/home'
import { productSchema } from './schemas/product'
import { productTranslationRecordSchema } from './schemas/product-translation'
import { realizationSchema } from './schemas/realization'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    catalogue: defineCollection({
      type: 'data',
      source: 'catalogue.yml',
      schema: z.object({
        categories: z.array(z.object({
          number: z.string(),
          label: z.string(),
          slug: z.string(),
          note: z.string().optional(),
          render: z.object({
            src: z.string(),
            alt: z.string(),
          }).nullable().optional(),
          entries: z.array(z.object({
            id: z.string(),
            label: z.string(),
            targetSlug: z.string().optional(),
            kind: z.enum(['model', 'series', 'description']).optional(),
          })).default([]),
          groups: z.array(z.object({
            number: z.string().optional(),
            label: z.string(),
            slug: z.string(),
            note: z.string().optional(),
            render: z.object({
              src: z.string(),
              alt: z.string(),
            }).nullable().optional(),
            entries: z.array(z.object({
              id: z.string(),
              label: z.string(),
              targetSlug: z.string().optional(),
              kind: z.enum(['model', 'series', 'description']).optional(),
            })).default([]),
          })).default([]),
        })),
      }),
    }),
    products: defineCollection({
      type: 'data',
      source: 'products/*.{yml,json}',
      schema: productSchema,
      indexes: [
        { columns: ['order'] },
        { columns: ['isFeatured', 'order'] },
      ],
    }),
    productTranslations: defineCollection({
      type: 'data',
      source: 'product-translations/**/*.json',
      schema: productTranslationRecordSchema,
      indexes: [
        { columns: ['entryId', 'locale'] },
        { columns: ['locale', 'status'] },
      ],
    }),
    team: defineCollection({
      type: 'data',
      source: 'team/*.yml',
      schema: z.object({
        name: z.string(),
        role: z.string(),
        photo: z.string().optional().default(''),
        bio: z.string(),
        email: z.string().email().optional(),
        department: z.string().default('dział operacji'),
        order: z.number().default(100),
      }),
      indexes: [
        { columns: ['order'] },
      ],
    }),
    realizations: defineCollection({
      type: 'data',
      source: 'realizations/*.yml',
      schema: realizationSchema,
      indexes: [
        { columns: ['order'] },
      ],
    }),
    home: defineCollection({
      type: 'data',
      source: 'home.yml',
      schema: homeSchema,
    }),
    company: defineCollection({
      type: 'data',
      source: 'company.yml',
      schema: companySchema,
    }),
  },
})
