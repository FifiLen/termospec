# Performance Optimization Rules

Do not redesign UI during optimization.

Focus only on:

- image optimization,
- replacing raw img with NuxtImg where safe,
- checking oversized assets,
- lazy-loading below-the-fold sections,
- avoiding unnecessary client-side state,
- keeping static content server-rendered,
- using routeRules/prerender for static marketing pages,
- analyzing bundle with nuxt analyze,
- not adding dependencies unless there is a measurable reason.

Before changing code:

1. run or request `npx nuxt analyze`,
2. inspect largest assets and chunks,
3. list concrete bottlenecks,
4. propose small changes,
5. wait for approval.

Do not use Nuxt UI layout primitives to “optimize” visual sections.
Do not change design, spacing, typography, or content structure unless required for performance.
