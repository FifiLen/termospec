export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductTechnicalDataRow {
  label: string;
  value: string;
  unit: string;
}

export interface ProductSection {
  title: string;
  body: string;
  items: string[];
}

export interface ProductMedia {
  src: string;
  alt: string;
}

export interface ProductRelatedProject {
  number: string;
  category: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  scope: string[];
}

export interface ProductDocument {
  title: string;
  file: string;
}

export interface ProductFamily {
  title: string;
  slug: string;
  modelCode: string;
  category: string;
  order: number;
  isFeatured: boolean;
  lead: string;
  shortDescription: string;
  powerRange: string;
  applications: string[];
  components: string[];
  features: string[];
  serviceScope: string[];
  specs: ProductSpec[];
  technicalData: ProductTechnicalDataRow[];
  technicalNotes: string[];
  relatedProducts: string[];
  sections: ProductSection[];
  heroImage: string;
  imageAlt: string;
  headerSketch: ProductMedia | null;
  gallery: ProductMedia[];
  documents: ProductDocument[];
  relatedProjects: ProductRelatedProject[];
}

export interface ProductCategoryOption {
  label: string;
  value: string;
  count: number;
}
