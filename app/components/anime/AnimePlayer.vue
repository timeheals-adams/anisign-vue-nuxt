<script setup lang="ts">
interface VoiceStudio {
  id: string
  name: string
  logo: string
  isPopular?: boolean
}

interface Props {
  title: string
  studios: VoiceStudio[]
  selectedStudioId?: string

  // Episodes
  totalEpisodes?: number
  storageKey?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'selectStudio', studioId: string): void
  (e: 'updateEpisode', episode: number): void
  (e: 'updateWatched', watched: number): void
}>()

const isCollapsed = ref(false)

const currentEpisode = ref(1)
const watchedEpisodes = ref(0)
const inputEpisode = ref('')
const inputWatched = ref('')
const scrollContainer = ref<HTMLElement | null>(null)
const showEpisodeInput = ref(false)

// Drag to scroll state
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const maxEpisode = computed(() => {
  const total = props.totalEpisodes ?? 0
  return total > 0 ? total : Number.POSITIVE_INFINITY
})

const episodes = computed(() => {
  if (!Number.isFinite(maxEpisode.value)) return []
  const total = Math.max(0, Math.floor(maxEpisode.value))
  return Array.from({ length: total }, (_, i) => i + 1)
})

const progressPercent = computed(() => {
  if (!Number.isFinite(maxEpisode.value) || maxEpisode.value === 0) return 0
  return Math.round((watchedEpisodes.value / maxEpisode.value) * 100)
})

function clampEpisode(value: number) {
  if (!Number.isFinite(value)) return 1
  const rounded = Math.floor(value)
  const clamped = Math.max(1, Math.min(rounded, maxEpisode.value))
  return clamped
}

function clampWatched(value: number) {
  if (!Number.isFinite(value)) return 0
  const rounded = Math.floor(value)
  const upper = Number.isFinite(maxEpisode.value) ? maxEpisode.value : Number.POSITIVE_INFINITY
  return Math.max(0, Math.min(rounded, upper))
}

function persistProgress() {
  if (typeof window === 'undefined') return
  if (!props.storageKey) return
  try {
    localStorage.setItem(
      props.storageKey,
      JSON.stringify({ currentEpisode: currentEpisode.value, watchedEpisodes: watchedEpisodes.value })
    )
  } catch {
    // ignore
  }
}

function loadProgress() {
  if (typeof window === 'undefined') return
  if (!props.storageKey) return
  try {
    const raw = localStorage.getItem(props.storageKey)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (typeof parsed?.currentEpisode === 'number') currentEpisode.value = clampEpisode(parsed.currentEpisode)
    if (typeof parsed?.watchedEpisodes === 'number') watchedEpisodes.value = clampWatched(parsed.watchedEpisodes)
  } catch {
    // ignore
  }
}

onMounted(() => {
  loadProgress()
})

watch([currentEpisode, watchedEpisodes, () => props.totalEpisodes], () => {
  currentEpisode.value = clampEpisode(currentEpisode.value)
  watchedEpisodes.value = clampWatched(watchedEpisodes.value)
  persistProgress()
})

function selectStudio(studioId: string) {
  emit('selectStudio', studioId)
}

// Drag to scroll handlers
function handleMouseDown(e: MouseEvent) {
  if (!scrollContainer.value) return
  isDragging.value = true
  startX.value = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft.value = scrollContainer.value.scrollLeft
  scrollContainer.value.style.cursor = 'grabbing'
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX.value) * 2
  scrollContainer.value.scrollLeft = scrollLeft.value - walk
}

function handleMouseUp() {
  if (!scrollContainer.value) return
  isDragging.value = false
  scrollContainer.value.style.cursor = 'grab'
}

function handleMouseLeave() {
  if (!scrollContainer.value) return
  isDragging.value = false
  scrollContainer.value.style.cursor = 'grab'
}

function setEpisode(value: number) {
  const next = clampEpisode(value)
  currentEpisode.value = next
  emit('updateEpisode', next)
}

function setWatched(value: number) {
  const next = clampWatched(value)
  watchedEpisodes.value = next
  emit('updateWatched', next)
}

