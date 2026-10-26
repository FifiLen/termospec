# UI Context

## Visual Thesis

Termospec should look like a modern industrial engineering company: technical, precise, confident, and premium. The design should avoid generic SaaS styling and generic HVAC stock-template patterns.

The visual language should combine:

- deep technical navy surfaces
- brand red (`#DF0210`) accents
- white space for clarity
- strong typography
- structured industrial layouts
- subtle motion, not playful animation
- product/service visibility directly in navigation

## Theme

Primary direction: light content sections with dark technical hero/feature surfaces.  
The site is not dark-only, but the deep brand color should anchor key sections.

## Brand Colors

Source: the client-approved October 2026 homepage PSD. Tokens live in `app/assets/css/main.css` (`@theme`) and replace the earlier burgundy/violet palette across the whole site.

| Role | Token | Value |
| --- | --- | --- |
| Brand red (CTA, accents, icons) | `brand` | `#DF0210` |
| Deep navy surfaces / ink | `ink` | `#0A1847` |
| Darker navy (footer utility cards, map) | `ink-deep` | `#000B3B` |
| Heading navy | `heading` | `#101844` |
| Secondary text | `muted` | `#424971` |
| Page surface | `surface` | `#F6F7F8` |
| Form fields | `field` | `#F3F3F3` |
| Header utility chips | `chip` | `#EBEBEB` |
| Logo placeholders | `placeholder` | `#E2E2E2` |
| Dividers | `line` | `#DEE2F4` |
| Signal yellow (legacy, no longer used on the homepage/footer) | `signal` | `#F9CD34` |

## Tailwind Token Usage

Use token-based utilities only after mapping them in Tailwind v4.

Recommended names:

- `bg-page`
- `bg-soft`
- `bg-deep`
- `bg-deep-elevated`
- `text-primary`
- `text-secondary`
- `text-muted`
- `text-inverse`
- `text-brand`
- `bg-brand`
- `border-subtle`
- `border-inverse`
- `bg-accent-soft`

Do not use random raw classes like `text-zinc-700`, `bg-slate-950`, `from-purple-900`, or hardcoded hex values inside components.

## Typography

Host Grotesk (Google Fonts, weights 300–800) is the single family for UI, body and headings, replacing DM Sans per the PSD. Homepage type is specified against the 1920 px artboard and scales with viewport through `clamp(…, vw, …)`; shared helpers `.design-shell` (111 rem max, `--design-gutter` ≈ 73 px at 1920), `.design-heading` (bold ~73 px, 1.19 line height), `.design-lead` (~25 px), `.design-subheading` (~29 px bold), `.design-body` (~22 px) and `.design-button` (pill CTA) live in `main.css`. Section eyebrows use `SectionEyebrow` (96 px red rule + uppercase 0.24em tracked label).

Typography direction:

- Big, confident headings.
- Short paragraphs.
- Technical labels and eyebrow text in uppercase/small caps only when useful.
- Avoid long, dense homepage paragraphs.
- Use Polish copy by default.

## Layout Principles

- Full-width sections with controlled inner max-width.
- Use clear vertical rhythm: large section padding, not cramped blocks.
- Industrial content should feel ordered: grids, split layouts, specification blocks, process rows.
- Cards are acceptable, but avoid over-carded SaaS grids.
- Use strong hierarchy: headline → short explanation → technical/product categories → CTA.
- Keep product/service pages scannable.

## Owner Style Direction

The owner prefers a more editorial, image-led industrial layout over oversized marketing claim sections.

Use this direction when changing company/about pages:

- Avoid empty split sections where one side contains a huge headline and the other side contains long body copy.
- Avoid oversized poster-style H2 blocks such as the current `/o-nas` "Pozycja lidera..." section unless the owner explicitly asks for that treatment.
- Prefer wide industrial imagery, strong grid rhythm, calm typography, and content that feels placed into a composed page rather than a generic landing-page section.
- Let facts, photos, spacing, and sequence carry credibility. Do not rely on massive text scale alone.
- Keep page sections connected visually to the surrounding page, especially when the owner has already designed adjacent sections manually.

