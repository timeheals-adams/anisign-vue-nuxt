<script setup lang="ts">
import { useAnimeById } from "~/composables/useAnimeById";

const route = useRoute();
const animeId = computed(() => String(route.params.id));

const { data: anime, isLoading, isError, error } = useAnimeById(animeId);

const title = computed(() => anime.value?.russian || anime.value?.english || "");
const screenshots = computed(() => anime.value?.screenshots || []);

useHead({
  title: computed(() => (title.value ? `Галерея — ${title.value} — Anisign` : "Галерея — Anisign")),
});
</script>

<template>
  <div class="bg-[#0c0c0c] min-h-screen relative">
    <LayoutReport />
    <LayoutHeader />

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <div class="w-10 h-10 border-2 border-[#B3DE51] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="flex flex-col justify-center items-center min-h-[60vh] px-5">
      <p class="text-red-400 text-lg mb-4">Ошибка загрузки: {{ error?.message }}</p>
      <NuxtLink to="/anime" class="px-6 py-3 bg-[#B3DE51] text-black rounded-lg font-medium">
        Вернуться к списку
      </NuxtLink>
    </div>

    <!-- Content -->
    <div v-else class="px-5">
      <!-- Breadcrumbs -->
      <div class="container pt-[26px]">
        <div class="flex flex-wrap gap-[11px] items-center">
          <NuxtLink
            to="/"
            class="text-[12px] leading-[16px] font-medium text-white/70 hover:text-white transition-colors"
          >
            Главная
          </NuxtLink>
          <span class="text-[12px] leading-[16px] font-medium text-[#c8c7ca]/20">/</span>
          <NuxtLink
            to="/anime"
            class="text-[12px] leading-[16px] font-medium text-white/70 hover:text-white transition-colors"
          >
            Список Аниме
          </NuxtLink>
          <span class="text-[12px] leading-[16px] font-medium text-[#c8c7ca]/20">/</span>
          <NuxtLink
            :to="`/anime/${animeId}`"
            class="text-[12px] leading-[16px] font-semibold text-[#c8c7ca] hover:text-white transition-colors"
          >
            {{ title || "Аниме" }}
          </NuxtLink>
          <span class="text-[12px] leading-[16px] font-medium text-[#c8c7ca]/20">/</span>
          <div class="bg-[#c8c7ca] px-[6px] py-[3px] rounded-[4px]">
            <span class="text-[12px] leading-[normal] font-semibold text-[#0c0c0c]">Галерея</span>
          </div>
        </div>
      </div>

      <div class="container pt-[40px] pb-[60px]">
        <div class="flex flex-col gap-[40px]">
          <div class="flex items-center justify-between gap-4">
            <h1 class="text-[20px] font-bold text-[#c8c7ca] leading-normal">Галерея</h1>
            <NuxtLink
              :to="`/anime/${animeId}`"
              class="h-[47px] px-[15px] rounded-[10px] bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 transition-colors flex items-center"
            >
              <span class="text-[14px] font-medium text-[#c8c7ca] leading-normal">Вернутся</span>
            </NuxtLink>
          </div>

          <div v-if="screenshots.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            <div
              v-for="(screenshot, index) in screenshots"
              :key="index"
              class="h-[177px] rounded-[14px] overflow-hidden"
            >
              <NuxtImg
                :src="screenshot"
                :alt="`Screenshot ${index + 1}`"
                class="w-full h-full object-cover object-center"
                :width="520"
                :height="354"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                fit="cover"
                format="webp"
                quality="70"
                loading="lazy"
              />
            </div>
          </div>

          <div v-else class="text-[#c8c7ca]/70 text-[14px]">Скриншотов пока нет.</div>
        </div>
      </div>
    </div>

    <div class="mt-[50px] sm:mt-[75px] lg:mt-[100px]">
      <LayoutFooter />
    </div>
  </div>
</template>
