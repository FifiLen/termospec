<script setup lang="ts">
const footerLinks = [
  { label: "o firmie", to: "/o-firmie" },
  { label: "kontakt", to: "/#kontakt" },
  { label: "produkty", to: "/produkty" },
  { label: "realizacje", to: "/#realizacje" },
  { label: "certyfikaty" },
  { label: "dotacje", to: "/dofinansowania" },
  { label: "rodo", to: "/rodo" },
];

const certificates = ["ISO 9001", "ISO 14001", "PN-EN ISO 3834-2", "CE"];
</script>

<template>
  <footer class="w-full border-t border-ink/10 bg-signal px-5 font-sans text-ink sm:px-8 lg:px-12">
    <div class="mx-auto max-w-[92rem] py-16 lg:py-20">
      <div class="grid gap-14 lg:grid-cols-[0.8fr_1.05fr_1fr] lg:gap-14 xl:gap-20">
        <div>
          <NuxtImg src="/termospec-logo.png" alt="Termospec" width="132" class="h-auto w-32" />
          <p class="mt-6 max-w-sm text-sm leading-7 text-ink/62">
            Projektujemy i dostarczamy zaawansowane rozwiązania cieplne dla przemysłu, górnictwa i energetyki. Niezawodność. Efektywność. Inżynieria.
          </p>

          <nav class="mt-10" aria-label="Nawigacja w stopce">
            <ul class="grid grid-cols-2 gap-x-8 gap-y-4 text-base font-medium">
              <li v-for="link in footerLinks" :key="link.label">
                <NuxtLink v-if="link.to" :to="link.to" class="transition-colors hover:text-brand">
                  {{ link.label }}
                </NuxtLink>
                <span v-else class="text-ink/55">{{ link.label }}</span>
              </li>
            </ul>
          </nav>
        </div>

        <article class="mx-auto w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-brand">
          <div class="relative h-80 overflow-hidden bg-surface lg:h-96">
            <NuxtImg
              src="/stopka-img.png"
              alt="Serwisant Termospec przy urządzeniu"
              width="1100"
              height="760"
              class="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="p-7 md:p-8">
            <h2 class="font-sans text-xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-2xl">Porozmawiajmy o Twoim projekcie</h2>
            <p class="mt-4 max-w-md text-sm leading-7 text-white/78">Nasi specjaliści pomogą dobrać optymalne rozwiązania dopasowane do Twoich potrzeb.</p>
            <NuxtLink
              to="/#kontakt"
              class="mt-6 inline-flex min-h-11 items-center gap-6 rounded-full bg-white px-6 text-xs font-semibold text-brand transition-colors hover:bg-surface"
            >
              Skontaktuj się z nami <span aria-hidden="true" class="text-brand">→</span>
            </NuxtLink>
          </div>
        </article>

        <div>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <NuxtLink
              to="/#kontakt"
              class="footer-card rounded-[1.5rem] bg-brand p-6 transition duration-300 hover:-translate-y-1 hover:bg-brand/90"
            >
              <p class="text-[0.65rem] text-white/65">Pion / kariera</p>
              <h2 class="mt-3 font-sans text-lg font-semibold leading-tight tracking-[-0.02em] text-white">Dołącz do zespołu</h2>
              <p class="mt-3 text-xs leading-6 text-white/78">Szukamy inżynierów i projektantów. Sprawdź aktualne procesy rekrutacyjne.</p>
            </NuxtLink>

            <NuxtLink
              to="/#kontakt"
              class="footer-card rounded-[1.5rem] bg-brand p-6 transition duration-300 hover:-translate-y-1 hover:bg-brand/90"
            >
              <p class="text-[0.65rem] text-white/65">Dział / serwis</p>
              <h2 class="mt-3 font-sans text-lg font-semibold leading-tight tracking-[-0.02em] text-white">Wsparcie techniczne</h2>
              <p class="mt-3 text-xs leading-6 text-white/78">Utrzymanie ruchu, autoryzowany serwis urządzeń oraz całodobowe zgłoszenia przeglądów i awarii.</p>
            </NuxtLink>
          </div>

          <dl class="mt-9 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-xs">
            <dt class="text-ink/36">KRS</dt><dd class="text-right text-ink/76">0000109147</dd>
            <dt class="text-ink/36">NIP</dt><dd class="text-right text-ink/76">PL6422590547</dd>
            <dt class="text-ink/36">REGON</dt><dd class="text-right text-ink/76">276184836</dd>
            <dt class="text-ink/36">Kapitał</dt><dd class="text-right text-ink/76">100.000 PLN</dd>
            <dt class="mt-2 text-ink/36">Tel</dt>
            <dd class="mt-2 text-right"><a href="tel:+48324358050" class="text-ink/76 hover:text-brand">+48 (32) 435 80 50</a></dd>
            <dt class="text-ink/36">Fax</dt><dd class="text-right text-ink/76">+48 (32) 435 80 50 wew. 16</dd>
            <dt class="text-ink/36">E-mail</dt>
            <dd class="text-right"><a href="mailto:biuro@termospec.pl" class="text-ink/76 hover:text-brand">biuro@termospec.pl</a></dd>
            <dt class="text-ink/36">Adres</dt><dd class="text-right leading-5 text-ink/76">ul. Górnicza 10, 44–240 Żory, Polska</dd>
          </dl>
        </div>
      </div>

      <div class="mt-16 flex flex-col gap-6 border-t border-ink/10 pt-6 text-[0.68rem] text-ink/48 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <span>© 2026 Termospec Sp. z o.o. Wszelkie prawa zastrzeżone.</span>
          <span>Polityka prywatności</span>
          <NuxtLink to="/rodo" class="text-ink/72 hover:text-brand">RODO</NuxtLink>
          <span>Mapa strony</span>
        </div>

        <div class="flex flex-wrap gap-2">
          <span v-for="certificate in certificates" :key="certificate" class="rounded-full bg-surface/88 px-4 py-2 font-medium text-ink/58">
            {{ certificate }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
