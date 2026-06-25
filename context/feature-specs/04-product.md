Technical Specification & Prompt: Product Catalog Redesign
You are working on the Termospec project (Nuxt/Vue, Tailwind v4). Perform a complete architectural and visual redesign of the products/catalog subpage. Focus on a high-fidelity, production-ready implementation.

⚠️ Critical Constraints & Architecture Rules
No Marketing Fluff / No Headers: Do not generate any hero sections, intro text, or marketing headers. The subpage must immediately start as a raw, premium technical documentation catalog.

Preserve Existing Architecture: Do not break or alter the current routing, logic, product data sources, or slug structures. Keep existing SEO-friendly link structures completely intact.

Typography: Use the existing font already configured in the project. Do not import or specify any external fonts (e.g., do not use DM Sans).

No Box Shadows: Adhere strictly to a flat, blueprint-inspired aesthetic. Never use shadows (shadow-\* classes) for components or wrappers.

Tailwind v4 Compatibility: Write pure utility classes and CSS variables compatible with Tailwind v4. Do not assume or modify a legacy tailwind.config.js.

🎨 Visual Aesthetic & Blueprint Layout System
The layout must feel like a premium, industrial technical manual or hardware documentation.

Primary Palette:

Background: #FFFFFF

Primary Text/Accents: #120B38

Accent Elements: #9A0B2E

Construction Lines: Low-opacity Navy/Dark tones.

Yellow Hatched Skeletons: All structural spaces, gutters, or placeholder gaps between major layout wrappers must be filled with a subtle, bright Yellow diagonal hatching pattern (implemented cleanly via a CSS repeating-linear-gradient).

Technical Grid Separators: Do not use default spacing or padding gaps between product items. Instead, separate products using sharp, thin construction lines that reference the architectural and structural nature of industrial air conditioning systems. Avoid heavy roundings (use sharp or minimal rounded-sm corners where necessary).

💻 Layout Requirements
Desktop Layout (Full-Width)
Layout Structure: A two-column blueprint layout spanning the full width of the screen.

Left Sidebar (Sticky):

Acts strictly as a technical documentation tree navigation.

Contains a clean search input with a clear aria-label or hidden label for accessibility, accompanied by a precise lens icon.

Lists categories and products with explicit hover, focus, and active states using low-opacity accent lines.

Right Content Column:

A continuous stream of highly organized, technical product blocks/cards.

Group components clearly by their existing categories.

Displays product names, technical data, parameters, specifications, and images directly without typical SaaS card patterns.

Mobile Layout
Sidebar Adaptability: The left sidebar must gracefully collapse or transform so it doesn't break the layout.

Navigation: Place the search bar at the very top, followed by a clean horizontal scroll or a minimalist, collapsible drawer for the categories.

Product Stack: Product blocks must stack vertically with generous, deliberate spacing utilizing the structural line system.

🛠️ Functionality & Accessibility (a11y)
Search & Filtering: The search bar must filter products dynamically by name, category, and specifications. The left sidebar list must update its state dynamically to match search results.

Navigation/Routing: Clicking an item in the sidebar must smoothly scroll to its section or link directly to the item's unique [slug] page, depending on how the project's current architecture handles individual product detail routes.

Accessibility: All interactive elements must feature distinct focus indicators (focus-visible). Elements must maintain strict contrast ratios against the white background.
