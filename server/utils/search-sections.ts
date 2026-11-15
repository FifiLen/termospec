
// The site search index is generated from the same sources the pages render
// (Studio collections and the remaining `data/*.ts` modules), so published
// Studio edits reach the search without a hand-maintained mirror.

export interface SearchSection {
  id: string;
  title: string;
  titles: string[];
  level: number;
  content: string;
}

interface SearchCompany {
  legalName: string;
  address: { street: string; postalCode: string; city: string; country: string };
  phone: string;
  fax?: string;
  email: string;
  serviceHotline: { label: string; phone: string };
  registry: { krs: string; nip: string; regon: string };
}

interface SearchService {
  slug: string;
  label: string;
  intro: string[];
  sections: Array<{ title?: string; paragraphs: string[]; points: string[] }>;
  machines: Array<{ title: string; description: string; specifications: Array<{ label: string; value: string }> }>;
  closing?: string;
  cta?: string;
}

interface SearchAbout {
  profile: {
    title: string;
    lead: string;
    intro: string;
    servicesIntro: string;
    specialties: string[];
    sections: Array<{ title: string; body: string }>;
  };
  metrics: Array<{ value: string; label: string }>;
  timeline: Array<{ year: string; title: string; body?: string }>;
}

interface SearchRealization {
  title: string;
  industry: string;
  description: string;
}

interface SearchHeroSlide {
  title: string;
  lead: string;
}

interface SearchScopeItem {
  title: string;
  lead: string;
  points: string[];
}

interface SearchCatalogueEntry {
  id: string;
  label: string;
}

interface SearchCatalogueGroup {
  label: string;
  slug: string;
  note?: string;
  entries?: SearchCatalogueEntry[];
}

interface SearchCatalogueCategory {
  label: string;
  slug: string;
  note?: string;
  entries?: SearchCatalogueEntry[];
  groups?: SearchCatalogueGroup[];
}

interface SearchProduct {
  title: string;
  category: string;
  lead: string;
  shortDescription: string;
  applications: string[];
  features: string[];
  cataloguePlacement: { entryId: string };
}

interface SearchFunding {
  title: string;
  projects: Array<{
    name: string;
    eyebrow?: string;
    paragraphs: Array<{ text: string; emphasis: boolean }>;
    sections: Array<{ title?: string; paragraphs: string[]; bullets: string[] }>;
    facts: Array<{ label: string; value: string }>;
  }>;
}

interface SearchRodo {
  title: string;
  intro: string;
  items: string[];
}

export interface SearchSources {
  funding: SearchFunding | null;
  rodo: SearchRodo | null;
  // SEO description of each page (`content/seo.yml`), keyed by route.
  pageDescriptions: Record<string, string>;
  about: SearchAbout | null;
  company: SearchCompany | null;
  services: SearchService[];
  realizations: SearchRealization[];
  heroSlides: SearchHeroSlide[];
  scopeItems: SearchScopeItem[];
  catalogue: SearchCatalogueCategory[];
  products: SearchProduct[];
}

// Match what the pages render: the homepage shows the first three realizations
// and three company figures in the hero, /o-firmie the first five milestones.
const VISIBLE_REALIZATIONS = 3;
const VISIBLE_HERO_FIGURES = 3;
const VISIBLE_MILESTONES = 5;

const text = (...parts: Array<string | undefined | null | false | string[]>) => {
  return parts
    .flat()
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .join(" ");
};

const section = (
  id: string,
  title: string,
  titles: string[],
  content: string,
): SearchSection => ({ id, title, titles, level: titles.length + 1, content });

const homeSections = (sources: SearchSources): SearchSection[] => {
  const home = "Strona główna";
  const realizations = sources.realizations.slice(0, VISIBLE_REALIZATIONS);
  const company = sources.company;
  const scopeItems = sources.scopeItems;

  return [
    section("/", home, [], text(
      "Termospec — systemy chłodzenia i wentylacji dla przemysłu, górnictwa oraz infrastruktury technicznej.",
      sources.heroSlides.map((slide) => text(slide.title, slide.lead)),
      (sources.about?.metrics ?? []).slice(0, VISIBLE_HERO_FIGURES).map((metric) => text(metric.value, metric.label)),
    )),
    section("/#zakres", "Zakres działalności", [home], text(
      "Rozwiązania techniczne dla wymagających instalacji.",
      scopeItems.map((item) => item.title),
    )),
    ...scopeItems.map((item) => section(
      "/#zakres",
      item.title,
      [home, "Zakres działalności"],
      text(item.lead, item.points),
    )),
    ...(realizations.length
      ? [section("/#realizacje", "Realizacje", [home], text(realizations.map((item) => item.title)))]
      : []),
    ...realizations.map((item) => section(
      "/#realizacje",
      item.title,
      [home, "Realizacje"],
      text(item.industry, item.description),
    )),
    ...(company
      ? [section("/#kontakt", "Kontakt", [home], text(
          company.legalName,
          `${company.address.street}, ${company.address.postalCode} ${company.address.city}, ${company.address.country}.`,
          `Telefon: ${company.phone}.`,
          company.fax && `Faks: ${company.fax}.`,
          `E-mail: ${company.email}.`,
          `${company.serviceHotline.label}: ${company.serviceHotline.phone}.`,
          `KRS ${company.registry.krs}, NIP ${company.registry.nip}, REGON ${company.registry.regon}.`,
        ))]
      : []),
  ];
};

