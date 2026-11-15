import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

import { fundingPage, fundingProjects } from "../../data/dofinansowania.ts";
import { rodoPage } from "../../data/rodo.ts";
import { seoPageRoutes } from "../../data/seo.ts";
import { orderServicesByLayout, serviceSlugFromPath } from "../../data/services.ts";
import { aboutSchema } from "../../schemas/about.ts";
import { companySchema } from "../../schemas/company.ts";
import { homeSchema } from "../../schemas/home.ts";
import { productSchema } from "../../schemas/product.ts";
import { realizationSchema } from "../../schemas/realization.ts";
import { seoSchema } from "../../schemas/seo.ts";
import { serviceSchema } from "../../schemas/service.ts";
import type { SearchSources } from "../../server/utils/search-sections.ts";

const contentRoot = path.join(process.cwd(), "content");

const readYaml = async (filePath: string): Promise<unknown> => {
  return parse(await readFile(filePath, "utf8"));
};

const readCollection = async (directory: string) => {
  const files = (await readdir(path.join(contentRoot, directory)))
    .filter((file) => /\.ya?ml$/.test(file))
    .sort();

  return Promise.all(files.map(async (file) => ({
    file,
    data: await readYaml(path.join(contentRoot, directory, file)),
  })));
};

// Loads the published content the same way the collections validate it, so tests
// exercise the generated search index against the real site sources.
export const loadSearchSources = async (): Promise<SearchSources> => {
  const catalogue = await readYaml(path.join(contentRoot, "catalogue.yml")) as {
    categories: SearchSources["catalogue"];
  };
  const services = await readCollection("services");
  const realizations = await readCollection("realizations");
  const products = await readCollection("products");
  const home = homeSchema.parse(await readYaml(path.join(contentRoot, "home.yml")));
  const seo = seoSchema.parse(await readYaml(path.join(contentRoot, "seo.yml")));

  return {
    pages: { fundingPage, fundingProjects, rodoPage },
    pageDescriptions: Object.fromEntries(Object.entries(seoPageRoutes).map(([key, route]) => {
      return [route, seo[key as keyof typeof seoPageRoutes].opis];
    })),
    about: aboutSchema.parse(await readYaml(path.join(contentRoot, "about.yml"))),
    company: companySchema.parse(await readYaml(path.join(contentRoot, "company.yml"))),
    services: orderServicesByLayout(services.map(({ file, data }) => ({
      ...serviceSchema.parse(data),
      slug: serviceSlugFromPath(file),
    }))),
    realizations: realizations
      .map(({ data }) => realizationSchema.parse(data))
      .sort((left, right) => left.order - right.order),
    heroSlides: home.hero.slides,
    scopeItems: home.scope.items,
    catalogue: catalogue.categories,
    products: products
      .map(({ data }) => productSchema.parse(data))
      .filter((product) => product.status === "published"),
  };
};
