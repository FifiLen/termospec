# Content Map

This file defines the content structure for the Termospec website. It should be updated whenever new page sections, offer groups, product groups, or copy decisions are added.

## Content Principles

- Preserve source content before rewriting it.
- Separate source/extracted copy from final marketing copy.
- Mark uncertain facts as `TODO: verify`.
- Prefer clear Polish copy.
- Keep technical claims specific, but only when verified.
- Do not invent certifications, parameters, partners, or project names.

## Suggested Navigation

```ts
export const navigation = [
  { label: "Start", href: "/" },
  { label: "O firmie", href: "/o-firmie" },
  {
    label: "Rozwiązania",
    href: "/rozwiazania",
    type: "mega",
    groups: [
      {
        title: "Kopalnie i tunele",
        description: "Rozwiązania dla środowisk o wysokich wymaganiach temperaturowych.",
        links: [
          { label: "Zagrożenia temperaturowe", href: "/rozwiazania/zagrozenia-temperaturowe" },
          { label: "Chłodzenie wyrobisk", href: "/rozwiazania/chlodzenie-wyrobisk" },
          { label: "Tunele i infrastruktura", href: "/rozwiazania/tunele" }
        ]
      },
      {
        title: "Przemysł",
        description: "Chłodzenie, wentylacja, klimatyzacja i instalacje dla przemysłu.",
        links: [
          { label: "Chłodnictwo przemysłowe", href: "/rozwiazania/chlodnictwo-przemyslowe" },
          { label: "Wentylacja i klimatyzacja", href: "/rozwiazania/wentylacja-klimatyzacja" },
          { label: "Instalacje techniczne", href: "/rozwiazania/instalacje-techniczne" }
        ]
      },
      {
        title: "Serwis",
        description: "Utrzymanie, modernizacja i obsługa maszyn oraz instalacji.",
        links: [
          { label: "Serwis maszyn", href: "/rozwiazania/serwis-maszyn" },
          { label: "Modernizacje", href: "/rozwiazania/modernizacje" },
          { label: "Wynajem urządzeń", href: "/rozwiazania/wynajem" }
        ]
      }
    ]
  },
  { label: "Produkty", href: "/produkty" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Kontakt", href: "/#kontakt" }
]
```

## Company Data

Single source of truth example:

```ts
export const company = {
  name: "Termospec Sp. z o.o.",
  fullName: "TERMOSPEC SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
  address: {
    street: "ul. Górnicza 10",
    postalCode: "44-240",
    city: "Żory",
    status: "TODO: verify with client before publication"
  },
  website: "www.termospec.pl",
  email: "TODO: verify",
  phone: "TODO: verify",
  nip: "6422590547",
  regon: "276184836",
  krs: "0000109147"
}
```

## Homepage Content Model

```ts
export const homePage = {
  hero: {
    eyebrow: "Rozwiązania techniczne dla przemysłu",
    title: "Kontrola temperatury w wymagających środowiskach",
    description: "TODO: final copy based on verified offer.",
    primaryCta: { label: "Skontaktuj się", href: "/#kontakt" },
    secondaryCta: { label: "Zobacz rozwiązania", href: "/rozwiazania" }
  },
  problemStatement: {
    title: "Gdy temperatura staje się ryzykiem operacyjnym",
    items: [
      "TODO: mines/tunnels risk copy",
      "TODO: industrial continuity copy",
      "TODO: service/reliability copy"
    ]
  },
  offerPreview: {
    title: "Rozwiązania Termospec",
    groups: "reference offers.ts"
  },
  industries: {
    title: "Obszary zastosowań",
    items: [
      "Kopalnie",
      "Tunele",
      "Przemysł",
      "Infrastruktura",
      "HVAC / pompy ciepła — TODO: confirm current scope"
    ]
  },
  contactCta: {
    title: "Porozmawiajmy o wymaganiach technicznych Twojej instalacji",
    href: "/#kontakt"
  }
}
```

Current homepage composition:

- `HomeHero` — opening image-led hero using `/głowna-01.png`.
- `HomePartners` — partner/cooperation strip based on `homePartners` in `data/home.ts`; currently renders twelve presentation placeholders so the desktop layout forms two complete rows. Replace placeholder names with verified partner names/logos before publication.
- `HomeScope` — offer/scope section based on `homeScopeItems` in `data/home.ts`; its current heading/lead plus three-card grid layout is preserved, while the section background is split visually on desktop with a decorative Unsplash industrial image filling the right half.
- `HomeProcess` — technical process section based on `homeProcessSteps` in `data/home.ts`.
- `HomeRealizations` — image-led realization carousel based on `homeRealizationPhotos` in `data/home.ts`; it shows product/installation realization photos instead of the previous text-heavy realization cards.
- `HomeContactForm` — visual contact form shell based on `homeContactTopics` in `data/home.ts`; backend handling is still not confirmed.

