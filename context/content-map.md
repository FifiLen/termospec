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

Current homepage composition (order follows the October 2026 PSD `strona glowna.psd` by Zbigniew Goik):

- `HomeHero` — full-viewport four-slide carousel sourced from Studio-editable `content/home.yml`: `Systemy dla górnictwa i przemysłu.`, `Kontrola warunków pracy pod ziemią.`, `Profesjonalna obróbka stali.`, `Od projektu do utrzymania instalacji.`. Each slide uses the supplied pre-darkened 1920×1241 banner (`/images/hero/hero-*.jpg`) with copy placed directly on the image: red-line caption, bold title, lead, red primary and white-outline secondary pill actions, a white rule and an optional per-slide `facts` row (max 3; empty falls back to the first three `aboutMetrics`). The supplied alternative engineer banner `hero-zespol-inzynierow.jpg` (PSD group `4b`) is stored but unused. A navy lower-right capsule holds `01–04` selectors and previous/next controls.
- `HomeScope` — `Zakres działalności` eyebrow, three-line heading and lead, the PSD headquarters composite `/images/home/zakres-siedziba-termospec.webp` (rounded panorama whose roof masses break out of the frame, one transparent static image, no motion), and three equal white cards (`01–03`, red PSD icons, divider, dash list, red pill action) from `homeScopeItems`.
- `HomeRealizations` — white section with eyebrow, heading/lead, three image cards from `homeRealizations` (PSD aggregate imagery in `/images/realizations/realizacja-agregat-*.jpg`), a divider and the `zobacz więcej realizacji` CTA row. The PSD repeats one placeholder text on all three cards; the three distinct existing project texts are retained.
- `HomeContactForm` — navy contact panel (address, office contacts, red `Serwis 24/7` box, Google map) beside the white technical inquiry form based on `homeContactTopics`; no topic is preselected. Backend handling is still not confirmed.
- `HomePartners` — white section with eyebrow, heading/lead and one rounded logo strip (five slots visible on desktop, arrow-scrolled) based on `homePartners`. Replace neutral `Logo` slots with verified partner logos before publication.
- `HomeProcess` — retained but not rendered.

## Current Global Navigation

