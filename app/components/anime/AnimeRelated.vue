<script setup lang="ts">
import type { Anime } from '~/lib/api/anime'
import { fetchAnimeById, getKindLabel, getYear } from '~/lib/api/anime'

interface Props {
  relatedAnimeIds: string[]
  relatedAnimeTexts?: string[]
}

const props = defineProps<Props>()

const isHidden = ref(false)
const showAll = ref(false)
const relatedAnime = ref<Anime[]>([])
const isLoading = ref(true)

// Ограничение на 8 элементов
const displayedAnime = computed(() => {
  if (showAll.value) return relatedAnime.value
  return relatedAnime.value.slice(0, 8)
})

const hasMore = computed(() => relatedAnime.value.length > 8)

// Загрузка данных связанных аниме
async function loadRelatedAnime() {
  if (!props.relatedAnimeIds.length) {
    isLoading.value = false
    return
  }

  try {
    const promises = props.relatedAnimeIds.map((id) => fetchAnimeById(id))
    const results = await Promise.allSettled(promises)
    relatedAnime.value = results
      .filter((result): result is PromiseFulfilledResult<Anime> => result.status === 'fulfilled')
      .map((result) => result.value)
  } catch (error) {
    console.error('Failed to load related anime:', error)
  } finally {
    isLoading.value = false
  }
}

// Получение текста связи для аниме
function getRelationText(index: number): string {
  return props.relatedAnimeTexts?.[index] ?? ''
}

// Короткий kind для отображения
function getShortKind(kind: Anime['kind']): string {
  const shortLabels: Record<Anime['kind'], string> = {
    tv: 'TV',
    movie: 'Фильм',
    ova: 'OVA',
    ona: 'ONA',
    special: 'Спешл',
    music: 'Клип',
  }
  return shortLabels[kind] || kind.toUpperCase()
}

onMounted(() => {
  loadRelatedAnime()
})
</script>

<template>
  <div v-if="relatedAnimeIds.length > 0" class="flex flex-col gap-[40px] w-full">
    <!-- Header -->
    <div class="flex flex-wrap gap-[38px] items-end justify-between w-full">
      <div class="flex flex-col items-start">
        <div class="text-[#c8c7ca] text-[20px] font-semibold leading-normal">
          Связаные аниме
        </div>
      </div>
      <div class="flex items-center gap-[10px]">
        <button
          v-if="hasMore"
          @click="showAll = !showAll"
          class="bg-[rgba(200,199,202,0.05)] h-[53px] px-[15px] py-[15px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(200,199,202,0.1)] transition-all duration-300 ease-in-out"
        >
          <span class="text-[#c8c7ca] text-[14px] font-medium leading-normal whitespace-nowrap">
            {{ showAll ? 'Скрыть' : 'Показать все' }} ({{ relatedAnime.length }})
          </span>
        </button>
        <button
          @click="isHidden = !isHidden"
          class="bg-[rgba(200,199,202,0.05)] h-[53px] px-[15px] py-[15px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(200,199,202,0.1)] transition-all duration-300 ease-in-out"
        >
          <span class="text-[#c8c7ca] text-[14px] font-medium leading-normal whitespace-nowrap">
            {{ isHidden ? 'Показать связаные' : 'Скрыть связаные' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Related anime grid -->
    <transition name="fade">
      <div v-show="!isHidden" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-[20px]">
        <!-- Loading skeleton -->
        <template v-if="isLoading">
          <div
            v-for="i in 8"
            :key="i"
            class="flex flex-col gap-[8px]"
          >
            <div class="bg-[rgba(200,199,202,0.05)] h-[280px] w-full rounded-[14px] animate-pulse" />
            <div class="pt-[4px] flex flex-col gap-[6px]">
              <div class="bg-[rgba(200,199,202,0.05)] h-[20px] w-3/4 rounded animate-pulse" />
              <div class="bg-[rgba(200,199,202,0.05)] h-[16px] w-1/2 rounded animate-pulse" />
            </div>
          </div>
        </template>

        <!-- Related anime cards -->
        <NuxtLink
          v-else
          v-for="(anime, index) in displayedAnime"
          :key="anime.id"
          :to="`/anime/${anime.anime_id}`"
          class="flex flex-col gap-[8px] group opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          <!-- Poster -->
          <div class="relative h-[280px] w-full rounded-[14px] overflow-hidden bg-[#262626]">
            <NuxtImg
              :src="anime.poster_url"
              :alt="anime.russian || anime.english"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
            <!-- Score badge -->
            <div class="absolute top-[8px] right-[8px] bg-black h-[28px] px-[10px] rounded-full flex items-center justify-center">
              <span class="text-[12px] font-medium text-white/80 leading-[16px]">
                {{ anime.score.toFixed(1) }}
              </span>
            </div>
            <!-- Relation type badge -->
            <div
              v-if="getRelationText(index)"
              class="absolute bottom-[8px] left-[8px] bg-black px-[8px] py-[4px] rounded-[6px]"
            >
              <span class="text-[10px] font-medium text-white/80">
                {{ getRelationText(index) }}
              </span>
            </div>
          </div>

          <!-- Info -->
          <div class="pt-[4px] flex flex-col gap-[6px]">
            <div class="text-[#fafafa] text-[14px] font-medium leading-[20px] line-clamp-1">
              {{ anime.russian || anime.english }}
            </div>
            <div class="flex items-center gap-[8px]">
              <span class="text-[#a1a1a1] text-[12px] font-medium leading-[16px]">
                {{ getYear(anime.aired_on) }}
              </span>
              <div class="bg-[#a1a1a1] rounded-full w-[4px] h-[4px]" />
              <span class="text-[#a1a1a1] text-[12px] font-medium leading-[16px]">
                {{ getShortKind(anime.kind) }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
