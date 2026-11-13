export type HomePartner = {
  id: string;
  label: string;
};

export type HomeScopeItem = {
  number: string;
  title: string;
  lead: string;
  points: string[];
  icon: string;
  action: {
    label: string;
    href: string;
  };
};

export type HomeScopeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeProcessStep = {
  number: string;
  title: string;
  body: string;
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
    icon: "/images/home/ikona-klimatyzacja.png",
    action: {
      label: "zobacz produkty",
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
    icon: "/images/home/ikona-wentylacja.png",
    action: {
      label: "zobacz produkty",
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
    icon: "/images/home/ikona-odnawialna.png",
    action: {
      label: "zobacz usługi",
      href: "/uslugi",
    },
  },
];

export const homeScopeImage: HomeScopeImage = {
  src: "/images/home/zakres-siedziba-termospec.webp",
  alt: "Siedziba i zakład produkcyjny Termospec w Żorach",
  width: 1775,
  height: 570,
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
