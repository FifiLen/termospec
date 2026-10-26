<script setup lang="ts">
interface FooterLink {
  label: string;
  to?: string;
}

const companyLinks: FooterLink[] = [
  { label: "o firmie", to: "/o-firmie" },
  { label: "produkty", to: "/produkty" },
  { label: "usługi", to: "/uslugi" },
  { label: "realizacje", to: "/#realizacje" },
  { label: "kontakt", to: "/#kontakt" },
];

const informationLinks: FooterLink[] = [
  { label: "certyfikaty" },
  { label: "dotacje", to: "/dofinansowania" },
  { label: "rodo", to: "/rodo" },
  { label: "polityka prywatności" },
  { label: "mapa strony" },
];

const linkGroups = [
  { title: "Firma", links: companyLinks },
  { title: "Informacje", links: informationLinks },
];

const registryDetails = [
  { label: "KRS", value: "0000109147" },
  { label: "NIP", value: "PL6422590547" },
  { label: "REGON", value: "276184836" },
  { label: "Kapitał", value: "100.000 PLN" },
];

const utilityCards = [
  { eyebrow: "kariera", title: "Dołącz do zespołu", to: "/#kontakt" },
  { eyebrow: "serwis", title: "Zgłoś awarię", to: "/#kontakt" },
];
</script>

<template>
  <footer class="w-full bg-ink font-sans text-white">
    <div class="design-shell pb-[clamp(2.5rem,2.6vw,3.1rem)] pt-[clamp(3.5rem,5.3vw,6.4rem)]">
      <div class="grid gap-12 lg:grid-cols-2 xl:grid-cols-[minmax(0,620fr)_minmax(0,470fr)_minmax(0,666fr)] xl:gap-0">
        <div class="xl:ps-[1vw]">
          <img
            src="/images/brand/termospec-logo-white.svg"
            alt="Termospec"
            width="229"
            height="33"
            loading="lazy"
            class="h-auto w-[clamp(11rem,11.9vw,14.3rem)]"
          >
          <p class="mt-[clamp(1.5rem,1.6vw,1.9rem)] max-w-[32rem] text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.95] text-white/65">
            Projektujemy i dostarczamy zaawansowane rozwiązania cieplne dla
            przemysłu, górnictwa i energetyki. Niezawodność. Efektywność.
            Inżynieria.
          </p>

          <address class="mt-[clamp(1.5rem,2.1vw,2.5rem)] text-[clamp(0.95rem,0.92vw,1.1rem)] not-italic leading-[1.9] text-white/65">
            <span class="block">Tel: <a href="tel:+48324358050" class="text-white hover:text-brand">+48 (32) 435 80 50</a></span>
            <span class="block">Fax: <span class="text-white">+48 (32) 435 80 50 wew. 16</span></span>
            <span class="block">E-mail: <a href="mailto:biuro@termospec.pl" class="text-white hover:text-brand">biuro@termospec.pl</a></span>
            <span class="block text-white">ul. Górnicza 10, 44–240 Żory, Polska</span>
          </address>

          <p class="mt-[clamp(1.5rem,2.6vw,3.1rem)] text-[clamp(0.85rem,0.92vw,1.1rem)] leading-relaxed xl:whitespace-nowrap text-white/35">
            <template v-for="(detail, index) in registryDetails" :key="detail.label">
              <span v-if="index > 0" aria-hidden="true"> • </span>
              {{ detail.label }} <span class="text-white/65">{{ detail.value }}</span>
            </template>
          </p>
        </div>

        <nav aria-label="Nawigacja w stopce" class="grid grid-cols-2 gap-8 xl:grid-cols-[minmax(0,170fr)_minmax(0,300fr)] xl:gap-0 xl:ps-[0.6vw]">
          <div v-for="group in linkGroups" :key="group.title">
            <h2 class="text-[clamp(0.8rem,0.78vw,0.95rem)] font-bold uppercase leading-none tracking-[0.44em] text-brand">
              {{ group.title }}
            </h2>
            <ul class="mt-[clamp(1rem,1.1vw,1.3rem)] text-[clamp(0.95rem,0.92vw,1.1rem)] leading-[2.5] text-white/65">
              <li v-for="link in group.links" :key="link.label">
                <NuxtLink v-if="link.to" :to="link.to" class="transition-colors hover:text-white">
                  {{ link.label }}
                </NuxtLink>
                <span v-else>{{ link.label }}</span>
              </li>
            </ul>
          </div>
        </nav>

        <div class="lg:col-span-2 xl:col-span-1 xl:ps-[0.15vw]">
          <article class="grid overflow-hidden rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-brand sm:grid-cols-[202fr_446fr]">
            <img
              src="/stopka-img.png"
              alt="Serwisant Termospec przy urządzeniu chłodniczym"
              width="941"
              height="1672"
              loading="lazy"
              decoding="async"
              class="h-56 w-full object-cover object-[center_20%] sm:h-full"
            >
            <div class="px-[clamp(1.5rem,2.5vw,3rem)] py-[clamp(1.5rem,1.85vw,2.2rem)]">
              <h2 class="max-w-none text-[clamp(1.4rem,1.5vw,1.8rem)] font-bold leading-[1.26] tracking-[-0.01em] text-white">
                Porozmawiajmy o Twoim projekcie
              </h2>
              <p class="mt-4 text-[clamp(0.85rem,0.8vw,0.95rem)] leading-[1.7] text-white">
                Nasi specjaliści pomogą dobrać optymalne rozwiązania dopasowane do Twoich potrzeb.
              </p>
              <NuxtLink
                to="/#kontakt"
                class="mt-[clamp(1.25rem,1.3vw,1.6rem)] inline-flex min-h-[clamp(2.75rem,3vw,3.6rem)] items-center gap-2 rounded-full bg-ink px-[clamp(1.25rem,1.6vw,1.9rem)] text-[clamp(0.85rem,0.84vw,1rem)] font-medium text-white transition-colors hover:bg-white hover:text-ink"
              >
                wyślij zapytanie <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>

          <div class="mt-[clamp(1.5rem,2.9vw,3.5rem)] grid gap-4 sm:grid-cols-2 sm:gap-[clamp(1rem,3vw,3.6rem)]">
            <NuxtLink
              v-for="card in utilityCards"
              :key="card.title"
              :to="card.to"
              class="group rounded-[clamp(1.25rem,1.6vw,1.9rem)] bg-ink-deep px-[clamp(1.5rem,2vw,2.4rem)] py-[clamp(1.25rem,1.6vw,1.9rem)] transition-colors hover:bg-white/10"
            >
              <span class="flex items-center gap-2 text-[clamp(0.72rem,0.72vw,0.86rem)] font-bold uppercase tracking-[0.1em] text-white">
                <span aria-hidden="true" class="text-brand">–</span>
                {{ card.eyebrow }}
              </span>
              <span class="mt-2 flex items-center gap-2 text-[clamp(1.1rem,1.15vw,1.38rem)] font-bold text-white">
                {{ card.title }}
                <span aria-hidden="true" class="text-brand transition-transform group-hover:translate-x-1">→</span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-[clamp(2rem,2.1vw,2.5rem)] border-t border-white/25 pt-[clamp(1.25rem,1.6vw,1.9rem)] text-[clamp(0.85rem,0.92vw,1.1rem)] text-white/45">
        <p class="xl:ps-[0.3vw]">© 2026 Termospec Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
      </div>
    </div>
  </footer>
</template>
