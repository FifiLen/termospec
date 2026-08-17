import { z } from "zod/v4";

interface ProductEditorOptions {
  label: string;
  description?: string;
  input?: "media" | "icon" | "textarea";
  hidden?: boolean;
}

const productField = <T extends z.ZodType>(
  schema: T,
  options: ProductEditorOptions,
) => {
  const definition = schema.def as typeof schema.def & {
    $content?: { editor?: ProductEditorOptions };
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

const mediaPath = (label: string, description: string) => {
  return productField(z.string().default(""), {
    label,
    description,
    input: "media",
  });
};

const mediaSchema = z.object({
  src: mediaPath(
    "Plik obrazu",
    "Wybierz obraz z biblioteki mediów Nuxt Studio.",
  ),
  alt: productField(z.string().default(""), {
    label: "Opis alternatywny",
    description: "Krótko opisz, co przedstawia obraz.",
  }),
}).meta({ title: "Obraz" });

export const productSchema = z.object({
  title: productField(
    z.string().trim().min(1, "Podaj nazwę produktu"),
    {
      label: "Nazwa produktu",
      description: "Nazwa widoczna na zakładce i karcie produktu, np. TS-150.",
    },
  ),
  modelCode: productField(z.string().default(""), {
    label: "Kod modelu",
    description: "Pełne oznaczenie techniczne, jeśli różni się od nazwy, np. TS-150/ZM.",
  }),
  category: productField(z.string().trim().default("Bez kategorii"), {
    label: "Nazwa kategorii",
    description: "Tekst kategorii wyświetlany przy produkcie.",
  }),
  cataloguePlacement: productField(z.object({
    categorySlug: productField(z.enum([
      "",
      "agregaty-chlodnicze",
      "chlodnice-powietrza",
      "parowniki",
      "chlodnice-wyparne-wody",
      "systemy-redukcji-cisnienia",
      "zbiorniki-cisnieniowe",
      "systemy-sterownicze",
      "wentylatory",
      "inne",
    ]).default(""), {
      label: "Kategoria katalogu",
      description: "Wybierz jedną z dziewięciu głównych kategorii.",
    }),
    groupSlug: productField(z.enum([
      "",
      "agregaty-sprezarka-tlokowa",
      "agregaty-sprezarka-srubowa",
      "agregaty-dwu-sprezarkowe",
      "agregaty-duzych-mocy",
      "agregaty-malych-mocy",
      "mobilne-urzadzenia-chlodnicze",
      "parowniki-powietrza",
      "parowniki-wodne",
    ]).default(""), {
      label: "Podkategoria katalogu",
      description: "Pozostaw puste, jeżeli produkt należy bezpośrednio do kategorii głównej.",
    }),
    kind: productField(
      z.enum(["model", "series", "description"]).default("model"),
      {
        label: "Sposób wyświetlania",
        description: "Model oznacza pojedynczy produkt, series — typoszereg, description — opis możliwości.",
      },
    ),
  }).default({ categorySlug: "", groupSlug: "", kind: "model" }), {
    label: "Miejsce w katalogu",
    description: "Decyduje, w której kategorii i podkategorii pojawi się produkt.",
  }),
  status: productField(z.enum(["draft", "published"]).default("draft"), {
    label: "Status publikacji",
    description: "draft jest wersją roboczą; published pokazuje produkt publicznie.",
  }),
  order: productField(z.coerce.number().int().min(0).default(100), {
    label: "Kolejność techniczna",
    description: "Pole systemowe używane do sortowania produktów.",
    hidden: true,
  }),
  isFeatured: productField(z.boolean().default(false), {
    label: "Produkt wyróżniony",
    description: "Pole zarezerwowane dla przyszłych sekcji promowanych.",
    hidden: true,
  }),
  lead: productField(z.string().default(""), {
    label: "Krótki opis",
    description: "Jedno konkretne zdanie wyjaśniające, czym jest produkt i do czego służy.",
    input: "textarea",
  }),
  shortDescription: productField(z.string().default(""), {
    label: "Opis skrócony",
    description: "Opcjonalne drugie streszczenie. Pozostaw puste, jeśli krótki opis jest wystarczający.",
    input: "textarea",
  }),
  seo: productField(z.object({
    title: productField(z.string().default(""), {
      label: "Tytuł SEO",
      description: "Pozostaw puste, aby użyć nazwy produktu.",
    }),
    description: productField(z.string().default(""), {
      label: "Opis SEO",
      description: "Krótki opis produktu przeznaczony dla wyszukiwarki.",
      input: "textarea",
    }),
  }).default({ title: "", description: "" }), {
    label: "SEO",
    description: "Opcjonalne dane dla wyszukiwarki.",
  }),
  powerRange: productField(z.string().optional().default(""), {
    label: "Moc lub zakres mocy",
    description: "Dla pojedynczego modelu podaj jego moc, dla typoszeregu zakres, np. 150 kW albo 150–450 kW.",
  }),
  specs: productField(z.array(z.object({
    label: productField(z.string(), {
      label: "Nazwa parametru",
      description: "Np. Moc chłodnicza.",
    }),
    value: productField(z.string(), {
      label: "Wartość",
      description: "Wartość wraz z jednostką, np. 150 kW.",
    }),
  })).default([]), {
    label: "Najważniejsze parametry",
    description: "Dodaj maksymalnie kilka wartości, które mają być widoczne od razu nad opisem.",
  }),
  technicalData: productField(z.array(z.object({
    label: productField(z.string(), {
      label: "Parametr",
      description: "Np. Wysokość, masa albo napięcie zasilania.",
    }),
    value: productField(z.string(), {
      label: "Wartość",
      description: "Podaj samą wartość lub zakres.",
    }),
    unit: productField(z.string().default(""), {
      label: "Jednostka",
      description: "Np. mm, kg, kW, V albo bar.",
    }),
  })).default([]), {
    label: "Pełne dane techniczne",
    description: "Opcjonalna tabela szczegółowych parametrów produktu. Nie wpisuj danych, których klient nie potwierdził.",
  }),
  technicalNotes: productField(z.array(z.string()).default([]), {
    label: "Uwagi do danych technicznych",
    description: "Warunki pomiaru, zastrzeżenia i objaśnienia dotyczące parametrów.",
  }),
  applications: productField(z.array(z.string()).default([]), {
    label: "Zastosowanie",
    description: "Miejsca i procesy, w których stosuje się produkt.",
  }),
  components: productField(z.array(z.string()).default([]), {
    label: "Elementy urządzenia",
    description: "Najważniejsze podzespoły lub elementy zestawu.",
  }),
  features: productField(z.array(z.string()).default([]), {
    label: "Cechy urządzenia",
    description: "Zweryfikowane cechy techniczne i użytkowe.",
  }),
  relatedProducts: productField(z.array(z.string()).default([]), {
    label: "Urządzenia powiązane",
    description: "Nazwy kompatybilnych lub uzupełniających produktów, np. TS-150/PB.",
  }),
  serviceScope: productField(z.array(z.string()).default([]), {
    label: "Zakres wsparcia i serwisu",
    description: "Usługi Termospec związane z doborem, uruchomieniem i obsługą produktu.",
  }),
  sections: productField(z.array(z.object({
    title: productField(z.string(), {
      label: "Tytuł sekcji",
      description: "Np. Zasada działania albo Konstrukcja.",
    }),
    body: productField(z.string(), {
      label: "Treść",
      description: "Opis oparty na zweryfikowanych materiałach produktu.",
      input: "textarea",
    }),
    items: productField(z.array(z.string()).default([]), {
      label: "Punkty dodatkowe",
      description: "Opcjonalne krótkie uzupełnienia sekcji.",
    }),
  })).default([]), {
    label: "Sekcje opisowe",
    description: "Dodawaj tylko potrzebne sekcje, np. Zastosowanie, Zasada działania i Konstrukcja.",
  }),
  heroImage: mediaPath(
    "Główne zdjęcie produktu",
    "Render lub zdjęcie konkretnego produktu; nie używaj tutaj grafiki kategorii.",
  ),
  imageAlt: productField(z.string().optional().default(""), {
    label: "Opis głównego zdjęcia",
    description: "Krótki opis tego, co przedstawia główne zdjęcie.",
  }),
  headerSketch: productField(mediaSchema.nullable().default(null), {
    label: "Schemat lub rysunek techniczny",
    description: "Opcjonalny schemat systemu, rysunek urządzenia albo wizualizacja techniczna.",
  }),
  gallery: productField(z.array(mediaSchema).default([]), {
    label: "Galeria produktu",
    description: "Dodatkowe zdjęcia produktu, instalacji i detali technicznych.",
  }),
  documents: productField(z.array(z.object({
    title: productField(z.string(), {
      label: "Nazwa dokumentu",
      description: "Np. Karta katalogowa TS-150.",
    }),
    file: mediaPath(
      "Plik",
      "Wybierz dokument z biblioteki mediów, np. PDF.",
    ),
  })).default([]), {
    label: "Dokumenty do pobrania",
    description: "Karty katalogowe, instrukcje, certyfikaty lub inne pliki dotyczące produktu.",
  }),
  relatedProjects: productField(z.array(z.object({
    number: productField(z.string(), {
      label: "Numer realizacji",
      description: "Opcjonalne wewnętrzne oznaczenie realizacji.",
    }),
    category: productField(z.string(), {
      label: "Kategoria realizacji",
    }),
    title: productField(z.string(), {
      label: "Nazwa realizacji",
    }),
    body: productField(z.string(), {
      label: "Opis realizacji",
      input: "textarea",
    }),
    image: mediaPath(
      "Zdjęcie realizacji",
      "Wybierz zdjęcie powiązanej realizacji.",
    ),
    imageAlt: productField(z.string(), {
      label: "Opis zdjęcia realizacji",
    }),
    scope: productField(z.array(z.string()).default([]), {
      label: "Zakres prac",
    }),
  })).default([]), {
    label: "Powiązane realizacje",
    description: "Opcjonalne przykłady wdrożeń tego produktu.",
  }),
});

export type ProductInput = z.input<typeof productSchema>;
export type ProductData = z.output<typeof productSchema>;

export const productJsonSchema = z.toJSONSchema(productSchema, {
  target: "draft-7",
});

export const productTemplate: ProductInput = {
  title: "",
  modelCode: "",
  category: "Bez kategorii",
  cataloguePlacement: {
    categorySlug: "",
    groupSlug: "",
    kind: "model",
  },
  status: "draft",
  order: 100,
  isFeatured: false,
  lead: "",
  shortDescription: "",
  seo: {
    title: "",
    description: "",
  },
  powerRange: "",
  specs: [],
  technicalData: [],
  technicalNotes: [],
  applications: [],
  components: [],
  features: [],
  relatedProducts: [],
  serviceScope: [],
  sections: [],
  heroImage: "",
  imageAlt: "",
  headerSketch: null,
  gallery: [],
  documents: [],
  relatedProjects: [],
};

export const productTemplateJson = `${JSON.stringify(productTemplate, null, 2)}\n`;