## Current Global Navigation

- `SiteHeader` renders links for `strona główna`, `produkty`, `o firmie`, the linked funding image pointing to `/dofinansowania`, language controls, and the `zapytaj o ofertę` contact CTA.
- Desktop `produkty` is a Nuxt UI `UNavigationMenu` trigger with a custom `ProductMegaMenu` panel.
- `ProductMegaMenu` uses the `products` Nuxt Content collection as its source of truth and displays a fixed 3-column white grid of product-family cards with product names and technical sketches.
- Product mega menu links point to existing catalogue anchors such as `/produkty#produkt-chlodziarki-bezposredniego-dzialania`; individual product detail routes are still not planned.
- On mobile, `produkty` remains a direct `/produkty` link until the mobile off-canvas menu is confirmed.

Current homepage hero offer cards:

- `Klimatyzacja` — `Produkcja urządzeń chłodniczych dla kopalń podziemnych oraz tuneli.` / `Projektowanie, obsługa oraz serwis układów klimatyzacji kopalń.`
- `Wentylacja` — `Produkcja i serwis wentylatorów oraz tam wentylacyjnych dla kopalń.`
- `Energia odnawialna` — `Projektowanie, montaż, serwis oraz obsługa systemów opartych na odnawialnych źródłach energii.`

## Search Quick Links

Global search uses root-level `content/*.md` entries for indexed page content plus `data/search.ts` for visible UI/footer labels that do not yet have standalone pages.

Current root markdown search-index entries:

- `content/index.md` mirrors the currently rendered homepage sections: scope, partners, realizations, homepage contact form, global navigation labels, and interface labels.
- `content/produkty.md` mirrors the visible product catalogue UI plus all current product-family YAML fields that are relevant to search: title, category, lead, short description, specs, applications, components, features, service scope, related realizations, technical sections, and image alt text.
- `content/o-firmie.md` mirrors the company page copy plus current team YAML names and visible roles.
- `content/dofinansowania.md` mirrors the funding projects page and the EU/regional project copy rendered from `data/dofinansowania.ts`.
- `content/rodo.md` mirrors the RODO information clause rendered from `data/rodo.ts`.

Current `/dofinansowania` composition:

- `data/dofinansowania.ts` stores the page title, project records, logo/image paths, project paragraphs, lists, and financial facts.
- `app/pages/dofinansowania.vue` renders a simple document-like public page using the supplied funding logo groups: `/grupa-dofinansowanie-grant-01.png`, `/grupa-dofinansowanie-grand-02.png`, and `/grupa-dofinansowanie-grant-03.jpg`.
- The header funding panel and footer `dotacje` link point to `/dofinansowania`.

Current `/o-firmie` composition:

- `data/about.ts` stores the page hero and fact strip. The facts now include the owner-provided legacy claims about 25 years of experience, 500 MW total cooling capacity, underground mine/tunnel applications, and international mine deliveries.
- `app/pages/o-firmie.vue` renders an editorial industrial company page: image-led hero using `/budynek-termospec.png` in color across the full right column of a two-column opening grid, an overlapping four-cell fact strip placed at the bottom of the hero across both columns, a dark scope section reusing `homeScopeItems`, a process grid reusing `homeProcessSteps`, the simplified `TeamGrid`, a full-width three-image realization gallery, and the shared `HomeContactForm` contact section from the homepage at the bottom. The hero does not show top route padding, CTA buttons, the former eyebrow badge, decorative background grid, or bottom image caption strip, and its main heading uses the same `text-4xl` scale as the current first homepage heading with a small inner top offset in the left column.
- `TeamGrid` now uses a full-width deep navy section with the visible heading `Poznaj nasz zespół`, the same inner gutters, and `max-w-[96rem]` content width as adjacent `/o-firmie` sections. The visible inset photo-card grid shows a team member photo, name, and role directly on the image; department grouping, profile counters, bios, and email links are not shown in the section UI.
- The bottom contact section is the same shared `HomeContactForm` used on `/`, including map/contact details and the visual form shell backed by `homeContactTopics`.
- The realization gallery between team and contact reuses the first three `homeRealizationPhotos` from `data/home.ts`, rendered as a full-width image grid with `gap-px`.
- Legacy `/o-nas` remains as a 301 redirect to `/o-firmie`.
- Nuxt UI components are used for visible UI primitives on the page: `UIcon`.
- The page intentionally avoids the removed oversized split-claim treatment and keeps the calmer grid/image rhythm requested for company/about pages.

