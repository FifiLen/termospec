export type ServiceContentSection = {
  title?: string;
  paragraphs?: string[];
  points?: string[];
};

export type ServiceMachine = {
  title: string;
  description: string;
  specifications: string[];
};

export type ServiceContent = {
  label: string;
  slug: string;
  intro: string[];
  sections?: ServiceContentSection[];
  machines?: ServiceMachine[];
  closing?: string;
  cta?: string;
};

export const services: ServiceContent[] = [
  {
    label: "Projektowanie przemysłowych systemów klimatyzacji i wentylacji",
    slug: "projektowanie-systemow-klimatyzacji-i-wentylacji",
    intro: [
      "Projektujemy nowoczesne i wydajne systemy klimatyzacji oraz wentylacji dla obiektów przemysłowych, produkcyjnych, magazynowych i komercyjnych. Każdy projekt przygotowujemy indywidualnie, uwzględniając specyfikę obiektu, jego przeznaczenie, wymagania technologiczne oraz obowiązujące normy i przepisy.",
    ],
    sections: [
      {
        title: "Zakres usług",
        points: [
          "projektowanie instalacji wentylacji mechanicznej i przemysłowej",
          "projektowanie systemów klimatyzacji",
          "projektowanie instalacji nawiewno-wywiewnych",
          "dobór urządzeń i rozwiązań technologicznych",
          "bilanse powietrza oraz obliczenia zapotrzebowania na chłód i ciepło",
          "opracowanie dokumentacji projektowej",
          "optymalizację istniejących systemów",
          "przygotowanie rozwiązań dostosowanych do indywidualnych wymagań inwestycji",
        ],
      },
      {
        title: "Rozwiązania dopasowane do Twojego obiektu",
        paragraphs: [
          "Każdy obiekt przemysłowy ma inne wymagania. Dlatego przed rozpoczęciem projektowania analizujemy m.in. charakter prowadzonej działalności, procesy technologiczne, kubaturę pomieszczeń, źródła zysków ciepła, wymagania dotyczące jakości powietrza oraz sposób użytkowania obiektu. Na tej podstawie dobieramy odpowiednie rozwiązania techniczne, które zapewniają wysoką efektywność, niezawodność i możliwość bezproblemowej eksploatacji instalacji przez wiele lat.",
        ],
      },
      {
        title: "Efektywność i oszczędność",
        paragraphs: [
          "Odpowiednio zaprojektowany system wentylacji i klimatyzacji ma bezpośredni wpływ na koszty funkcjonowania obiektu. Stawiamy na rozwiązania energooszczędne, które pozwalają ograniczyć zużycie energii bez kompromisów w zakresie wydajności i komfortu. W procesie projektowym uwzględniamy również możliwość zastosowania automatyki i systemów sterowania, dzięki którym instalacja może pracować w sposób dostosowany do aktualnych potrzeb obiektu.",
        ],
      },
    ],
    cta: "Potrzebujesz projektu wentylacji lub klimatyzacji dla obiektu przemysłowego? Skontaktuj się z nami. Przygotujemy rozwiązanie dopasowane do specyfiki Twojej inwestycji.",
  },
  {
    label: "Serwis 24/7",
    slug: "serwis-24-7",
    intro: [
      "Awaria urządzeń chłodniczych może prowadzić do przestojów, strat produktów oraz zakłócenia pracy całego obiektu. Dlatego oferujemy całodobowy serwis urządzeń chłodniczych 24/7, zapewniając szybką reakcję i profesjonalną pomoc techniczną w przypadku nagłych awarii.",
      "Obsługujemy urządzenia chłodnicze stosowane w zakładach przemysłowych, produkcyjnych, magazynach, sklepach, chłodniach oraz innych obiektach wymagających niezawodnego chłodzenia.",
    ],
    sections: [
      {
        title: "Szybka diagnostyka i naprawa",
        paragraphs: [
          "W przypadku awarii nasi serwisanci przeprowadzają dokładną diagnostykę urządzenia, identyfikują przyczynę problemu i podejmują działania mające na celu jak najszybsze przywrócenie prawidłowej pracy instalacji.",
        ],
        points: [
          "diagnostykę urządzeń i instalacji chłodniczych",
          "usuwanie awarii układów chłodniczych",
          "naprawę i wymianę uszkodzonych podzespołów",
          "lokalizowanie i usuwanie nieszczelności",
          "kontrolę parametrów pracy instalacji",
          "naprawę sprężarek, skraplaczy, parowników i innych elementów układu",
          "uzupełnianie oraz kontrolę czynnika chłodniczego",
          "regulację i uruchamianie urządzeń po naprawie",
          "przeglądy techniczne i konserwację",
        ],
      },
      {
        paragraphs: [
          "Działamy 24 godziny na dobę, 7 dni w tygodniu, również w przypadku awarii wymagających natychmiastowej interwencji. Rozumiemy, jak ważna jest ciągłość pracy instalacji chłodniczych, szczególnie w obiektach przemysłowych i magazynowych, gdzie awaria może skutkować znacznymi stratami.",
          "Stawiamy na szybką reakcję, skuteczną diagnostykę oraz trwałe rozwiązania. Naszym celem jest nie tylko usunięcie bieżącej usterki, ale również zapewnienie bezpiecznej i stabilnej pracy urządzeń chłodniczych.",
        ],
      },
    ],
    cta: "Potrzebujesz pilnej pomocy? Skontaktuj się z naszym serwisem urządzeń chłodniczych 24/7. Zapewniamy profesjonalną obsługę i szybką reakcję na awarie.",
  },
  {
    label: "Remonty urządzeń chłodniczych",
    slug: "remonty-urzadzen-chlodniczych",
    intro: [
      "Zapewniamy kompleksowe usługi remontowe urządzeń i instalacji chłodniczych, przywracając ich sprawność, wydajność oraz niezawodność. Obsługujemy urządzenia naszej produkcji, jak i urządzenia innych producentów wykorzystywane w obiektach przemysłowych, produkcyjnych, magazynowych i komercyjnych.",
      "Każdy remont poprzedzamy dokładną oceną stanu technicznego urządzenia oraz identyfikacją przyczyn nieprawidłowej pracy. Dzięki temu możemy dobrać odpowiedni zakres prac i rozwiązania dostosowane do rzeczywistych potrzeb instalacji.",
    ],
    sections: [
      {
        title: "Kompleksowy remont urządzeń chłodniczych",
        points: [
          "diagnostykę i ocenę stanu technicznego urządzeń chłodniczych",
          "remonty i regenerację podzespołów",
          "wymianę zużytych lub uszkodzonych elementów",
          "naprawy układów chłodniczych",
          "usuwanie nieszczelności instalacji",
          "czyszczenie i konserwację urządzeń",
          "kontrolę parametrów pracy instalacji",
          "regulację i uruchomienie urządzeń po remoncie",
          "modernizację istniejących układów chłodniczych",
        ],
      },
      {
        title: "Sprawność i niezawodność instalacji",
        paragraphs: [
          "Regularny remont i odpowiednia konserwacja urządzeń chłodniczych pozwalają ograniczyć ryzyko awarii, zmniejszyć koszty eksploatacji oraz wydłużyć żywotność całej instalacji. Podczas prac zwracamy szczególną uwagę na bezpieczeństwo, prawidłowe parametry pracy oraz efektywność energetyczną urządzeń.",
        ],
      },
      {
        title: "Remont dopasowany do potrzeb",
        paragraphs: [
          "Zakres każdego remontu ustalamy indywidualnie, uwzględniając rodzaj urządzenia, jego stan techniczny, sposób eksploatacji oraz wymagania użytkownika. Stawiamy na trwałe rozwiązania i fachowe wykonanie, dzięki czemu odnowione urządzenia mogą sprawnie funkcjonować przez kolejne lata.",
        ],
      },
    ],
    cta: "Masz urządzenie chłodnicze wymagające remontu lub modernizacji? Skontaktuj się z nami – ocenimy jego stan techniczny i zaproponujemy optymalne rozwiązanie.",
  },
  {
    label: "Obróbka metali",
    slug: "obrobka-metali-skrawaniem-i-laserem",
    intro: [
      "Maszyny CNC (Computer Numerical Control) umożliwiły przełom w produkcji przemysłowej dzięki automatyzacji i precyzji obróbki skrawaniem.",
      "Firma Termospec świadczy następujące usługi w tym zakresie:",
    ],
    sections: [
      {
        points: [
          "frezowanie – proces usuwania materiału za pomocą obrotowego narzędzia – frezu",
          "cięcie – oddzielanie części materiału od całości przy użyciu pił, laserów lub plazmy",
          "toczenie – obróbka materiału obracającego się wokół własnej osi, podczas gdy narzędzie skrawające usuwa jego nadmiar",
          "szlifowanie – proces ścierania materiału za pomocą narzędzia szlifierskiego",
          "wiercenie – tworzenie otworów w materiale przy użyciu specjalnych wierteł",
        ],
      },
    ],
    machines: [
      {
        title: "Pionowe centrum obróbcze Mazak VTC 820/20",
        description:
          "To pionowe centrum obróbcze zostało zaprojektowane do wszechstronnych zastosowań w obróbce skrawaniem. Maszyna charakteryzuje się dużym zakresem ruchu we wszystkich trzech osiach oraz elastycznością i wysoką precyzją.",
        specifications: [
          "przesuw w osi X — 2000 mm",
          "przesuw w osi Y — 820 mm",
          "przesuw w osi Z — 720 mm",
          "długość stołu — 2500 mm",
          "szerokość stołu — 820 mm",
          "maks. obroty wrzeciona — 12 000 rpm",
          "moc silnika wrzeciona — 22 kW",
        ],
      },
      {
        title: "Tokarka CNC SMEC SL 2000M",
        description:
          "To zaawansowana maszyna do obróbki skrawaniem, wyposażona w funkcje toczenia oraz frezowania dzięki zastosowaniu narzędzi obrotowych. Jest to model z serii SL 2000, produkowany przez firmę SMEC (Samsung Machine Tools Engineering Company).",
        specifications: [
          "maks. średnica nad łożem — 570 mm",
          "maks. średnica toczenia — 360 mm",
          "maks. długość toczenia — 520 mm",
          "maks. średnica obróbki z pręta — 68 mm",
          "prędkość obrotowa — 4500 rpm",
          "chwyt wrzeciona — A 2-6\"",
          "prześwit wrzeciona — 76 mm",
          "średnica uchwytu 3-szczękowego — 8\"",
          "moment obrotowy (maks./100%) — 410/249 Nm",
        ],
      },
      {
        title: "Pionowy automat tokarski SLV800M RH",
        description:
          "Jest to zaawansowane centrum obróbcze przeznaczone do skomplikowanych operacji toczenia i frezowania dużych komponentów.",
        specifications: [
          "maks. średnica nad łożem — 890 mm",
          "maks. średnica toczenia — 830 mm",
          "maks. długość toczenia — 775 mm",
          "maks. średnica frezowania — 624 mm",
          "prędkość obrotowa — 1500 rpm",
          "chwyt wrzeciona — A 2-11\"",
          "średnica uchwytu 3-szczękowego — 24\"",
          "moment obrotowy (maks./100%) — 1158/850 Nm",
        ],
      },
      {
        title: "Wypalarka plazmowa Alubran CNC 3050 PRO",
        description:
          "Wypalarka plazmowa CNC to maszyna przemysłowa wykorzystywana do precyzyjnego cięcia metali za pomocą plazmy, kontrolowana komputerowo (CNC). Jest stosowana do cięcia blach, rur i innych elementów stalowych.",
        specifications: [
          "wielkość stołu — 1550 × 3050 mm",
          "wysokość wycinanych elementów — do 220 mm",
          "źródło plazmy — EX-TRAFIRE 100 SD",
          "palnik — FHT-EX 105 TXH",
        ],
      },
    ],
    closing:
      "Na wyposażeniu parku maszynowego posiadamy również wycinarkę laserową o powierzchni roboczej 3000 × 1500 mm oraz znakowarkę laserową Fiber Laser.",
  },
  {
    label: "Usługi spawalnicze i konstrukcje stalowe",
    slug: "uslugi-spawalnicze-i-konstrukcje-stalowe",
    intro: [
      "Świadczymy profesjonalne usługi spawalnicze oraz wykonujemy konstrukcje stalowe zgodnie z obowiązującymi normami i wymaganiami jakościowymi. Nasz zespół tworzą doświadczeni, certyfikowani spawacze, posiadający kwalifikacje zgodne z wymaganiami Dyrektywy 2014/68/UE (PED). Realizujemy zarówno pojedyncze zlecenia, jak i kompleksowe projekty konstrukcji stalowych, dbając o precyzję wykonania, trwałość oraz bezpieczeństwo.",
    ],
    cta: "Skontaktuj się z nami, aby omówić zakres prac i przygotować ofertę dopasowaną do Twoich potrzeb!",
  },
];