## Product Catalogue Direction

The product catalogue should be a functional B2B technical catalogue, not a landing-page hero, app dashboard, documentation template, or e-commerce listing.

- Start `/produkty` directly below the fixed header with the catalogue workspace itself. Do not add a hero, compact intro, live counters, catalogue stats panel, or marketing preface above the index/content grid.
- Treat `/produkty` as one complete catalogue surface: a narrow technical left-side product index from the `sm` breakpoint, local search, expandable category controls, product/family quick navigation, full product-family sheets, service/support scope, and related realization context.
- On mobile, the left catalogue index becomes a full-width selector section above the product sheets; it must not become a cramped app-style sidebar.
- Product-family entries should use the available page width to show a business-readable product overview, product media, parameters, applications, features, components, service/support scope, source-based technical descriptions, and related realizations without sending users to product detail routes.
- The left panel should feel like a classic industrial product index: approximately `18rem` wide, thin separators, uppercase main labels that do not wrap, visible local search, a restrained burgundy active category, and one expanded nested list showing the families or models that belong to that category.
- Category rows use the existing Nuxt UI `UCollapsible` primitive for a restrained height reveal and chevron rotation. Opening a category only reveals its nested index; it must not scroll the page, and scroll-linked catalogue activity must not automatically open or close the user's chosen index section.
- Nested index items navigate directly to the matching family, product disclosure, or model tab in the catalogue content; avoid counts, badges, decorative marks, and extra explanatory copy in this navigation.
- The left catalogue index starts directly with local search; do not add a separate dark title strip above it.
- Main category registers use a compact dark band (`min-h-24` without media); categories with a supplied render keep the same heading/image alignment in a reduced `min-h-40` stage.
- Product entries must not show e-commerce language or purchase-style CTAs such as "kup teraz". A global product contact path may exist at the end of the catalogue, but it should read as technical inquiry support.
- Keep the catalogue aligned with the current homepage direction: white industrial surfaces, burgundy technical accents, strong product and realization imagery where available, sharp line-based separators, restrained typography, square geometry, and no box shadows.
- If final product photography or product-specific realization data is missing, do not invent named case studies. Use existing product media and visible realization materials, and keep final verification as an open question in `progress-tracker.md`.

## Border Radius

Use restrained radius.

| Context                | Class                                                     |
| ---------------------- | --------------------------------------------------------- |
| Small buttons / tags   | `rounded-full` or `rounded-xl`                            |
| Cards / panels         | `rounded-2xl`                                             |
| Large feature blocks   | `rounded-3xl`                                             |
| Industrial image masks | mostly square or subtle `rounded-2xl`, not overly playful |

## Buttons

Primary button:

- brand red background
- white text
- subtle hover darkening or lift
- used for contact / key CTA

Secondary button:

- white or transparent on dark sections
- border based on context
- never generic gray if token is available

Avoid outline buttons that look unfinished. Secondary actions should still feel intentional.

## Navigation

Navigation is critical.

The owner-confirmed `koncesja` link ends the list of page links after `kontakt` on desktop and mobile. Search, locale, funding and accessibility remain utility controls. The `/koncesja` content area stays visually empty until the owner supplies content.

### Desktop

- Top navbar with logo, primary links, and CTA.
- Use a mega menu for products/solutions.
- Mega menu must show visible product/service groups, not only text links.
- Recommended groups:
  - Rozwiązania dla kopalń i tuneli
  - Chłodzenie / wentylacja / klimatyzacja przemysłowa
  - Serwis i modernizacja
  - Pompy ciepła / HVAC, only if confirmed as current offer
  - Realizacje / referencje
- Mega menu should have:
  - category title
  - short description
  - 2–5 links per group
  - highlighted CTA/contact block

Current product mega menu implementation:

