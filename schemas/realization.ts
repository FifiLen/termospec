import { z } from "zod/v4";

interface RealizationEditorOptions {
  label: string;
  description?: string;
  input?: "media" | "textarea";
}

const realizationField = <T extends z.ZodType>(
  schema: T,
  options: RealizationEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: RealizationEditorOptions };
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

export const realizationSchema = z.object({
  title: realizationField(z.string().trim().min(1, "Podaj tytuł realizacji"), {
    label: "Tytuł",
    description: "Krótka nazwa projektu, np. Chłodzenie hali magazynowej.",
  }),
  industry: realizationField(z.string().trim().min(1, "Podaj branżę"), {
    label: "Branża",
    description: "Szara etykieta nad tytułem, np. Górnictwo, Tunele, Logistyka.",
  }),
  description: realizationField(z.string().trim().min(1, "Podaj krótki opis"), {
    label: "Opis",
    description: "Jedno lub dwa zdania o zakresie prac.",
    input: "textarea",
  }),
  image: realizationField(z.object({
    src: realizationField(z.string().trim().min(1, "Wybierz zdjęcie"), {
      label: "Plik zdjęcia",
      description: "Poziome zdjęcie z biblioteki mediów, najlepiej w proporcji około 2:1.",
      input: "media",
    }),
    alt: realizationField(z.string().trim().min(1, "Opisz, co widać na zdjęciu"), {
      label: "Opis zdjęcia",
      description: "Rzeczowy opis zawartości zdjęcia dla dostępności i SEO.",
    }),
  }), {
    label: "Zdjęcie",
    description: "Zdjęcie widoczne na karcie realizacji.",
  }),
  order: realizationField(z.number().default(100), {
    label: "Kolejność",
    description: "Mniejsza liczba — wyżej na liście. Strona główna pokazuje trzy pierwsze realizacje.",
  }),
});

export type RealizationData = z.output<typeof realizationSchema>;
// Published records and Studio drafts also carry their Nuxt Content id.
export type RealizationContent = RealizationData & { id?: string };
export type RealizationInput = z.input<typeof realizationSchema>;
