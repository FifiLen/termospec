export type SearchQuickLink = {
  label: string;
  description: string;
  to: string;
  children?: SearchQuickLink[];
};

export const searchQuickLinks: SearchQuickLink[] = [
  {
    label: "Kariera",
    description:
      "Dołącz do zespołu. Zapytania rekrutacyjne kieruj przez kontakt do czasu potwierdzenia osobnej strony kariery.",
    to: "/#kontakt",
  },
  {
    label: "Serwis i wsparcie techniczne",
    description:
      "Utrzymanie ruchu, serwis urządzeń oraz zgłoszenia przeglądów i awarii.",
    to: "/#kontakt",
  },
  {
    label: "O firmie",
    description:
      "Informacje o doświadczeniu Termospec, zakresie działania i zespole.",
    to: "/o-firmie",
  },
  {
    label: "Zakres działalności",
    description:
      "Klimatyzacja, wentylacja, energia odnawialna oraz obsługa techniczna instalacji.",
    to: "/#zakres",
  },
  {
    label: "Realizacje",
    description:
      "Wybrane wdrożenia i obszary prac technicznych prezentowane na stronie głównej.",
    to: "/#realizacje",
  },
  {
    label: "Formularz kontaktowy",
    description:
      "Zapytania ofertowe, techniczne, serwisowe i rekrutacyjne.",
    to: "/#kontakt",
  },
  {
    label: "Dofinansowania i dotacje",
    description:
      "Projekty Termospec współfinansowane z Funduszy Europejskich i programów regionalnych.",
    to: "/dofinansowania",
  },
  {
    label: "RODO",
    description:
      "Klauzula informacyjna dotycząca przetwarzania danych osobowych.",
    to: "/rodo",
  },
];
