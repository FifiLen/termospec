<script setup lang="ts">
import { homeContactTopics } from "~~/data/home";
</script>

<template>
  <section
    id="kontakt"
    class="border-t border-ink/10 bg-white px-6 py-24 lg:px-10"
  >
    <div class="mx-auto grid max-w-[96rem] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
      <!-- Lewa kolumna: Informacje wprowadzające -->
      <div class="flex flex-col justify-between">
        <div>
          <p
            class="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand"
          >
            Kontakt
          </p>

          <h2
            class="mt-4 font-heading text-[clamp(2rem,3vw,3.5rem)] font-black leading-tight tracking-tight text-ink"
          >
            Napisz do nas.
          </h2>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
            Masz pytania dotyczące naszej oferty lub potrzebujesz indywidualnej
            wyceny? Wypełnij formularz, a nasz zespół skontaktuje się z Tobą
            najszybciej, jak to możliwe.
          </p>
        </div>

        <div
          class="mt-12 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2"
        >
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/40"
            >
              Napisz do nas
            </p>
            <p
              class="mt-2 text-sm font-bold text-ink hover:text-brand transition-colors"
            >
              <NuxtLink to="/#kontakt">formularz kontaktowy</NuxtLink>
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/40"
            >
              Zadzwoń
            </p>
            <p class="mt-2 text-sm font-bold text-ink">
              dane po potwierdzeniu
            </p>
          </div>
        </div>
      </div>

      <!-- Prawa kolumna: Formularz (Czysty, bez cieni) -->
      <form class="border border-ink/10 bg-surface p-6 md:p-10" @submit.prevent>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="name"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Imię i nazwisko
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="h-12 w-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label
              for="company"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Firma
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autocomplete="organization"
              class="h-12 w-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label
              for="email"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Adres e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="h-12 w-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label
              for="phone"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Numer telefonu
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autocomplete="tel"
              class="h-12 w-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label
              for="topic"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Temat zgłoszenia
            </label>
            <div class="relative">
              <select
                id="topic"
                name="topic"
                required
                class="h-12 w-full appearance-none border border-ink/20 bg-white px-4 pr-10 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="" disabled selected>
                  Wybierz temat rozmowy
                </option>
                <option
                  v-for="topic in homeContactTopics"
                  :key="topic.value"
                  :value="topic.value"
                >
                  {{ topic.label }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink/40"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              for="location"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Lokalizacja / Miejscowość
            </label>
            <input
              id="location"
              name="location"
              type="text"
              class="h-12 w-full border border-ink/20 bg-white px-4 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div class="md:col-span-2">
            <label
              for="message"
              class="mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink/60"
            >
              Treść wiadomości
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              class="w-full resize-none border border-ink/20 bg-white px-4 py-3 text-sm font-medium leading-relaxed text-ink outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        <!-- Zgoda prywatności -->
        <label
          class="mt-6 flex items-start gap-3 text-xs leading-relaxed text-ink/60 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            name="privacy"
            required
            class="mt-1 h-4 w-4 shrink-0 rounded-none border-ink/30 text-brand accent-brand focus:ring-0"
          />
          <span>
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi
            przesłanego zapytania, zgodnie z polityką prywatności.
          </span>
        </label>

        <!-- Przycisk wysyłki -->
        <div class="mt-8 flex justify-end">
          <button
            type="submit"
            class="inline-flex h-12 items-center justify-center bg-brand px-10 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-ink"
          >
            Wyślij wiadomość
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
