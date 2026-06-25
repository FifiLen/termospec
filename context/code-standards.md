# Code Standards

## General

- Keep files small and single-purpose.
- Fix root causes instead of layering visual patches.
- Do not mix unrelated concerns in one component.
- Do not rewrite working sections without a clear reason.
- Preserve existing UX decisions unless the task explicitly changes them.

## TypeScript

- Use TypeScript strictness.
- Avoid `any`.
- Define interfaces for object contracts.
- Type component props explicitly.
- Validate or narrow external/unknown content before rendering it.

## Vue / Nuxt

- Prefer Vue Single File Components with clear `script setup lang="ts"`.
- Keep route pages thin and composed from section components.
- Use Nuxt conventions instead of custom routing hacks.
- Use framework SEO utilities for metadata.
- Add client-only behavior only when browser APIs or interaction require it.
- Keep composables small and named after their responsibility.

## Styling

- Use Tailwind v4 token utilities mapped from CSS custom properties.
- Do not use raw Tailwind color families like `zinc-*`, `slate-*`, `stone-*` in final components.
- Do not hardcode hex colors inside templates.
- Use documented radius and spacing patterns from `ui-context.md`.
- Avoid random gradients unless explicitly part of the visual system.
- Keep responsive behavior intentional; test desktop and mobile layouts.

## Components

- Components receive data through props.
- Components should not own global content unless they are tiny primitives.
- Reusable components should not know page-specific copy.
- Page sections can be expressive but should still remain data-driven where useful.
- Name components by responsibility, not by appearance only.

Good examples:

- `MegaMenu.vue`
- `ProductCategoryCard.vue`
- `IndustrialHero.vue`
- `ContactCta.vue`
- `TechnicalFeatureList.vue`

Avoid:

- `NiceCard.vue`
- `NewSection.vue`
- `TempComponent.vue`
- `FinalHero2.vue`

## Content

- Keep old-site extracted copy in structured files before rewriting.
- Do not overwrite source copy without preserving the original.
- Use `TODO: verify` for unconfirmed facts.
- Repeated labels, categories, and contact details should live in one source.

## Accessibility

- Use semantic HTML.
- Use buttons for actions and links for navigation.
- Include focus states.
- Ensure mobile menu and mega menu are keyboard accessible.
- Keep heading order logical.
- Add alt text for meaningful images.

## Performance

- Optimize images.
- Avoid large animation libraries unless needed.
- Avoid client-side rendering for static content.
- Keep homepage sections efficient and SSR/static-friendly.

## File Organization

Suggested organization:

```txt
app/
  assets/
    css/
      main.css
  components/
    layout/
    navigation/
    sections/
    cards/
    ui/
  data/
    navigation.ts
    company.ts
    offers.ts
    products.ts
  pages/
content/
  pages/
  offers/
  products/
types/
public/
  images/
```

## Validation

Before marking a unit complete, run the available checks for the project, for example:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

If a command does not exist, add a note in `progress-tracker.md` instead of pretending it passed.
