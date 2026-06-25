# Termospec Website Redesign

## Overview

Termospec is a B2B industrial / engineering company website redesign. The new site should present the company, its solutions, product/service groups, realizations, and contact paths in a modern, credible, technical way.

The website must not feel like a generic template. It should communicate industrial competence, reliability, engineering precision, and long-term market presence.

## Known Public Facts To Verify With Client

These facts are useful for context, but should be verified before final publication:

- Company: Termospec Sp. z o.o.
- Registered address shown publicly: ul. Górnicza 10, 44-240 Żory.
- Public registries list activity around industrial cooling, ventilation, air-conditioning equipment production, machine repair, electrical equipment repair, industrial machine installation, pipeline/network works, electrical installations, HVAC/plumbing installations, and equipment rental.
- Public social/profile snippets describe Termospec as offering complex solutions for temperature-related hazards in mines and tunnels.
- Legacy heat-pump subpages describe services around design, sales, installation, and servicing of heating systems with heat pumps.
- Some older/secondary sources show different operational/contact addresses; final address and phone details require client confirmation.

## Goals

1. Replace the old website with a modern, structured, professional company site.
2. Preserve and reorganize usable existing content into clear page sections and JSON/content structures.
3. Present offer and product groups through a strong navigation system with a mega menu.
4. Make the company understandable quickly for technical and business visitors.
5. Support SEO-friendly pages for core services, applications, products, and contact queries.
6. Build a maintainable frontend that can be extended without redesigning from scratch.
7. Keep design and code consistent through documented tokens, components, and page patterns.

## Target Audience

- Industrial clients
- Mining and tunneling stakeholders
- Engineering / technical decision-makers
- Procurement departments
- Service and maintenance contacts
- Potential partners and suppliers
- Users looking for specific technical product/service information

## Core User Flow

1. Visitor lands on the homepage.
2. Visitor immediately understands what Termospec does and who it serves.
3. Visitor opens the navigation or mega menu to browse solutions/products.
4. Visitor enters a service/product/application page.
5. Visitor reviews technical context, benefits, realizations, and related services.
6. Visitor contacts the company or downloads/reads additional materials if available.

## Proposed Site Structure

- `/` — homepage
- `/o-firmie` — company profile
- `/rozwiazania` — overview of solution groups
- `/rozwiazania/[slug]` — solution detail pages
- `/produkty` — product/service category overview
- `/realizacje` — projects, references, case studies
- `/baza-wiedzy` — optional articles / technical knowledge
- `/#kontakt` — homepage contact form, address, map
- `/do-pobrania` — optional downloads, documents, catalogues

## Core Sections

### Homepage

- Hero with short technical positioning and clear CTA.
- “What we solve” section focused on temperature, cooling, ventilation, safety, and industrial reliability.
- Offer/product category overview.
- Industry/application split: mines, tunnels, industry, infrastructure, HVAC/heat pumps if still in scope.
- Realizations or trust markers.
- Company credibility section.
- Contact CTA.

### Offer / Solutions

Each solution page should include:

- problem context
- what Termospec provides
- key benefits
- technical capabilities
- applicable industries
- related products/services
- CTA/contact module

### Product / Service Presentation

Products are presented as families on `/produkty`; individual product detail routes are not planned in the current project scope.

The product overview should include:

- short description
- use cases
- technical features or parameters if available
- image/gallery/downloads if available
- CTA/contact module

## In Scope

- Public marketing/company website
- SEO-friendly routes
- Structured content model
- Product/service mega menu
- Responsive layout
- Content extraction from the old/current website
- Reusable components and section patterns
- Contact page and CTA sections
- Basic technical/industrial visual language

## Out Of Scope For Now

- Client portal
- E-commerce
- User accounts
- Real online payments
- Complex CRM integration
- Large custom backend unless later requested
- Multilingual content unless confirmed
- Advanced product configurators unless confirmed

## Success Criteria

1. The site clearly explains Termospec within the first screen.
2. Offer/product groups are easy to browse from the navigation.
3. Content is structured in a way that can be reused across pages.
4. The visual system feels technical, premium, and consistent.
5. Components use documented tokens and do not introduce random colors/styles.
6. Future AI/code work can continue from context files without destroying previous decisions.