Current supplemental search quick links:

- `Kariera` → `/#kontakt`
- `Serwis i wsparcie techniczne` → `/#kontakt`
- `O firmie` → `/o-firmie`
- `Zakres działalności` → `/#zakres`
- `Realizacje` → `/#realizacje`
- `Formularz kontaktowy` → `/#kontakt`
- `Dofinansowania i dotacje` → `/dofinansowania`
- `RODO` → `/rodo`

## Offer Groups

Initial working groups. Validate with client/source content.

```ts
export const offerGroups = [
  {
    slug: "zagrozenia-temperaturowe",
    title: "Zwalczanie zagrożeń temperaturowych",
    audience: ["kopalnie", "tunele", "infrastruktura"],
    status: "TODO: verify exact scope and wording"
  },
  {
    slug: "chlodnictwo-przemyslowe",
    title: "Chłodnictwo przemysłowe",
    audience: ["przemysł"],
    status: "TODO: verify"
  },
  {
    slug: "wentylacja-klimatyzacja",
    title: "Wentylacja i klimatyzacja",
    audience: ["przemysł", "obiekty techniczne"],
    status: "TODO: verify"
  },
  {
    slug: "serwis-maszyn",
    title: "Serwis maszyn i urządzeń",
    audience: ["utrzymanie ruchu", "przemysł"],
    status: "TODO: verify"
  },
  {
    slug: "pompy-ciepla",
    title: "Pompy ciepła",
    audience: ["klienci indywidualni", "obiekty"],
    status: "TODO: confirm if this remains part of the new main site"
  }
]
```

## Page Section Pattern

For each detail page:

```ts
{
  slug: "",
  title: "",
  lead: "",
  seo: {
    title: "",
    description: ""
  },
  sections: [
    {
      type: "problem",
      title: "",
      body: ""
    },
    {
      type: "solution",
      title: "",
      body: ""
    },
    {
      type: "features",
      title: "",
      items: []
    },
    {
      type: "applications",
      title: "",
      items: []
    },
    {
      type: "cta",
      title: "",
      href: "/#kontakt"
    }
  ]
}
```

## Product Family Content Model

Products are managed as product families in `content/products/*.yml`, not as individual SKU/model records. Each family is rendered automatically on `/produkty`; individual product detail routes are not planned in the current project scope.

Required fields for a new product family:

```yml
title: ""
slug: "url-safe-slug-without-polish-characters"
category: ""
status: "draft"
order: 100
isFeatured: false
lead: ""
shortDescription: ""
seo:
  title: ""
  description: ""
powerRange: ""
applications: []
components: []
features: []
serviceScope: []
specs:
  - label: ""
    value: ""
sections:
  - title: ""
    body: ""
    items: []
heroImage: ""
imageAlt: ""
headerSketch:
  src: ""
  alt: ""
gallery:
  - src: ""
    alt: ""
relatedProjects:
  - number: ""
    category: ""
    title: ""
    body: ""
    image: ""
    imageAlt: ""
    scope: []
```

Product entries on `/produkty` are full catalogue sheets, not links to product subpages.

Current `/produkty` page state:

