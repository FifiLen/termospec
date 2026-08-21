export type HomePartner = {
  id: string;
  label: string;
};

export type HomeScopeItem = {
  number: string;
  title: string;
  lead: string;
  points: string[];
  tone: "brand" | "light";
  action: {
    label: string;
    href: string;
  };
};

export type HomeScopeImage = {
  src: string;
  alt: string;
};

export type HomeProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type HomeRealization = {
  src: string;
  alt: string;
  industry: string;
  title: string;
  description: string;
};

export type HomeRealizationMetric = {
  label: string;
  value: string;
};

export type HomeFeaturedRealization = HomeRealization & {
  metrics: HomeRealizationMetric[];
};

export type HomeContactTopic = {
  label: string;
  value: string;
};

export const homePartners: HomePartner[] = [
  { id: "partner-01", label: "Miejsce na logo partnera 01" },
  { id: "partner-02", label: "Miejsce na logo partnera 02" },
  { id: "partner-03", label: "Miejsce na logo partnera 03" },
  { id: "partner-04", label: "Miejsce na logo partnera 04" },
  { id: "partner-05", label: "Miejsce na logo partnera 05" },
  { id: "partner-06", label: "Miejsce na logo partnera 06" },
  { id: "partner-07", label: "Miejsce na logo partnera 07" },
  { id: "partner-08", label: "Miejsce na logo partnera 08" },
  { id: "partner-09", label: "Miejsce na logo partnera 09" },
  { id: "partner-10", label: "Miejsce na logo partnera 10" },
];

export const homePartnerIndustries = [
  "Górnictwo",
  "Energetyka",
  "Przemysł spożywczy",
  "Logistyka i magazyny",
  "Obiekty komercyjne",
  "Tunele",
] as const;

export const homeScopeItems: HomeScopeItem[] = [
  {
    number: "01",
    title: "Klimatyzacja",
    lead: "Produkcja urządzeń chłodniczych dla kopalń podziemnych oraz tuneli.\nProjektowanie, obsługa oraz serwis układów klimatyzacji kopalń.",
    points: [
      "układy klimatyzacji kopalń",
      "urządzenia chłodnicze",
      "dobór parametrów pracy",
      "serwis i modernizacja instalacji",
    ],
    tone: "brand",
    action: {
      label: "Zobacz produkty",
      href: "/produkty",
    },
  },
  {
    number: "02",
    title: "Wentylacja",
    lead: "Produkcja i serwis wentylatorów oraz tam wentylacyjnych dla kopalń.",
    points: [
      "wentylatory przemysłowe",
      "tamy wentylacyjne",
      "obsługa eksploatacyjna",
      "utrzymanie przepływu powietrza",
    ],
    tone: "light",
    action: {
      label: "Zobacz produkty",
      href: "/produkty",
    },
  },
  {
    number: "03",
    title: "Energia odnawialna",
    lead: "Projektowanie, montaż, serwis oraz obsługa systemów opartych na odnawialnych źródłach energii.",
    points: [
      "dobór rozwiązań OZE",
      "montaż instalacji",
      "obsługa techniczna",
      "serwis i utrzymanie",
    ],
    tone: "light",
    action: {
      label: "Zobacz usługi",
      href: "/uslugi",
    },
  },
];

export const homeScopeImage: HomeScopeImage = {
  src: "/budynek-termospec.png",
  alt: "Siedziba i zakład produkcyjny Termospec w Żorach",
};

export const homeProcessSteps: HomeProcessStep[] = [
  {
    number: "01",
    title: "Rozpoznanie warunków",
    body: "Analiza środowiska pracy, ograniczeń technicznych i wymagań instalacji.",
  },
  {
    number: "02",
    title: "Projekt techniczny",
    body: "Dobór urządzeń, parametrów i rozwiązań wykonawczych pod konkretny obiekt.",
  },
  {
    number: "03",
    title: "Produkcja i wdrożenie",
    body: "Dostarczenie rozwiązań oraz wsparcie przy uruchomieniu instalacji.",
  },
  {
    number: "04",
    title: "Serwis i utrzymanie",
    body: "Przeglądy, naprawy, modernizacje i bieżąca obsługa eksploatacyjna.",
  },
];

export const homeFeaturedRealization: HomeFeaturedRealization = {
  src: "/images/realizations/uklad-chlodzenia-wyrobisko-podziemne.png",
  alt: "Centralna instalacja chłodnicza w wyrobisku podziemnym",
  industry: "Górnictwo · projekt pod klucz",
  title: "Centralna klimatyzacja wyrobisk podziemnych",
  description:
    "Projekt, produkcja i montaż stacji chłodniczej wraz z instalacją rozprowadzającą oraz uruchomieniem i stałym nadzorem serwisowym.",
  metrics: [
    { label: "Moc chłodnicza", value: "2 × 1,2 MW" },
    { label: "Czynnik", value: "wodno-glikolowy" },
    { label: "Zakres", value: "projekt → serwis" },
    { label: "Rok", value: "2024" },
  ],
};

export const homeRealizations: HomeRealization[] = [
  {
    src: "/images/realizations/uklad-chlodzenia-hala-produkcyjna.png",
    alt: "Instalacja chłodnicza w hali produkcyjnej",
    industry: "Przemysł spożywczy",
    title: "Modernizacja instalacji chłodniczej zakładu",
    description:
      "Wymiana agregatów i układu automatyki bez przerwania produkcji.",
  },
  {
    src: "/images/realizations/instalacja-techniczna-rurociagi.png",
    alt: "Instalacja wentylacyjna i techniczna obiektu liniowego",
    industry: "Tunele",
    title: "Wentylacja obiektu liniowego",
    description:
      "Dobór i montaż wentylatorów przemysłowych oraz tam wentylacyjnych.",
  },
  {
    src: "/images/realizations/uklad-chlodzenia-instalacja-przemyslowa.png",
    alt: "Układ chłodzenia hali magazynowej",
    industry: "Logistyka",
    title: "Chłodzenie hali magazynowej",
    description:
      "Agregat z typoszeregu TS wraz z instalacją i przeglądami okresowymi.",
  },
];

export const homeContactTopics: HomeContactTopic[] = [
  {
    label: "Klimatyzacja / chłodzenie",
    value: "cooling",
  },
  {
    label: "Wentylacja",
    value: "ventilation",
  },
  {
    label: "Serwis lub modernizacja",
    value: "service",
  },
  {
    label: "Energia odnawialna",
    value: "renewable-energy",
  },
  {
    label: "Inny zakres techniczny",
    value: "other",
  },
];
