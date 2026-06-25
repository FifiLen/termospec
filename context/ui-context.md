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
- Treat `/produkty` as one complete catalogue surface: technical left-side index on desktop, local search, category controls, product quick navigation, full product-family sheets, service/support scope, and related realization context.
- On mobile, the left catalogue index becomes a full-width selector section above the product sheets; it must not become a cramped app-style sidebar.
- Product-family entries should use the available page width to show a business-readable product overview, product media, parameters, applications, features, components, service/support scope, source-based technical descriptions, and related realizations without sending users to product detail routes.
- The left panel should feel like an industrial catalogue index/spis produktów: thin separators, uppercase labels, visible local search with a magnifying-glass cue, and a restrained active state where only the current item text turns burgundy.
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

- Desktop `Produkty` uses Nuxt UI `UNavigationMenu` for the hover/focus trigger and viewport behavior.
- The menu content is a fixed 3-column white card grid backed by `content/products/*.yml`: each product-family card shows only the product name and its technical sketch.
- Menu links point to existing `/produkty#produkt-*` anchors because product detail routes are not planned.
- Mobile keeps a direct `/produkty` link until a confirmed off-canvas mobile menu is implemented.

### Mobile

- Simple off-canvas menu.
- Product groups must remain accessible.
- Avoid hiding core offer pages behind too many taps.

## Imagery

- Prefer real industrial photos, machines, installations, tunnels, mines, engineering details.
- Avoid generic smiling business stock photos.
- If real photos are low quality, use them selectively and support them with strong layout/typography.
- Do not overuse decorative gradients.

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
- right product-family content column,
- scroll-linked active state in the left index, including auto-opening the active product group accordion and marking the current product,
- structural 1px lines between areas,
- square geometry,
- no shadows,
- no large rounded cards.

The catalogue is a working B2B product surface, not a landing page.
