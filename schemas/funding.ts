import { z } from "zod/v4";

interface FundingEditorOptions {
  label: string;
  description?: string;
  input?: "media" | "textarea";
}

const fundingField = <T extends z.ZodType>(
  schema: T,
  options: FundingEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: FundingEditorOptions };
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

const textList = (label: string, description: string) => fundingField(
  z.array(z.string().trim().min(1, "Usuń pusty element listy")).default([]),
  { label, description },
);

const projectSchema = fundingField(z.object({
  // First string field: Studio uses it to label projects in the list.
  name: fundingField(z.string().trim().min(1, "Podaj nazwę projektu"), {
    label: "Nazwa projektu",
    description: "Krótka nazwa projektu. Widoczna na liście projektów w panelu i jako tytuł w wyszukiwarce strony, nie na samej stronie.",
  }),
  eyebrow: fundingField(z.string().trim().optional(), {
    label: "Nadtytuł",
    description: "Opcjonalna czerwona etykieta nad logotypami, np. Zakończenie realizacji projektu.",
  }),
  image: fundingField(z.object({
    src: fundingField(z.string().trim().min(1, "Wybierz grafikę"), {
      label: "Plik z logotypami",
      description: "Pasek logotypów programu wymagany przez umowę o dofinansowanie.",
      input: "media",
    }),
    alt: fundingField(z.string().trim().min(1, "Wypisz logotypy widoczne na grafice"), {
      label: "Opis alternatywny",
      description: "Nazwy logotypów widocznych na grafice.",
    }),
  }), {
    label: "Logotypy",
  }),
  paragraphs: fundingField(z.array(z.object({
    text: fundingField(z.string().trim().min(1, "Podaj treść akapitu"), {
      label: "Treść",
      input: "textarea",
    }),
    emphasis: fundingField(z.boolean().default(false), {
      label: "Wyróżnienie",
      description: "Pogrubiona kursywa w cudzysłowie, np. tytuł projektu.",
    }),
  })).default([]), {
    label: "Wprowadzenie",
    description: "Akapity pod logotypami.",
  }),
  sections: fundingField(z.array(z.object({
    title: fundingField(z.string().trim().optional(), {
      label: "Tytuł sekcji",
      description: "Opcjonalny nagłówek, np. Krótki opis projektu:",
    }),
    paragraphs: textList("Akapity", "Tekst sekcji, jeden akapit na element."),
    bullets: textList("Punkty", "Lista punktowana pod akapitami, jeden punkt na element."),
  })).default([]), {
    label: "Sekcje",
    description: "Kolejne bloki opisu projektu.",
  }),
  facts: fundingField(z.array(z.object({
    label: fundingField(z.string().trim().min(1, "Podaj nazwę"), {
      label: "Nazwa",
      description: "Np. Całkowita wartość projektu.",
    }),
    value: fundingField(z.string().trim().default(""), {
      label: "Wartość",
      description: "Np. 1 846 390,00 PLN. Puste pole wyświetla samą nazwę, np. #FunduszeEuropejskie.",
    }),
  })).default([]), {
    label: "Dane projektu",
    description: "Tabela pod opisem: wartość, dofinansowanie, okres realizacji.",
  }),
}), {
  label: "Projekt",
  description: "Jedna karta projektu na stronie Dofinansowania.",
});

export const fundingSchema = z.object({
  title: fundingField(z.string().trim().min(1, "Podaj nagłówek strony"), {
    label: "Nagłówek strony",
    input: "textarea",
  }),
  projects: fundingField(z.array(projectSchema).default([]), {
    label: "Projekty",
    description: "Karty projektów w kolejności wyświetlania.",
  }),
});

export type FundingData = z.output<typeof fundingSchema>;
