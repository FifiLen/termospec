import { z } from "zod/v4";

interface ServiceEditorOptions {
  label: string;
  description?: string;
  input?: "textarea";
}

const serviceField = <T extends z.ZodType>(
  schema: T,
  options: ServiceEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: ServiceEditorOptions };
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

const textList = (label: string, description: string) => serviceField(
  z.array(z.string().trim().min(1, "Usuń pusty element listy")).default([]),
  { label, description },
);

export const serviceSchema = z.object({
  label: serviceField(z.string().trim().min(1, "Podaj nazwę usługi"), {
    label: "Nazwa usługi",
    description: "Tytuł sekcji na stronie Usługi, karta w spisie usług i pozycja w menu Usługi.",
  }),
  intro: textList(
    "Wstęp",
    "Akapity pod tytułem usługi. Pierwszy akapit jest wyróżniony.",
  ),
  sections: serviceField(z.array(z.object({
    title: serviceField(z.string().trim().optional(), {
      label: "Tytuł sekcji",
      description: "Opcjonalny nagłówek bloku.",
    }),
    paragraphs: textList("Akapity", "Tekst bloku, jeden akapit na element."),
    points: textList("Punkty", "Lista punktowana, jeden punkt na element."),
  })).default([]), {
    label: "Sekcje",
    description: "Kolejność ma znaczenie: pierwsza sekcja to główny zakres usługi (zwykle lista punktów), kolejne są wyświetlane jako osobne bloki opisu.",
  }),
  machines: serviceField(z.array(z.object({
    title: serviceField(z.string().trim().min(1, "Podaj nazwę maszyny"), {
      label: "Nazwa maszyny",
      description: "Np. Tokarka CNC SMEC SL 2000M.",
    }),
    description: serviceField(z.string().trim().min(1, "Podaj krótki opis"), {
      label: "Opis",
      input: "textarea",
    }),
    specifications: serviceField(z.array(z.object({
      label: serviceField(z.string().trim().min(1, "Podaj nazwę parametru"), {
        label: "Parametr",
        description: "Np. przesuw w osi X.",
      }),
      value: serviceField(z.string().trim().min(1, "Podaj wartość"), {
        label: "Wartość",
        description: "Np. 2000 mm.",
      }),
    })).default([]), {
      label: "Dane techniczne",
      description: "Parametry wyświetlane w tabeli na karcie maszyny.",
    }),
  })).default([]), {
    label: "Park maszynowy",
    description: "Karty maszyn wyświetlane w usłudze Obróbka metali.",
  }),
  closing: serviceField(z.string().trim().optional(), {
    label: "Zakończenie",
    description: "Opcjonalny akapit pod kartami maszyn.",
    input: "textarea",
  }),
  cta: serviceField(z.string().trim().optional(), {
    label: "Zachęta do kontaktu",
    description: "Wyróżniony tekst zachęcający do kontaktu.",
    input: "textarea",
  }),
});

export type ServiceData = z.output<typeof serviceSchema>;

// Published records and Studio drafts carry the file-based slug and the Nuxt Content id.
export type ServiceContent = ServiceData & {
  slug: string;
  id?: string;
};
