export type HomePartner = {
  id: string;
  label: string;
};

export type HomeProcessStep = {
  number: string;
  title: string;
  body: string;
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
