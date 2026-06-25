export type AboutHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  image: {
    src: string;
    alt: string;
  };
};

export type AboutMetric = {
  value: string;
  label: string;
  body: string;
};

export type AboutFocusItem = {
  icon: string;
  title: string;
  body: string;
};

export const aboutHero: AboutHero = {
  eyebrow: "o firmie",
  title: "Termospec rozwija technikę chłodzenia dla wymagających środowisk.",
  lead: [
    "Od 25 lat oferujemy kompleksowe rozwiązania zwalczające zagrożenia temperaturowe w kopalniach podziemnych oraz tunelach.",
    "Nasza oferta obejmuje produkcję urządzeń chłodniczych oraz projektowanie, obsługę i serwis układów klimatyzacji kopalń podziemnych i tuneli.",
    "Wieloletnie doświadczenie, wykwalifikowana kadra oraz współpraca z jednostkami naukowo-badawczymi i kopalniami pozwalają rozwijać rozwiązania potwierdzone patentami oraz publikacjami naukowymi.",
  ],
  image: {
    src: "/budynek-termospec.png",
    alt: "Budynek Termospec",
  },
};

export const aboutMetrics: AboutMetric[] = [
  {
    value: "25 lat",
    label: "doświadczenia",
    body: "Rozwój rozwiązań dla środowisk, w których temperatura wpływa na bezpieczeństwo i ciągłość pracy.",
  },
  {
    value: "500 MW",
    label: "łącznej mocy chłodniczej",
    body: "Kilkaset wyprodukowanych urządzeń buduje pozycję Termospec na rynku rozwiązań chłodniczych dla górnictwa i budownictwa podziemnego.",
  },
  {
    value: "kopalnie / tunele",
    label: "obszary zastosowań",
    body: "Specjalizacja w instalacjach pracujących w wymagających warunkach podziemnych i infrastrukturalnych.",
  },
  {
    value: "Polska i zagranica",
    label: "rynki realizacji",
    body: "Kompleksowe rozwiązania klimatyzacyjne były dostarczane także do kopalń chińskich, rosyjskich oraz meksykańskich.",
  },
];

export const aboutFocusItems: AboutFocusItem[] = [
  {
    icon: "i-lucide-hard-hat",
    title: "Doświadczenie w trudnych warunkach",
    body: "Wieloletnia praca z instalacjami chłodniczymi dla kopalń i tuneli pozwala projektować rozwiązania pod konkretne ograniczenia obiektu.",
  },
  {
    icon: "i-lucide-users-round",
    title: "Kadra techniczna i serwisowa",
    body: "Wykwalifikowany zespół łączy kompetencje projektowe, produkcyjne, uruchomieniowe i serwisowe.",
  },
  {
    icon: "i-lucide-flask-conical",
    title: "Współpraca badawcza",
    body: "Współpraca z jednostkami naukowo-badawczymi oraz kopalniami, potwierdzona patentami i publikacjami, wspiera rozwój oferty.",
  },
];
