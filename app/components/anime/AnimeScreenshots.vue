<script setup lang="ts">
interface Props {
  screenshots: string[]
}

const props = defineProps<Props>()

const activeTab = ref<'screenshots' | 'media'>('screenshots')

const route = useRoute()
const animeId = computed(() => String(route.params.id || ''))

function goToGallery() {
  if (!props.screenshots.length) return
  if (!animeId.value) return
  navigateTo(`/anime/${animeId.value}/screenshots`)
}
</script>

<template>
  <div class="flex flex-col gap-[40px] items-start w-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
      <h2 class="text-xl font-bold text-[#C8C7CA] leading-normal">
        Скриншоты<br class="sm:hidden" /><span class="hidden sm:inline"> </span>и медиа-файлы
      </h2>

      <div class="flex flex-wrap gap-[15px] items-center">
        <!-- Gallery button -->
        <button
          class="bg-[rgba(200,199,202,0.05)] flex gap-[10px] h-[47px] items-center justify-center px-[15px] rounded-[10px] hover:bg-[rgba(200,199,202,0.1)] transition-colors"
          type="button"
          @click="goToGallery"
        >
          <span class="text-sm font-medium text-[#C8C7CA] leading-normal">Галерея</span>
        </button>

        <!-- Divider -->
        <div class="bg-[rgba(217,217,217,0.1)] h-[28px] w-px hidden sm:block"></div>

        <!-- Tab switcher -->
        <div class="bg-white/2 flex items-center rounded-[100px]">
          <button
            :class="[
              'flex gap-[10px] items-center justify-center px-3 sm:px-[15px] py-[15px] rounded-[100px] transition-colors',
              activeTab === 'screenshots'
                ? 'bg-[#C8C7CA] text-[#0c0c0c]'
                : 'text-[#C8C7CA]',
            ]"
            @click="activeTab = 'screenshots'"
          >
            <span class="text-sm font-medium leading-normal">Скриншоты</span>
          </button>
          <button
            :class="[
              'flex gap-[10px] items-center justify-center px-3 sm:px-[15px] py-[15px] rounded-[100px] transition-colors',
              activeTab === 'media' ? 'bg-[#C8C7CA] text-[#0c0c0c]' : 'text-[#C8C7CA]',
            ]"
            @click="activeTab = 'media'"
          >
            <span class="text-sm font-medium leading-normal">Медиа-файлы</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Screenshots grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5">
      <div
        v-for="(screenshot, index) in screenshots.slice(0, 4)"
        :key="index"
        class="h-[177px] relative rounded-[14px] overflow-hidden group cursor-pointer"
        role="button"
        tabindex="0"
        @click="goToGallery"
        @keydown.enter.prevent="goToGallery"
      >
        <NuxtImg
          :src="screenshot"
          alt="Screenshot"
          class="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
          :width="520"
          :height="354"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          fit="cover"
          format="webp"
          quality="70"
          loading="lazy"
        />
        <!-- Overlay for last item -->
        <div
          v-if="index === 3 && screenshots.length > 4"
          class="absolute inset-0 bg-[rgba(12,12,12,0.7)] flex items-center justify-center rounded-[14px]"
        >
          <div
            class="backdrop-blur-[5px] bg-[rgba(200,199,202,0.2)] flex gap-[10px] items-center justify-center p-[5px] rounded-[64px] w-[45px] h-[45px]"
          >
            <IconsExpand class="w-[25px] h-[25px] text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
