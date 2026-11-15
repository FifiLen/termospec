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
| Fonts | Host Grotesk | Single family for UI, body and headings (variable 300–800, self-hosted from `/_fonts` via `@nuxt/fonts`) |
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
- Company page: the Studio collection `about` (`content/about.yml`, `schemas/about.ts`, `/api/content/about`, `useAbout`). `/o-firmie` reads it directly; `app/pages/index.vue` passes its first three `metrics` to `HomeHero` as `defaultFacts`, so `HomeHero` no longer imports data modules.
- Services: the Studio collection `services` (`content/services/<slug>.yml`, `schemas/service.ts`, `/api/content/services`, `useServices`). The server endpoint and the Studio preview both order and filter records through `orderServicesByLayout` from `data/services.ts`, and `app.vue` derives the services menu from the same list with `toServiceNavigation`.
- Contact details: one source of truth — the Studio-editable `content/company.yml` (`schemas/company.ts`, `/api/content/company`). Pages and `app.vue` read it with `await useCompany()` and pass it to components as props; `useSiteSeo` builds the Organization JSON-LD from it. Formatting helpers (`telephoneHref`, `companyMapUrl`) live in `app/utils/company.ts` so public components never import zod schemas.
- Reusable CTA copy: one source of truth.
- Search index: generated on the server by `buildSearchSections` (`server/utils/search-sections.ts`, a pure function that imports types only so `node --test` can run it) from the Studio collections (`about`, `company`, `services`, `realizations`, `home`, `catalogue`, published `products`) and the `data/*.ts` copy of pages not yet in Studio. `/api/content/site` returns it with the catalogue; Nuxt UI `UContentSearch` receives the JSON and never initializes the browser SQLite/WASM adapter. There is no `pages` collection and no markdown mirror, so Studio shows only rendered content.
- When a page section moves to a collection or new searchable copy is added to `data/*.ts`, extend `buildSearchSections` in the same work unit; copy hardcoded in Vue templates is not indexed.
- Supplemental search quick links: `data/search.ts` contains visible UI/footer labels that should be searchable but do not yet have dedicated content pages. These quick links must point only to existing routes or anchors until standalone pages are confirmed.
- Confirmed product navigation: the Studio-editable `content/catalogue.yml` file defines the fixed internal `01–09` taxonomy for the public `/produkty` catalogue, desktop mega menu, and mobile product hierarchy; the numeric prefixes are not rendered in the catalogue sidebar. Every taxonomy entry has an immutable `id`. Published records from `content/products/` are merged through `cataloguePlacement.entryId`, never through their editable title; Studio preview additionally shows placed draft records with a `szkic` marker. Model and series entries render as controlled horizontal tabs. The selected entry id is the single source of UI state, is reflected in the URL hash, and is preserved across reactive product-document refreshes while that id still exists in the active branch. No separate product route is introduced. Product entries distinguish individual models, compact series labels, and descriptive capability lines; each main category and uppercase subcategory retains an optional render field for the client-supplied August artwork. The five service categories remain sourced from `data/navigation.ts` for desktop, mobile, and `/uslugi`.
- Detailed product-family identity comes from the unique content filename (`content/products/<slug>.yml` or `.json`). The same stable value is stored as `cataloguePlacement.entryId` and referenced by the matching `content/catalogue.yml` entry. The visible title can therefore change without breaking the relationship or creating a duplicate tab.
- `schemas/product.ts` is the shared product source of truth for Nuxt Content validation, the Nuxt Studio form, downloadable JSON Schema/template files, and the Studio-authorized JSON importer. The Studio form uses Polish labels, short field guidance, multiline editors for longer copy, media pickers for images/documents, and hides technical ordering flags from the client's main editing flow. Core identity/placement fields remain small, while `modelCode`, the complete `technicalData` table, `technicalNotes`, `relatedProducts`, media, documents, and longer sections are optional. Public product panels omit every unauthored field instead of rendering empty headings or placeholders. The current Nuxt Studio version has no supported custom-panel extension API, so the importer is exposed as a compact global editor tool only while an authenticated/active Studio host exists; it is not placed in the public catalogue layout. Imported records are forced to `draft`, assigned to the catalogue with `cataloguePlacement`, validated before creation, checked for filename collisions, and created through Nuxt Studio's native document host so local filesystem edits and production Git publishing follow the standard Studio workflow.
- Product translation workflow is prepared independently from public locale routing. In active Nuxt Studio, the importer can select any current Polish product (defaulting to the populated TS-150 record), export a complete versioned `PL → EN` JSON package, copy a ready ChatGPT instruction with that package, validate the returned JSON, and create or update `content/product-translations/en/<entryId>.json` through Studio's native document host. `schemas/product-translation.ts` defines both the exchange package and the stored English overlay. The overlay contains only reader-facing translated content; catalogue placement, publication state, ordering, power range, media/document paths, units, project references, and other shared technical fields remain canonical in the Polish product. Imports are forced to an independent English `draft`, preserve array structure and numeric tokens, reject protected-field changes, and use a source revision to reject translations exported from an outdated Polish record. A saved overlay is merged read-only with its canonical Polish record and rendered inside the Studio tool through the same `ProductCatalogueDetail` component, with English interface labels, so editors can review the actual product composition before public EN routing exists. These translation records are not yet queried or rendered by the public site; locale-aware routing, shell copy, SEO, search, and public product merging remain a later unit.
- The homepage carousel is the first completed module in the section-by-section Studio migration. `schemas/home.ts` defines its validation and editor controls, `content/home.yml` stores the ordered slide list, `app/pages/index.vue` loads the entry, and `HomeHero` receives only normalized slide props. Each slide has HTML title/lead text, an optional caption, up to three optional `facts`, a selectable overlay or full-frame layout, desktop and mobile media with independent focal positions, accessible alt text, an optional caption, and two editable links. The remaining homepage sections stay in `data/home.ts` until migrated one at a time; inactive legacy fields from the previous home content record are preserved in `context/archive/home-legacy-sections.yml`, not exposed as misleading Studio controls.
- Nuxt Studio `1.7.0` consumes the carousel's editor input metadata (including media pickers), but currently displays generated property names instead of the custom labels already present in the Nuxt Content JSON schema. Studio itself is configured with Polish as its default locale. Do not patch vendor code; retain the schema metadata for forward compatibility and reassess labels during a deliberate Studio dependency upgrade.
- `npm run dev:studio` explicitly clears production GitHub OAuth credentials for the child dev process so local editing always uses Nuxt Studio's direct filesystem mode. Open the regular local site URL and use the floating Studio button; the configured `/_studio` route remains relevant to authenticated production deployments.
- Studio preview synchronization is isolated in `app/plugins/studio-preview.client.ts`, which is included only when `NUXT_STUDIO_ENABLED=1`. It syncs product and realization documents from the Studio host database into preview state (`useProductCatalogue`, `useRealizations`). The public build does not start Studio polling or eagerly load the JSON importer or the `RealizationEditor` form; both are lazy components guarded by the same runtime flag and shown only while an active Studio host exists.
- Studio double-click editing: Nuxt Studio opens a document's editor when an element with `data-content-id="<collection>/<path>"` is double-clicked. `useStudioEditable()` returns that attribute only when `NUXT_STUDIO_ENABLED=1`, so public HTML carries no editing markers. Content endpoints that back editable sections return the record `id` (company, realizations; `home` returns the whole record), and the preview plugin keeps the id on Studio drafts. The preview plugin also mirrors the `company.yml` draft into `useState('studio-company')`, so contact edits appear in the preview before publishing.
- Composables that `await` (e.g. `useCompany`) must resolve every Nuxt composable (`useState`, `useRuntimeConfig`) before the first `await`; only top-level awaits in `<script setup>` restore the Nuxt instance.
- Custom Studio forms (pilot: `RealizationEditor`) are a friendlier front end over Studio, not a separate CMS: they validate with the shared zod schema, write through `useStudioHost().document.db.create`, request a preview rerender and open the document in Studio, so drafts, media and Git publishing stay native. `useStudioHost` is an undocumented host API typed locally in `types/studio.ts`; re-verify it on every `nuxt-studio` upgrade. Avoid `.int()` on numeric content fields — Nuxt Content stores them as text and the browser preview validation then rejects the records. Studio document refreshes switch the catalogue to preview data only after a successful database read; a failed refresh preserves the last valid Studio result or falls back to published server data instead of clearing the catalogue.
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