function nextEpisode() {
  if (currentEpisode.value < maxEpisode.value) {
    setEpisode(currentEpisode.value + 1)
  }
}

function prevEpisode() {
  if (currentEpisode.value > 1) {
    setEpisode(currentEpisode.value - 1)
  }
}

function scrollToNext() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
}

function scrollToPrev() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
}

function submitEpisodeInput() {
  const raw = inputEpisode.value.trim()
  if (!raw) return
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return
  setEpisode(Math.floor(parsed))
  inputEpisode.value = ''
  showEpisodeInput.value = false
}

function toggleEpisodeInput() {
  showEpisodeInput.value = !showEpisodeInput.value
  if (showEpisodeInput.value) {
    nextTick(() => {
      const input = document.querySelector<HTMLInputElement>('#episode-input')
      input?.focus()
    })
  }
}

function submitWatchedInput() {
  const raw = inputWatched.value.trim()
  if (!raw) return
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return
  setWatched(parsed)
  inputWatched.value = ''
}

function incrementWatched() {
  if (watchedEpisodes.value < maxEpisode.value) {
    setWatched(watchedEpisodes.value + 1)
  }
}

function decrementWatched() {
  if (watchedEpisodes.value > 0) {
    setWatched(watchedEpisodes.value - 1)
  }
}

