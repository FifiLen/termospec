# Architecture Context

## Stack

Current working assumption based on the existing POC:

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Nuxt + Vue + TypeScript | Public website frontend |
| Styling | Tailwind CSS v4 | Token-based utility styling |
| Content | Nuxt Content / local structured content | Page and product/service content |
| UI integration | Nuxt UI | Content search modal, desktop navigation primitives, and Nuxt Content prose/search integration |
| Components | Vue SFC components | Reusable page sections and UI patterns |
| Fonts | DM Sans + Manrope | DM Sans for UI/body text, Manrope for headings |
| Deployment | Static/SSR-capable hosting | Final target to confirm |

If the project later moves to another CMS or backend, update this file before implementing that change.

## App Boundaries

- `app/pages/` — route-level pages only; keep pages thin.
- `app/components/` — reusable UI sections and components.
- `app/assets/css/` — global styles, tokens, Tailwind v4 setup.
- `server/api/content/` — server-only Nuxt Content query boundary exposed as narrow JSON handlers.
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
- Search index pages: root-level `content/*.md` entries for existing public routes. The server-only `/api/content/site` endpoint builds navigation and search sections with Nuxt Content; Nuxt UI `UContentSearch` receives the resulting JSON and never initializes the browser SQLite/WASM adapter.
- Root `content/*.md` page entries should mirror the current public page content closely enough for global search. When visible copy changes in Vue components, `content/home.yml`, `data/home.ts`, product YAML, team YAML, or footer/header UI, update the matching markdown index entry in the same work unit.
- Supplemental search quick links: `data/search.ts` contains visible UI/footer labels that should be searchable but do not yet have dedicated content pages. These quick links must point only to existing routes or anchors until standalone pages are confirmed.
- Confirmed product navigation: the Studio-editable `content/catalogue.yml` file defines the fixed internal `01–09` taxonomy for the public `/produkty` catalogue, desktop mega menu, and mobile product hierarchy; the numeric prefixes are not rendered in the catalogue sidebar. Every taxonomy entry has an immutable `id`. Published records from `content/products/` are merged through `cataloguePlacement.entryId`, never through their editable title; Studio preview additionally shows placed draft records with a `szkic` marker. Model and series entries render as controlled horizontal tabs. The selected entry id is the single source of UI state, is reflected in the URL hash, and is preserved across reactive product-document refreshes while that id still exists in the active branch. No separate product route is introduced. Product entries distinguish individual models, compact series labels, and descriptive capability lines; each main category and uppercase subcategory retains an optional render field for the client-supplied August artwork. The five service categories remain sourced from `data/navigation.ts` for desktop, mobile, and `/uslugi`.
- Detailed product-family identity comes from the unique content filename (`content/products/<slug>.yml` or `.json`). The same stable value is stored as `cataloguePlacement.entryId` and referenced by the matching `content/catalogue.yml` entry. The visible title can therefore change without breaking the relationship or creating a duplicate tab.
- `schemas/product.ts` is the shared product source of truth for Nuxt Content validation, the Nuxt Studio form, downloadable JSON Schema/template files, and the Studio-authorized JSON importer. The Studio form uses Polish labels, short field guidance, multiline editors for longer copy, media pickers for images/documents, and hides technical ordering flags from the client's main editing flow. Core identity/placement fields remain small, while `modelCode`, the complete `technicalData` table, `technicalNotes`, `relatedProducts`, media, documents, and longer sections are optional. Public product panels omit every unauthored field instead of rendering empty headings or placeholders. The current Nuxt Studio version has no supported custom-panel extension API, so the importer is exposed as a compact global editor tool only while an authenticated/active Studio host exists; it is not placed in the public catalogue layout. Imported records are forced to `draft`, assigned to the catalogue with `cataloguePlacement`, validated before creation, checked for filename collisions, and created through Nuxt Studio's native document host so local filesystem edits and production Git publishing follow the standard Studio workflow.
- Product translation workflow is prepared independently from public locale routing. In active Nuxt Studio, the importer can select any current Polish product (defaulting to the populated TS-150 record), export a complete versioned `PL → EN` JSON package, copy a ready ChatGPT instruction with that package, validate the returned JSON, and create or update `content/product-translations/en/<entryId>.json` through Studio's native document host. `schemas/product-translation.ts` defines both the exchange package and the stored English overlay. The overlay contains only reader-facing translated content; catalogue placement, publication state, ordering, power range, media/document paths, units, project references, and other shared technical fields remain canonical in the Polish product. Imports are forced to an independent English `draft`, preserve array structure and numeric tokens, reject protected-field changes, and use a source revision to reject translations exported from an outdated Polish record. A saved overlay is merged read-only with its canonical Polish record and rendered inside the Studio tool through the same `ProductCatalogueDetail` component, with English interface labels, so editors can review the actual product composition before public EN routing exists. These translation records are not yet queried or rendered by the public site; locale-aware routing, shell copy, SEO, search, and public product merging remain a later unit.
- The homepage carousel is the first completed module in the section-by-section Studio migration. `schemas/home.ts` defines its validation and editor controls, `content/home.yml` stores the ordered slide list, `app/pages/index.vue` loads the entry, and `HomeHero` receives only normalized slide props. Each slide has HTML title/lead text, a selectable overlay or split layout, desktop and mobile media with independent focal positions, accessible alt text, an optional caption, and two editable links. The remaining homepage sections stay in `data/home.ts` until migrated one at a time; inactive legacy fields from the previous home content record are preserved in `context/archive/home-legacy-sections.yml`, not exposed as misleading Studio controls.
- Nuxt Studio `1.7.0` consumes the carousel's editor input metadata (including media pickers), but currently displays generated property names instead of the custom labels already present in the Nuxt Content JSON schema. Studio itself is configured with Polish as its default locale. Do not patch vendor code; retain the schema metadata for forward compatibility and reassess labels during a deliberate Studio dependency upgrade.
- `npm run dev:studio` explicitly clears production GitHub OAuth credentials for the child dev process so local editing always uses Nuxt Studio's direct filesystem mode. Open the regular local site URL and use the floating Studio button; the configured `/_studio` route remains relevant to authenticated production deployments.
- Studio preview synchronization is isolated in `app/plugins/studio-products.client.ts`, which is included only when `NUXT_STUDIO_ENABLED=1`. The public build does not start Studio polling or eagerly load the JSON importer; the importer is a lazy component guarded by the same runtime flag. Studio document refreshes switch the catalogue to preview data only after a successful database read; a failed refresh preserves the last valid Studio result or falls back to published server data instead of clearing the catalogue.
- Production Studio access uses a custom, server-verified company credential instead of GitHub or Google OAuth. `/_studio` redirects to `/studio-login`; the login handler accepts one or more normalized allowlisted emails from the comma-separated `NUXT_STUDIO_LOGIN_EMAIL` value, verifies the submitted password against a shared salted scrypt hash from `NUXT_STUDIO_LOGIN_PASSWORD_HASH`, rate-limits failed attempts, and creates the native Nuxt Studio user session using the address that logged in. A plaintext password must never be stored in the repository or deployment variables. Git publishing remains a separate machine-to-machine concern: Nuxt Studio `1.7.0` receives `STUDIO_GITHUB_TOKEN`, which must be a fine-grained token from a dedicated service account, restricted to this repository with only `Contents: Read and write`. This shared-token arrangement supports several allowed email addresses but still uses one shared password and editor role; move to a dedicated identity provider if individual passwords, roles, or revocation are later required.
- All public Vue code reads Nuxt Content through narrow handlers in `server/api/content/`. `queryCollection*` must not be called below `app/`, because importing its client adapter publishes SQLite WASM, workers, and database dumps. The header catalogue uses the dedicated `/api/content/catalogue` handler, with `/api/content/site` retained as a compatibility fallback, so a navigation/search payload issue cannot empty the product mega-menu. `npm run verify:build-output` enforces the public artifact boundary after a production build.
- The seven Lucide icons used by the public UI are pre-bundled through Nuxt Icon's client bundle with runtime providers disabled. Keep dynamic Nuxt UI icons in the explicit `icon.clientBundle.icons` list; production must not depend on the local icon API or an external Iconify fallback.
- Node 22 is the deployment runtime contract (`package.json#engines`), with `22.20.0` used locally through `.nvmrc`. Nuxt Content explicitly uses Node's built-in `node:sqlite` connector so Vercel does not load an ABI-sensitive `better-sqlite3` binary. `npm run typecheck` and `npm test` are required architectural checks; catalogue tests verify unique ids, schema/taxonomy slug agreement, product placements, stable title-independent merging, and the searchable taxonomy mirror.
- Current static marketing routes `/`, `/produkty`, `/uslugi`, `/o-firmie`, `/dofinansowania`, and `/rodo` are prerendered through Nuxt `routeRules`; legacy `/o-nas` redirects to `/o-firmie`, and legacy `/kontakt` redirects to the homepage contact form at `/#kontakt`.

