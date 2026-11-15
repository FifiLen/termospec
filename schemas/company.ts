import { z } from "zod/v4";

interface CompanyEditorOptions {
  label: string;
  description?: string;
}

const companyField = <T extends z.ZodType>(
  schema: T,
  options: CompanyEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: CompanyEditorOptions };
  };

  definition.$content = {
    ...definition.$content,
    editor: {
      ...definition.$content?.editor,
      ...options,
    },
  };

  return schema;
};

const phoneSchema = (label: string, description: string) => companyField(
  z.string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,}$/, "Podaj numer telefonu, np. +48 (32) 435 80 50"),
  { label, description },
);

export const companySchema = z.object({
  legalName: companyField(z.string().trim().min(1, "Podaj pełną nazwę firmy"), {
    label: "Pełna nazwa firmy",
    description: "Nazwa z rejestru, np. Termospec Sp. z o.o. Widoczna w stopce, danych kontaktowych i na mapie.",
  }),
  address: companyField(z.object({
    street: companyField(z.string().trim().min(1, "Podaj ulicę i numer"), {
      label: "Ulica i numer",
      description: "Np. ul. Górnicza 10.",
    }),
    postalCode: companyField(z.string().trim().regex(/^\d{2}-\d{3}$/, "Kod pocztowy w formacie 00-000"), {
      label: "Kod pocztowy",
      description: "W formacie 00-000.",
    }),
    city: companyField(z.string().trim().min(1, "Podaj miejscowość"), {
      label: "Miejscowość",
    }),
    country: companyField(z.string().trim().min(1, "Podaj kraj"), {
      label: "Kraj",
      description: "Nazwa kraju wyświetlana w stopce, np. Polska.",
    }),
  }), {
    label: "Adres siedziby",
    description: "Adres w stopce, sekcji kontaktowej, na mapie i w danych dla wyszukiwarek.",
  }),
  phone: phoneSchema(
    "Telefon biura",
    "Główny numer firmy. Link do dzwonienia tworzy się automatycznie.",
  ),
  fax: companyField(z.string().trim().optional(), {
    label: "Faks",
    description: "Opcjonalnie, np. +48 (32) 435 80 50 wew. 16. Puste pole ukrywa faks na stronie.",
  }),
  email: companyField(z.string().trim().email("Podaj poprawny adres e-mail"), {
    label: "E-mail",
    description: "Adres kontaktowy widoczny w stopce i sekcji kontaktowej.",
  }),
  serviceHotline: companyField(z.object({
    label: companyField(z.string().trim().min(1, "Podaj nazwę infolinii"), {
      label: "Nazwa",
      description: "Np. Serwis 24/7.",
    }),
    phone: phoneSchema(
      "Numer",
      "Numer serwisu widoczny na przycisku infolinii i w menu mobilnym.",
    ),
  }), {
    label: "Infolinia serwisowa",
    description: "Wyróżniony numer serwisu na stronie usług, w sekcji kontaktowej i w menu mobilnym.",
  }),
  registry: companyField(z.object({
    krs: companyField(z.string().trim().min(1, "Podaj numer KRS"), { label: "KRS" }),
    nip: companyField(z.string().trim().min(1, "Podaj numer NIP"), { label: "NIP" }),
    regon: companyField(z.string().trim().min(1, "Podaj numer REGON"), { label: "REGON" }),
    shareCapital: companyField(z.string().trim().optional(), {
      label: "Kapitał zakładowy",
      description: "Opcjonalnie, np. 100.000 PLN.",
    }),
  }), {
    label: "Dane rejestrowe",
    description: "Numery wyświetlane w stopce.",
  }),
});

export type CompanyData = z.output<typeof companySchema>;
