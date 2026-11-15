# Content Map

This file defines the content structure for the Termospec website. It should be updated whenever new page sections, offer groups, product groups, or copy decisions are added.

## Content Principles

- Preserve source content before rewriting it.
- Separate source/extracted copy from final marketing copy.
- Mark uncertain facts as `TODO: verify`.
- Prefer clear Polish copy.
- Keep technical claims specific, but only when verified.
- Do not invent certifications, parameters, partners, or project names.

## Product Mega Menu

The desktop product menu mirrors the `/produkty` index through the shared `ProductCatalogueIndex`: searchable categories, expandable families and model/series selectors. Selection updates a right-hand thumbnail using the exact family/category artwork from `content/catalogue.yml`, with the chosen model label and a `Zobacz w katalogu` link to its stable hash. Missing artwork stays absent. The panel fits the available viewport height and the index scrolls independently; the existing mobile main menu remains unchanged.

## Suggested Navigation

```ts
export const navigation = [
  { label: "O firmie", href: "/o-firmie" },
  {
    label: "Produkty",
    href: "/produkty",
    type: "mega",
    categories: "categories from content/catalogue.yml"
  },
  {
    label: "Usługi",
    href: "/uslugi",
    type: "mega",
    items: "serviceNavigation from data/navigation.ts"
  },
  { label: "Kontakt", href: "/#kontakt" },
  { label: "Koncesja", href: "/koncesja" },
  { label: "Szukaj", type: "search" }
]
```

## Company Data

The owner-confirmed `koncesja` link is the final page link in the desktop and mobile main navigation, after `kontakt`. `/koncesja` is intentionally empty for now, retaining the shared header/footer and a visually hidden heading. Its search entry contains only the confirmed title; document copy and files remain unauthored.

Company identity and contact details live in the Studio-editable `content/company.yml` (validated by `schemas/company.ts`, served by `/api/content/company`, read through `useCompany`):

- `legalName` — `Termospec Sp. z o.o.` (footer copyright, contact panel, map query, JSON-LD `legalName`)
- `address` — `ul. Górnicza 10`, `44-240`, `Żory`, `Polska`
- `phone` — office `+48 (32) 435 80 50`; `fax` — `+48 (32) 435 80 50 wew. 16` (optional, hidden when empty)
- `email` — `biuro@termospec.pl`
- `serviceHotline` — `Serwis 24/7`, `+48 603 899 165` (ServiceHotline button on `/uslugi` and the homepage contact panel, mobile menu card)
- `registry` — KRS `0000109147`, NIP `PL6422590547`, REGON `276184836`, share capital `100.000 PLN` (footer)

`tel:` links are derived from the displayed numbers and the Google Maps embed/link from the legal name, street and city, so editors only maintain the visible text. Brand constants used only for SEO (short name, logo, Open Graph image) stay in `data/company.ts`. Company details that appear inside longer prose (`/rodo` clause, `/o-firmie` profile) are not bound to the collection; the generated search index reads the contact block from it.

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

Current homepage composition (order follows the October 2026 PSD `strona glowna.psd` by Zbigniew Goik):

- The homepage has one visually hidden `h1`: `Termospec — systemy chłodzenia i wentylacji dla przemysłu` (same as the page title); slide titles are `h2`.
- `HomeHero` — full-viewport four-slide carousel sourced from Studio-editable `content/home.yml`: `Systemy dla górnictwa i przemysłu.`, `Kontrola warunków pracy pod ziemią.`, `Profesjonalna obróbka stali.`, `Od projektu do utrzymania instalacji.`. Each slide uses the supplied pre-darkened 1920×1241 banner (`/images/hero/hero-*.jpg`) with copy placed directly on the image: red-line caption, bold title, lead, red primary and white-outline secondary pill actions, a white rule and an optional per-slide `facts` row (max 3; empty falls back to the first three `metrics` from `content/about.yml`, passed in by `app/pages/index.vue` as `defaultFacts`). The supplied alternative engineer banner `hero-zespol-inzynierow.jpg` (PSD group `4b`) is stored but unused. A navy lower-right capsule holds `01–04` selectors and previous/next controls.
- `HomeScope` — `Zakres działalności` eyebrow, three-line heading and lead, the PSD headquarters composite `/images/home/zakres-siedziba-termospec.webp` (rounded panorama whose roof masses break out of the frame, one transparent static image, no motion), and three equal white cards (numbers `01–03` derived from card order, red PSD icons rendered as a brand-colored mask, divider, dash list, red pill action). The panorama (src/alt, rendered at a fixed ~3:1 ratio) and the cards (title, multi-line lead, points, icon, button label/link) come from `scope` in `content/home.yml`; the eyebrow, heading and lead stay in the template.
- `HomeRealizations` — white section with eyebrow, heading/lead, the first three image cards (by `order`) from the Studio-editable `content/realizations/*.yml` collection rendered through `RealizationCard` (PSD aggregate imagery in `/images/realizations/realizacja-agregat-*.jpg`), a divider and the `zobacz więcej realizacji` CTA row. The PSD repeats one placeholder text on all three cards; the three distinct existing project texts are retained.
- `HomeContactForm` — navy contact panel (address, office contacts, red `Serwis 24/7` box, Google map) beside the white technical inquiry form whose `Zakres zapytania technicznego` choices are the `contact.topics` labels from `content/home.yml` (the label is also the radio value); no topic is preselected. Backend handling is still not confirmed.
- `HomePartners` — white section with eyebrow, heading/lead and one rounded logo strip (five slots visible on desktop, arrow-scrolled) based on `homePartners`. Replace neutral `Logo` slots with verified partner logos before publication.
- `HomeProcess` — retained but not rendered.