- The global header is a full-width fixed white bar (PSD design): vector logo `/images/brand/termospec-logo.svg`, bold capitalised navy links with red active/hover state, and grey utility chips for search, PL/EN, accessibility and the EU funding mark. Mega-menu panels open below it inside `.design-shell`.
- Desktop product and service controls open a separate rounded white panel below the bar. The product panel mirrors the catalogue: a burgundy searchable accordion index on the left and the selected family/category render with model label and a catalogue link on the right. Its height is capped at `min(42rem, 100dvh - 7.25rem)`; the index scrolls independently and the image fits the remaining preview height. Categories containing models directly use the same hierarchy as grouped series: a dark group heading followed by compact, light model links in a wrapping row; service shortcuts remain sourced from `data/services.ts`.
- The accessibility-settings control is part of the desktop navigation action cluster directly after the PL/EN switch. It uses the same warm neutral circular treatment and 44 px height as search and language controls; there is no separate floating accessibility button outside the navigation.
- The accessibility control opens a compact panel aligned under the navigation bar rather than a separate page or floating widget. Its deep-ink header and white control surface use the same rounded geometry as the menu panels; high contrast, text size and motion preferences remain functional on both desktop and mobile.
- The desktop service mega-menu renders the five confirmed service categories as five equal numbered surface tiles (red number, bold label, red arrow; hover turns navy). `Serwis 24/7` appears only once in that list; there is no separate emergency-service aside duplicating it.
- Simple content pages (`/dofinansowania`, `/rodo`) open with the shared `PageIntro` (eyebrow + `.design-heading` title + optional lead) on the surface background, followed by one white rounded content card with `.design-body` copy, red-dash bullets and divider-led fact/clause lists. `/koncesja` intentionally stays visually empty (owner decision) with only the header offset.
- `/o-firmie` uses the same PSD system (surface/white alternation, `SectionEyebrow`, `.design-heading`, numbered navy/white value cards, red-year timeline on a thin axis); no beige surfaces remain.
- `/uslugi` uses the homepage PSD system: surface intro with `SectionEyebrow` + `Usługi` heading/lead and five numbered white index cards (`Serwis 24/7` navy), then alternating white/surface service sections with numbered eyebrows, `.design-heading` titles, `.design-lead`/`.design-body` copy, rounded images, surface or white cards, a navy `Serwis 24/7` panel, white machine specification cards with divider rows, and a closing navy contact panel. The red `Serwis 24/7` phone box is the shared `ServiceHotline` component (also used on the homepage).
- Below `xl`, the header collapses to a rounded white logo bar with circular search and menu controls. The open state is a deep-navy full-screen panel with large primary navigation, compact product/service accordions, the 24-hour service number, locale controls, and the EU funding mark.

- Desktop navigation follows the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Szukaj`; `Aktualności` is removed and the logo remains the home link.
- `Produkty` and `Usługi` use Nuxt UI `UNavigationMenu` for hover/focus trigger and viewport behavior.
- `ProductMegaMenu` reuses `ProductCatalogueIndex` from `/produkty`, including its search and category → family → model hierarchy sourced from Studio-editable `content/catalogue.yml`. Category/family/model selection updates the compact preview without navigating; its link opens the selected catalogue hash. Use the same verified family/category render as the catalogue and omit absent artwork. Editorial future-development notes stay hidden. Arrow Down on the desktop product link focuses the menu search.
- Main categories and uppercase subcategories have optional render slots. Do not show invented image placeholders while final client renders are unavailable.
- `ServiceMegaMenu` lists the five confirmed service categories and links them to anchored sections on `/uslugi`.
- The desktop service mega menu highlights `Serwis 24/7` with a navy tile (red on hover) and white text. Its visible gap below the navigation bar is implemented as padding inside the active hover region, so moving the pointer from the bar to the service or product panel does not close the menu. `Produkty` and `Usługi` are real route links while retaining hover/focus panel opening.
- Global search uses the existing Nuxt UI/Nuxt Content search dialog from the compact search pill on desktop and the circular search control on mobile.
- Search results are organized as explicit `Oferta`, `Firma`, `Kontakt i dokumenty`, and query-only `Strony i treści` groups. The shared Nuxt UI command palette uses visible group labels and dividers; do not restore the previous unlabelled flat stream of navigation documents.
- Below the `xl` breakpoint, the desktop header is replaced by a compact rounded logo/search/menu bar and a full-screen navigation panel.

### Mobile

- Use the implemented full-screen off-canvas menu from `SiteHeader`: main navigation on the left/full width and a secondary utility column on tablets.
- Keep the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Szukaj`; do not restore `Aktualności`.
- `Produkty` expands to the complete hierarchy from `data/navigation.ts` and includes a direct `Pełny katalog` link.
- `Usługi` expands to the five confirmed categories and includes a direct `/uslugi` index link.
- Search is the final main-menu row. On desktop, languages and the mandatory EU funding mark sit in the utility area; on mobile, funding, languages, and the offer CTA remain in the menu utility area.
- Lock background scroll and remove the underlying page from keyboard interaction while the menu is open.

