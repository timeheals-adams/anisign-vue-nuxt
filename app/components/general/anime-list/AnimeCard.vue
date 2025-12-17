<script setup lang="ts">
import { computed } from "vue";
import type { Anime } from "~/lib/api/anime";
import { getKindLabel, getYear } from "~/lib/api/anime";

const props = withDefaults(
  defineProps<{
    anime?: Anime;
  }>(),
  {
    anime: undefined,
  }
);

const anime = computed(() => props.anime);

const TITLE_LIMIT = 24;

const rawTitle = computed(() => anime.value?.russian || anime.value?.english || "");
const title = computed(() => {
  const t = rawTitle.value;
  return t.length > TITLE_LIMIT ? t.slice(0, TITLE_LIMIT).trimEnd() + "…" : t;
});

const year = computed(() => (anime.value ? getYear(anime.value.aired_on) : "—"));
const kindLabel = computed(() => (anime.value ? getKindLabel(anime.value.kind) : ""));
</script>

<template>
  <NuxtLink v-if="anime" :to="`/anime/${anime.anime_id}`" class="flex flex-col gap-2 group">
    <div class="relative overflow-hidden rounded-[14px] aspect-[225/318] bg-white/5">
      <NuxtImg
        :src="anime.poster_url"
        :alt="rawTitle || 'Poster'"
        class="w-full h-full object-cover object-center transition-transform duration-600 ease-out scale-105 group-hover:scale-115"
        :width="450"
        :height="636"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 225px"
        fit="cover"
        format="webp"
        quality="70"
        loading="lazy"
      />
      <!-- Рейтинг -->
      <div 
        v-if="anime.score > 0" 
        class="absolute top-2 left-2 bg-[#060606] text-[#C8C7CA] text-[11px] font-bold px-2 py-0.5 rounded-md"
      >
        {{ anime.score.toFixed(1) }}
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-[14px] font-semibold line-clamp-1" :title="rawTitle">
        {{ title }}
      </p>
      <div class="flex gap-2 items-center">
        <p class="text-[12px] opacity-70">{{ year }}</p>
        <div class="w-[4px] h-[4px] rounded-full bg-[#C8C7CA]/20"></div>
        <p class="text-[12px] opacity-70">{{ kindLabel }}</p>
      </div>
    </div>
  </NuxtLink>
  <div v-else class="hidden" aria-hidden="true" />
</template>

<style scoped></style>