Current implementation:

- `nuxt.config.ts` sets `<html lang="pl">` and the global `titleTemplate` `%s | Termospec`. Pages call `usePageSeo({ title, description })` with the short page name (`"O firmie"`), which also sets `og:title` / `og:description`. The homepage passes `standaloneTitle: true` because its title already names the brand.
- `app.vue` calls `useSiteSeo()` once: canonical and `og:url` (production origin + route path, no trailing slash), shared Open Graph/Twitter defaults with `/images/brand/og-termospec.jpg` (1200×630), and a site-wide `Organization` JSON-LD block.
- The production origin is `runtimeConfig.public.siteUrl` (default `https://termospec.pl`, override with `NUXT_PUBLIC_SITE_URL`). Company identity for SEO lives in `data/company.ts`.
- `/robots.txt` and `/sitemap.xml` are Nitro server routes (`server/routes/`), prerendered at build time. Indexable paths are listed in `server/utils/sitemap-routes.ts`; keep it aligned with the prerendered `routeRules` when routes are added or removed.
- Each page has exactly one `h1`. On the homepage it is a visually hidden heading in `app/pages/index.vue`; hero slide titles are `h2`.

## Image / Asset Model

- Raster images render through `NuxtImg` with `format="webp"` and a breakpoint `sizes` list (`image.quality: 80`). In Nuxt Image v2 every `sizes` entry needs a breakpoint prefix: a bare base value such as `100vw` is measured against 1 px and adds useless 1–2 px srcset candidates. Use `xs:`/`sm:` for the smallest range. `image.screens` adds `xs` (480) and `3xl` (1920) to the Tailwind defaults; on Vercel these screens are the only widths the image optimizer serves.
- `HomeHero` keeps its art-directed `<picture>` (separate mobile source) and builds srcsets with `useImage().getSizes`; the first slide is preloaded per media query. SVG logos stay plain `<img>` because image optimizers do not process SVG.
- Source photos are stored as WebP or JPG, not multi-megabyte PNG. Files no page references are removed from `public/` (recover them from git history when needed).
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