- `SiteHeader` follows the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Koncesja`, `Szukaj`; the logo links home and `Aktualności` has been removed. Desktop uses a full-width fixed white bar (PSD design) with bold capitalised labels and separate rounded product/service panels; mobile uses a full-width white bar and a deep-navy full-screen menu. The desktop product panel renders all categories, groups, models and series directly from `content/catalogue.yml`, not from a second navigation taxonomy.
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

- `content/home.yml` is the active Nuxt Studio source for the homepage carousel only. The ordered `hero.slides` array supports adding, deleting, and reordering slides without editing Vue code.
- Every slide stores a title, short lead, layout (`nakladka` or `pelny-kadr`), accessible image description, separate desktop/mobile sources and focal positions, optional caption (rendered above the title), up to three `facts` (value + label), and primary/secondary links.
- `schemas/home.ts` validates this structure and requests textarea and media-picker controls. `app/pages/index.vue` queries the single `home` data record and passes its slides to `HomeHero`.
- Autoplay remains a presentation behavior in the component rather than client content: slides advance every 6.5 seconds, pause during pointer/focus interaction, retain arrow navigation, and respect reduced-motion preferences.
- Other homepage sections are intentionally still sourced from `data/home.ts`. They should move to Studio individually after their client-facing field structure is agreed, rather than exposing unused or ambiguous fields all at once.

## Search Quick Links

Global search uses root-level `content/*.md` entries for indexed page content plus `data/search.ts` for visible UI/footer labels that do not yet have standalone pages.

Current root markdown search-index entries:

- `content/index.md` mirrors the currently rendered homepage sections: scope, partners, realizations, homepage contact form, global navigation labels, and interface labels.
- `content/produkty.md` mirrors the visible product catalogue UI plus all current product-family YAML fields that are relevant to search: title, category, lead, short description, specs, applications, components, features, service scope, related realizations, technical sections, and image alt text.
- `content/uslugi.md` mirrors the five confirmed service categories, detailed scopes, calls to action, and metalworking machine specifications rendered on `/uslugi`.
- `content/o-firmie.md` mirrors the company page copy; team and contact sections have been removed at the owner’s request.
- `content/dofinansowania.md` mirrors the funding projects page and the EU/regional project copy rendered from `data/dofinansowania.ts`.
- `content/rodo.md` mirrors the RODO information clause rendered from `data/rodo.ts`.

Current `/dofinansowania` composition:

- `data/dofinansowania.ts` stores the page title, project records, logo/image paths, project paragraphs, lists, and financial facts.
- `app/pages/dofinansowania.vue` renders a simple document-like public page using the supplied funding logo groups: `/grupa-dofinansowanie-grant-01.png`, `/grupa-dofinansowanie-grand-02.png`, and `/grupa-dofinansowanie-grant-03.jpg`.
- The header funding panel and footer `dotacje` link point to `/dofinansowania`.
- `SiteFooter` follows the approved three-column editorial composition while retaining the established Termospec yellow background. The left column contains the logo, positioning copy, and compact navigation directly below it; the middle column contains the centered project image CTA with a taller service-photo stage; the right column contains the career/service utility cards and verified company details. Legal labels and certification markers form one quiet bottom row.

Current `/o-firmie` composition:

- `data/about.ts` stores the page hero, fact strip, client-supplied company profile, specialization list, supporting editorial sections, and the company timeline milestones. The current client copy consistently states nearly 30 years of experience alongside the existing 500 MW total cooling capacity, underground mine/tunnel applications, and international mine deliveries.
- `app/pages/o-firmie.vue` follows the approved precise light editorial design. It uses DM Sans throughout, a left-aligned company statement above the client-confirmed headquarters photograph from `/budynek-termospec.png`, one editorial profile column with a two-column specialization list, two equal rounded value panels, a horizontal five-point company timeline with alternating cards and a highlighted middle milestone. The page ends after the timeline; team and contact sections are removed at the owner’s request. The timeline collapses to a vertical card sequence on mobile. The warm surface, deep navy, and restrained burgundy accents are the only visible color system on this page.

Current `/uslugi` composition:

- `data/services.ts` contains the five client-confirmed service records: headings, introductory copy, detailed sections, bullet scopes, calls to action, and the metalworking machine park with technical specifications.
- `app/pages/uslugi.vue` renders all five records from `data/services.ts` as complete anchored editorial sections in the homepage PSD design system (eyebrow numbers `01–05`, `.design-heading`, white/surface alternating sections, white or surface cards, red-dash lists, red pill `wyślij zapytanie` actions). The top page index links to the established anchors, the `Serwis 24/7` section is a navy panel ending in the shared red `ServiceHotline` box, and the `Obróbka metali` section expands the structured machine park into paired white specification cards (no photo placeholders until machine photos are supplied). The final contact panel repeats the office contacts with `ServiceHotline`. The fourth display label remains `Obróbka metali`; its existing `#obrobka-metali-skrawaniem-i-laserem` anchor is preserved for inbound-link compatibility.
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

Global site search is powered by Nuxt UI `UContentSearch` and Nuxt Content helper queries:

- `queryCollectionNavigation("pages")`
- `queryCollectionSearchSections("pages")`

The `pages` collection is a page-type Nuxt Content collection backed by root-level markdown files in `content/*.md`. These files are search-index entries for existing public routes, not a replacement for the route components in `app/pages/`.

Current search-index files:

- `content/index.md` -> `/`
- `content/produkty.md` -> `/produkty`
- `content/uslugi.md` -> `/uslugi`
- `content/o-firmie.md` -> `/o-firmie`
- Contact search content is indexed through `content/index.md`; there is no standalone `/kontakt` content page.
- `content/dofinansowania.md` -> `/dofinansowania`
- `content/rodo.md` -> `/rodo`
- `content/koncesja.md` -> `/koncesja`

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
- Which final client renders should be assigned to each uppercase product category and subcategory in the navigation?
- Which verified product catalogues, instructions, and certificates should the client upload as product downloads?
- Should there be a blog/knowledge base?
