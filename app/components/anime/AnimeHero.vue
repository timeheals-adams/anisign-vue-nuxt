<script setup lang="ts">
interface Props {
  image: string
  title: string
  titleEn: string
  rating: number
  genres: string[]
  description: string
  nextEpisode?: {
    date: string
    episode: number
  }
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col lg:flex-row items-start justify-between gap-5">
    <!-- Left side - Poster and actions -->
    <div class="flex flex-col sm:flex-row gap-5 items-start w-full lg:w-auto">
      <div class="flex flex-col gap-[30px] w-full sm:w-[315px]">
        <!-- Poster -->
        <div class="aspect-[315/454] sm:h-[454px] overflow-hidden rounded-[17px] relative w-full">
          <NuxtImg
            :src="image"
            :alt="title"
            class="w-full h-full object-cover object-center"
            format="webp"
            quality="80"
            loading="eager"
          />
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col gap-[10px] w-full">
          <!-- Add to list button -->
          <button
            class="bg-white/2 flex h-[65px] items-center justify-between px-[19px] py-[25px] rounded-[14px] w-full hover:bg-white/5 transition-colors"
          >
            <div class="flex gap-[10px] items-center">
              <IconsPlus class="w-6 h-6 text-[#848484]" />
              <span class="text-[14.87px] font-medium text-[#848484]">
                Добавить в список
              </span>
            </div>
            <IconsChevronDown class="w-4 h-4 text-white/50" />
          </button>

          <!-- Watch button -->
          <button
            class="bg-[rgba(200,199,202,0.1)] flex h-[65px] items-center justify-between px-5 py-[25px] rounded-[14px] w-full hover:bg-[rgba(200,199,202,0.15)] transition-colors"
          >
            <span class="text-base font-semibold text-[#C8C7CA]">Смотреть</span>
            <IconsPlay class="w-6 h-6 text-[#C8C7CA]" />
          </button>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex flex-col gap-[27px] w-full lg:w-[830px]">
        <!-- Next episode banner -->
        <div
          v-if="nextEpisode"
          class="bg-[#C8C7CA] flex flex-col sm:flex-row h-auto sm:h-[58px] items-start sm:items-center justify-between gap-3 sm:gap-0 px-5 py-[15px] rounded-[12px] w-full"
        >
          <span class="text-sm font-medium text-[#0c0c0c]">
            Следующий эпизод
          </span>
          <div class="flex gap-[10px] items-center flex-wrap">
            <span class="text-sm font-semibold text-[#0c0c0c]">
              {{ nextEpisode.date }}, {{ nextEpisode.episode }} серия
            </span>
            <IconsInfoCircle class="w-6 h-6 text-[#0c0c0c]/60" />
          </div>
        </div>

        <!-- Title and rating -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full">
          <div class="flex flex-col gap-[10px] flex-1">
            <h1 class="text-2xl sm:text-[32px] font-bold text-white leading-normal">
              {{ title }}
            </h1>
            <p class="text-xs font-medium text-[#848484] leading-[21.4px]">
              {{ titleEn }}
            </p>
          </div>
          <div
            class="bg-[rgba(253,229,185,0.1)] flex flex-col gap-[10px] items-center justify-center px-[15px] py-[10px] rounded-[62px] self-start sm:self-auto"
          >
            <span class="text-base font-semibold text-[#FDE5B9] leading-[21.4px]">
              {{ rating }}
            </span>
          </div>
        </div>

        <!-- Genres -->
        <div class="flex flex-wrap gap-[10px] items-center">
          <div
            v-for="(genre, index) in genres"
            :key="index"
            class="bg-transparent border border-white/5 flex gap-[10px] h-[43px] items-center justify-center px-[15px] rounded-[38px] hover:border-white/10 transition-colors"
          >
            <span class="text-sm font-medium text-[#848484]">{{ genre }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm font-medium opacity-70 text-white leading-[21.4px]">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
