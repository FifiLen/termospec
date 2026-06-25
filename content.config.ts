import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    products: defineCollection({
      type: 'data',
      source: 'products/*.yml',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.string(),
        status: z.string().default('draft'),
        order: z.number().default(100),
        isFeatured: z.boolean().default(false),
        lead: z.string(),
        shortDescription: z.string(),
        seo: z.object({
          title: z.string(),
          description: z.string(),
        }),
        powerRange: z.string().optional().default(''),
        applications: z.array(z.string()).default([]),
        components: z.array(z.string()).default([]),
        features: z.array(z.string()).default([]),
        serviceScope: z.array(z.string()).default([]),
        specs: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })).default([]),
        sections: z.array(z.object({
          title: z.string(),
          body: z.string(),
          items: z.array(z.string()).default([]),
        })).default([]),
        heroImage: z.string().optional().default(''),
        imageAlt: z.string().optional().default(''),
        headerSketch: z.object({
          src: z.string(),
          alt: z.string(),
        }).nullable().default(null),
        gallery: z.array(z.object({
          src: z.string(),
          alt: z.string(),
        })).default([]),
        relatedProjects: z.array(z.object({
          number: z.string(),
          category: z.string(),
          title: z.string(),
          body: z.string(),
          image: z.string(),
          imageAlt: z.string(),
          scope: z.array(z.string()).default([]),
        })).default([]),
      }),
      indexes: [
        { columns: ['slug'], unique: true },
        { columns: ['order'] },
        { columns: ['isFeatured', 'order'] },
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
    home: defineCollection({
      type: 'data',
      source: 'home.yml',
      schema: z.object({
        hero: z.object({
          title: z.string(),
          description: z.string(),
          ctaLabel: z.string(),
          ctaHref: z.string(),
          image: z.string().optional().default(''),
        }),
        sections: z.object({
          intro: z.object({
            eyebrow: z.string(),
            title: z.string(),
            description: z.string(),
          }),
          about: z.object({
            title: z.string(),
            description: z.string(),
          }),
          services: z.object({
            title: z.string(),
            items: z.array(z.object({
              title: z.string(),
              description: z.string(),
            })),
          }),
          team: z.object({
            title: z.string(),
            description: z.string(),
          }),
          contact: z.object({
            title: z.string(),
            description: z.string(),
            ctaLabel: z.string(),
            ctaHref: z.string(),
          }),
        }),
      }),
    }),
  },
})
