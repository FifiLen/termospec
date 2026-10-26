<script setup lang="ts">
import { homeContactTopics } from "~~/data/home";

const fieldClass =
  "mt-2.5 h-[clamp(3rem,3.4vw,4.05rem)] w-full rounded-[1.1rem] border-0 bg-field px-5 text-base text-ink outline-none ring-brand/25 transition focus:ring-2";
</script>

<template>
  <section
    id="kontakt"
    aria-labelledby="contact-title"
    class="bg-surface py-[clamp(3.5rem,3.75vw,4.5rem)]"
  >
    <div class="design-shell grid gap-5 lg:grid-cols-[812fr_925fr] lg:gap-[clamp(1.5rem,2.15vw,2.6rem)]">
      <div
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
              Termospec Sp. z o.o.<br>
              ul. Górnicza 10<br>
              44–240 Żory
            </p>
          </div>
          <div>
            <h3 class="text-[clamp(1.3rem,1.44vw,1.73rem)] font-bold text-white">Kontakt</h3>
            <p class="mt-4 text-white/90">
              <a href="mailto:biuro@termospec.pl" class="hover:text-white">biuro@termospec.pl</a><br>
              <a href="tel:+48324358050" class="hover:text-white">tel. +48 (32) 435 80 50</a><br>
              <span class="xl:whitespace-nowrap">fax. +48 (32) 435 80 50 wew. 16</span>
            </p>
          </div>
        </div>

        <a
          href="tel:+48603899165"
          class="mt-[clamp(2rem,3.4vw,4.1rem)] flex items-center gap-[clamp(1.25rem,2.6vw,3.1rem)] rounded-[clamp(1.25rem,1.6vw,1.9rem)] bg-brand px-[clamp(1.5rem,3.3vw,4rem)] py-[clamp(1.25rem,2vw,2.4rem)] transition-colors hover:bg-white hover:text-brand"
        >
          <svg
            class="size-[clamp(3rem,4.1vw,4.95rem)] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            <path d="m3 3 1.6-.6 5.6 5.6-1.4 1.4L3.2 3.8z" />
            <path d="m13.2 12 7.2 7.2a1.6 1.6 0 0 1 0 2.2l-.2.2a1.6 1.6 0 0 1-2.2 0L10.8 14.4z" />
          </svg>
          <span>
            <span class="block text-[clamp(0.85rem,1.02vw,1.22rem)] font-semibold uppercase leading-none tracking-[0.2em]">
              Serwis 24/7
            </span>
            <span class="mt-2 block whitespace-nowrap text-[clamp(1.35rem,2.1vw,2.5rem)] font-bold leading-tight">
              +48 603 899 165
            </span>
          </span>
        </a>

        <div class="relative mt-[clamp(1.5rem,1.95vw,2.35rem)] min-h-64 flex-1 overflow-hidden rounded-[clamp(1.25rem,1.6vw,1.9rem)] bg-ink-deep">
          <iframe
            src="https://maps.google.com/maps?q=Termospec%20Sp.%20z%20o.o.,%20G%C3%B3rnicza%2010,%20%C5%BBory&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Mapa lokalizacji Termospec"
            class="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://maps.google.com/?q=Termospec%20Sp.%20z%20o.o.,%20G%C3%B3rnicza%2010,%20%C5%BBory"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute bottom-5 right-5 rounded-full bg-ink/90 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-brand"
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

        <fieldset class="mt-[clamp(1.75rem,2.3vw,2.75rem)]">
          <legend class="text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted">
            Zakres zapytania technicznego
          </legend>
          <div class="mt-4 flex flex-wrap gap-x-2.5 gap-y-2">
            <label
              v-for="topic in homeContactTopics"
              :key="topic.value"
              class="cursor-pointer"
            >
              <input
                type="radio"
                name="topic"
                :value="topic.value"
                class="peer sr-only"
              >
              <span
                class="block rounded-full bg-field px-[clamp(1rem,1.3vw,1.55rem)] py-[clamp(0.75rem,0.95vw,1.1rem)] text-[clamp(0.75rem,0.68vw,0.82rem)] text-muted transition peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:text-ink"
              >
                {{ topic.label }}
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
            class="mt-2.5 min-h-[clamp(10rem,12vw,14.5rem)] w-full resize-none rounded-[1.1rem] border-0 bg-field px-5 py-4 text-base text-ink outline-none ring-brand/25 transition focus:ring-2"
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
          <p class="ps-1.5 text-[clamp(0.85rem,0.78vw,0.95rem)] text-muted/70">
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
