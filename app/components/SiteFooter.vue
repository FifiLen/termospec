<template>
  <footer
    class="w-full bg-[#F9CD34] px-4 text-[#120b38] border-t border-[#120b38]/10 select-none md:px-6 lg:px-10"
  >
    <div
      class="grid w-full grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-24"
    >
      <!-- Kolumna 1: Powiększone logo/tekst + Dwa strukturalne bloki (Kariera + Serwis) -->
      <div class="flex flex-col justify-between gap-10">
        <div class="flex flex-col gap-4">
          <NuxtImg
            src="/termospec-logo.png"
            alt="Termospec"
            width="130"
            class="block h-auto"
          />
          <p
            class="text-sm text-[#120b38]/80 font-medium leading-relaxed max-w-[290px]"
          >
            Projektujemy i dostarczamy zaawansowane rozwiązania cieplne dla
            przemysłu, górnictwa i energetyki. Niezawodność. Efektywność.
            Inżynieria.
          </p>
        </div>

        <div class="flex flex-col gap-6 max-w-[290px] w-full">
          <!-- Blok 1: Kariera -->
          <div class="pt-4 border-t border-[#120b38]/10">
            <NuxtLink to="/#kontakt" class="group flex flex-col gap-1.5">
              <div
                class="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#120b38]/50"
              >
                <span>Pion / Kariera</span>
                <span
                  class="transform group-hover:translate-x-1 transition-transform text-[#120b38] font-sans font-bold"
                  >&rarr;</span
                >
              </div>
              <div class="text-xs font-bold uppercase text-[#120b38]">
                Dołącz do zespołu
              </div>
              <p class="text-xs text-[#120b38]/70 leading-normal font-medium">
                Szukamy inżynierów i projektantów. Sprawdź aktualne procesy
                rekrutacyjne.
              </p>
            </NuxtLink>
          </div>

          <!-- Blok 2: Serwis i Wsparcie (Nowość) -->
          <div class="pt-4 border-t border-[#120b38]/10">
            <NuxtLink to="/#kontakt" class="group flex flex-col gap-1.5">
              <div
                class="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#120b38]/50"
              >
                <span>Dział / Serwis</span>
                <span
                  class="transform group-hover:translate-x-1 transition-transform text-[#120b38] font-sans font-bold"
                  >&rarr;</span
                >
              </div>
              <div class="text-xs font-bold uppercase text-[#120b38]">
                Wsparcie techniczne
              </div>
              <p class="text-xs text-[#120b38]/70 leading-normal font-medium">
                Utrzymanie ruchu, autoryzowany serwis urządzeń oraz całodobowe
                zgłoszenia przeglądów i awarii.
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Kolumna 2: Menu -->
      <div class="flex flex-col gap-4">
        <ul
          class="flex flex-col text-[0.92rem] font-bold lowercase tracking-tight"
        >
          <li>
            <NuxtLink
              to="/o-firmie"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>o firmie</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/o-firmie#zespol"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>zespół</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/#kontakt"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>kontakt</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/produkty"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>produkty</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/#realizacje"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>realizacje</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <span
              class="flex cursor-default items-center justify-between border-b border-[#120b38]/10 py-2.5 text-[#120b38]/45"
            >
              <span>certyfikaty</span>
            </span>
          </li>
          <li>
            <NuxtLink
              to="/dofinansowania"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>dotacje</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/rodo"
              class="flex items-center justify-between border-b border-[#120b38]/10 py-2.5 hover:text-[#120b38]/70 transition-colors"
            >
              <span>rodo</span><span class="text-xs">&rarr;</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Kolumna 3: Sekcja kontaktowa ze sklejonym boksem i przyciskiem na dole -->
      <div
        class="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden p-6"
      >
        <NuxtImg
          src="/stopka-img.png"
          alt=""
          width="941"
          height="1672"
          sizes="100vw md:50vw lg:25vw"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 z-[-1] h-full w-full object-cover"
        />
        <div class="w-full flex flex-col">
          <div class="bg-white p-5 w-full">
            <h3
              class="text-base font-bold uppercase tracking-tight leading-tight"
            >
              Porozmawiajmy<br />o Twoim projekcie
            </h3>
            <p class="mt-2 text-xs text-[#120b38]/70 leading-relaxed">
              Nasi specjaliści pomogą dobrać optymalne rozwiązania dopasowane do
              Twoich potrzeb.
            </p>
          </div>
          <NuxtLink
            to="/#kontakt"
            class="flex items-center justify-between w-full bg-[#120b38] text-[#F9CD34] px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#120b38]/90 transition-colors"
          >
            <span>Skontaktuj się z nami</span>
            <span>&rarr;</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Kolumna 4: Dane firmy -->
      <div class="flex flex-col gap-6">
        <div>
          <span
            class="text-xs font-mono font-bold uppercase tracking-wider text-[#120b38]/50 block mb-3"
            >Dane firmy</span
          >
          <div class="flex flex-col gap-2 font-mono text-xs">
            <div
              class="flex justify-between pb-1.5 border-b border-[#120b38]/10"
            >
              <span class="text-[#120b38]/50">KRS</span><span>0000109147</span>
            </div>
            <div
              class="flex justify-between pb-1.5 border-b border-[#120b38]/10"
            >
              <span class="text-[#120b38]/50">NIP</span
              ><span>PL6422590547</span>
            </div>
            <div
              class="flex justify-between pb-1.5 border-b border-[#120b38]/10"
            >
              <span class="text-[#120b38]/50">REGON</span><span>276184836</span>
            </div>
            <div class="flex justify-between pb-1.5 text-[#120b38] font-bold">
              <span class="text-[#120b38]/50 font-normal">KAPITAŁ</span
              ><span>100.000 PLN</span>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-2 font-mono text-xs pt-4 border-t border-[#120b38]/10"
        >
          <a
            href="tel:+48324358050"
            class="hover:underline flex justify-between"
          >
            <span class="text-[#120b38]/50">TEL</span
            ><span>+48 (32) 435 80 50</span>
          </a>
          <a
            href="tel:+48324358050"
            class="hover:underline flex justify-between"
          >
            <span class="text-[#120b38]/50">FAX.</span
            ><span>+48 (32) 435 80 50 wew. 16</span>
          </a>
          <a
            href="mailto:biuro@termospec.pl"
            class="hover:underline flex justify-between"
          >
            <span class="text-[#120b38]/50">EMAIL</span
            ><span>biuro@termospec.pl</span>
          </a>
          <div class="flex justify-between items-start pt-1">
            <span class="text-[#120b38]/50">ADRES</span>
            <span class="text-right"
              >ul. Górnicza 10 <br />44-240 Żory, Polska</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Dolny pasek -->
    <div
      class="w-full border-t border-[#120b38]/10 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-[11px] text-[#120b38]/60 font-mono"
    >
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <span>© 2026 TERMOSPEC Sp. z o.o. Wszkie prawa zastrzeżone.</span>
        <span class="cursor-default text-[#120b38]/45"
          >Polityka prywatności</span
        >
        <NuxtLink to="/rodo" class="hover:text-[#120b38]">RODO</NuxtLink>
        <span class="cursor-default text-[#120b38]/45"
          >Mapa strony</span
        >
      </div>

      <div class="flex flex-wrap gap-2 text-[10px] font-bold tracking-tight">
        <span class="border border-[#120b38]/15 px-2 py-1 bg-[#120b38]/5"
          >ISO 9001</span
        >
        <span class="border border-[#120b38]/15 px-2 py-1 bg-[#120b38]/5"
          >ISO 14001</span
        >
        <span class="border border-[#120b38]/15 px-2 py-1 bg-[#120b38]/5"
          >PN-EN ISO 3834-2</span
        >
        <span class="border border-[#120b38]/15 px-2 py-1 bg-[#120b38]/5"
          >CE</span
        >
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Zero dodatkowego kodu CSS. */
</style>
