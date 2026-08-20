<script setup lang="ts">
const config = useRuntimeConfig()

if (!config.public.studioEnabled) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono strony' })
}

useSeoMeta({
  title: 'Logowanie do Nuxt Studio | Termospec',
  robots: 'noindex, nofollow',
})

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const submitLogin = async () => {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<{ redirectTo: string }>('/api/studio/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    await navigateTo(response.redirectTo, { external: true })
  } catch (error) {
    const fetchError = error as {
      data?: { statusMessage?: string, message?: string }
      statusMessage?: string
    }

    errorMessage.value = fetchError.data?.statusMessage
      || fetchError.data?.message
      || fetchError.statusMessage
      || 'Nie udało się zalogować. Spróbuj ponownie.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="grid min-h-svh bg-surface lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)]">
    <section class="relative hidden overflow-hidden bg-ink lg:block">
      <img
        src="/images/hero/crops/siedziba-termospec-desktop.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-55"
      >
      <div class="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent" />
      <div class="relative flex h-full flex-col justify-between p-10 xl:p-14">
        <img
          src="/termospec-logo.png"
          alt="Termospec"
          class="w-44 brightness-0 invert"
        >
        <div class="max-w-xl text-white">
          <p class="mb-4 text-xs font-bold tracking-[0.18em] uppercase text-white/65">
            Panel redakcyjny
          </p>
          <p class="font-heading text-4xl leading-tight font-extrabold xl:text-5xl">
            Zarządzanie katalogiem produktów
          </p>
        </div>
      </div>
    </section>

    <section class="flex min-h-svh items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
      <div class="w-full max-w-md">
        <img
          src="/termospec-logo.png"
          alt="Termospec"
          class="mb-12 w-40 lg:hidden"
        >

        <p class="mb-3 text-xs font-bold tracking-[0.16em] uppercase text-brand">
          Nuxt Studio
        </p>
        <h1 class="font-heading text-4xl leading-tight font-extrabold text-ink sm:text-5xl">
          Zaloguj się do panelu
        </h1>
        <p class="mt-5 text-base leading-7 text-muted">
          Użyj firmowego adresu e-mail i hasła przekazanego przez administratora strony.
        </p>

        <form
          class="mt-10 space-y-6"
          @submit.prevent="submitLogin"
        >
          <div>
            <label
              for="studio-email"
              class="mb-2 block text-sm font-bold text-ink"
            >
              Firmowy adres e-mail
            </label>
            <input
              id="studio-email"
              v-model="email"
              type="email"
              name="email"
              autocomplete="username"
              inputmode="email"
              required
              autofocus
              class="h-13 w-full border border-line bg-white px-4 text-ink outline-none transition focus:border-brand focus:ring-3 focus:ring-brand/10"
            >
          </div>

          <div>
            <label
              for="studio-password"
              class="mb-2 block text-sm font-bold text-ink"
            >
              Hasło
            </label>
            <input
              id="studio-password"
              v-model="password"
              type="password"
              name="password"
              autocomplete="current-password"
              required
              class="h-13 w-full border border-line bg-white px-4 text-ink outline-none transition focus:border-brand focus:ring-3 focus:ring-brand/10"
            >
          </div>

          <p
            v-if="errorMessage"
            role="alert"
            class="border-s-4 border-brand bg-white px-4 py-3 text-sm leading-6 text-brand"
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex h-13 w-full items-center justify-center bg-brand px-6 text-sm font-bold text-white transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60"
          >
            {{ isSubmitting ? 'Logowanie…' : 'Zaloguj się' }}
          </button>
        </form>

        <p class="mt-8 border-t border-line pt-6 text-sm leading-6 text-muted">
          Po zalogowaniu otworzy się katalog produktów wraz z narzędziami Nuxt Studio.
        </p>
      </div>
    </section>
  </main>
</template>
