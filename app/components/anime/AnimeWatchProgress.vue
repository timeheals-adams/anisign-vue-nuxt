<script setup lang="ts">
const props = defineProps<{
  totalEpisodes: number
  watchedEpisodes: number
}>()

const emit = defineEmits<{
  (e: 'update:watchedEpisodes', value: number): void
}>()

const inputWatched = ref<string>('')

const total = computed(() => Math.max(0, Math.floor(props.totalEpisodes || 0)))
const watchedClamped = computed(() => {
  const max = total.value || 0
  return Math.min(Math.max(0, Math.floor(props.watchedEpisodes || 0)), max)
})

const progressPercent = computed(() => {
  if (total.value === 0) return 0
  return Math.round((watchedClamped.value / total.value) * 100)
})

function setWatched(value: number) {
  const max = total.value || 0
  const next = Math.min(Math.max(0, Math.floor(value)), max)
  emit('update:watchedEpisodes', next)
}

function submitWatched() {
  const raw = inputWatched.value.trim()
  if (!raw) return
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return
  setWatched(parsed)
  inputWatched.value = ''
}

function increment() {
  if (watchedClamped.value < total.value) {
    setWatched(watchedClamped.value + 1)
  }
}

function decrement() {
  if (watchedClamped.value > 0) {
    setWatched(watchedClamped.value - 1)
  }
}
</script>

<template>
  <div class="w-full bg-[rgba(200,199,202,0.02)] rounded-[14px] px-[14px] py-[12px] flex flex-col gap-3">
    <!-- Заголовок и прогресс -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex flex-col gap-1">
        <div class="text-[#c8c7ca] text-[14px] font-semibold">
          Просмотрено
        </div>
        <div class="text-[#c8c7ca]/60 text-[12px] font-medium">
          {{ watchedClamped }} из {{ total }} эп.
        </div>
      </div>
      
      <!-- Процент -->
      <div 
        class="px-2.5 py-1 rounded-[8px] text-[#c8c7ca] text-[12px] font-bold"
        :class="progressPercent === 100 
          ? 'bg-gradient-to-r from-[rgba(196,2,4,0.15)] to-[rgba(94,1,2,0.15)]' 
          : 'bg-[#c8c7ca]/8'"
      >
        {{ progressPercent }}%
      </div>
    </div>

    <!-- Прогресс бар -->
    <div class="w-full h-[6px] bg-[#c8c7ca]/5 rounded-full overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-[rgba(196,2,4,0.6)] to-[rgba(94,1,2,0.6)] transition-all duration-300 ease-out rounded-full"
        :style="{ width: `${progressPercent}%` }"
      />
    </div>

    <!-- Управление -->
    <div class="flex items-center gap-2">
      <!-- Кнопки +/- -->
      <div class="flex items-center gap-1">
        <button
          type="button"
          :disabled="watchedClamped <= 0"
          class="h-[36px] w-[36px] rounded-[10px] bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#c8c7ca] text-[16px] font-bold transition-colors flex items-center justify-center"
          @click="decrement"
        >
          −
        </button>
        <button
          type="button"
          :disabled="watchedClamped >= total"
          class="h-[36px] w-[36px] rounded-[10px] bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#c8c7ca] text-[16px] font-bold transition-colors flex items-center justify-center"
          @click="increment"
        >
          +
        </button>
      </div>

      <!-- Разделитель -->
      <div class="h-[24px] w-px bg-[#c8c7ca]/10" />

      <!-- Ввод значения -->
      <div class="flex items-center gap-1 flex-1">
        <div
          class="h-[36px] flex-1 px-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 flex items-center gap-2 bg-white/0"
        >
          <span class="text-[#c8c7ca]/60 text-[12px] font-medium whitespace-nowrap">Установить:</span>
          <input
            v-model="inputWatched"
            inputmode="numeric"
            type="text"
            :placeholder="String(watchedClamped)"
            class="w-full bg-transparent outline-none border-none text-[13px] font-medium text-[#c8c7ca] placeholder:text-[#c8c7ca]/30 text-center"
            @keydown.enter.prevent="submitWatched"
          />
        </div>
        <button
          type="button"
          class="h-[36px] px-3 rounded-[10px] bg-gradient-to-r from-[rgba(196,2,4,0.15)] to-[rgba(94,1,2,0.15)] hover:from-[rgba(196,2,4,0.25)] hover:to-[rgba(94,1,2,0.25)] text-[#c8c7ca] text-[13px] font-medium transition-all whitespace-nowrap"
          @click="submitWatched"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