const aboutSections = (about: SearchAbout | null): SearchSection[] => {
  const page = "O firmie";

  if (!about) {
    return [section("/o-firmie", page, [], "")];
  }

  const { profile } = about;
  const milestones = about.timeline.slice(0, VISIBLE_MILESTONES);

  return [
    section("/o-firmie", page, [], text(profile.title, profile.lead)),
    section("/o-firmie", "Profil firmy", [page], text(profile.intro, profile.servicesIntro, profile.specialties)),
    ...profile.sections.map((item) => section("/o-firmie", item.title, [page, "Profil firmy"], item.body)),
    ...(milestones.length
      ? [section("/o-firmie#historia", "Historia firmy", [page], text(
          milestones.map((item) => text(item.year, item.title, item.body)),
        ))]
      : []),
  ];
};

const serviceSections = (services: SearchService[], servicesIntro: string): SearchSection[] => {
  const page = "Usługi";

  return [
    section("/uslugi", page, [], text(
      servicesIntro,
      services.map((service) => service.label),
    )),
    ...services.flatMap((service) => {
      const anchor = `/uslugi#${service.slug}`;
      const untitled = service.sections.filter((item) => !item.title);
      const titled = service.sections.flatMap((item) => (item.title ? [{ ...item, title: item.title }] : []));

      return [
        section(anchor, service.label, [page], text(
          service.intro,
          untitled.map((item) => text(item.paragraphs, item.points)),
          service.closing,
          service.cta,
        )),
        ...titled.map((item) => section(anchor, item.title, [page, service.label], text(item.paragraphs, item.points))),
        ...service.machines.map((machine) => section(anchor, machine.title, [page, service.label], text(
          machine.description,
          machine.specifications.map((specification) => `${specification.label} ${specification.value}`),
        ))),
      ];
    }),
  ];
};

const productSections = (catalogue: SearchCatalogueCategory[], products: SearchProduct[]): SearchSection[] => {
  const page = "Produkty";
  const productByEntry = new Map(products.map((product) => [product.cataloguePlacement.entryId, product]));
  const entrySection = (entry: SearchCatalogueEntry, titles: string[]) => {
    const product = productByEntry.get(entry.id);

    return section(`/produkty#${entry.id}`, entry.label, titles, text(
      product?.title,
      product?.category,
      product?.lead,
      product?.shortDescription,
      product?.applications,
      product?.features,
    ));
  };

  return [
    section("/produkty", page, [], text(
      "Katalog produktów Termospec:",
      catalogue.map((category) => category.label),
    )),
    ...catalogue.flatMap((category) => {
      const entries = category.entries ?? [];
      const groups = category.groups ?? [];

      return [
        section(`/produkty#${category.slug}`, category.label, [page], text(
          category.note,
          groups.map((group) => group.label),
          entries.map((entry) => entry.label),
        )),
        ...entries.map((entry) => entrySection(entry, [page, category.label])),
        ...groups.flatMap((group) => [
          section(`/produkty#${group.slug}`, group.label, [page, category.label], text(
            group.note,
            (group.entries ?? []).map((entry) => entry.label),
          )),
          ...(group.entries ?? []).map((entry) => entrySection(entry, [page, category.label, group.label])),
        ]),
      ];
    }),
  ];
};

const fundingSections = (funding: SearchFunding | null): SearchSection[] => {
  const page = "Dofinansowania";

  return [
    section("/dofinansowania", page, [], funding?.title ?? ""),
    ...(funding?.projects ?? []).map((project) => section(
      "/dofinansowania",
      project.name,
      [page],
      text(
        project.eyebrow,
        project.paragraphs.map((paragraph) => paragraph.text),
        project.sections.map((item) => text(item.title, item.paragraphs, item.bullets)),
        project.facts.map((fact) => (fact.value ? `${fact.label}: ${fact.value}` : fact.label)),
      ),
    )),
  ];
};

const rodoSections = (rodo: SearchRodo | null): SearchSection[] => [
  section("/rodo", rodo?.title ?? "RODO", [], text(rodo?.intro, rodo?.items ?? [])),
];

// Page-level entries start with the page's SEO description, which summarises the page.
const withPageDescription = (entry: SearchSection, description: string | undefined): SearchSection => {
  return entry.level === 1 && description
    ? { ...entry, content: text(description, entry.content) }
    : entry;
};

export const buildSearchSections = (sources: SearchSources): SearchSection[] => [
  ...homeSections(sources),
  ...aboutSections(sources.about),
  ...serviceSections(sources.services, sources.about?.profile.servicesIntro ?? ""),
  ...productSections(sources.catalogue, sources.products),
  ...fundingSections(sources.funding),
  ...rodoSections(sources.rodo),
  section("/koncesja", "Koncesja", [], ""),
].map((entry) => withPageDescription(entry, sources.pageDescriptions[entry.id]));
