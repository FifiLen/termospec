Zadanie:
Przeprojektuj i zaimplementuj podstronę katalogu produktów dla strony Termospec.

Bardzo ważne:
Nie twórz nowego stylu wizualnego. Katalog produktów ma wyglądać jak naturalna kontynuacja aktualnej strony głównej Termospeca.

Nie inspiruj się zewnętrznymi stronami dokumentacji, bibliotekami UI ani typowym SaaS designem. Bazuj na istniejącym visual language projektu widocznym na stronie głównej.

Najpierw przeanalizuj aktualny projekt:

- globalne style,
- kolory,
- typografię,
- spacing,
- header,
- hero,
- sekcję partnerów,
- sekcję realizacji,
- formularz kontaktowy,
- footer,
- sposób budowania siatki, linii, borderów i bloków.

Nie zaczynaj kodowania, dopóki nie wypiszesz krótkiego planu:

1. jakie elementy obecnego stylu przenosisz do katalogu,
2. jak będzie działać layout katalogu,
3. jakie komponenty / pliki zmienisz,
4. jak zachowasz gotowość pod CMS.

Cel podstrony:
Katalog nie jest sklepem internetowym. Nie ma sprzedawać jak ecommerce. Ma prezentować ofertę techniczną firmy, pomagać użytkownikowi zrozumieć obszary produktów i budować zaufanie do Termospeca jako dostawcy rozwiązań dla przemysłu, górnictwa i infrastruktury technicznej.

Kierunek wizualny:

- techniczny,
- przemysłowy,
- spokojny,
- precyzyjny,
- gridowy,
- editorialowy,
- firmowy,
- trustbuildingowy.

Język wizualny do zachowania:

- ostre prostokątne sekcje,
- cienkie linie i separatory,
- bordowe akcenty,
- granatowe nagłówki,
- dużo białej przestrzeni,
- mocne zdjęcia przemysłowe,
- duże typograficzne oznaczenia typu R/01, P/01, K/01,
- małe etykiety uppercase z dużym trackingiem,
- brak przypadkowych cieni,
- brak miękkich SaaSowych cardów,
- brak przesadnych zaokrągleń.

Kolory:
Używaj istniejącej palety projektu:

- głęboki granat / fiolet jako kolor główny,
- bordo jako akcent i CTA,
- biały / bardzo jasne tła,
- żółty tylko wtedy, gdy naturalnie wynika z systemu strony, np. w mocniejszych blokach podobnych do footera.

Nie wprowadzaj nowych przypadkowych kolorów.

Układ katalogu:
Stwórz layout przypominający techniczny katalog firmowy, nie dashboard.

Wymagany układ desktop:

- pod headerem sekcja wprowadzająca katalog,
- lewy panel nawigacyjny z kategoriami i produktami,
- wyszukiwarka produktów w lewym panelu,
- aktywny produkt wyraźnie zaznaczony przez linię, border lub bordowy akcent,
- główny obszar po prawej z prezentacją produktu,
- duży nagłówek produktu,
- krótki opis techniczny,
- zdjęcie / wizualizacja produktu,
- sekcja parametrów,
- sekcja zastosowań,
- sekcja zakresu obsługi / serwisu,
- sekcja powiązanych realizacji,
- końcowy blok kontaktowy dopasowany do obecnego formularza / CTA, ale nie agresywny sprzedażowo.

Lewy panel:
Nie ma wyglądać jak sidebar aplikacji webowej.
Ma wyglądać jak indeks katalogu technicznego / spis produktów.

Powinien zawierać:

- wyszukiwarkę,
- listę kategorii,
- listę produktów,
- licznik lub krótkie oznaczenia,
- aktywny stan,
- delikatne separatory,
- prostokątne linie zgodne ze stroną główną.

Główna część produktu:
Ma być bardziej jak karta katalogowa / techniczna plansza niż landing page.

Powinna zawierać:

- oznaczenie produktu, np. P/01,
- kategorię,
- nazwę,
- opis,
- zdjęcie,
- parametry techniczne,
- zastosowania,
- cechy,
- zakres obsługi,
- powiązane realizacje.

Sekcja realizacji:
Realizacje mają być ważnym elementem trustbuildingu.
Nawiąż do stylu sekcji „Wybrane wdrożenia i obszary prac technicznych” ze strony głównej:

- duże zdjęcia,
- ciemny overlay,
- oznaczenia typu R/01,
- etykiety kategorii,
- prostokątne ramki,
- krótki opis zakresu prac.

CMS-ready:
Przygotuj strukturę danych tak, żeby łatwo było później podpiąć CMS.

Produkty powinny być oparte o strukturę danych, np.:

- id,
- slug,
- category,
- title,
- shortDescription,
- longDescription,
- image,
- specs,
- applications,
- features,
- serviceScope,
- relatedProjects.

Nie hardcoduj wielu powtarzalnych bloków ręcznie.
Używaj mapowania po tablicach i czytelnych typów / interfejsów, jeśli projekt korzysta z TypeScript.

Czego absolutnie unikać:

- nie rób ecommerce,
- nie dodawaj koszyka,
- nie dodawaj cen,
- nie dodawaj ratingów,
- nie rób promocyjnych badge’y typu “best seller”,
- nie rób layoutu jak marketplace,
- nie rób SaaSowych gradientów,
- nie używaj dużych cieni,
- nie rób miękkich rounded cardów,
- nie zmieniaj headera i footera bez potrzeby,
- nie twórz osobnego visual language,
- nie dodawaj nowych bibliotek bez uzasadnienia,
- nie zmieniaj globalnych styli w sposób, który popsuje stronę główną.

Mobile:
Na mobile lewy panel nie może być ciasnym sidebarem.
Zamień go w:

- sekcję wyboru kategorii nad treścią,
- wyszukiwarkę,
- listę produktów w kompaktowym układzie,
- a potem pełną kartę produktu.

Definicja ukończenia:
Zadanie jest gotowe dopiero wtedy, gdy:

- katalog wygląda jak naturalna część obecnej strony Termospeca,
- zachowuje prostokątny, techniczny, przemysłowy charakter strony głównej,
- ma czytelny indeks produktów po lewej stronie na desktopie,
- ma mocną prezentację produktu,
- ma sekcję realizacji,
- jest przygotowany pod CMS,
- nie wygląda jak SaaS template,
- nie wygląda jak sklep internetowy,
- nie psuje istniejących sekcji, headera ani footera,
- kod jest czytelny, komponentowy i zgodny z aktualnym sposobem pisania w projekcie.

Przed finalizacją sprawdź wizualnie:

- czy spacing pasuje do strony głównej,
- czy border radius nie jest zbyt miękki,
- czy jest wystarczająco dużo linii i technicznej struktury,
- czy bordowe akcenty są użyte konsekwentnie,
- czy realizacje wyglądają jak część systemu strony,
- czy całość nie poszła w stronę generycznego template’u.
