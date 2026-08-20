import { z } from "zod/v4";

import { productSchema } from "#termospec/product-schema";

const translatedMediaSchema = z.object({
  alt: z.string().default(""),
});

export const productTranslatedContentSchema = z.object({
  title: z.string().trim().min(1, "Podaj angielską nazwę produktu"),
  category: z.string().default(""),
  lead: z.string().default(""),
  shortDescription: z.string().default(""),
  seo: z.object({
    title: z.string().default(""),
    description: z.string().default(""),
  }),
  specs: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).default([]),
  technicalData: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).default([]),
  technicalNotes: z.array(z.string()).default([]),
  applications: z.array(z.string()).default([]),
  components: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  relatedProducts: z.array(z.string()).default([]),
  serviceScope: z.array(z.string()).default([]),
  sections: z.array(z.object({
    title: z.string(),
    body: z.string(),
    items: z.array(z.string()).default([]),
  })).default([]),
  imageAlt: z.string().default(""),
  headerSketch: translatedMediaSchema.nullable().default(null),
  gallery: z.array(translatedMediaSchema).default([]),
  documents: z.array(z.object({
    title: z.string(),
  })).default([]),
  relatedProjects: z.array(z.object({
    category: z.string(),
    title: z.string(),
    body: z.string(),
    imageAlt: z.string(),
    scope: z.array(z.string()).default([]),
  })).default([]),
});

export const productTranslationRecordSchema = z.object({
  schemaVersion: z.literal(1),
  entryId: z.string().trim().min(1),
  sourceLocale: z.literal("pl"),
  locale: z.literal("en"),
  sourceRevision: z.string().trim().min(1),
  status: z.enum(["draft", "published"]).default("draft"),
  content: productTranslatedContentSchema,
});

export const productTranslationPackageSchema = z.object({
  schemaVersion: z.literal(1),
  entryId: z.string().trim().min(1),
  sourceLocale: z.literal("pl"),
  targetLocale: z.literal("en"),
  sourceRevision: z.string().trim().min(1),
  product: productSchema,
}).strict();

export type ProductTranslatedContent = z.output<typeof productTranslatedContentSchema>;
export type ProductTranslationRecord = z.output<typeof productTranslationRecordSchema>;
export type ProductTranslationPackage = z.output<typeof productTranslationPackageSchema>;
