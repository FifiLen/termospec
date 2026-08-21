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

export type AboutProfileSection = {
  title: string;
  body: string;
};

export type AboutTimelineItem = {
  year: string;
  title: string;
  body?: string;
};

export const aboutHero: AboutHero = {
  eyebrow: "o firmie",
  title: "Termospec rozwija technikę chłodzenia dla wymagających środowisk.",
  lead: [
    "Od blisko 30 lat oferujemy kompleksowe rozwiązania zwalczające zagrożenia temperaturowe w kopalniach podziemnych oraz tunelach.",
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
    value: "blisko 30 lat",
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

export const aboutProfile = {
  title:
    "Kompleksowa realizacja i obsługa instalacji klimatyzacyjnych oraz wentylacyjnych o dużych mocach.",
  lead:
    "Termospec Sp. z o.o. to jeden z największych producentów urządzeń chłodniczych w Polsce o uznanej renomie z blisko trzydziestoletnim doświadczeniem w branży.",
  intro:
    "To, z czego słynie nasza Firma to kompleksowa realizacja i obsługa instalacji klimatyzacyjnych oraz wentylacyjnych o dużych mocach oraz portfolio dopasowane do potrzeb klientów z sektora przemysłowego, produkcyjnego, magazynowego i komercyjnego.",
  servicesIntro:
    "Poza działalnością stricte produkcyjną, oferujemy szeroki zakres usług – od projektowania i modernizacji instalacji, poprzez montaż i uruchomienie urządzeń, aż po ich regularny serwis, konserwację oraz remonty. Specjalizujemy się w szczególności w:",
  specialties: [
    "projektowanie przemysłowych systemów klimatyzacji i wentylacji dużych mocy dla przemysłu i górnictwa",
    "montaż i modernizacja istniejących instalacji chłodniczych",
    "remonty i naprawy urządzeń chłodniczych",
    "przeglądy techniczne i konserwacja instalacji",
    "diagnostyka oraz usuwanie usterek",
    "projekty pod klucz",
    "całodobowy serwis awaryjny 24/7",
  ],
  sections: [
    {
      title: "Doświadczenie i profesjonalizm",
      body: "Każdą realizację traktujemy indywidualnie, analizując specyfikę obiektu, wymagania technologiczne oraz oczekiwania klienta. Stawiamy na rzetelne wykonanie, wysoką jakość usług i rozwiązania zapewniające niezawodną pracę instalacji. Naszym priorytetem jest sprawność, bezpieczeństwo i efektywność urządzeń, a także ograniczenie ryzyka awarii i kosztownych przestojów.",
    },
    {
      title: "Partner na każdym etapie inwestycji",
      body: "Od projektu, poprzez wykonanie, aż po późniejszą opiekę serwisową – zapewniamy fachowe doradztwo i kompleksowe wsparcie zarówno przy nowych inwestycjach, jak i w przypadku modernizacji lub remontu istniejących instalacji.",
    },
  ] satisfies AboutProfileSection[],
};

export const aboutTimeline: AboutTimelineItem[] = [
  {
    year: "1995",
    title: "Założenie firmy",
    body: "Początek działalności Termospec i budowania kompetencji w branży urządzeń oraz instalacji chłodniczych.",
  },
  {
    year: "2000",
    title: "Rozwój na rynku polskim",
    body: "Rozszerzenie skali realizacji i obsługi klientów przemysłowych na rynku krajowym.",
  },
  {
    year: "Kolejne lata",
    title: "Specjalizacja i rozwój technologii",
    body: "Rozwój rozwiązań dla kopalń podziemnych i tuneli, wspierany współpracą z jednostkami naukowo-badawczymi oraz doświadczeniem zespołu technicznego.",
  },
  {
    year: "2020–2021",
    title: "Innowacyjny typoszereg agregatów",
    body: "Rozbudowa parku maszynowego i wdrożenie agregatów chłodniczych pracujących z czynnikiem pośredniczącym na bazie roztworu wodno-glikolowego.",
  },
  {
    year: "2023–2025",
    title: "Nowe usługi obróbki metali",
    body: "Rozwój zaawansowanej obróbki metali i tworzyw sztucznych, zakup nowoczesnych maszyn CNC oraz wdrożenie rozwiązań ograniczających zużycie energii i powstawanie odpadów.",
  },
  {
    year: "Dziś",
    title: "Kompleksowe wsparcie przemysłu",
    body: "Produkcja, projektowanie, wdrożenia i serwis instalacji o łącznej mocy chłodniczej przekraczającej 500 MW.",
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