Do not hardcode repeated contact details, offer labels, or product groups in many components.

## Routing Model

Recommended routes:

- `/`
- `/o-firmie`
- `/rozwiazania`
- `/rozwiazania/[slug]`
- `/produkty`
- `/uslugi`
- `/realizacje`
- `/baza-wiedzy`
- `/do-pobrania`

Routes can be reduced if scope is smaller, but should not become inconsistent with navigation.
Current product scope uses `/produkty` only; product detail pages are not planned.
The confirmed service categories use one index route, `/uslugi`, with anchored sections; service detail routes are not planned yet.
There is no standalone contact page in the current implementation; contact CTAs target `/#kontakt`.
The company page ends after its history section and no longer fetches team records or renders team/contact sections. The legacy `/zespol` route redirects to `/o-firmie` without the removed team anchor; the footer no longer links to that section.
The owner-confirmed `/koncesja` route is prerendered and currently contains only an accessible page heading inside the shared site shell; its visible content remains empty.

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
- `SiteHeaderDesktop`
- `SiteHeaderMobileBar`
- `SiteHeaderMobileMenu`
- `UiLocaleProvider`
- `MegaMenu`
- `ProductMegaMenu`
- `ServiceMegaMenu`
- `SiteFooter`
- `HomeHero`
- `HomeScope`
- `HomePartners`
- `HomeRealizations`
- `HomeContactForm`
- `ProductCatalogueIndex`
- `ProductCatalogueCategory`
- `ProductCatalogueTabs`
- `ProductCatalogueDetail`
- `ProductCatalogueDisclosure`
- `TeamGrid`