## Current Global Navigation

- `SiteHeader` follows the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Koncesja`, `Szukaj`; the logo links home and `Aktualności` has been removed. Desktop uses the floating rounded white bar (client request on 2026-11-02 to keep the previous format) with bold capitalised labels and separate rounded product/service panels; mobile uses a floating rounded bar and a deep-navy full-screen menu. The desktop product panel renders all categories, groups, models and series directly from `content/catalogue.yml`, not from a second navigation taxonomy.
- The accessibility control beside the desktop language switch opens a compact panel directly below the navigation. It provides text-size, high-contrast and reduced-motion settings with a reset action; the same panel is available from the mobile menu. Preferences are stored locally in the visitor's browser and do not alter shared content.
- `content/catalogue.yml` is the Studio-editable source for the fixed product taxonomy across desktop, mobile, and `/produkty`; every entry has a stable `id`, and published `content/products/*` records attach through `cataloguePlacement.entryId`. Editable product titles are display content, not relation keys. `data/services.ts` is the single structured source for the five service categories and their complete copy; `data/navigation.ts` derives the matching desktop/mobile navigation items from it.
- Desktop `Produkty` and `Usługi` use Nuxt UI `UNavigationMenu` triggers with custom `ProductMegaMenu` and `ServiceMegaMenu` panels.
- `ProductMegaMenu` presents all nine uppercase product categories, their uppercase subcategories, and exact models or series. Editorial future-development notes remain in Studio data but are hidden publicly. Optional render fields exist for each main category and uppercase subcategory, but no fake placeholders are shown before client assets arrive.
- The `Zbiorniki ciśnieniowe` → `Parowniki` cross-reference scrolls to the `Parowniki` category inside the menu rather than duplicating that catalogue branch.
- Service links target the five anchored sections on `/uslugi`; individual service routes are not planned yet.
- Below `xl`, the same confirmed order and complete hierarchies are available in the full-screen off-canvas panel. Search is the final main-menu row; funding, PL/EN controls, and the contact CTA remain in the utility area.

Current homepage scope cards:

- `Klimatyzacja` — `Produkcja urządzeń chłodniczych dla kopalń podziemnych oraz tuneli.` / `Projektowanie, obsługa oraz serwis układów klimatyzacji kopalń.`
- `Wentylacja` — `Produkcja i serwis wentylatorów oraz tam wentylacyjnych dla kopalń.`
- `Energia odnawialna` — `Projektowanie, montaż, serwis oraz obsługa systemów opartych na odnawialnych źródłach energii.`

## Homepage Studio Structure

- `content/home.yml` is the Nuxt Studio source for the homepage carousel (`hero`), the `Zakres działalności` panorama and cards (`scope`) and the contact form topics (`contact.topics`). `app/pages/index.vue` reads it with `useHome`, so Studio drafts update the hero, cards and topics live; double-clicking the hero, the scope section or the topic buttons opens it. The ordered `hero.slides` array supports adding, deleting, and reordering slides without editing Vue code.
- Every slide stores a title, short lead, layout (`nakladka` or `pelny-kadr`), accessible image description, separate desktop/mobile sources and focal positions, optional caption (rendered above the title), up to three `facts` (value + label), and primary/secondary links.
- `schemas/home.ts` validates this structure and requests textarea and media-picker controls. `app/pages/index.vue` queries the single `home` data record and passes its slides to `HomeHero`.
- Autoplay remains a presentation behavior in the component rather than client content: slides advance every 6.5 seconds, pause during pointer/focus interaction, retain arrow navigation, and respect reduced-motion preferences.
- `content/realizations/*.yml` is the Studio source for realizations (one file per project: title, industry, description, image src/alt, order). Editors add them through the Studio-only `Dodaj realizację` form, which validates against `schemas/realization.ts`, picks images from the Studio media library, sets `order` for a start/end position and creates a Studio draft; the regular Studio form remains available for editing and reordering.
- `content/company.yml` is the Studio source for company contact data shared by the footer, homepage contact panel, `/uslugi`, mobile menu and Organization JSON-LD (see `## Company Data`).
- In Studio, double-clicking a section opens its source document: the hero (`home.yml`), each realization card, each `/uslugi` service section, and the company contact blocks (footer address and registry line, homepage contact panel, `/uslugi` contact line and hotline).
- Partners (placeholders) and the disabled `HomeProcess` steps are intentionally still sourced from `data/home.ts`. They should move to Studio individually after their client-facing field structure is agreed, rather than exposing unused or ambiguous fields all at once.

## Search Quick Links

Global search combines the generated page index (see `## Site Search Content Model`) with `data/search.ts` quick links for visible UI/footer labels that do not yet have standalone pages.

Current `/dofinansowania` composition:

- `data/dofinansowania.ts` stores the page title, project records, logo/image paths, project paragraphs, lists, and financial facts.
- `app/pages/dofinansowania.vue` renders a simple document-like public page using the supplied funding logo groups: `/grupa-dofinansowanie-grant-01.png`, `/grupa-dofinansowanie-grand-02.png`, and `/grupa-dofinansowanie-grant-03.jpg`.
- The header funding panel and footer `dotacje` link point to `/dofinansowania`.
- `SiteFooter` follows the approved three-column editorial composition while retaining the established Termospec yellow background. The left column contains the logo, positioning copy, and compact navigation directly below it; the middle column contains the centered project image CTA with a taller service-photo stage; the right column contains the career/service utility cards and verified company details. Legal labels and certification markers form one quiet bottom row.

Current `/o-firmie` composition:

- `content/about.yml` (Studio collection `about`, schema `schemas/about.ts`, `/api/content/about`, `useAbout`) stores the company profile (`profile`: page title, lead, profile intro, services intro, specialties, numbered highlight cards), the key figures (`metrics`: value + label; the first three are the homepage hero fallback facts) and the timeline (`timeline`: year/period, title, optional body; `/o-firmie` shows the first five because the grid has five columns). The former unused `aboutHero`, `aboutFocusItems` and the never-rendered metric descriptions were dropped with `data/about.ts`. The current client copy consistently states nearly 30 years of experience alongside the existing 500 MW total cooling capacity, underground mine/tunnel applications, and international mine deliveries.
- `app/pages/o-firmie.vue` uses the homepage PSD system: surface intro (`O firmie` eyebrow, company statement as `.design-heading`, lead in the right column, rounded headquarters panorama `/budynek-termospec.webp`), white `Profil` section (intro statement beside a surface card with services intro, red-dash specialties and a `zobacz usługi` action), two numbered value cards (navy + white), and a white `Historia firmy` section with a five-point horizontal timeline (red years, axis with dots, surface cards) that becomes a vertical line on mobile. The page still ends after the timeline; team and contact sections remain removed at the owner’s request. All copy comes from `content/about.yml`; each section opens it on double-click in Studio and drafts update the preview live. The section headings `Profil`, `Historia firmy` and `Trzy dekady konsekwentnego rozwoju.`, the headquarters photo and the SEO description remain in the template.

Current `/uslugi` composition:

- `content/services/<slug>.yml` (Studio collection `services`, schema `schemas/service.ts`) holds the five client-confirmed service records: label, intro paragraphs, ordered sections (optional title, paragraphs, points), the metalworking machine park (title, description, specifications as `label`/`value` pairs), optional closing and CTA. The filename is the stable slug and `/uslugi#<slug>` anchor, so editors change copy without breaking links. `data/services.ts` only lists the five slugs in layout order (`serviceLayoutSlugs`); the page, the desktop/mobile services menu (`toServiceNavigation`) and the Studio preview show only these slugs in that order, so a new service file stays hidden until it gets a designed layout.
- `app/pages/uslugi.vue` renders the five service records (fetched with `useServices`, each section picked by slug and double-click editable in Studio) as complete anchored editorial sections in the homepage PSD design system (eyebrow numbers `01–05`, `.design-heading`, white/surface alternating sections, white or surface cards, red-dash lists, red pill `wyślij zapytanie` actions). The top page index links to the established anchors, the `Serwis 24/7` section is a navy panel ending in the shared red `ServiceHotline` box, and the `Obróbka metali` section expands the structured machine park into paired white specification cards (no photo placeholders until machine photos are supplied). The final contact panel repeats the office contacts with `ServiceHotline`. The fourth display label remains `Obróbka metali`; its existing `#obrobka-metali-skrawaniem-i-laserem` anchor is preserved for inbound-link compatibility.
- Legacy `/o-nas` remains as a 301 redirect to `/o-firmie`.
- Nuxt UI components are used for visible UI primitives on the page: `UIcon`.
- The page intentionally avoids the removed oversized split-claim treatment and keeps the calmer grid/image rhythm requested for company/about pages.

Current supplemental search quick links:

- `Kariera` → `/#kontakt`
- `Serwis i wsparcie techniczne` → `/uslugi#serwis-24-7`
- `O firmie` → `/o-firmie`
- `Zakres działalności` → `/uslugi`
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

## Confirmed Product Navigation Taxonomy

The client-confirmed navigation tree is stored in `content/catalogue.yml` and currently includes:

1. `Agregaty chłodnicze` — piston-compressor TS-150–TS-400 models, screw-compressor TS-300–TS-800 models, two-compressor TS-500/600/700 models, high-power TS-990/1200/2000/2500/3000 models, the TS1–TS60 low-power series, and mobile cooling devices marked for later expansion.
2. `Chłodnice powietrza` — CPO-30/50, CP-250/300/400/500 plus individual 10–1000 kW units.
3. `Parowniki` — TS-150/PB–TS/PB-900 air series and TS-150/PP–TS/PP-900 water series.
4. `Chłodnice wyparne wody` — CWW-200/300/450 plus individual 100–1000 kW units.
5. `Systemy redukcji ciśnienia` — low/high-pressure valves, pressure-reduction stations, and the 6–35 MW three-chamber pump feeder.
6. `Zbiorniki ciśnieniowe` — 10–4000 kW condensers, a cross-reference to `Parowniki`, and heat exchangers.
7. `Systemy sterownicze` — marked for later expansion.
8. `Wentylatory` — marked for later expansion.
9. `Inne` — cooling points/chilled-water distributors, ventilation dams, and hydrogen-sulfide reduction installations.

This confirmed taxonomy now drives the visible `/produkty` catalogue directly. The older `content/products/*.yml` family records remain available in Nuxt Studio as detailed product-content drafts for later catalogue development, but they no longer replace or reduce the nine-category public index.

## Product Family Content Model

Detailed product-family drafts are managed in `content/products/*.yml`; individual product detail routes are not planned in the current project scope. The public `/produkty` index and its confirmed model/series hierarchy are managed separately in Studio-editable `content/catalogue.yml` so all nine client-approved categories remain visible while detailed product content is developed gradually.

Blank client-facing product template (fields may remain empty unless the schema requires them):

```yml
title: ""
modelCode: ""
category: ""
cataloguePlacement:
  entryId: ""
  categorySlug: ""
  groupSlug: ""
  kind: "model"
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
technicalData:
  - label: ""
    value: ""
    unit: ""
technicalNotes: []
relatedProducts: []
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
documents:
  - title: ""
    file: ""
relatedProjects:
  - number: ""
    category: ""
    title: ""
    body: ""
    image: ""
    imageAlt: ""
    scope: []
```

`specs` contains only the few headline values shown near the top of a product panel. `technicalData` is the complete verified parameter table, with the value and unit stored separately. Measurement conditions and qualifications belong in `technicalNotes`; compatible or complementary devices belong in `relatedProducts`. `documents` accepts product-specific downloads such as catalogue cards, instructions, and certificates. All of these sections are optional and are rendered publicly only when the client has authored valid content.

The product slug is derived automatically from its YAML filename. Use a unique lowercase kebab-case filename such as `wentylator-osiowy.yml`; Nuxt Studio duplicates such as `wentylator-osiowy-copy.yml` therefore receive a distinct technical slug and do not collide in the Nuxt Content database. The legacy `slug` property may still exist in older YAML files but is no longer queried or indexed.

Product entries on `/produkty` form one anchored catalogue taxonomy, not links to product subpages.

Current `/produkty` page state:

- The visible page starts directly below the fixed header with the catalogue workspace itself: no hero, no compact intro, no stats/counter panel, and no outer max-width route container.
- From the `sm` breakpoint, the catalogue uses a full-viewport-width two-column layout with an approximately `20rem` sticky product index. The index starts directly with search and continues into nine category labels without visible numeric prefixes. Its reduced horizontal padding keeps the hierarchy compact. It is a classic nested navigator: aggregate branches expose `category → family → model`, while categories without families expose their models/series directly. Opening a category or family replaces the single active catalogue view on the right, and model buttons activate the matching horizontal tab. Reactive Studio document refreshes preserve the selected model while its stable entry id remains available. The removed dark `Katalog produktów` title strip is not rendered.
- Below the `sm` breakpoint, the index remains a full-width search/navigation section above the complete category register.
- Each main category and uppercase subcategory accepts an optional `render` object (`src`, `alt`). Every main category uses the same full-width navy title band. Beneath it, only the currently selected category or family is shown in one consistent, larger white focus stage: the selected family title sits beside its contained render. Selecting another branch replaces this stage, so unrelated category renders never remain stacked below. Categories without confirmed artwork omit the image region rather than showing an invented placeholder. Technical line art belongs to the authored product description/identity surface through the product record's optional `headerSketch` field, not to category or family stages.
- A published `content/products/*` record with `cataloguePlacement` is attached to its taxonomy location as a compact, closed product disclosure. Opening it reveals the complete inline technical sheet. A category-level record is placed after that category's family list; a group-level record stays inside its group. Nuxt Studio additionally previews placed drafts with a visible `Szkic` marker. The sheet renders only authored fields: title/model code, lead/short description, supplied media, headline specifications, the full technical-data table and notes, descriptive sections, applications, features, components, related devices, service scope, and downloads. The current experimental sheet is treated as a designed full-width technical document: its opening places product identity and headline specifications on one neutral `surface` card beside one primary render, followed by numbered narrative sections and a quiet supporting column. The optional `headerSketch` is one visible but low-opacity technical watermark centered across the complete product document; it does not tile and is never rendered as standalone media below a narrative section. Typographic hierarchy and whitespace organize the content; divider lines are reserved for genuine tabular data.
- Model and series entries within a category or family are interactive horizontal tabs. The first entry is selected by default, the active label uses a solid burgundy background with white text instead of an underline, and a matching detailed product record is rendered as that tab's panel. While the selected product sheet is in view, its tab row remains sticky below the global header. Selecting another model from a scrolled position replaces the product and smoothly reveals the beginning of its sheet, so the visitor does not need to return manually to the original tab position. Model labels without detailed records remain valid selectors and do not produce placeholder copy.
- Exact product types are displayed individually. Range-only branches use one compact `Typoszereg` line, and descriptive capabilities such as custom power ranges remain one full-width line instead of appearing as product models.
- The `Zbiorniki ciśnieniowe` entry for `Parowniki` links to main category `03`, as requested by the client.
- The route uses native Vue/template markup for the catalogue surface instead of Nuxt UI page/dashboard primitives, so the visual rhythm follows the current homepage: white surfaces, thin lines, burgundy accents, square geometry, and strong industrial imagery. The narrow product index uses Nuxt UI `UCollapsible` only as its accessible animated disclosure primitive; category clicks reveal their child navigation without moving the catalogue page.
- The page intentionally avoids product detail routes, product-card links, product-level purchase/contact CTAs, prices, ratings, carts, and promotional ecommerce badges.
- Search is diacritic-insensitive and filters the complete hierarchy by main category, subcategory, exact type, series, and descriptive capability. Client brief notes such as `do dalszej rozbudowy` remain editable in `content/catalogue.yml` but are intentionally hidden from the public catalogue, navigation menus, and search index.

Current detailed product records and archive:

- Products may be stored as YAML or JSON under `content/products/`; both formats use the same generated Studio form and shared product schema.
- When Nuxt Studio is authenticated and active, a compact global `Import produktu` editor control is available outside the catalogue content. It provides a blank template, a Draft-07 JSON Schema file, a ready-to-copy AI instruction, and catalogue category/group/entry placement; validates pasted/uploaded JSON, prevents filename collisions, and creates a draft product record with a stable entry id. The complete importer and preview poller are excluded from the normal public execution path. The draft appears immediately in Studio preview with a `szkic` marker. Public visitors see only products whose `status` is `published`.
- The same Studio-only tool has a separate `Wersja angielska` workflow. It lists the current Polish product documents and initially selects the populated TS-150 record. The client can copy or download a complete versioned JSON package, or copy one ready ChatGPT instruction containing that package, then paste/upload the translated response. A valid import creates or updates `content/product-translations/en/<entryId>.json` as an English draft without modifying the Polish product. The stored overlay contains translated presentation copy only; shared identity, placement, numbers, units, media paths, document paths, and technical references stay canonical in `content/products/`. Structural, numeric, protected-field, and source-revision validation prevents an AI response from silently changing technical data or overwriting a translation based on an outdated Polish record. When a saved EN record exists, the tool automatically validates and merges it with the Polish canonical fields and exposes an expandable English preview using the real product-detail layout. Public English product rendering is intentionally not part of this unit.
- `content/products/` contains one published minimal record for each of the 37 confirmed model or series entries in `content/catalogue.yml`. Every record has a title and exact `cataloguePlacement`, so all confirmed products are visible and editable in Nuxt Studio and each existing model/series tab resolves to a product panel. Unapproved descriptions, parameters, and media remain empty.
- Earlier YAML product drafts, duplication-test files, the explicit test product, and the fully authored `Urządzenia bezpośredniego działania — TESTOWY` preview are preserved outside the active content collection under `context/archive/studio-product-drafts/`. They remain implementation references but do not appear in Nuxt Studio's Products collection or the public catalogue.

Product media policy:

- Use the `render` field in `content/catalogue.yml` for the category and uppercase-subcategory artwork requested by the client.
- Use supplied local Termospec media first; temporary reference images must stay clearly marked in product YAML until clean final product and realization images are available.
- Use `headerSketch` for the optional low-opacity technical sketch used as the background motif of the complete inline product document.
- The existing `heroImage`, `headerSketch`, and `gallery` fields are used by placed detailed product records in the public `01–09` catalogue; missing media fields do not create public placeholders.
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

Global site search is powered by Nuxt UI `UContentSearch`. Its page sections are generated on the server by `buildSearchSections` (`server/utils/search-sections.ts`) and served by `/api/content/site`; there are no hand-written markdown mirrors and no `pages` collection, so nothing search-only appears in Studio.

Sources, in index order:

- `/` — hero slides (`home.yml`) and the three hero fallback figures (`about.yml` metrics), `HomeScope` cards (`home.yml` `scope.items`, `#zakres`), the first three realizations by `order` (`realizations`, `#realizacje`, matching what the homepage shows), and the contact block from `company.yml` (`#kontakt`).
- `/o-firmie` — the `about` record: profile and highlight cards, plus the first five milestones (`#historia`), matching the page.
- `/uslugi` — page intro (`about.profile.servicesIntro`, the same text the page lead shows) and every `services` record: label + intro + untitled sections + closing/CTA as `#<slug>`, titled sections and machines as sub-entries with the service label in the breadcrumb.
- `/produkty` — every `catalogue.yml` category, group and entry with its own anchor (`#<category>`, `#<group>`, `#<entry id>`); entries include the published product's title, category, lead, short description, applications and features.
- `/dofinansowania` — `fundingPage` and each project from `data/dofinansowania.ts`.
- `/rodo` — `rodoPage` from `data/rodo.ts`; `/koncesja` — title only.

Each entry has `id` (route + anchor), `title`, `titles` (breadcrumb) and `level` (breadcrumb depth + 1), the shape `UContentSearch` items are built from in `app.vue`. Published Studio edits reach search after the publish rebuild; Studio drafts are not indexed. Copy hardcoded in Vue templates is not indexed unless it is added to the generator. `tests/search-sections.test.ts` checks that every entry points to an existing route/anchor and that collection edits flow into the index.

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
- Which final client renders should be assigned to each uppercase product category and subcategory in the navigation?
- Which verified product catalogues, instructions, and certificates should the client upload as product downloads?
- Should there be a blog/knowledge base?
