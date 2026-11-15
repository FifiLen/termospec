<script setup lang="ts">
import type { CompanyContent } from "~/composables/useCompany";

const props = defineProps<{
  company: CompanyContent;
  topics: string[];
  // Content id of `home.yml`, which stores the topics (double-click editing in Studio).
  topicsContentId?: string;
}>();

const studioEditable = useStudioEditable();

const fieldClass =
  "mt-2.5 h-[clamp(3rem,3.4vw,4.05rem)] w-full rounded-[1.1rem] border-0 bg-field px-5 text-base text-ink outline-none ring-brand transition focus:ring-2";
</script>

<template>
  <section
    id="kontakt"
    aria-labelledby="contact-title"
    class="bg-surface py-[clamp(3.5rem,3.75vw,4.5rem)]"
  >
    <div class="design-shell grid gap-5 lg:grid-cols-[812fr_925fr] lg:gap-[clamp(1.5rem,2.15vw,2.6rem)]">
      <div
        v-bind="studioEditable(props.company.id)"
        class="flex flex-col rounded-[clamp(1.75rem,3.1vw,3.75rem)] bg-ink px-[clamp(1.5rem,3.85vw,4.6rem)] py-[clamp(2rem,3.85vw,4.6rem)] text-white"
      >
        <h2
          id="contact-title"
          class="max-w-none text-[clamp(2rem,2.3vw,2.75rem)] font-bold leading-tight tracking-[-0.015em] text-white"
        >
          Skontaktuj się z nami
        </h2>
        <p class="mt-4 max-w-[42.5rem] text-[clamp(1.05rem,1.31vw,1.57rem)] leading-[1.6] text-white/85">
          Prześlij podstawowe informacje o instalacji, obiekcie lub zakresie prac.
          Wiadomość trafi bezpośrednio do inżyniera odpowiedzialnego za kontakt
          techniczny.
        </p>

        <div
          class="mt-[clamp(2.25rem,3.4vw,4.1rem)] grid gap-8 text-[clamp(1.05rem,1.31vw,1.57rem)] leading-[1.42] sm:grid-cols-[clamp(10rem,15.6vw,18.75rem)_minmax(0,1fr)] sm:gap-x-0"
        >
          <div>
            <h3 class="text-[clamp(1.3rem,1.44vw,1.73rem)] font-bold text-white">Adres</h3>
            <p class="mt-4 text-white/90">
              {{ props.company.legalName }}<br>
              {{ props.company.address.street }}<br>
              {{ props.company.address.postalCode }} {{ props.company.address.city }}
            </p>
          </div>
          <div>
            <h3 class="text-[clamp(1.3rem,1.44vw,1.73rem)] font-bold text-white">Kontakt</h3>
            <p class="mt-4 text-white/90">
              <a :href="`mailto:${props.company.email}`" class="hover:text-white max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">{{ props.company.email }}</a><br>
              <a :href="telephoneHref(props.company.phone)" class="hover:text-white max-xl:inline-flex max-xl:min-h-11 max-xl:items-center">tel. {{ props.company.phone }}</a>
              <template v-if="props.company.fax">
                <br><span class="xl:whitespace-nowrap">fax. {{ props.company.fax }}</span>
              </template>
            </p>
          </div>
        </div>

        <ServiceHotline :hotline="props.company.serviceHotline" class="mt-[clamp(2rem,3.4vw,4.1rem)]" />

        <div class="relative mt-[clamp(1.5rem,1.95vw,2.35rem)] min-h-64 flex-1 overflow-hidden rounded-[clamp(1.25rem,1.6vw,1.9rem)] bg-ink-deep">
          <iframe
            :src="companyMapUrl(props.company, true)"
            title="Mapa lokalizacji Termospec"
            class="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <a
            :href="companyMapUrl(props.company)"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute bottom-5 right-5 inline-flex min-h-11 items-center rounded-full bg-ink/90 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-brand"
          >
            Otwórz w Mapach
          </a>
        </div>
      </div>

      <form
        class="flex flex-col rounded-[clamp(1.75rem,3.1vw,3.75rem)] bg-white px-[clamp(1.5rem,3.3vw,4rem)] py-[clamp(2rem,2.85vw,3.4rem)]"
        @submit.prevent
      >
        <div class="grid gap-x-[clamp(1rem,1.6vw,1.9rem)] gap-y-[clamp(1.25rem,1.6vw,1.9rem)] sm:grid-cols-[365fr_405fr]">
          <label class="block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Imię i nazwisko
            <input name="name" type="text" autocomplete="name" required :class="fieldClass">
          </label>
          <label class="block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Firma
            <input name="company" type="text" autocomplete="organization" :class="fieldClass">
          </label>
          <label class="block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            E-mail
            <input name="email" type="email" autocomplete="email" required :class="fieldClass">
          </label>
          <label class="block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Telefon
            <input name="phone" type="tel" autocomplete="tel" :class="fieldClass">
          </label>
        </div>

        <fieldset v-bind="studioEditable(props.topicsContentId)" class="mt-[clamp(1.75rem,2.3vw,2.75rem)]">
          <legend class="text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Zakres zapytania technicznego
          </legend>
          <div class="mt-4 flex flex-wrap gap-x-2.5 gap-y-2">
            <label
              v-for="topic in props.topics"
              :key="topic"
              class="cursor-pointer"
            >
              <input
                type="radio"
                name="topic"
                :value="topic"
                class="peer sr-only"
              >
              <span
                class="flex min-h-11 items-center rounded-full bg-field px-[clamp(1rem,1.3vw,1.55rem)] py-[clamp(0.75rem,0.95vw,1.1rem)] text-[clamp(0.75rem,0.68vw,0.82rem)] text-muted transition peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:text-ink"
              >
                {{ topic }}
              </span>
            </label>
          </div>
        </fieldset>

        <label class="mt-[clamp(1.5rem,1.65vw,2rem)] block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted lg:me-[2.5%]">
          Lokalizacja obiektu / instalacji
          <input name="location" type="text" :class="fieldClass">
        </label>

        <label class="mt-[clamp(1.5rem,2.1vw,2.5rem)] block text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted lg:me-[2.5%]">
          Opis instalacji lub zakresu prac
          <textarea
            name="message"
            rows="7"
            required
            class="mt-2.5 min-h-[clamp(10rem,12vw,14.5rem)] w-full resize-none rounded-[1.1rem] border-0 bg-field px-5 py-4 text-base text-ink outline-none ring-brand transition focus:ring-2"
          />
        </label>

        <label class="mt-5 flex cursor-pointer items-start gap-3 text-[clamp(0.75rem,0.69vw,0.84rem)] leading-5 text-muted">
          <input
            type="checkbox"
            name="privacy"
            required
            class="mt-px size-[1.6rem] shrink-0 cursor-pointer rounded-md border-line accent-brand"
          >
          <span class="pt-0.5">Wyrażam zgodę na kontakt w sprawie przesłanego zapytania. Dane będą przetwarzane zgodnie z polityką prywatności.</span>
        </label>

        <div class="mt-auto flex flex-wrap items-center justify-between gap-5 pt-[clamp(1.75rem,2.1vw,2.5rem)] lg:me-[2.5%]">
          <p class="ps-1.5 text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Odpowiadamy zwykle w ciągu jednego dnia roboczego.
          </p>
          <button
            type="submit"
            class="design-button min-h-[clamp(3.25rem,4.4vw,5.25rem)] min-w-[clamp(9rem,12.35vw,14.8rem)] bg-brand text-[clamp(1.1rem,1.25vw,1.5rem)] text-white hover:bg-ink"
          >
            wyślij <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
