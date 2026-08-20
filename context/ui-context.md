# UI Context

## Visual Thesis

Termospec should look like a modern industrial engineering company: technical, precise, confident, and premium. The design should avoid generic SaaS styling and generic HVAC stock-template patterns.

The visual language should combine:

- deep technical navy/violet surfaces
- burgundy brand accents
- white space for clarity
- strong typography
- structured industrial layouts
- subtle motion, not playful animation
- product/service visibility directly in navigation

## Theme

Primary direction: light content sections with dark technical hero/feature surfaces.  
The site is not dark-only, but the deep brand color should anchor key sections.

## Brand Colors

Use CSS custom properties in `globals.css` and map them to Tailwind v4 tokens through `@theme inline`.

| Role                  | CSS Variable               | Value                       |
| --------------------- | -------------------------- | --------------------------- |
| Deep brand / ink      | `--color-brand-ink`        | `#120B38`                   |
| Burgundy accent       | `--color-brand-burgundy`   | `#9A0B2E`                   |
| White                 | `--color-brand-white`      | `#FFFFFF`                   |
| Page background       | `--color-bg-page`          | `#FFFFFF`                   |
| Soft background       | `--color-bg-soft`          | `#F7F5F8`                   |
| Dark surface          | `--color-bg-deep`          | `#120B38`                   |
| Elevated dark surface | `--color-bg-deep-elevated` | `#1C1450`                   |
| Primary text          | `--color-text-primary`     | `#120B38`                   |
| Secondary text        | `--color-text-secondary`   | `rgba(18, 11, 56, 0.72)`    |
| Muted text            | `--color-text-muted`       | `rgba(18, 11, 56, 0.52)`    |
| Text on dark          | `--color-text-inverse`     | `#FFFFFF`                   |
| Border subtle         | `--color-border-subtle`    | `rgba(18, 11, 56, 0.12)`    |
| Border on dark        | `--color-border-inverse`   | `rgba(255, 255, 255, 0.14)` |
| Accent soft           | `--color-accent-soft`      | `rgba(154, 11, 46, 0.10)`   |

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

| Role             | Font                             | Notes                                                                         |
| ---------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| UI and body      | DM Sans                          | Load through Google Fonts / framework font utility.                           |
| Headings         | Manrope                          | Load through Google Fonts; use tighter tracking, larger scale, strong weight. |
| Technical labels | DM Sans or system mono if needed | Use sparingly for specs, codes, parameters.                                   |

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

- burgundy background
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

- Desktop navigation follows the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Szukaj`; `Aktualności` is removed and the logo remains the home link.
- `Produkty` and `Usługi` use Nuxt UI `UNavigationMenu` for hover/focus trigger and viewport behavior.
- `ProductMegaMenu` is a three-column technical index sourced from Studio-editable `content/catalogue.yml`. It shows all nine confirmed uppercase product categories, uppercase subcategories, and exact model lists or series; editorial future-development notes stay hidden from the public menu.
- Main categories and uppercase subcategories have optional render slots. Do not show invented image placeholders while final client renders are unavailable.
- `ServiceMegaMenu` lists the five confirmed service categories and links them to anchored sections on `/uslugi`.
- Global search uses the existing Nuxt UI/Nuxt Content search dialog as the final desktop navigation item instead of a separate floating search action.
- Below the `xl` breakpoint, the desktop header is replaced by a compact logo/menu bar and a full-screen off-canvas navigation panel.

### Mobile

- Use the implemented full-screen off-canvas menu from `SiteHeader`: main navigation on the left/full width and a secondary utility column on tablets.
- Keep the confirmed order `O firmie`, `Produkty`, `Usługi`, `Kontakt`, `Szukaj`; do not restore `Aktualności`.
- `Produkty` expands to the complete hierarchy from `data/navigation.ts` and includes a direct `Pełny katalog` link.
- `Usługi` expands to the five confirmed categories and includes a direct `/uslugi` index link.
- Search is the final main-menu row; funding, languages, and the offer CTA sit in the menu utility area.
- Lock background scroll and remove the underlying page from keyboard interaction while the menu is open.

## Imagery

- Prefer real industrial photos, machines, installations, tunnels, mines, engineering details.
- Avoid generic smiling business stock photos.
- If real photos are low quality, use them selectively and support them with strong layout/typography.
- Do not overuse decorative gradients.
- Homepage hero media is art-directed per breakpoint: each slide defines a desktop and mobile source plus its focal position in Studio-editable `content/home.yml`, and `HomeHero` selects them through `<picture>`. Keep headings, descriptions, CTAs, and explanatory labels in HTML rather than baking them into hero images.

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

The page should begin directly below the fixed header as a technical catalogue workspace:

- full viewport width,
- no outer max-width container,
- no large side gutters,
- no `mx-auto` page wrapper,
- no route-level `px-6`, `px-10`, or decorative page padding,
- only internal padding inside grid cells.

Desktop layout:

- left catalogue index column,
- right confirmed category-taxonomy column,
- controlled active state in the left nine-category index,
- structural 1px lines between areas,
- square geometry,
- no shadows,
- no large rounded cards.

The catalogue is a working B2B product surface, not a landing page.

Catalogue content treatment:

- each main category uses a compact deep navy register with only its uppercase heading; the left index also shows category names without numeric prefixes, and the heading scales fluidly to stay on one line,
- uppercase subcategories are plain typographic sections below their parent category, without decorative dashes or repeated numbering,
- exact types are individual monospace entries; typoszereg and custom-range copy remain compact descriptive rows,
- editorial notes from the client brief stay in Nuxt Studio data but are not rendered as public catalogue copy,
- optional category/subcategory renders occupy a dedicated right-side media cell only when verified artwork exists,
- verified category and subcategory renders use a larger product-family stage so the machine is legible before the model list,
- placed `content/products/*` records use a compact title/lead disclosure at their taxonomy location; opening it reveals the full inline technical sheet with supplied media, specifications, authored sections, applications, features, components, and service scope, while empty fields disappear instead of producing placeholders,
- category-only detailed records follow all of the category's family rows, so a category always opens with its taxonomy rather than a long product description,
- family model/type entries form one compact horizontal tab strip below the family render instead of separate boxed grid cells; the tabs use the available width with even spacing, the active model is a solid burgundy field with white text matching the primary header CTA, and overflowing sets scroll horizontally,
- selecting a model reveals its authored product details directly below the tab strip when a matching placed product record exists; a model without authored details changes selection without creating an empty placeholder,
- do not show fake render placeholders before the client provides the August artwork.
