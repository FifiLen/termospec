import { z } from "zod/v4";

interface AboutEditorOptions {
  label: string;
  description?: string;
  input?: "textarea";
}

const aboutField = <T extends z.ZodType>(
  schema: T,
  options: AboutEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: AboutEditorOptions };
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

const requiredText = (message: string) => z.string().trim().min(1, message);

export const aboutSchema = z.object({
  profile: aboutField(z.object({
    title: aboutField(requiredText("Podaj główny nagłówek"), {
      label: "Nagłówek strony",
      description: "Duży nagłówek na górze strony O firmie.",
      input: "textarea",
    }),
    lead: aboutField(requiredText("Podaj wprowadzenie"), {
      label: "Wprowadzenie",
      description: "Akapit obok nagłówka, nad zdjęciem siedziby.",
      input: "textarea",
    }),
    intro: aboutField(requiredText("Podaj opis profilu"), {
      label: "Profil firmy",
      description: "Wyróżniony, pogrubiony tekst w sekcji Profil.",
      input: "textarea",
    }),
    servicesIntro: aboutField(requiredText("Podaj opis usług"), {
      label: "Wstęp do usług",
      description: "Akapit na karcie obok profilu, nad listą specjalizacji.",
      input: "textarea",
    }),
    specialties: aboutField(z.array(requiredText("Usuń pusty element listy")).default([]), {
      label: "Specjalizacje",
      description: "Lista na karcie Profil, jeden punkt na element.",
    }),
    sections: aboutField(z.array(z.object({
      title: aboutField(requiredText("Podaj tytuł karty"), {
        label: "Tytuł karty",
      }),
      body: aboutField(requiredText("Podaj treść karty"), {
        label: "Treść karty",
        input: "textarea",
      }),
    })).default([]), {
      label: "Karty wyróżników",
      description: "Numerowane karty pod sekcją Profil. Pierwsza karta jest granatowa, kolejne białe.",
    }),
  }), {
    label: "Profil",
    description: "Treści strony O firmie od nagłówka do kart wyróżników.",
  }),
  metrics: aboutField(z.array(z.object({
    value: aboutField(requiredText("Podaj wartość"), {
      label: "Wartość",
      description: "Np. 500 MW albo blisko 30 lat.",
    }),
    label: aboutField(requiredText("Podaj opis wartości"), {
      label: "Opis",
      description: "Np. łącznej mocy chłodniczej.",
    }),
  })).default([]), {
    label: "Liczby",
    description: "Pierwsze trzy liczby wyświetlają się jako wyróżniki w slajdach strony głównej, które nie mają własnych wyróżników.",
  }),
  timeline: aboutField(z.array(z.object({
    year: aboutField(requiredText("Podaj rok lub okres"), {
      label: "Rok lub okres",
      description: "Np. 1995, 2020–2021 albo Dziś.",
    }),
    title: aboutField(requiredText("Podaj tytuł etapu"), {
      label: "Tytuł etapu",
    }),
    body: aboutField(z.string().trim().optional(), {
      label: "Opis etapu",
      input: "textarea",
    }),
  })).default([]), {
    label: "Historia firmy",
    description: "Oś czasu w sekcji Historia firmy. Strona pokazuje pięć pierwszych etapów.",
  }),
});

export type AboutData = z.output<typeof aboutSchema>;
