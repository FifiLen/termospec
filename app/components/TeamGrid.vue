<script setup lang="ts">
type TeamMember = {
  name: string;
  role: string;
  photo?: string;
};

defineProps<{
  members: TeamMember[];
}>();

const getInitials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part.charAt(0))
  .join("")
  .toUpperCase();
</script>

<template>
  <section class="bg-surface px-5 py-20 font-sans text-ink sm:px-8 lg:px-12 lg:py-28" aria-labelledby="team-heading">
    <div class="mx-auto max-w-[92rem]">
      <p class="flex items-center gap-3 text-xs font-medium text-ink/52">
        <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
        Zespół
      </p>

      <div class="mt-7 grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 id="team-heading" class="max-w-[13ch] font-sans text-[clamp(2.75rem,4.7vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.05em] text-ink">
          Wiedza, która pracuje w terenie.
        </h2>
        <p class="max-w-[38rem] pb-1 text-base leading-7 text-ink/54 md:text-lg md:leading-8">
          Zespół projektowy, produkcyjny i serwisowy odpowiedzialny za ciągłość realizacji — od pierwszych założeń po pracę instalacji.
        </p>
      </div>

      <div v-if="members.length" class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
        <article v-for="member in members" :key="member.name" class="group">
          <div class="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebe6dd]">
            <img
              v-if="member.photo"
              :src="member.photo"
              :alt="member.name"
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            >
            <div v-else class="grid h-full place-items-center text-4xl font-medium text-ink/32" aria-hidden="true">
              {{ getInitials(member.name) }}
            </div>
          </div>
          <h3 class="mt-5 font-sans text-lg font-semibold leading-tight tracking-[-0.02em] text-ink">
            {{ member.name }}
          </h3>
          <p class="mt-2 text-sm text-ink/40">
            {{ member.role }}
          </p>
        </article>
      </div>

      <p v-else class="mt-14 text-base text-ink/48">
        Dane zespołu są w trakcie uzupełniania.
      </p>
    </div>
  </section>
</template>
