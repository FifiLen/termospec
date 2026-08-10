import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
  ServiceNavigationItem,
} from "~~/types/navigation";

const entries = (...labels: string[]): ProductNavigationEntry[] => {
  return labels.map((label) => ({ label }));
};

export const productNavigation: ProductNavigationCategory[] = [
  {
    number: "01",
    label: "Agregaty chłodnicze",
    slug: "agregaty-chlodnicze",
    entries: [],
    groups: [
      {
        label: "Agregaty chłodnicze ze sprężarką tłokową",
        slug: "agregaty-sprezarka-tlokowa",
        entries: entries(
          "TS-150",
          "TS-200",
          "TS-250",
          "TS-300",
          "TS-350",
          "TS-400",
        ),
      },
      {
        label: "Agregaty chłodnicze ze sprężarką śrubową",
        slug: "agregaty-sprezarka-srubowa",
        entries: entries(
          "TS-300",
          "TS-350",
          "TS-400",
          "TS-450",
          "TS-500",
          "TS-550",
          "TS-600",
          "TS-650",
          "TS-700",
          "TS-750",
          "TS-800",
        ),
      },
      {
        label: "Agregaty chłodnicze dwu-sprężarkowe",
        slug: "agregaty-dwu-sprezarkowe",
        entries: entries("TS-500", "TS-600", "TS-700"),
      },
      {
        label: "Agregaty chłodnicze dużych mocy",
        slug: "agregaty-duzych-mocy",
        entries: entries("TS-990", "TS-1200", "TS-2000", "TS-2500", "TS-3000"),
      },
      {
        label: "Agregaty klimatyzacyjne małych mocy",
        slug: "agregaty-malych-mocy",
        entries: entries("Typoszereg TS1–TS60"),
      },
      {
        label: "Mobilne urządzenia chłodnicze",
        slug: "mobilne-urzadzenia-chlodnicze",
        entries: [],
        note: "do dalszej rozbudowy",
      },
    ],
  },
  {
    number: "02",
    label: "Chłodnice powietrza",
    slug: "chlodnice-powietrza",
    entries: entries(
      "CP-250",
      "CP-300",
      "CP-400",
      "CP-500",
      "Pozostałe moce: 10–1000 kW, według indywidualnych potrzeb klienta",
    ),
    groups: [],
  },
  {
    number: "03",
    label: "Parowniki",
    slug: "parowniki",
    entries: [],
    groups: [
      {
        label: "Parowniki powietrza",
        slug: "parowniki-powietrza",
        entries: entries("Typoszereg TS-150/PB – TS/PB-900"),
      },
      {
        label: "Parowniki wodne",
        slug: "parowniki-wodne",
        entries: entries("Typoszereg TS-150/PP – TS/PP-900"),
      },
    ],
  },
  {
    number: "04",
    label: "Chłodnice wyparne wody",
    slug: "chlodnice-wyparne-wody",
    entries: entries(
      "CWW-200",
      "CWW-300",
      "CWW-450",
      "Pozostałe moce: 100–1000 kW, według indywidualnych potrzeb klienta",
    ),
    groups: [],
  },
  {
    number: "05",
    label: "Systemy redukcji ciśnienia",
    slug: "systemy-redukcji-cisnienia",
    entries: entries(
      "Zawory redukcyjne niskiego i wysokiego ciśnienia",
      "Stacje redukcji ciśnień",
      "Trójkomorowy podajnik pompowy (6–35 MW)",
    ),
    groups: [],
  },
  {
    number: "06",
    label: "Zbiorniki ciśnieniowe",
    slug: "zbiorniki-cisnieniowe",
    entries: [
      { label: "Skraplacze o mocy 10–4000 kW" },
      { label: "Parowniki", targetSlug: "parowniki" },
      { label: "Wymienniki ciepła" },
    ],
    groups: [],
  },
  {
    number: "07",
    label: "Systemy sterownicze",
    slug: "systemy-sterownicze",
    entries: [],
    groups: [],
    note: "do dalszej rozbudowy",
  },
  {
    number: "08",
    label: "Wentylatory",
    slug: "wentylatory",
    entries: [],
    groups: [],
    note: "do dalszej rozbudowy",
  },
  {
    number: "09",
    label: "Inne",
    slug: "inne",
    entries: entries(
      "Punkty klimatyzacyjne / rozdzielacze wody lodowej",
      "Tamy wentylacyjne",
      "Instalacje redukcji siarkowodoru",
    ),
    groups: [],
  },
];

export const serviceNavigation: ServiceNavigationItem[] = [
  {
    number: "01",
    label: "Projektowanie przemysłowych systemów klimatyzacji i wentylacji",
    slug: "projektowanie-systemow-klimatyzacji-i-wentylacji",
    href: "/uslugi#projektowanie-systemow-klimatyzacji-i-wentylacji",
  },
  {
    number: "02",
    label: "Serwis 24/7",
    slug: "serwis-24-7",
    href: "/uslugi#serwis-24-7",
  },
  {
    number: "03",
    label: "Remonty urządzeń chłodniczych",
    slug: "remonty-urzadzen-chlodniczych",
    href: "/uslugi#remonty-urzadzen-chlodniczych",
  },
  {
    number: "04",
    label: "Obróbka metali skrawaniem i laserem",
    slug: "obrobka-metali-skrawaniem-i-laserem",
    href: "/uslugi#obrobka-metali-skrawaniem-i-laserem",
  },
  {
    number: "05",
    label: "Usługi spawalnicze i konstrukcje stalowe",
    slug: "uslugi-spawalnicze-i-konstrukcje-stalowe",
    href: "/uslugi#uslugi-spawalnicze-i-konstrukcje-stalowe",
  },
];
