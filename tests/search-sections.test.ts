import assert from "node:assert/strict";
import test from "node:test";

import { serviceLayoutSlugs } from "../data/services.ts";
import { buildSearchSections } from "../server/utils/search-sections.ts";
import { loadSearchSources } from "./helpers/search-sources.ts";

const pageRoutes = ["/", "/o-firmie", "/uslugi", "/produkty", "/dofinansowania", "/rodo", "/koncesja"];

test("generated search sections link only to existing routes and anchors", async () => {
  const sources = await loadSearchSources();
  const catalogueAnchors = new Set(sources.catalogue.flatMap((category) => [
    category.slug,
    ...(category.entries ?? []).map((entry) => entry.id),
    ...(category.groups ?? []).flatMap((group) => [group.slug, ...(group.entries ?? []).map((entry) => entry.id)]),
  ]));
  const pageAnchors: Record<string, Set<string>> = {
    "/": new Set(["zakres", "realizacje", "kontakt"]),
    "/o-firmie": new Set(["historia"]),
    "/uslugi": new Set(serviceLayoutSlugs),
    "/produkty": catalogueAnchors,
  };

  const sections = buildSearchSections(sources);

  assert.ok(sections.length > 50, "the index should cover every page");
  for (const route of pageRoutes) {
    assert.ok(sections.some((section) => section.id === route), `missing page entry: ${route}`);
  }

  for (const section of sections) {
    const [route, anchor] = section.id.split("#");

    assert.ok(pageRoutes.includes(route!), `unknown route: ${section.id}`);
    assert.ok(section.title.trim(), `empty title for ${section.id}`);
    if (anchor) {
      assert.ok(pageAnchors[route!]?.has(anchor), `unknown anchor: ${section.id}`);
    }
  }
});

test("published Studio content flows into the search index", async () => {
  const sources = await loadSearchSources();
  const company = sources.company!;
  const firstService = sources.services[0]!;

  const sections = buildSearchSections({
    ...sources,
    company: { ...company, phone: "+48 11 222 33 44" },
    services: [{ ...firstService, label: "Usługa po edycji w Studio" }, ...sources.services.slice(1)],
  });

  const contact = sections.find((section) => section.id === "/#kontakt");
  assert.match(contact?.content ?? "", /\+48 11 222 33 44/);
  assert.match(contact?.content ?? "", new RegExp(company.serviceHotline.phone.replace(/[+()]/g, "\\$&")));

  const service = sections.find((section) => section.id === `/uslugi#${firstService.slug}` && section.level === 2);
  assert.equal(service?.title, "Usługa po edycji w Studio");
  assert.ok(
    sections.some((section) => section.titles.includes("Usługa po edycji w Studio")),
    "sub-sections should carry the edited service label as breadcrumb",
  );
});

test("search shows only the realizations visible on the homepage", async () => {
  const sources = await loadSearchSources();
  const extra = { title: "Czwarta realizacja", industry: "Test", description: "Niewidoczna na stronie." };

  const sections = buildSearchSections({ ...sources, realizations: [...sources.realizations, extra, extra] });
  const realizationTitles = sections
    .filter((section) => section.id === "/#realizacje" && section.level === 3)
    .map((section) => section.title);

  assert.equal(realizationTitles.length, Math.min(3, sources.realizations.length + 2));
  assert.ok(!realizationTitles.includes("Czwarta realizacja") || sources.realizations.length < 3);
});

test("product entries carry the published product copy", async () => {
  const sources = await loadSearchSources();
  const product = sources.products.find((item) => item.lead.trim());
  assert.ok(product, "at least one published product should have a lead");

  const section = buildSearchSections(sources)
    .find((item) => item.id === `/produkty#${product.cataloguePlacement.entryId}`);

  assert.ok(section, `missing product entry ${product.cataloguePlacement.entryId}`);
  assert.ok(section.content.includes(product.lead.replace(/\s+/g, " ").trim()));
});