Components should accept data through props. Do not make every component fetch or define its own data.

`SiteHeader` owns only cross-page interaction effects: mobile open state, focus restoration, scroll locking, `inert`, Escape, and breakpoint cleanup. Desktop markup, the mobile trigger bar, and the mobile navigation panel live in separate components and receive navigation data through props. The mobile panel is an async component; focus placement reacts to the mounted component ref instead of assuming it exists after the parent's first render tick.

The public app does not use the global Nuxt UI `UApp` shell because it has no global toast or programmatic overlay requirement. Search triggers are native buttons, while the lazy content-search modal is wrapped only in `UiLocaleProvider` so Polish accessibility labels remain available without loading the global toaster, tooltip, and overlay providers in the entry chunk.

Client bundle boundaries are intentional: Lenis is imported dynamically only when reduced motion is not requested, the mobile navigation panel is lazy, and `tailwind-merge` is isolated as the stable `style-runtime` vendor chunk. Keep the largest production JavaScript chunk below Vite's 500 kB warning threshold; do not silence the warning by increasing the threshold.

`ProductCatalogueIndex` is the shared prop-driven search/accordion panel used by `/produkty` and the desktop product mega-menu. Each host owns independent selection and expansion state; both use `filterCatalogueCategories` and `resolveCatalogueSelection` for consistent filtering and stable ids. Each index creates a unique search input id. The mega-menu reuses catalogue family/category renders without fetching full product sheets. Catalogue hash navigation is watched on the existing route as well as on initial mount, and clears an obsolete page search before applying an external selection.

## State and Interactivity

For the current public website, state should remain minimal:

- navigation open/closed
- mega menu open/closed
- mobile menu open/closed
- locally persisted accessibility preferences (text size, higher contrast, reduced motion)
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
