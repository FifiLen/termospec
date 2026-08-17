# Archived Nuxt Studio product drafts

This directory preserves the earlier YAML product records created while the Nuxt Studio product form, duplication flow, catalogue sheets, and media fields were being developed.

These files are deliberately stored outside `content/products/`, so Nuxt Content and Nuxt Studio do not treat them as active products. They remain available as reference examples for:

- complete product field structure,
- catalogue placement,
- specifications and authored sections,
- applications, features, components, and service scope,
- product media and related-project fields,
- duplicated-file behavior used during Studio testing.

The earlier fully authored JSON preview record is also archived here as:

`context/archive/studio-product-drafts/urzadzenia-bezposredniego-dzialania.json`

The active `content/products/` collection now contains one published minimal
record for every confirmed model or series in `content/catalogue.yml`. These
records deliberately carry only their title, catalogue placement, display kind,
publication status, and ordering until the client supplies approved details.

To restore an archived draft to Nuxt Studio, copy the selected YAML or JSON record back into `content/products/`, give it a unique lowercase kebab-case filename, verify its `cataloguePlacement`, and keep `status: draft` until its content is approved.
