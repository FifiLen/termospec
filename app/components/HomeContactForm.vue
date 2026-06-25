<script setup lang="ts">
import { homeContactTopics } from "~~/data/home";
</script>

<template>
  <section
    id="kontakt"
    class="relative flex min-h-screen w-full items-center py-12 md:py-16 px-6 lg:px-10 bg-[#120B38]"
  >
    <div class="absolute inset-0 bg-[#120B38]/90" aria-hidden="true" />

    <div
      class="relative z-10 mx-auto grid w-full max-w-[96rem] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
    >
      <div
        class="relative flex flex-col justify-between text-white py-4 lg:pt-6 lg:pb-0 lg:h-full"
      >
        <div class="relative z-10">
          <h2
            class="mt-6 font-heading text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl xl:text-4xl text-white"
          >
            Skontaktuj się z&nbsp;nami.
          </h2>

          <p class="mt-6 max-w-md text-sm leading-7 text-neutral-200">
            Prześlij podstawowe informacje o instalacji, obiekcie lub zakresie
            prac. Wiadomość trafi bezpośrednio do inżyniera odpowiedzialnego za
            kontakt techniczny.
          </p>
        </div>

        <div
          class="relative z-10 mt-12 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8"
        >
          <div>
            <p class="mt-2 text-xs font-semibold leading-5 text-white">
              <span class="block text-sm font-bold text-white mb-1"
                >Termospec Sp. z o.o.</span
              >
              ul. Górnicza 10<br />
              44-240 Żory
            </p>
          </div>

          <div>
            <div
              class="mt-2 text-xs font-semibold leading-5 text-white space-y-1"
            >
              <a
                href="mailto:biuro@termospec.pl"
                class="block text-white hover:text-white/80 transition-colors underline decoration-white/30"
              >
                biuro@termospec.pl
              </a>
              <p class="text-white/90">
                tel.
                <span class="text-white font-bold">+48 (32) 435 80 50</span>
              </p>
              <p class="text-white/40 text-[10px]">
                fax. +48 (32) 435 80 50 wew. 16
              </p>
              <div class="mt-4 pt-3 border-t border-white/10 max-w-xs">
                <span
                  class="block text-[0.62rem] font-mono uppercase tracking-wider text-white/70 font-bold"
                  >Serwis 24h:</span
                >
                <a
                  href="tel:+48603899165"
                  class="block text-base font-black text-white tracking-wide hover:underline mt-0.5"
                >
                  +48 603 899 165
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative z-10 mt-8 w-full overflow-hidden border border-white/10 bg-black/20 aspect-video lg:aspect-auto lg:flex-1 lg:min-h-[220px] lg:mt-10"
        >
          <iframe
            src="https://maps.google.com/maps?q=Termospec%20Sp.%20z%20o.o.,%20G%C3%B3rnicza%2010,%20%C5%BBory&t=&z=15&ie=UTF8&iwloc=&output=embed"
            class="w-full h-full border-0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <form
        class="bg-[#9a0b2e] p-6 border border-white/10 md:p-10 lg:p-12 flex flex-col justify-between"
        @submit.prevent
      >
        <div class="grid gap-6">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-xs font-bold text-white">
                Imię i nazwisko
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="h-10 w-full border border-white/10 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition focus:bg-neutral-50"
              />
            </div>

            <div>
              <label
                for="company"
                class="mb-2 block text-xs font-bold text-white"
              >
                Firma
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autocomplete="organization"
                class="h-10 w-full border border-white/10 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition focus:bg-neutral-50"
              />
            </div>

            <div>
              <label
                for="email"
                class="mb-2 block text-xs font-bold text-white"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="h-10 w-full border border-white/10 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition focus:bg-neutral-50"
              />
            </div>

            <div>
              <label
                for="phone"
                class="mb-2 block text-xs font-bold text-white"
              >
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                class="h-10 w-full border border-white/10 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition focus:bg-neutral-50"
              />
            </div>
          </div>

          <div>
            <span class="mb-3 block text-xs font-bold text-white">
              Zakres zapytania technicznego
            </span>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="topic in homeContactTopics"
                :key="topic.value"
                class="relative cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="topic"
                  :value="topic.value"
                  required
                  class="peer sr-only"
                />
                <span
                  class="block border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all peer-checked:border-white peer-checked:bg-white peer-checked:text-[#9a0b2e] hover:bg-white/20"
                >
                  {{ topic.label }}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label
              for="location"
              class="mb-2 block text-xs font-bold text-white"
            >
              Lokalizacja obiektu / instalacji
            </label>
            <input
              id="location"
              name="location"
              type="text"
              class="h-10 w-full border border-white/10 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition focus:bg-neutral-50"
            />
          </div>

          <div>
            <label
              for="message"
              class="mb-2 block text-xs font-bold text-white"
            >
              Opis instalacji lub zakresu prac
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              class="w-full resize-none border border-white/10 bg-white px-4 py-2.5 text-sm font-bold leading-6 text-neutral-900 outline-none transition focus:bg-neutral-50"
            />
          </div>
        </div>

        <div class="mt-6 border-t border-white/20 pt-6">
          <label
            class="flex gap-3 text-xs leading-6 text-white select-none cursor-pointer"
          >
            <input
              type="checkbox"
              name="privacy"
              required
              class="mt-1 h-4 w-4 shrink-0 accent-black border-white/20"
            />
            <span>
              Wyrażam zgodę na kontakt w sprawie przesłanego zapytania. Dane
              będą przetwarzane zgodnie z polityką prywatności.
            </span>
          </label>

          <div class="mt-6 flex justify-end">
            <button
              type="submit"
              class="inline-flex h-10 items-center justify-center bg-white px-10 text-xs font-black tracking-tight text-[#9a0b2e] transition-colors hover:bg-neutral-100"
            >
              Wyślij
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
