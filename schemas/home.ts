import { z } from "zod/v4";

interface HomeEditorOptions {
  label: string;
  description?: string;
  input?: "media" | "textarea";
}

const homeField = <T extends z.ZodType>(
  schema: T,
  options: HomeEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: HomeEditorOptions };
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

const linkSchema = (label: string) => homeField(z.object({
  label: homeField(z.string().trim().min(1, "Podaj tekst przycisku"), {
    label: "Tekst przycisku",
    description: "Krótki tekst widoczny na przycisku.",
  }),
  href: homeField(z.string().trim().min(1, "Podaj adres odnośnika"), {
    label: "Adres odnośnika",
    description: "Wewnętrzna ścieżka lub kotwica, np. /produkty albo /#kontakt.",
  }),
}), {
  label,
  description: "Treść i miejsce docelowe przycisku.",
});

const responsiveImageSchema = (label: string, description: string) => homeField(
  z.object({
    src: homeField(z.string().trim().min(1, "Wybierz obraz"), {
      label: "Plik obrazu",
      description,
      input: "media",
    }),
    position: homeField(z.enum([
      "center center",
      "left center",
      "right center",
      "center top",
      "center bottom",
    ]).default("center center"), {
      label: "Pozycja obrazu",
      description: "Wybierz punkt kadru, który ma pozostać najlepiej widoczny.",
    }),
  }),
  {
    label,
    description,
  },
);

const heroSlideSchema = homeField(z.object({
  title: homeField(z.string().trim().min(1, "Podaj tytuł slajdu"), {
    label: "Tytuł",
    description: "Główny nagłówek slajdu. W układzie nakładkowym wpisz dwie linie.",
    input: "textarea",
  }),
  lead: homeField(z.string().trim().min(1, "Podaj krótki opis"), {
    label: "Opis",
    description: "Jeden krótki akapit pod tytułem.",
    input: "textarea",
  }),
  presentation: homeField(z.enum(["nakladka", "pelny-kadr"]).default("nakladka"), {
    label: "Układ slajdu",
    description: "nakladka — tekst na zdjęciu; pelny-kadr — sama grafika bez warstwy tekstowej.",
  }),
  image: homeField(z.object({
    alt: homeField(z.string().trim().min(1, "Opisz zawartość obrazu"), {
      label: "Opis alternatywny",
      description: "Krótki, rzeczowy opis zdjęcia dla dostępności i SEO.",
    }),
    desktop: responsiveImageSchema(
      "Obraz — komputer",
      "Wybierz szeroki kadr przygotowany dla komputerów.",
    ),
    mobile: responsiveImageSchema(
      "Obraz — telefon",
      "Wybierz pionowy lub kwadratowy kadr przygotowany dla telefonów.",
    ),
  }), {
    label: "Zdjęcia",
    description: "Osobne, przygotowane kadry dla dużego i małego ekranu.",
  }),
  caption: homeField(z.object({
    label: homeField(z.string().default(""), {
      label: "Etykieta",
      description: "Krótka etykieta pomocnicza, np. obszar. Używana w układzie nakładkowym.",
    }),
    text: homeField(z.string().default(""), {
      label: "Treść",
      description: "Krótka treść podpisu, np. górnictwo / przemysł.",
    }),
  }).default({ label: "", text: "" }), {
    label: "Podpis zdjęcia",
    description: "Krótka etykieta nad tytułem slajdu, np. górnictwo / przemysł.",
  }),
  facts: homeField(z.array(homeField(z.object({
    value: homeField(z.string().trim().min(1, "Podaj wartość"), {
      label: "Wartość",
      description: "Krótka, wyróżniona informacja, np. 500 MW.",
    }),
    label: homeField(z.string().trim().min(1, "Podaj opis"), {
      label: "Opis",
      description: "Krótki podpis pod wartością.",
    }),
  }), {
    label: "Wyróżnik",
    description: "Jedna informacja w pasku pod przyciskami.",
  })).max(3, "Dodaj maksymalnie trzy wyróżniki").default([]), {
    label: "Wyróżniki",
    description: "Do trzech krótkich informacji pod przyciskami. Puste — zostaną użyte dane firmy.",
  }),
  primaryLink: linkSchema("Pierwszy przycisk"),
  secondaryLink: linkSchema("Drugi przycisk"),
}), {
  label: "Slajd",
  description: "Jeden ekran karuzeli strony głównej.",
});

const scopeItemSchema = homeField(z.object({
  title: homeField(z.string().trim().min(1, "Podaj nazwę obszaru"), {
    label: "Nazwa obszaru",
    description: "Np. Klimatyzacja.",
  }),
  lead: homeField(z.string().trim().min(1, "Podaj krótki opis"), {
    label: "Opis",
    description: "Krótki opis pod nazwą. Nowa linia w polu oznacza nową linię na karcie.",
    input: "textarea",
  }),
  points: homeField(z.array(z.string().trim().min(1, "Usuń pusty punkt")).default([]), {
    label: "Punkty",
    description: "Lista z czerwonymi myślnikami, jeden punkt na element.",
  }),
  icon: homeField(z.string().trim().min(1, "Wybierz ikonę"), {
    label: "Ikona",
    description: "Sylwetka na przezroczystym tle (PNG lub SVG). Wyświetla się w kolorze marki w prawym górnym rogu karty.",
    input: "media",
  }),
  action: linkSchema("Przycisk"),
}), {
  label: "Karta obszaru",
  description: "Jedna karta w sekcji Zakres działalności.",
});

export const homeSchema = z.object({
  hero: homeField(z.object({
    slides: homeField(z.array(heroSlideSchema).min(1, "Dodaj co najmniej jeden slajd"), {
      label: "Slajdy",
      description: "Dodawaj, usuwaj i przeciągaj slajdy, aby zmienić ich kolejność.",
    }),
  }), {
    label: "Karuzela strony głównej",
    description: "Treść pierwszej sekcji widocznej po wejściu na stronę.",
  }),
  scope: homeField(z.object({
    image: homeField(z.object({
      src: homeField(z.string().trim().min(1, "Wybierz zdjęcie"), {
        label: "Plik zdjęcia",
        description: "Szeroka panorama w proporcji około 3:1 (np. 1775 × 570 px). Inne proporcje zostaną przycięte.",
        input: "media",
      }),
      alt: homeField(z.string().trim().min(1, "Opisz zawartość zdjęcia"), {
        label: "Opis alternatywny",
        description: "Krótki, rzeczowy opis zdjęcia dla dostępności i SEO.",
      }),
    }), {
      label: "Panorama",
      description: "Zdjęcie nad kartami obszarów.",
    }),
    items: homeField(z.array(scopeItemSchema).min(1, "Dodaj co najmniej jedną kartę"), {
      label: "Karty",
      description: "Karty obszarów działalności. Numery 01, 02… nadawane są automatycznie według kolejności.",
    }),
  }), {
    label: "Zakres działalności",
    description: "Sekcja pod karuzelą: panorama siedziby i karty obszarów.",
  }),
  contact: homeField(z.object({
    topics: homeField(z.array(z.string().trim().min(1, "Usuń pusty temat")).min(1, "Dodaj co najmniej jeden temat"), {
      label: "Tematy zapytania",
      description: "Przyciski wyboru „Zakres zapytania technicznego” w formularzu kontaktowym.",
    }),
  }), {
    label: "Formularz kontaktowy",
    description: "Ustawienia formularza w sekcji Kontakt na stronie głównej.",
  }),
});

export type HomeData = z.output<typeof homeSchema>;
