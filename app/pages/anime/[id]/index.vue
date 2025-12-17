<script setup lang="ts">
import { useAnimeById } from "~/composables/useAnimeById";
import { useGenreList } from "~/composables/useGenres";
import { 
  getKindLabel, 
  getStatusLabel, 
  getRatingLabel, 
  formatDate, 
  formatNextEpisodeDate 
} from "~/lib/api/anime";

const route = useRoute();
const animeId = computed(() => String(route.params.id));

// Получение данных аниме
const { data: anime, isLoading, isError, error } = useAnimeById(animeId);

// Получение списка жанров (для маппинга genre_ids -> названия)
const { data: genresList } = useGenreList();

const animeGenres = computed(() => {
  if (!anime.value) return [];
  const ids = anime.value.genre_ids || [];
  const list = genresList.value || [];
  if (!ids.length || !list.length) return [];

  const map = new Map(list.map((g) => [String(g.genre_id), g.russian]));
  return ids
    .map((id) => map.get(String(id)) || null)
    .filter((v): v is string => Boolean(v));
});

// Вычисляемые данные для компонентов
const animeData = computed(() => {
  if (!anime.value) return null;
  
  return {
    image: anime.value.poster_url,
    title: anime.value.russian || anime.value.english,
    titleEn: anime.value.english,
    rating: anime.value.score,
    genres: animeGenres.value,
    description: anime.value.description || "Описание отсутствует",
    nextEpisode: anime.value.nextEpisodeAt ? {
      date: formatNextEpisodeDate(anime.value.nextEpisodeAt),
      episode: anime.value.episodesAired + 1,
    } : undefined,
  };
});

const animeInfo = computed(() => {
  if (!anime.value) return [];
  
  const info = [
    { label: "Тип", value: getKindLabel(anime.value.kind) },
  ];
  
  // Эпизоды
  if (anime.value.episodes > 0) {
    if (anime.value.status === "ongoing" && anime.value.episodesAired > 0) {
      info.push({ label: "Эпизодов", value: `${anime.value.episodesAired} / ${anime.value.episodes}` });
    } else {
      info.push({ label: "Эпизодов", value: String(anime.value.episodes) });
    }
  } else if (anime.value.episodesAired > 0) {
    info.push({ label: "Эпизодов", value: `${anime.value.episodesAired} / ?` });
  }
  
  info.push({ label: "Статус", value: getStatusLabel(anime.value.status) });
  info.push({ label: "Ограничения", value: getRatingLabel(anime.value.rating) });
  
  if (anime.value.aired_on) {
    info.push({ label: "Выпуск", value: formatDate(anime.value.aired_on) });
  }
  
  if (anime.value.duration > 0) {
    info.push({ label: "Длительность", value: `${anime.value.duration} мин.` });
  }
  
  return info;
});

const screenshots = computed(() => anime.value?.screenshots || []);

const playerTotalEpisodes = computed(() => {
  if (!anime.value) return 0;
  if (anime.value.episodes > 0) return anime.value.episodes;
  if (anime.value.episodesAired > 0) return anime.value.episodesAired;
  return 0;
});

// Выбранная озвучка
const selectedStudioId = ref<string>('1')

// Mock данные для студий озвучки
const mockStudios = [
  { id: '1', name: 'Anilibria', logo: 'https://placehold.co/48x48/c40204/white?text=A', isPopular: true },
  { id: '2', name: 'AniDUB', logo: 'https://placehold.co/48x48/c40204/white?text=A' },
  { id: '3', name: 'AniLibria.TV', logo: 'https://placehold.co/48x48/c40204/white?text=A', isPopular: true },
  { id: '4', name: 'AniMedia', logo: 'https://placehold.co/48x48/c40204/white?text=A' },
  { id: '5', name: 'Crunchyroll', logo: 'https://placehold.co/48x48/c40204/white?text=C', isPopular: true },
  { id: '6', name: 'Wakanim', logo: 'https://placehold.co/48x48/c40204/white?text=W' },
]

// Set page meta
useHead({
  title: computed(() => anime.value 
    ? `${anime.value.russian || anime.value.english} - Anisign` 
    : "Загрузка... - Anisign"
  ),
  meta: [
    {
      name: "description",
      content: computed(() => anime.value?.description?.slice(0, 160) + "..." || ""),
    },
  ],
});
</script>

<template>
  <div class="bg-[#0c0c0c] min-h-screen relative">

    <!-- Layout components -->
    <LayoutReport />
    <LayoutHeader />

    <!-- Загрузка -->
    <div v-if="isLoading" class="px-5">
      <div class="container pt-[50px]">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-5 lg:gap-8">
          <!-- Skeleton for Hero -->
          <AnimeHeroSkeleton />

          <!-- Divider (desktop only) -->
          <div class="hidden lg:block bg-white h-[624px] opacity-5 w-px"></div>

          <!-- Skeleton for Info -->
          <AnimeInfoSkeleton />
        </div>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="isError" class="flex flex-col justify-center items-center min-h-[60vh] px-5">
      <p class="text-red-400 text-lg mb-4">Ошибка загрузки: {{ error?.message }}</p>
      <NuxtLink 
        to="/anime" 
        class="px-6 py-3 bg-[#B3DE51] text-black rounded-lg font-medium"
      >
        Вернуться к списку
      </NuxtLink>
    </div>

    <!-- Main content -->
    <div v-else-if="anime && animeData" class="px-5">
      <!-- Hero section -->
      <div class="container pt-[50px]">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-5 lg:gap-8">
          <!-- Left side: Poster + Main content -->
          <AnimeHero
            :image="animeData.image"
            :title="animeData.title"
            :title-en="animeData.titleEn"
            :rating="animeData.rating"
            :genres="animeData.genres"
            :description="animeData.description"
            :next-episode="animeData.nextEpisode"
          />

          <!-- Divider (desktop only) -->
          <div class="hidden lg:block bg-white h-[624px] opacity-5 w-px"></div>

          <!-- Right side: Info panel -->
          <div class="w-full lg:w-auto">
            <AnimeInfo :info="animeInfo" />
          </div>
        </div>
      </div>

      <!-- Screenshots section -->
      <div v-if="screenshots.length > 0" class="pt-[60px] container">
        <AnimeScreenshots :screenshots="screenshots" />
      </div>

      <!-- Player section -->
      <div class="pt-[60px] container">
        <AnimePlayer 
          :title="anime.russian || anime.english"
          :studios="mockStudios"
          :selected-studio-id="selectedStudioId"
          :total-episodes="playerTotalEpisodes"
          :storage-key="`anisign_anime_progress_${animeId}`"
          @select-studio="selectedStudioId = $event"
        />
      </div>

      <!-- Divider -->
      <div v-if="anime.related_anime_ids?.length > 0" class="pt-[70px] container">
        <div class="bg-[rgba(217,217,217,0.05)] h-px w-full" />
      </div>

      <!-- Related anime section -->
      <div v-if="anime.related_anime_ids?.length > 0" class="pt-[70px] container">
        <AnimeRelated
          :related-anime-ids="anime.related_anime_ids"
          :related-anime-texts="anime.related_anime_texts"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-[50px] sm:mt-[75px] lg:mt-[100px]">
      <LayoutFooter />
    </div>
  </div>
</template>
