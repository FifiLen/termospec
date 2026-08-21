<script setup lang="ts">
import { homeContactTopics } from "~~/data/home";
</script>

<template>
  <section id="kontakt" class="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="contact-title">
    <div class="mx-auto grid max-w-[92rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="flex min-h-[42rem] flex-col rounded-[1.75rem] bg-ink p-8 text-white md:p-12 lg:p-14">
        <p class="flex items-center gap-3 text-xs font-medium text-white/58">
          <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          Kontakt
        </p>
        <h2 id="contact-title" class="mt-7 font-sans text-[clamp(2.35rem,3.8vw,4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
          Skontaktuj się z nami
        </h2>
        <p class="mt-6 max-w-[34rem] text-sm leading-7 text-white/62 md:text-base">
          Prześlij podstawowe informacje o instalacji, obiekcie lub zakresie prac. Wiadomość trafi bezpośrednio do inżyniera odpowiedzialnego za kontakt techniczny.
        </p>

        <div class="mt-10 grid gap-8 text-sm leading-6 sm:grid-cols-2">
          <div>
            <p class="text-xs text-white/42">Adres</p>
            <p class="mt-3 font-medium text-white">
              Termospec Sp. z o.o.<br>
              ul. Górnicza 10<br>
              44–240 Żory
            </p>
          </div>
          <div>
            <p class="text-xs text-white/42">Biuro</p>
            <a href="mailto:biuro@termospec.pl" class="mt-3 block font-medium text-white hover:text-white/72">biuro@termospec.pl</a>
            <a href="tel:+48324358050" class="block font-medium text-white hover:text-white/72">tel. +48 (32) 435 80 50</a>
            <p class="mt-1 text-xs text-white/32">fax. +48 (32) 435 80 50 wew. 16</p>
          </div>
        </div>

        <a href="tel:+48603899165" class="mt-8 flex items-center justify-between rounded-2xl bg-white/[0.08] px-6 py-5 transition-colors hover:bg-white/[0.12]">
          <span>
            <span class="block text-xs text-white/42">Serwis 24h</span>
            <span class="mt-1 block text-xl font-semibold text-white">+48 603 899 165</span>
          </span>
          <span class="rounded-full bg-brand/35 px-4 py-2 text-xs font-medium text-[#f04d70]">całodobowo</span>
        </a>

        <div class="relative mt-8 min-h-56 flex-1 overflow-hidden rounded-2xl bg-ink">
          <iframe
            src="https://maps.google.com/maps?q=Termospec%20Sp.%20z%20o.o.,%20G%C3%B3rnicza%2010,%20%C5%BBory&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Mapa lokalizacji Termospec"
            class="absolute inset-0 h-full w-full border-0 opacity-90"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div class="pointer-events-none absolute inset-0 bg-ink/10" />
          <a
            href="https://maps.google.com/?q=Termospec%20Sp.%20z%20o.o.,%20G%C3%B3rnicza%2010,%20%C5%BBory"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute bottom-5 right-5 rounded-full bg-ink/85 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-brand"
          >
            Otwórz w Mapach
          </a>
        </div>
      </div>

      <form class="rounded-[1.75rem] bg-[#ebe6dd] p-8 md:p-12 lg:p-14" @submit.prevent>
        <div class="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          <label class="block text-xs text-ink/48">
            Imię i nazwisko
            <input name="name" type="text" autocomplete="name" required class="mt-2 h-12 w-full rounded-xl border-0 bg-surface px-4 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2">
          </label>
          <label class="block text-xs text-ink/48">
            Firma
            <input name="company" type="text" autocomplete="organization" class="mt-2 h-12 w-full rounded-xl border-0 bg-surface px-4 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2">
          </label>
          <label class="block text-xs text-ink/48">
            E-mail
            <input name="email" type="email" autocomplete="email" required class="mt-2 h-12 w-full rounded-xl border-0 bg-surface px-4 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2">
          </label>
          <label class="block text-xs text-ink/48">
            Telefon
            <input name="phone" type="tel" autocomplete="tel" class="mt-2 h-12 w-full rounded-xl border-0 bg-surface px-4 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2">
          </label>
        </div>

        <fieldset class="mt-7">
          <legend class="text-xs text-ink/48">Zakres zapytania technicznego</legend>
          <div class="mt-3 flex flex-wrap gap-2">
            <label v-for="(topic, index) in homeContactTopics" :key="topic.value" class="cursor-pointer">
              <input type="radio" name="topic" :value="topic.value" :checked="index === 0" class="peer sr-only">
              <span class="block rounded-full bg-surface px-4 py-2.5 text-xs font-medium text-ink/58 transition peer-checked:bg-ink peer-checked:text-white hover:text-ink">
                {{ topic.label }}
              </span>
            </label>
          </div>
        </fieldset>

        <label class="mt-7 block text-xs text-ink/48">
          Lokalizacja obiektu / instalacji
          <input name="location" type="text" class="mt-2 h-12 w-full rounded-xl border-0 bg-surface px-4 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2">
        </label>

        <label class="mt-7 block text-xs text-ink/48">
          Opis instalacji lub zakresu prac
          <textarea name="message" rows="6" required class="mt-2 w-full resize-none rounded-xl border-0 bg-surface px-4 py-3 text-sm text-ink outline-none ring-brand/20 transition focus:ring-2" />
        </label>

        <label class="mt-6 flex cursor-pointer gap-3 text-xs leading-5 text-ink/52">
          <input type="checkbox" name="privacy" required class="mt-0.5 size-5 shrink-0 rounded border-0 bg-surface accent-brand">
          <span>Wyrażam zgodę na kontakt w sprawie przesłanego zapytania. Dane będą przetwarzane zgodnie z polityką prywatności.</span>
        </label>

        <div class="mt-10 flex flex-wrap items-center justify-between gap-5">
          <p class="text-xs text-ink/34">Odpowiadamy zwykle w ciągu jednego dnia roboczego.</p>
          <button type="submit" class="inline-flex min-h-12 items-center gap-5 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-ink">
            Wyślij <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