## Footer

- Deep-navy `SiteFooter` from the PSD: white vector logo, positioning paragraph, contact lines, registry line (`KRS • NIP • REGON • Kapitał`); `Firma` and `Informacje` link columns with red tracked headings; a red `Porozmawiajmy o Twoim projekcie` card with the service photo and navy `wyślij zapytanie` button; two darker `Kariera` / `Serwis` utility cards; rule and copyright. The previous yellow footer and certificate pills are retired.

## Contact Section

- `HomeContactForm`: navy rounded panel (heading, lead, `Adres`/`Kontakt` columns, red `Serwis 24/7` phone box with tool icon, embedded Google map with `Otwórz w Mapach`) beside a white rounded form with light-grey fields, pill topic radios and a red `wyślij` button.

## Homepage Sections

- Order: hero → scope (surface) → realizations (white) → contact (surface) → partners (white) → footer. Each section opens with `SectionEyebrow`, a three-line `.design-heading` on the left 58 % and a bottom-aligned `.design-lead` on the right.
- Scope cards are equal white cards with red numbers, red masked PSD icons (`/images/home/ikona-*.png`), dividers, red-dash lists and red pill actions; no card is colour-emphasised. The headquarters image is the PSD roof-cutout composite as one static transparent WebP — this supersedes the earlier owner request to drop the cutout, because the client's new design reintroduces it.
- The yellow scope/partners background motif and the deep-navy partners panel are retired.

## Imagery

- Prefer real industrial photos, machines, installations, tunnels, mines, engineering details.
- Avoid generic smiling business stock photos.
- If real photos are low quality, use them selectively and support them with strong layout/typography.
- Do not overuse decorative gradients.
- Homepage hero media is art-directed per breakpoint: each slide defines a desktop and mobile source plus its focal position in Studio-editable `content/home.yml`, and `HomeHero` selects them through `<picture>`. Keep headings, descriptions, CTAs, and explanatory labels in HTML rather than baking them into hero images, except for the explicitly supplied full-frame machining artwork.
- The homepage hero follows the PSD: full-screen pre-darkened banners with copy placed directly on the image (no glass column), red/outline pill CTAs, a fact row under a white rule and a navy carousel capsule. On desktop the copy block is vertically centred in the visible area below the fixed header (`--site-header-height` + equal `--hero-gap` above and below), and titles are sized/wide enough to stay within three lines. Superseded description: the homepage hero used the approved full-screen photographic carousel with a glass content band. On desktop, the active image fills the viewport while a deep-ink translucent, blurred column occupies the left `42%` at full height; the image remains subtly visible beneath the column and clearly visible beside it. The column contains the authored caption, DM Sans title, lead, two actions and three existing company facts. On mobile, the same glass surface becomes a lower panel so the photograph retains a clear upper reveal. A compact deep-ink carousel capsule stays at the lower-right edge with direct numbered selectors, autoplay progress and previous/next controls. The explicit machining artwork remains a text-free full-frame exception. The existing global navigation must not be restyled or rebuilt as part of this hero composition.

