export type HomePartner = {
  name: string;
  mark: string;
  sector: string;
};

export type HomeHeroLink = {
  label: string;
  href: string;
};

export type HomeHero = {
  eyebrow: string;
  title: string;
  lead: string;
  image: {
    src: string;
    alt: string;
  };
  caption: {
    label: string;
    text: string;
  };
  primaryLink: HomeHeroLink;
  secondaryLink: HomeHeroLink;
};

export type HomeScopeItem = {
  number: string;
  title: string;
  lead: string;
  points: string[];
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

export type HomeRealizationPhoto = {
  src: string;
  alt: string;
  label: string;
};

export type HomeContactTopic = {
  label: string;
  value: string;
};

export const homeHero: HomeHero = {
  eyebrow: "Termospec / technika przemysłowa",
  title: "Systemy chłodzenia i wentylacji dla przemysłu.",
  lead: "Projektowanie, produkcja i serwis rozwiązań technicznych dla górnictwa, tuneli oraz infrastruktury przemysłowej pracującej w wymagających warunkach.",
  image: {
    src: "/głowna-01.png",
    alt: "Przemysłowe urządzenie chłodnicze Termospec",
  },
  caption: {
    label: "obszary pracy",
    text: "górnictwo / tunele / przemysł",
  },
  primaryLink: {
    label: "zakres działalności",
    href: "#zakres",
  },
  secondaryLink: {
    label: "realizacje",
    href: "#realizacje",
  },
};

export const homePartners: HomePartner[] = [
  {
    name: "Silesia Mining",
    mark: "SM",
    sector: "górnictwo",
  },
  {
    name: "Nord Tunnel",
    mark: "NT",
    sector: "infrastruktura tunelowa",
  },
  {
    name: "Ventra Systems",
    mark: "VS",
    sector: "wentylacja przemysłowa",
  },
  {
    name: "Energolab",
    mark: "EL",
    sector: "energetyka",
  },
  {
    name: "Industro Tech",
    mark: "IT",
    sector: "przemysł ciężki",
  },
  {
    name: "Geo Cooling",
    mark: "GC",
    sector: "instalacje chłodnicze",
  },
  {
    name: "Partner 07",
    mark: "P7",
    sector: "automatyka i sterowanie",
  },
  {
    name: "Partner 08",
    mark: "P8",
    sector: "zaplecze projektowe",
  },
  {
    name: "Partner 09",
    mark: "P9",
    sector: "serwis techniczny",
  },
  {
    name: "Partner 10",
    mark: "P10",
    sector: "dostawy urządzeń",
  },
  {
    name: "Partner 11",
    mark: "P11",
    sector: "infrastruktura przemysłowa",
  },
  {
    name: "Partner 12",
    mark: "P12",
    sector: "wsparcie realizacji",
  },
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
  },
];

export const homeScopeImage: HomeScopeImage = {
  src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=82",
  alt: "Przemysłowa instalacja techniczna w hali produkcyjnej",
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

export const homeRealizationPhotos: HomeRealizationPhoto[] = [
  {
    src: "/images/products/chlodziarka-bezposredniego-dzialania-wyrobisko-ujecie-01.png",
    alt: "Realizacja produktu Termospec w wyrobisku podziemnym",
    label: "Chłodziarka bezpośredniego działania",
  },
  {
    src: "/images/products/chlodziarka-bezposredniego-dzialania-wyrobisko-ujecie-02.png",
    alt: "Zabudowa urządzenia chłodniczego Termospec w środowisku podziemnym",
    label: "Układ chłodzenia w wyrobisku",
  },
  {
    src: "/images/products/chlodziarka-posredniego-dzialania-wyrobisko-ujecie-01.png",
    alt: "Realizacja chłodziarki pośredniego działania Termospec",
    label: "Chłodziarka pośredniego działania",
  },
  {
    src: "/images/products/chlodziarka-posredniego-dzialania-wyrobisko-ujecie-02.png",
    alt: "Instalacja chłodnicza Termospec z osprzętem w wyrobisku",
    label: "Instalacja z osprzętem",
  },
  {
    src: "/images/products/chlodziarka-posredniego-dzialania-1-3mw-wyrobisko-ujecie-01.png",
    alt: "Realizacja agregatu chłodniczego Termospec w zakresie 1-3 MW",
    label: "Układ 1-3 MW",
  },
  {
    src: "/images/products/chlodnica-powietrza-cpn-wyrobisko-ujecie-01.png",
    alt: "Chłodnica powietrza CP(N) Termospec w realizacji podziemnej",
    label: "Chłodnica powietrza CP(N)",
  },
  {
    src: "/images/products/chlodnica-powietrza-cpn-wyrobisko-ujecie-02.png",
    alt: "Zabudowana chłodnica powietrza Termospec w miejscu pracy",
    label: "Zabudowa chłodnicy powietrza",
  },
  {
    src: "/images/products/chlodnica-wyparna-cww-wyrobisko-ujecie-01.png",
    alt: "Chłodnica wyparna CWW Termospec w realizacji przemysłowej",
    label: "Chłodnica wyparna CWW",
  },
  {
    src: "/images/realizations/uklad-chlodzenia-wyrobisko-podziemne.png",
    alt: "Układ chłodzenia dla wyrobiska podziemnego",
    label: "Wyrobisko podziemne",
  },
  {
    src: "/images/realizations/uklad-chlodzenia-instalacja-przemyslowa.png",
    alt: "Przemysłowa instalacja chłodnicza Termospec",
    label: "Instalacja przemysłowa",
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
