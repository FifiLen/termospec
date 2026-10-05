export type SearchQuickLink = {
  label: string;
  description: string;
  to: string;
  icon?: string;
};

export type SearchQuickLinkGroup = {
  id: string;
  label: string;
  items: SearchQuickLink[];
};

export const searchQuickLinkGroups: SearchQuickLinkGroup[] = [
  {
    id: "offer",
    label: "Oferta",
    items: [
      {
        label: "Produkty",
        description: "Pełny katalog urządzeń, systemów i typoszeregów Termospec.",
        to: "/produkty",
        icon: "i-lucide-file",
      },
      {
        label: "Usługi",
        description: "Projektowanie, serwis, remonty, obróbka metali oraz konstrukcje stalowe.",
        to: "/uslugi",
        icon: "i-lucide-file",
      },
      {
        label: "Serwis i wsparcie techniczne",
        description: "Utrzymanie ruchu, serwis urządzeń oraz zgłoszenia przeglądów i awarii.",
        to: "/uslugi#serwis-24-7",
        icon: "i-lucide-file",
      },
    ],
  },
  {
    id: "company",
    label: "Firma",
    items: [
      {
        label: "O firmie",
        description: "Doświadczenie Termospec i historia działalności.",
        to: "/o-firmie",
        icon: "i-lucide-file",
      },
      {
        label: "Realizacje",
        description: "Wybrane wdrożenia i obszary prac technicznych.",
        to: "/#realizacje",
        icon: "i-lucide-file",
      },
      {
        label: "Kariera",
        description: "Dołącz do zespołu Termospec i skontaktuj się z nami w sprawie rekrutacji.",
        to: "/#kontakt",
        icon: "i-lucide-file",
      },
    ],
  },
  {
    id: "contact-and-documents",
    label: "Kontakt i dokumenty",
    items: [
      {
        label: "Formularz kontaktowy",
        description: "Zapytania ofertowe, techniczne, serwisowe i rekrutacyjne.",
        to: "/#kontakt",
        icon: "i-lucide-file",
      },
      {
        label: "Dofinansowania i dotacje",
        description: "Projekty współfinansowane z Funduszy Europejskich i programów regionalnych.",
        to: "/dofinansowania",
        icon: "i-lucide-file",
      },
      {
        label: "RODO",
        description: "Klauzula informacyjna dotycząca przetwarzania danych osobowych.",
        to: "/rodo",
        icon: "i-lucide-file",
      },
    ],
  },
];