## Motion

Motion should be subtle:

- navbar/mega menu reveal
- section entrance
- image parallax only if smooth and restrained
- no bouncy or playful animation
- no excessive animated background effects

## Accessibility

- High contrast between text and backgrounds.
- Buttons and links must be keyboard accessible.
- Do not communicate state using color alone.
- Use semantic headings and landmarks.

## Product Catalogue Current Decision

`/produkty` must not start with a hero, compact intro, intro poster, stats panel, counters panel, or marketing section.

The catalogue begins below the fixed header as a contained technical workspace aligned with the site's other sections:

- use the shared `.design-shell` width and gutters (same axis as the homepage); the sticky index offset follows `--site-header-height`,
- split the workspace into two visually separate rounded panels,
- render the left catalogue navigation on the Termospec brand-red surface with white text,
- render the flexible right catalogue content panel on white,
- keep the navigation sticky on desktop and stack both panels on smaller screens.

Desktop layout:

- `clamp(18rem, 19vw, 23rem)` catalogue index panel,
- flexible confirmed category-taxonomy panel,
- controlled active state in the left nine-category index,
- a `clamp(1.25rem, 1.6vw, 1.9rem)` gap between panels; both panels and the mega-menu use the homepage card radius `clamp(1.5rem, 2.6vw, 3.1rem)`,
- catalogue, model and mega-menu headings use bold Host Grotesk with the homepage `-0.015em` tracking; model codes and table values are set in the regular sans (tabular numerals), not monospace,
- no decorative shadows.

The catalogue is a working B2B product surface, not a landing page.

Catalogue content treatment:

- the right panel opens with a quiet editorial category heading instead of a second dark navigation register,
- the active family/category render sits in one balanced soft-surface stage with a large DM Sans family name and a separate white media field,
- exact models form a clearly labelled horizontal selector; active models use the brand-red fill, inactive models use the shared soft surface, and overflowing sets scroll horizontally,
- the selected model is introduced once with its model name, optional range and authored lead; the family render is not duplicated inside that model introduction,
- primary specifications form one divider-led row, while longer technical sections use plain headings and horizontal separators rather than repeated numeric prefixes,
- the detailed product description starts with one paired purpose chapter: verified narrative copy uses a deep-ink field and authored application areas form the adjacent technical list, eliminating the repeated `Zastosowanie` heading,
- authored gallery media forms a wide image-led chapter before the longer operating description; no placeholder media is generated when the gallery is empty,
- operating and circulation sections use a calm two-column editorial register, while complete technical data retains a full-width table,
- features, components, related products, service scope and downloads form one responsive soft-surface register and disappear when their source arrays are empty,
- authored related applications/projects render as the final image-and-copy chapter; no project content is invented in the component,
- typoszereg and custom-range copy remain compact descriptive rows,
- editorial notes from the client brief stay in Nuxt Studio data but are not rendered as public catalogue copy,
- optional category/subcategory renders occupy a dedicated right-side media cell only when verified artwork exists,
- verified category and subcategory renders use a larger product-family stage so the machine is legible before the model list,
- placed `content/products/*` records use a compact title/lead disclosure at their taxonomy location; opening it reveals the full inline technical sheet with supplied media, specifications, authored sections, applications, features, components, and service scope, while empty fields disappear instead of producing placeholders,
- category-only detailed records follow all of the category's family rows, so a category always opens with its taxonomy rather than a long product description,
- family model/type entries form one compact horizontal selector below the family render instead of separate boxed grid cells; the active model is a solid burgundy pill with white text and overflowing sets scroll horizontally,
- selecting a model reveals its authored product details directly below the tab strip when a matching placed product record exists; a model without authored details changes selection without creating an empty placeholder,
- do not show fake render placeholders before the client provides the August artwork.