// Автоматический скролл к выбранной серии
watch(currentEpisode, () => {
  nextTick(() => {
    if (!scrollContainer.value) return
    const activeButton = scrollContainer.value.querySelector(`[data-episode="${currentEpisode.value}"]`)
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
})
</script>

<template>
  <div class="flex flex-col gap-[30px] w-full max-w-[1602px] mx-auto">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
      <div class="flex flex-col gap-[5px]">
        <div class="text-[#c8c7ca] text-[20px] font-semibold opacity-60">
          Смотреть
        </div>
        <div class="text-[#c8c7ca] text-[20px] font-bold">
          {{ title }}
        </div>
      </div>
      <div class="bg-[rgba(243,149,149,0.1)] px-[15px] py-[15px] rounded-[10px]">
        <div class="text-[#f39595] text-[14px] font-medium whitespace-nowrap">
          Возникла проблема с плеером
        </div>
      </div>
    </div>

    <!-- Player and voice studios -->
    <div class="flex flex-col lg:flex-row gap-[30px] items-start w-full min-w-0 overflow-hidden">
      <!-- Left side: Video player + Episode controls -->
      <div class="w-full lg:flex-1 flex flex-col gap-[30px] min-w-0">
        <!-- Video player -->
        <div class="bg-[rgba(217,217,217,0.05)] w-full h-[549px] rounded-[24px]">
          <!-- Здесь будет плеер -->
        </div>

        <!-- Episode Selector and Watch Progress -->
        <div class="flex flex-col lg:flex-row gap-[30px] items-stretch min-h-[73px]">
          <!-- Episode Selector -->
          <div v-if="episodes.length > 0" class="bg-[rgba(200,199,202,0.02)] h-[73px] px-[15px] py-[16px] rounded-[14px] flex items-center gap-[13px] flex-1 min-w-0 overflow-hidden">
            <!-- Левая стрелка -->
            <button
              type="button"
              :disabled="currentEpisode <= 1"
              class="bg-[rgba(255,255,255,0.02)] h-[40px] w-[56px] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[rgba(255,255,255,0.05)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
              @click="prevEpisode(); scrollToPrev()"
            >
              <svg class="w-6 h-6 text-[#c8c7ca]" viewBox="0 0 24 24" fill="none">
                <path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <!-- Разделитель -->
            <div class="bg-[rgba(217,217,217,0.05)] h-[25px] w-px rounded-[19px] shrink-0" />

            <!-- Episodes list -->
            <div 
              ref="scrollContainer" 
              class="flex-1 overflow-x-auto overflow-y-hidden episodes-scroll cursor-grab"
              @mousedown="handleMouseDown"
              @mousemove="handleMouseMove"
              @mouseup="handleMouseUp"
              @mouseleave="handleMouseLeave"
            >
              <div class="flex gap-[7px] items-center">
                <button
                  v-for="ep in episodes"
                  :key="ep"
                  :data-episode="ep"
                  type="button"
                  class="h-[40px] w-[40px] rounded-[8px] flex items-center justify-center shrink-0 text-[16px] font-medium transition-all duration-300 ease-in-out"
                  :class="[
                    ep === currentEpisode
                      ? 'bg-[#c8c7ca]! text-[#0c0c0c]!'
                      : 'bg-[rgba(255,255,255,0.02)] text-[#c8c7ca] hover:bg-[rgba(255,255,255,0.05)]'
                  ]"
                  @click="setEpisode(ep)"
                >
                  {{ ep }}
                </button>
              </div>
            </div>

            <!-- Разделитель -->
            <div class="bg-[rgba(217,217,217,0.05)] h-[25px] w-px rounded-[19px] shrink-0" />

            <!-- Кнопка ввода серии -->
            <div class="relative shrink-0">
              <button
                v-if="!showEpisodeInput"
                type="button"
                class="border border-[rgba(200,199,202,0.05)] h-[40px] w-[56px] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out"
                @click="toggleEpisodeInput"
              >
                <span class="text-[#c8c7ca] text-[12px] font-medium">...</span>
              </button>
              <div v-else class="border border-[rgba(200,199,202,0.05)] h-[40px] w-[56px] rounded-[8px] flex items-center justify-center shrink-0 bg-[rgba(200,199,202,0.02)]">
                <input
                  id="episode-input"
                  v-model="inputEpisode"
                  type="number"
                  class="bg-transparent text-[#c8c7ca] text-[12px] font-medium text-center w-full h-full outline-none"
                  placeholder="№"
                  @keyup.enter="submitEpisodeInput"
                  @blur="showEpisodeInput = false; inputEpisode = ''"
                />
              </div>
            </div>

            <!-- Разделитель -->
            <div class="bg-[rgba(217,217,217,0.05)] h-[25px] w-px rounded-[19px] shrink-0" />

            <!-- Правая стрелка -->
            <button
              type="button"
              :disabled="currentEpisode >= maxEpisode"
              class="bg-[rgba(255,255,255,0.02)] h-[40px] w-[56px] rounded-[8px] flex items-center justify-center shrink-0 hover:bg-[rgba(255,255,255,0.05)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
              @click="nextEpisode(); scrollToNext()"
            >
              <svg class="w-6 h-6 text-[#c8c7ca]" viewBox="0 0 24 24" fill="none">
                <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Watch Progress Card -->
          <div v-if="episodes.length > 0" class="border border-[rgba(200,199,202,0.05)] h-[73px] w-full lg:w-[263px] px-[18px] py-[14px] rounded-[14px] flex items-center justify-center shrink-0">
            <div class="flex flex-col gap-[10px] w-full leading-[0]">
              <!-- Заголовок и кнопки -->
              <div class="flex items-center justify-between w-full leading-[0]">
                <!-- Текущая серия -->
                <div class="flex items-center gap-[5px] text-[#c8c7ca]">
                  <div class="text-[20px] font-semibold">
                    {{ currentEpisode }}
                  </div>
                  <div class="text-[14px] font-medium">
                    Cерия
                  </div>
                </div>

                <!-- Кнопки +/- -->
                <div class="flex items-center gap-[5px]">
                  <button
                    type="button"
                    :disabled="watchedEpisodes <= 0"
                    class="bg-[rgba(200,199,202,0.02)] h-[27px] w-[27px] rounded-[5px] flex items-center justify-center hover:bg-[rgba(200,199,202,0.05)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
                    @click="decrementWatched"
                  >
                    <div class="relative w-[12px] h-[12px]">
                      <div class="absolute top-1/2 left-0 w-full h-[2px] bg-[rgba(217,217,217,0.66)] rounded-[18px] -translate-y-1/2" />
                    </div>
                  </button>
                  <button
                    type="button"
                    :disabled="watchedEpisodes >= maxEpisode"
                    class="bg-[rgba(200,199,202,0.02)] h-[27px] w-[27px] rounded-[5px] flex items-center justify-center hover:bg-[rgba(200,199,202,0.05)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
                    @click="incrementWatched"
                  >
                    <div class="relative w-[12px] h-[12px]">
                      <div class="absolute top-1/2 left-0 w-full h-[2px] bg-[#d9d9d9] rounded-[18px] -translate-y-1/2" />
                      <div class="absolute top-0 left-1/2 w-[2px] h-full bg-[#d9d9d9] rounded-[18px] -translate-x-1/2" />
                    </div>
                  </button>
                </div>
              </div>

              <!-- Прогресс бар -->
              <div class="relative w-full h-[5px] bg-[rgba(217,217,217,0.15)] rounded-[46px] overflow-hidden">
                <div
                  class="absolute top-0 left-0 h-full bg-[#c8c7ca] rounded-[46px] transition-all duration-500 ease-in-out"
                  :style="{ width: `${progressPercent}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="flex items-center justify-center shrink-0">
        <div class="bg-[rgba(217,217,217,0.05)] h-[652px] w-px" />
      </div>

      <!-- Voice studios list -->
      <div class="flex flex-col gap-[18px] h-[652px] shrink-0 transition-all duration-500 ease-in-out" :class="isCollapsed ? 'w-[83px]' : 'w-full lg:w-[267px]'">
        <!-- Collapse button -->
        <button
          @click="isCollapsed = !isCollapsed"
          class="bg-[rgba(200,199,202,0.02)] px-[20px] py-[15px] rounded-[10px] flex items-center justify-between hover:bg-[rgba(200,199,202,0.05)] transition-all duration-500 ease-in-out"
          :class="isCollapsed ? 'h-[652px] justify-center' : 'h-[50px]'"
        >
          <span v-show="!isCollapsed" class="text-[#a5a5a5] text-[14px] font-medium leading-[21.393px]">
            Свернуть
          </span>
          <svg
            class="text-[#a5a5a5] transition-all duration-500 ease-in-out"
            :class="isCollapsed ? 'w-6 h-6 rotate-0' : 'w-5 h-5 rotate-180'"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19L8 12L15 5"
            />
          </svg>
        </button>

        <transition name="collapse">
          <div v-show="!isCollapsed" class="flex flex-col gap-[12px] overflow-hidden">
            <!-- Divider -->
            <div class="bg-[rgba(217,217,217,0.05)] h-px w-full" />

            <!-- Studios list with scrollbar -->
            <div class="flex gap-[6px] items-start h-[565px] overflow-clip">
              <div class="flex flex-col gap-[10px] h-[562px] overflow-y-auto overflow-x-hidden w-full custom-scrollbar">
                <button
                  v-for="studio in studios"
                  :key="studio.id"
                  @click="selectStudio(studio.id)"
                  class="flex items-center gap-[10px] px-[14px] py-[15px] rounded-[14px] transition-all duration-300 ease-in-out w-full"
                  :class="[
                    selectedStudioId === studio.id
                      ? 'bg-[rgba(196,2,4,0.1)]'
                      : 'bg-[rgba(200,199,202,0.02)] hover:bg-[rgba(200,199,202,0.05)]'
                  ]"
                >
                  <div class="w-[39px] h-[39px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      :src="studio.logo"
                      :alt="studio.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex flex-col text-left flex-1 min-w-0" :class="studio.isPopular ? 'gap-[3px]' : ''">
                    <div class="text-[#c8c7ca] text-[14px] font-semibold leading-[normal]">
                      {{ studio.name }}
                    </div>
                    <div
                      v-if="studio.isPopular"
                      class="text-[#c8c7ca] text-[12px] font-medium opacity-60 leading-[normal]"
                    >
                      Популярный
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Скрытие стрелочек у input type="number" */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Кастомный скроллбар для студий */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(217, 217, 217, 0.3);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(217, 217, 217, 0.5);
}

/* Скрытие скроллбара для серий */
.episodes-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.episodes-scroll::-webkit-scrollbar {
  display: none;
}

.episodes-scroll {
  user-select: none;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 450px;
  opacity: 1;
}
</style>
