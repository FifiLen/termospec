# Architecture Context

## Stack

Current working assumption based on the existing POC:

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Nuxt + Vue + TypeScript | Public website frontend |
| Styling | Tailwind CSS v4 | Token-based utility styling |
| Content | Nuxt Content / local structured content | Page and product/service content |
| UI integration | Nuxt UI | Content search modal/button and Nuxt Content prose/search integration |
| Components | Vue SFC components | Reusable page sections and UI patterns |
| Fonts | DM Sans + Manrope | DM Sans for UI/body text, Manrope for headings |
| Deployment | Static/SSR-capable hosting | Final target to confirm |

If the project later moves to another CMS or backend, update this file before implementing that change.

## App Boundaries

- `app/pages/` — route-level pages only; keep pages thin.
- `app/components/` — reusable UI sections and components.
- `app/assets/css/` — global styles, tokens, Tailwind v4 setup.
- `content/` — Markdown/content files if Nuxt Content remains in use.
- `data/` or `app/data/` — structured JSON/TS data for navigation, offer groups, product cards, and extracted old-site content.
- `types/` — shared TypeScript interfaces.
- `utils/` or `app/utils/` — small pure helpers only.

## Content Source Model

The site should be content-first.

Recommended separation:

- Navigation data: one structured file.
- Homepage sections: one structured file or content entry.
- Offer/product categories: structured array with slugs.
- Detail pages: content files or structured records by slug.
- Contact details: one source of truth.
- Reusable CTA copy: one source of truth.
- Search index pages: root-level `content/*.md` entries for existing public routes, consumed by Nuxt UI `UContentSearch` through `queryCollectionNavigation` and `queryCollectionSearchSections`.
- Root `content/*.md` page entries should mirror the current public page content closely enough for global search. When visible copy changes in Vue components, `data/home.ts`, product YAML, team YAML, or footer/header UI, update the matching markdown index entry in the same work unit.
- Supplemental search quick links: `data/search.ts` contains visible UI/footer labels that should be searchable but do not yet have dedicated content pages. These quick links must point only to existing routes or anchors until standalone pages are confirmed.
- Current static marketing routes `/`, `/produkty`, `/o-firmie`, `/dofinansowania`, and `/rodo` are prerendered through Nuxt `routeRules`; legacy `/o-nas` redirects to `/o-firmie`, and legacy `/kontakt` redirects to the homepage contact form at `/#kontakt`.

Do not hardcode repeated contact details, offer labels, or product groups in many components.

## Routing Model

Recommended routes:

- `/`
- `/o-firmie`
- `/rozwiazania`
- `/rozwiazania/[slug]`
- `/produkty`
- `/realizacje`
- `/baza-wiedzy`
- `/do-pobrania`

Routes can be reduced if scope is smaller, but should not become inconsistent with navigation.
Current product scope uses `/produkty` only; product detail pages are not planned.
There is no standalone contact page in the current implementation; contact CTAs target `/#kontakt`.

## SEO Model

Each page should define:

- title
- description
- canonical path where relevant
- Open Graph image if available
- semantic heading structure

Offer detail pages should include indexable copy, not only visual cards. Product-family copy is presented on `/produkty` without individual detail routes.

## Image / Asset Model

- Place stable public images in `public/`.
- Optimize names using lowercase kebab-case.
- Avoid embedding remote URLs directly in components unless temporary.
- Keep logos, product images, and industrial photos organized by folder.

Suggested structure:

```txt
public/
  images/
    brand/
    hero/
    products/
    realizations/
    backgrounds/
```

## Components Model

Pages should be composed from reusable sections:

- `SiteHeader`
- `MegaMenu`
- `SiteFooter`
- `HeroSection`
- `SectionHeader`
- `OfferGrid`
- `ProductCard`
- `IndustrySplit`
- `FeatureBand`
- `StatsStrip`
- `ContactCta`
- `TechnicalSpecList`
- `Breadcrumbs`

Components should accept data through props. Do not make every component fetch or define its own data.

## State and Interactivity

For the current public website, state should remain minimal:

- navigation open/closed
- mega menu open/closed
- mobile menu open/closed
- optional accordion/tab state
- optional filters on product/reference lists

No global state library is needed unless requirements change.

## Forms

Contact form handling is not confirmed.

Until confirmed:

- build contact UI as a visual/form shell only
- do not invent backend delivery
- add form backend/email provider as an open question in `progress-tracker.md`

## Invariants

1. Keep content data separate from visual components.
2. Do not hardcode brand colors in components.
3. Do not introduce auth, database, or backend APIs unless explicitly required.
4. Do not add a heavy state library for simple UI state.
5. Navigation and route structure must stay aligned.
6. Repeated contact/company information must have one source of truth.
7. Technical claims must come from verified content or be marked as TODO.
8. Site search should use the Nuxt UI / Nuxt Content integration unless a different search backend is explicitly selected.
9. Nuxt Studio is opt-in for every environment through `NUXT_STUDIO_ENABLED=1`. Use `npm run dev` for the public site and `npm run dev:studio` only when editing through Studio is required, because Studio enables Nuxt Content preview/component metadata generation and materially increases build/client analysis output.
