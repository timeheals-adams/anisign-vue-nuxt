<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  totalEpisodes: number
  watchedEpisodes?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const inputValue = ref<string>('')
const scrollContainer = ref<HTMLElement | null>(null)

const episodes = computed(() => {
  const total = Math.max(0, Math.floor(props.totalEpisodes || 0))
  return Array.from({ length: total }, (_, i) => i + 1)
})

function clampEpisode(value: number) {
  const total = Math.max(1, Math.floor(props.totalEpisodes || 1))
  return Math.min(Math.max(1, value), total)
}

function selectEpisode(ep: number) {
  emit('update:modelValue', clampEpisode(ep))
}

function submitInput() {
  const raw = inputValue.value.trim()
  if (!raw) return
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return
  selectEpisode(Math.floor(parsed))
  inputValue.value = ''
}

function nextEpisode() {
  if (props.modelValue < props.totalEpisodes) {
    selectEpisode(props.modelValue + 1)
  }
}

function prevEpisode() {
  if (props.modelValue > 1) {
    selectEpisode(props.modelValue - 1)
  }
}

// Автоматический скролл к выбранной серии
watch(() => props.modelValue, (newVal) => {
  nextTick(() => {
    if (!scrollContainer.value) return
    const activeButton = scrollContainer.value.querySelector(`[data-episode="${newVal}"]`)
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
})
</script>

<template>
  <div class="flex flex-col gap-[10px] w-full">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="text-[#c8c7ca] text-[14px] font-semibold">
          Серии
        </div>
        <div class="text-[#c8c7ca]/50 text-[12px] font-medium">
          {{ totalEpisodes }} эп.
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Навигация -->
        <div class="flex items-center gap-1">
          <button
            type="button"
            :disabled="modelValue <= 1"
            class="h-[36px] w-[36px] rounded-[10px] bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#c8c7ca] text-[13px] font-medium transition-colors flex items-center justify-center"
            @click="prevEpisode"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            :disabled="modelValue >= totalEpisodes"
            class="h-[36px] w-[36px] rounded-[10px] bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#c8c7ca] text-[13px] font-medium transition-colors flex items-center justify-center"
            @click="nextEpisode"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Ввод серии -->
        <div class="flex items-center gap-1">
          <div
            class="h-[36px] px-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 flex items-center gap-2 bg-white/0"
          >
            <span class="text-[#c8c7ca]/60 text-[12px] font-medium">№</span>
            <input
              v-model="inputValue"
              inputmode="numeric"
              type="text"
              placeholder="..."
              class="w-[40px] bg-transparent outline-none border-none text-[13px] font-medium text-[#c8c7ca] placeholder:text-[#c8c7ca]/30 text-center"
              @keydown.enter.prevent="submitInput"
            />
          </div>
          <button
            type="button"
            class="h-[36px] px-3 rounded-[10px] bg-gradient-to-r from-[rgba(196,2,4,0.15)] to-[rgba(94,1,2,0.15)] hover:from-[rgba(196,2,4,0.25)] hover:to-[rgba(94,1,2,0.25)] text-[#c8c7ca] text-[13px] font-medium transition-all"
            @click="submitInput"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <div 
      ref="scrollContainer"
      class="w-full overflow-x-auto overflow-y-hidden episodes-scroll"
    >
      <div class="flex gap-[6px] min-w-max pb-1">
        <button
          v-for="ep in episodes"
          :key="ep"
          :data-episode="ep"
          type="button"
          class="relative h-[40px] min-w-[40px] px-2 rounded-[10px] text-[13px] font-semibold transition-all duration-200"
          :class="[
            ep === modelValue
              ? 'bg-gradient-to-br from-[rgba(196,2,4,0.2)] to-[rgba(94,1,2,0.2)] text-[#c8c7ca] ring-1 ring-[rgba(196,2,4,0.3)] scale-105'
              : watchedEpisodes && ep <= watchedEpisodes
                ? 'bg-[#c8c7ca]/8 text-[#c8c7ca]/90 hover:bg-[#c8c7ca]/12'
                : 'bg-[#c8c7ca]/4 text-[#c8c7ca]/70 hover:bg-[#c8c7ca]/8'
          ]"
          @click="selectEpisode(ep)"
        >
          <span>{{ ep }}</span>
          <!-- Индикатор просмотренной серии -->
          <div 
            v-if="watchedEpisodes && ep <= watchedEpisodes && ep !== modelValue"
            class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[rgba(196,2,4,0.6)]"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.episodes-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(217, 217, 217, 0.3) transparent;
}

.episodes-scroll::-webkit-scrollbar {
  height: 6px;
}

.episodes-scroll::-webkit-scrollbar-track {
  background: rgba(200, 199, 202, 0.03);
  border-radius: 3px;
}

.episodes-scroll::-webkit-scrollbar-thumb {
  background: rgba(217, 217, 217, 0.3);
  border-radius: 3px;
  transition: background 0.2s;
}

.episodes-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(217, 217, 217, 0.5);
}
</style>
