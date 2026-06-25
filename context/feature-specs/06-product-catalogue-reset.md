Zadanie: przygotuj plan naprawy `/produkty`, ale jeszcze nie koduj.

Najpierw przeczytaj:

- `AGENTS.md`
- `context/ui-context.md`
- `context/content-map.md`
- `context/feature-specs/06-product-catalogue-reset.md`
- aktualne pliki `/produkty` i komponenty katalogu

Ważne:
`progress-tracker.md` jest historycznym changelogiem, nie aktualną specyfikacją implementacji. Nie przywracaj starych eksperymentów takich jak `ProductPageHero`, hero intro, stats panel, Nuxt UI documentation rhythm, blueprint mesh, hatching, product detail routes albo landing-page layout.

Aktualna decyzja:
`/produkty` ma być pełnoekranowym katalogiem technicznym zaczynającym się bezpośrednio pod fixed headerem.

Nie może być:

- hero,
- intro/postera,
- statystyk,
- dużego pustego obszaru u góry,
- route-level `max-w`,
- route-level `mx-auto`,
- dużych bocznych paddingów,
- SaaSowych kart,
- ecommerce layoutu.

Docelowo:

- lewa kolumna: techniczny indeks katalogu,
- prawa kolumna: pełne sheet’y rodzin produktowych,
- pełna szerokość viewportu,
- cienkie linie konstrukcyjne,
- białe powierzchnie,
- granatowa typografia,
- bordowe akcenty,
- square geometry,
- brak cieni i dużych zaokrągleń,
- dane nadal z Nuxt Content / `content/products/*.yml`.

Zanim zaczniesz kodować, wypisz:

1. które pliki zmienisz,
2. co usuniesz,
3. jak usuniesz hero/intro/statystyki,
4. jak ustawisz pełną szerokość bez bocznych paddingów,
5. jak zachowasz CMS-ready dane,
6. czego nie dotkniesz.

Po planie zatrzymaj się i czekaj na moją akceptację.
