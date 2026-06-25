<script setup lang="ts">
type TeamMember = {
  name: string;
  role: string;
  photo?: string;
};

defineProps<{
  members: TeamMember[];
}>();

const getInitials = (name: string) => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};
</script>

<template>
  <section
    class="w-full border-b border-white/10 bg-ink px-6 py-24 text-white lg:px-10"
    aria-labelledby="team-heading"
  >
    <div class="mx-auto max-w-[96rem]">
      <div class="mb-10 grid w-full place-items-center text-center md:mb-12">
        <h2 id="team-heading" class="font-heading text-4xl font-black leading-none text-white">
        Poznaj nasz zespół
        </h2>
      </div>

      <div
        v-if="members.length > 0"
        class="flex flex-wrap justify-center gap-px"
      >
        <article
          v-for="member in members"
          :key="member.name"
          class="group relative isolate aspect-[4/5] min-h-64 w-full overflow-hidden bg-ink sm:w-[calc((100%-1px)/2)] md:w-[calc((100%-2px)/3)] lg:w-[calc((100%-4px)/5)] xl:w-[calc((100%-5px)/6)]"
          :aria-label="`${member.name}, ${member.role}`"
        >
          <img
            v-if="member.photo"
            :src="member.photo"
            :alt="member.name"
            width="900"
            height="1125"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />

          <div
            v-else
            class="absolute inset-0 grid place-items-center bg-ink text-5xl font-black text-white"
            aria-hidden="true"
          >
            {{ getInitials(member.name) }}
          </div>

          <div
            class="absolute inset-0 bg-ink/12 transition duration-500 group-hover:bg-ink/0"
            aria-hidden="true"
          />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/76 to-transparent p-4 pt-20 md:p-5 md:pt-24">
            <h3 class="max-w-64 break-words text-xl font-black leading-tight text-white">
              {{ member.name }}
            </h3>
            <p class="mt-1.5 max-w-64 text-xs font-bold leading-5 text-white/76">
              {{ member.role }}
            </p>
          </div>
        </article>
      </div>

      <div v-else class="bg-white p-10 text-xl font-black text-ink">
        Brak osób w zespole.
      </div>
    </div>
  </section>
</template>
