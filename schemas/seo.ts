import { z } from "zod/v4";

interface SeoEditorOptions {
  label: string;
  description?: string;
  input?: "textarea";
}

const seoField = <T extends z.ZodType>(
  schema: T,
  options: SeoEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: SeoEditorOptions };
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

const SHORT_TITLE = "Krótka nazwa strony. Na końcu tytułu automatycznie dopisywane jest „ | Termospec”.";

// Keys are Polish because Studio 1.7.0 shows property names instead of the labels below.
const pageSeo = (label: string, titleDescription: string) => seoField(z.object({
  tytul: seoField(
    z.string().trim().min(1, "Podaj tytuł strony").max(70, "Tytuł może mieć najwyżej 70 znaków"),
    { label: "Tytuł", description: titleDescription },
  ),
  opis: seoField(z.string().trim().max(200, "Opis może mieć najwyżej 200 znaków").default(""), {
    label: "Opis",
    description: "Tekst pod tytułem w wynikach Google i przy udostępnianiu linku. Najlepiej 120–160 znaków.",
    input: "textarea",
  }),
}), {
  label,
  description: "Tytuł karty przeglądarki i wyników wyszukiwania oraz opis strony.",
});

export const seoSchema = z.object({
  stronaGlowna: pageSeo("Strona główna", "Pełny tytuł strony głównej, bez automatycznego dopisku. Najlepiej do 60 znaków."),
  oFirmie: pageSeo("O firmie", SHORT_TITLE),
  uslugi: pageSeo("Usługi", SHORT_TITLE),
  produkty: pageSeo("Produkty", SHORT_TITLE),
  dofinansowania: pageSeo("Dofinansowania", SHORT_TITLE),
  rodo: pageSeo("RODO", SHORT_TITLE),
  koncesja: pageSeo("Koncesja", SHORT_TITLE),
});

export type SeoData = z.output<typeof seoSchema>;
export type SeoPageKey = keyof SeoData;