- The visible page starts directly below the fixed header with the catalogue workspace itself: no hero, no compact intro, no stats/counter panel, and no outer max-width route container.
- The desktop layout is a full-viewport-width two-column technical catalogue: a sticky left index with search, category controls, and quick in-page navigation; the right side renders full product-family sheets. During scroll, the left index follows the active product sheet, opens the active category accordion automatically, and marks the current product item.
- On mobile, the index becomes a full-width selector/search section above the product sheets.
- `Urządzenia chłodnicze TS` is treated as old-site introductory context, not as a product category or product name. Until the client confirms the final catalogue hierarchy, each current category has one temporary product-family record with the same visible title as the category.
- Each product-family sheet now follows a simple repeatable CMS-ready structure: a deep navy category register with category and power range, a product header with title, short lead, and optional right-side `headerSketch` rendered with `object-contain` inside the full header frame so differently proportioned sketches are not clipped; two content columns for `Zastosowanie` and `Opis działania` or `Budowa / charakterystyka`; and an unheaded full-width realization photo grid without the previous deep navy KPI strip. The previous two side-by-side product photos are no longer rendered as a separate media band above the description.
- The sheet intentionally no longer renders the large side product code, the three-column applications/features/components grid, the dark technical-support block, the numbered support grid, the internal gallery thumbnails, or long stacked technical sections.
- The route uses native Vue/template markup for the catalogue surface instead of Nuxt UI page/dashboard primitives, so the visual rhythm follows the current homepage: white surfaces, thin lines, burgundy accents, square geometry, and strong industrial imagery.
- The page intentionally avoids product detail routes, product-card links, product-level purchase/contact CTAs, prices, ratings, carts, and promotional ecommerce badges.
- Search is diacritic-insensitive and matches product names, categories, descriptions, parameters, applications, components, features, service scope, technical sections, media alt text, and related realization content.

Current initial product families:

- `chlodziarki-bezposredniego-dzialania` — category/title: `Urządzenia bezpośredniego działania`
- `chlodziarki-posredniego-dzialania` — category/title: `Urządzenia pośredniego działania`
- `chlodziarki-posredniego-dzialania-1-3mw` — category/title: `Urządzenia pośredniego działania 1-3 MW`
- `chlodnice-powietrza-cpn` — category/title: `Chłodnice powietrza CP(N)`
- `chlodnice-wyparne-cww` — category/title: `Chłodnice wyparne CWW`

Product media policy:

- Use supplied local Termospec media first; temporary reference images must stay clearly marked in product YAML until clean final product and realization images are available.
- Use `headerSketch` for the optional technical sketch shown on the right side of a product-family header.
- `/produkty` reuses `heroImage` plus `gallery` images in the `Realizacje` photo grid for each product sheet. Until final realization photos are supplied, the grid repeats the available product images to six visible cells.
- Use `gallery` for additional product photos, technical visualizations, installation details, diagrams, or other verified product media.
- Do not use screenshot crops as final catalogue assets.
- Place final stable product files under `public/images/products/` and reference them with `/images/products/file-name.ext`.
- Keep technical copy based on supplied/client source content and leave `status: draft` until verified.

## Old-Site Extraction JSON Shape

When extracting the current/old site copy, preserve it like this:

```json
{
  "sourceUrl": "",
  "extractedAt": "",
  "pageTitle": "",
  "rawSections": [
    {
      "heading": "",
      "body": "",
      "links": [],
      "images": []
    }
  ],
  "normalizedSections": [
    {
      "key": "",
      "title": "",
      "summary": "",
      "sourceSectionIndex": 0,
      "status": "draft | verified | todo"
    }
  ],
  "openQuestions": []
}
```

## Site Search Content Model

Global site search is powered by Nuxt UI `UContentSearch` and Nuxt Content helper queries:

- `queryCollectionNavigation("pages")`
- `queryCollectionSearchSections("pages")`

The `pages` collection is a page-type Nuxt Content collection backed by root-level markdown files in `content/*.md`. These files are search-index entries for existing public routes, not a replacement for the route components in `app/pages/`.

Current search-index files:

- `content/index.md` -> `/`
- `content/produkty.md` -> `/produkty`
- `content/o-firmie.md` -> `/o-firmie`
- Contact search content is indexed through `content/index.md` and `content/o-firmie.md`; there is no standalone `/kontakt` content page.
- `content/dofinansowania.md` -> `/dofinansowania`
- `content/rodo.md` -> `/rodo`

For `/produkty`, product headings use explicit anchors matching the catalogue anchors, e.g. `#produkt-chlodziarki-bezposredniego-dzialania`, so search results can jump into the existing catalogue page without adding product detail routes.

## Copy Tone

- Professional
- Technical
- Calm
- Concrete
- Polish-first
- No exaggerated marketing promises
- No casual slang on the final website
- Short sentences where possible

## Open Content Questions

- Which business line is the priority for the new site: mining/tunnels, industrial cooling, HVAC/heat pumps, or all?
- Which address, phone, and email should be published?
- Are heat pumps still a current offer or legacy subsite only?
- Are there real product names, catalogues, certificates, or realizations to publish?
- Which product-specific realizations or project references should be assigned to each product family in the catalogue?
- Should the site include downloads?
- Should there be a blog/knowledge base?
