<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isBlinking = ref(false);
let blinkTimeout: NodeJS.Timeout | null = null;

const runBlinkCycle = () => {
  const delay = Math.random() * 2000 + 3000;
  blinkTimeout = setTimeout(() => {
    isBlinking.value = true;
    setTimeout(() => {
      isBlinking.value = false;
      runBlinkCycle();
    }, 220);
  }, delay);
};

onMounted(() => {
  const preload = new Image();
  preload.src = "/hero/hero-back-h.png";
  runBlinkCycle();
});

onUnmounted(() => {
  if (blinkTimeout) clearTimeout(blinkTimeout);
});
</script>

<template>
  <div class="container flex justify-between items-center">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-[40px] font-black">
        <span class="text-[#B3DE51]">Anisign</span> - Лучшие аниме сериалы
        <br> и фильмы
      </h1>
      <p class="max-w-[700px] opacity-70">
        Смотри аниме онлайн в хорошем качестве. Огромная коллекция сериалов и
        фильмов: экшен, романтика, фэнтези и комедия. Удобный поиск, плейлисты и
        любимые герои.
      </p>
    </div>
    <div class="relative group cursor-pointer w-[871px] h-[387px] select-none">
      <img
        src="/hero/hero-back.png"
        alt="Anime character"
        class="absolute inset-0 w-[871px] h-[387px] object-cover pointer-events-none"
        draggable="false"
      />
      <img
        src="/hero/hero-back-h.png"
        alt="Anime character bright eyes"
        class="absolute inset-0 w-[871px] h-[387px] object-cover transition-opacity duration-200 ease-in-out pointer-events-none"
        :class="
          isBlinking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        "
        draggable="false"
      />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 871px) {
  .relative img {
    width: 100%;
    height: auto;
    max-width: 871px;
  }
}
.group:hover img:last-child {
  opacity: 1 !important;
}
</style>
