export interface FundingImage {
  src: string;
  alt: string;
}

export interface FundingParagraph {
  text: string;
  emphasis?: boolean;
}

export interface FundingFact {
  label: string;
  value: string;
}

export interface FundingProject {
  id: string;
  eyebrow?: string;
  title?: string;
  image: FundingImage;
  paragraphs: FundingParagraph[];
  sections?: {
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
  facts?: FundingFact[];
}

export const fundingPage = {
  title:
    'Projekty współfinansowane z programu "Fundusze Europejskie dla Śląskiego 2021-2027".',
  description:
    "Informacje o projektach Termospec współfinansowanych ze środków Unii Europejskiej oraz funduszy regionalnych.",
};

export const fundingProjects: FundingProject[] = [
  {
    id: "fesl-10-03-ip-01-04e8-23-003",
    image: {
      src: "/grupa-dofinansowanie-grant-01.png",
      alt: "Logotypy Fundusze Europejskie dla Śląskiego, Rzeczpospolita Polska, Dofinansowane przez Unię Europejską i Województwo Śląskie",
    },
    paragraphs: [
      {
        text: "Informujemy, że firma TERMOSPEC Spółka z ograniczoną odpowiedzialnością realizuje projekt nr FESL.10.03-IP.01-04E8/23-003 pn.:",
      },
      {
        text: "Wdrożenie nowych usług krokiem do przebranżowienia skutkującego nowym rynkiem docelowym",
        emphasis: true,
      },
      {
        text: "współfinansowany ze środków w ramach „Fundusze Europejskie dla Śląskiego 2021-2027” (Fundusz na rzecz Sprawiedliwej Transformacji) (dla Priorytetu: FESL.10.00-Fundusze Europejskie na transformację dla Działania: FESL.10.03-Wsparcie MŚP na rzecz transformacji) Nr naboru: FESL.10.03-IP.01-058/23.",
      },
    ],
    sections: [
      {
        title: "Krótki opis projektu:",
        paragraphs: [
          "Przedmiotem projektu jest wdrożenie w przedsiębiorstwie TERMOSPEC nowych usług związanych z zaawansowaną technologicznie obróbką metali/tworzyw sztucznych, poprzez zakup nowoczesnych tokarek i pozostałego niezbędnego wyposażenia.",
          "Podstawowymi celami niniejszego projektu jest:",
        ],
        bullets: [
          "łagodzenie skutków transformacji wpływających na społeczeństwo, zatrudnienie, gospodarkę i środowisko;",
          "zwiększenie konkurencyjności przedsiębiorstwa na rynku,",
          "stworzenie nowych miejsc pracy,",
          "wdrożenie rozwiązań zapobiegających powstawaniu odpadów w gospodarce (w szczególności wióry, chłodziwo),",
          "ograniczenia zużycia energii elektrycznej z sieci,",
          "recykling surowców (wióry),",
          "wprowadzenia nowych, neutralnych dla klimatu usług i wyrobów,",
          "zdobycie nowych rynków - tym samym jest to krok w rozwoju Spółki mający na celu odejście od branży okołogórniczej.",
        ],
      },
      {
        paragraphs: [
          "Cel podstawowy projektu zostanie osiągnięty poprzez realizację następujących celów szczegółowych:",
        ],
        bullets: [
          "zakup urządzeń CNC umożliwiających wprowadzenie usług kompleksowej obróbki metali i również możliwa będzie obróbka tworzyw sztucznych (w tym toczenie, frezowanie frezami walcowymi, wiercenie, gwintowanie, pomiary odbiorcze),",
          "zakup proekologicznych rozwiązań w procesie obróbczym wpisujących się w model Gospodarki w Obiegu Zamkniętym oraz OZE, celem zwiększenia samowystarczalności pod względem zasobów energetycznych,",
          "zakup wysokowydajnej stacji roboczej do projektowania skomplikowanych elementów (uzupełnienie do wdrażanej nowej usługi).",
        ],
      },
      {
        paragraphs: [
          "Ważnym aspektem realizacji projektu jest bezpośredni pozytywny wpływ na utworzenie nowych miejsc pracy w regionie oraz wdrożenie zrównoważonych metod obróbczych. Potrzeba realizacji niniejszego projektu wynika z konieczności adaptacji przedsiębiorstwa do zmian klimatu oraz zaoferowania na rynku usług odpowiadających na kluczowe potrzeby klientów docelowych. Na rynku docelowym występuje aktualnie deficyt usług związanych z obróbką elementów o średnicy do 800 mm, które charakteryzują się najwyższą jakością, wysoką precyzją wykonania oraz wysokim stopniem powtarzalności.",
          "Dodatkowo Spółka będzie w stanie zaoferować inne procesy obróbcze, takie jak frezowanie frezami walcowymi, wiercenie, gwintowanie, pomiary odbiorcze.",
          "Projekt przyczyni się do:",
        ],
        bullets: [
          "zmniejszenia zużycia surowców w procesach produkcyjnych (obróbczych),",
          "ograniczenia zużycia energii elektrycznej,",
          "wprowadzenia nowych, neutralnych dla klimatu usług,",
          "realizacji założeń opartych na modelu gospodarki cyrkularnej.",
        ],
      },
    ],
    facts: [
      { label: "#FunduszeEuropejskie", value: "" },
      { label: "Całkowita wartość projektu", value: "1 846 390,00 PLN" },
      { label: "Dofinansowanie projektu z UE", value: "911 832,60 PLN" },
      { label: "Okres realizacji projektu", value: "01.10.2023 - 31.12.2025" },
    ],
  },
  {
    id: "fesl-10-03-ip-01-058-23-zakonczenie",
    eyebrow: "Zakończenie realizacji projektu",
    image: {
      src: "/grupa-dofinansowanie-grand-02.png",
      alt: "Logotypy Fundusze Europejskie dla Śląskiego, Rzeczpospolita Polska, Dofinansowane przez Unię Europejską i Województwo Śląskie",
    },
    paragraphs: [
      {
        text: "Z radością informujemy, że zakończyliśmy realizację projektu w ramach Fundusze Europejskie dla Śląskiego 2021-2027 (Fundusz na rzecz Sprawiedliwej Transformacji), numer naboru: FESL.10.03-IP.01-058/23.",
        emphasis: true,
      },
    ],
    sections: [
      {
        paragraphs: ["Dzięki wsparciu z Funduszy Europejskich:"],
        bullets: [
          "stworzyliśmy nowe miejsca pracy,",
          "zwiększyliśmy liczbę zleceń na obróbkę CNC,",
          "podnieśliśmy konkurencyjność naszego przedsiębiorstwa na rynku,",
          "wdrożyliśmy innowacyjne rozwiązania ograniczające powstawanie odpadów (wióry, chłodziwo),",
          "zredukowaliśmy zużycie energii elektrycznej z sieci,",
          "zdobyliśmy nowe rynki zbytu.",
        ],
      },
      {
        paragraphs: [
          "W ramach projektu zakupiliśmy nowoczesne urządzenia i rozwiązania technologiczne, m.in.:",
        ],
        bullets: [
          "tokarkę karuzelową SMEC SLV800M RH,",
          "tokarkę z osią poziomą SMEC SL2000BM,",
          "elektryczny wózek podnośnikowy wraz ze stacją ładowania i instalacją fotowoltaiczną o mocy 7,28 kWp,",
          "stację odzysku chłodziwa z wiórów,",
          "ozonator do chłodziwa,",
          "komputer do obsługi procesów produkcyjnych.",
        ],
      },
      {
        paragraphs: [
          "Projekt pozwolił nam na rozwój firmy w duchu zrównoważonego rozwoju, z poszanowaniem środowiska i lokalnej społeczności",
          "Dziękujemy za wsparcie i zaufanie!",
        ],
      },
    ],
  },
  {
    id: "wnd-rpsl-03-02-00-24-03g7-20-001",
    image: {
      src: "/grupa-dofinansowanie-grant-03.jpg",
      alt: "Logotypy Fundusze Europejskie Program Regionalny, Rzeczpospolita Polska, Śląskie i Unia Europejska Europejski Fundusz Rozwoju Regionalnego",
    },
    paragraphs: [
      {
        text: "Informujemy, że firma TERMOSPEC Spółka z ograniczoną odpowiedzialnością realizuje projekt nr WND-RPSL.03.02.00-24-03G7/20-001 pn.:",
      },
      {
        text: "Wdrożenie na rynek innowacyjnego typoszeregu agregatów chłodniczych - szansą na wejście na nowe rynki zbytu oraz wzrost konkurencyjności",
        emphasis: true,
      },
      {
        text: "dofinansowany ze środków Europejskiego Funduszu Rozwoju Regionalnego w ramach Regionalnego Programu Operacyjnego Województwa Śląskiego na lata 2014 - 2020 (Oś Priorytetowa III „Konkurencyjność MŚP”, Działanie 3.2 „Innowacje w MŚP”).",
      },
    ],
    sections: [
      {
        title: "Krótki opis projektu:",
        paragraphs: [
          "W ramach niniejszego projektu zaplanowano rozbudowę parku maszynowego o zakup nowoczesnych maszyn i urządzeń, w celu wdrożenia na rynek innowacyjnego typoszeregu agregatów chłodniczych pracujących z czynnikiem pośredniczącym na bazie roztworu wodno-glikolowego.",
          "Realizacja projektu przyczyni się zarówno do utrzymania i wzrostu konkurencyjności Spółki na rynku, utworzenia nowego miejsca pracy, a także pozwoli na dostosowanie się do realiów rynkowych związanych m.in. z kryzysem zdrowia publicznego spowodowanego rozprzestrzenianiem się koronawirusa ludzkiego typu SARS-COVID-19 - gdyż istotnym efektem niniejszego przedsięwzięcia będzie wejście na nowe rynki zbytu (rozszerzenie grona potencjalnych klientów).",
        ],
      },
    ],
    facts: [
      { label: "Całkowita wartość projektu", value: "1 324 882,20 PLN" },
      { label: "Dofinansowanie projektu z UE", value: "799 991,88 PLN" },
      { label: "Okres realizacji projektu", value: "01.09.2020 - 31.12.2021" },
    ],
  },
];
