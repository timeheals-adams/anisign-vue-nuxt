<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import Search from '~/components/icons/Search.vue'
import ShortDivider from '~/components/icons/ShortDivider.vue'
import CloseReport from '~/components/icons/CloseReport.vue'
import { useAnimeSearch, MIN_SEARCH_LENGTH } from "~/composables/useAnimeList"
import { getKindLabel } from "~/lib/api/anime"
import type { Anime } from "~/lib/api/anime"

const emit = defineEmits<{ (e: 'close'): void }>()

const DEBOUNCE_MS = 300

const inputQuery = ref('')
const searchQuery = ref('')

// Загрузка истории из localStorage
const STORAGE_KEY = 'anisign_search_history'
const loadRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveRecentSearches = (searches: string[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches))
  } catch {
    // Игнорируем ошибки localStorage
  }
}

const recent = ref<string[]>(loadRecentSearches())

// Debounce для поиска
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(inputQuery, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  
  debounceTimer = setTimeout(() => {
    searchQuery.value = newValue
    // Сохраняем в историю только валидные запросы
    if (newValue.trim().length >= MIN_SEARCH_LENGTH) {
      addToRecent(newValue.trim())
    }
  }, DEBOUNCE_MS)
})

// Получение данных поиска
const { 
  data: searchData, 
  isLoading: isSearchLoading,
  isFetching: isSearchFetching
} = useAnimeSearch(searchQuery)

// Проверка режима поиска
const isSearchMode = computed(() => searchQuery.value.trim().length >= MIN_SEARCH_LENGTH)

// Результаты поиска
const results = computed(() => {
  if (!isSearchMode.value || !searchData.value) return []
  return searchData.value.anime_list.slice(0, 6) // Показываем максимум 6 результатов
})

const root = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const showBar = ref(false)
const showResults = ref(false)
const closing = ref(false)
let barTimer: number | undefined
let resultsTimer: number | undefined

function finalizeClose() {
  emit('close')
}

function requestClose() {
  if (closing.value) return
  closing.value = true
  // start leaving sequence: hide results first
  showResults.value = false
  // bar will be hidden after results transition end
}

function clearSearch() {
  inputQuery.value = ''
  searchQuery.value = ''
  if (debounceTimer) clearTimeout(debounceTimer)
}

function addToRecent(query: string) {
  const trimmed = query.trim()
  if (!trimmed || trimmed.length < MIN_SEARCH_LENGTH) return
  
  // Убираем дубликаты и добавляем в начало
  const filtered = recent.value.filter(q => q !== trimmed)
  recent.value = [trimmed, ...filtered].slice(0, 6)
  saveRecentSearches(recent.value)
}

function navigateToAnime(animeId: string) {
  // Переходим на страницу аниме
  navigateTo(`/anime/${animeId}`)
  requestClose()
}

function selectRecent(recentQuery: string) {
  // Сбрасываем debounce и сразу устанавливаем оба значения
  if (debounceTimer) clearTimeout(debounceTimer)
  inputQuery.value = recentQuery
  searchQuery.value = recentQuery
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    requestClose()
  }
  if (e.key === 'Enter' && inputQuery.value.trim()) {
    // Если есть результаты, переходим к первому
    if (results.value.length > 0) {
      navigateToAnime(results.value[0].anime_id)
    }
  }
  if (e.key === 'Tab') {
    // Basic focus trap
    const dialog = root.value
    if (!dialog) return
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement
    if (!e.shiftKey && active === last && first) {
      e.preventDefault(); first.focus()
    } else if (e.shiftKey && active === first && last) {
      e.preventDefault(); last.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  nextTick(() => {
    inputEl.value?.focus()
    // Start stagger animations
    showBar.value = true
    barTimer = window.setTimeout(() => {
      showResults.value = true
    }, 110) // slight delay after bar
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  window.clearTimeout(barTimer)
  window.clearTimeout(resultsTimer)
  if (debounceTimer) clearTimeout(debounceTimer)
})

function backdropClick(e: MouseEvent) {
  if (e.target === root.value) requestClose()
}

function afterResultsLeave() {
  if (closing.value) {
    showBar.value = false
  }
}
</script>

<template>
  <teleport to="body">
    <transition name="overlay-fade">
      <div ref="root" @click="backdropClick" v-show="true" class="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto px-4 py-24 md:py-32 bg-black/60 backdrop-blur-sm">
        <!-- Focus guard start -->
        <span tabindex="0" @focus="() => inputEl?.focus()" />
        <!-- Container with fluid width -->
        <transition name="panel">
          <div role="dialog" aria-modal="true" aria-label="Поиск" class="w-full max-w-[1100px] flex flex-col gap-5">
            <!-- Search input block -->
            <transition name="slide-bar" @after-leave="finalizeClose">
              <div v-if="showBar" class="w-full px-[18px] py-6 bg-[#c8c7ca] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/5 backdrop-blur-[15px] flex flex-col justify-center gap-2.5">
                <div class="flex items-center gap-[12.55px]">
                  <Search class="h-[19px] w-[19px] text-[#0c0c0c]" />
                  <div class="w-px h-[19px] bg-[#0c0c0c]/10" />
                  <input ref="inputEl" v-model="inputQuery" placeholder="Поиск по названию (мин. 2 символа)..." class="flex-1 bg-transparent outline-none text-[#0c0c0c] text-sm font-medium font-['Montserrat'] placeholder:text-[#0c0c0c]/70" />
                  <button v-if="inputQuery" @click="clearSearch" aria-label="Очистить" class="p-1 rounded hover:bg-black/10 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#0c0c0c]">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <button @click="requestClose" aria-label="Закрыть" class="p-1 rounded hover:bg-black/10 transition-colors">
                    <CloseReport class="w-4 h-4 text-[#0c0c0c]" />
                  </button>
                </div>
              </div>
            </transition>

            <!-- Results -->
            <transition name="slide-results" @after-leave="afterResultsLeave">
              <div v-if="showResults" class="w-full p-5 bg-[#151515] rounded-xl backdrop-blur-[15px] flex flex-col gap-5 shadow-lg outline outline-1 outline-[#c8c7ca]/5">
                <!-- Загрузка -->
                <div v-if="isSearchFetching" class="flex justify-center py-8">
                  <div class="w-8 h-8 border-2 border-[#B3DE51] border-t-transparent rounded-full animate-spin"></div>
                </div>

                <!-- Результаты поиска -->
                <div v-else-if="isSearchMode && results.length > 0" class="flex flex-col gap-2.5">
                  <div class="text-[#c8c7ca]/70 text-xs font-medium font-['Montserrat'] mb-2">
                    Найдено: {{ searchData?.total_count || 0 }}
                  </div>
                  <transition-group name="list" tag="div" class="flex flex-col gap-2.5">
                    <button 
                      v-for="item in results" 
                      :key="item.anime_id" 
                      @click="navigateToAnime(item.anime_id)"
                      class="group w-full p-3 bg-[#c8c7ca]/5 rounded-xl flex gap-[15px] hover:bg-[#c8c7ca]/10 transition-colors cursor-pointer text-left"
                    >
                      <NuxtImg 
                        :src="item.poster_url" 
                        class="w-[53px] h-[70px] object-cover rounded-[10px]" 
                        :alt="item.russian || item.english"
                        format="webp"
                        quality="80"
                      />
                      <div class="flex-1 flex flex-col gap-[15px]">
                        <div class="flex items-center gap-3">
                          <div class="text-[#c8c7ca] text-sm font-semibold font-['Montserrat'] line-clamp-1">
                            {{ item.russian || item.english }}
                          </div>
                          <div class="w-px h-[11px] bg-[#d9d9d9]/10" />
                          <div class="text-[#fde5b9] text-sm font-semibold font-['Montserrat']">
                            {{ item.score }}
                          </div>
                        </div>
                        <div class="flex items-center gap-2.5 flex-wrap">
                          <div class="h-[30px] px-2.5 py-[5px] bg-[#c8c7ca] rounded-[7px] flex items-center">
                            <div class="text-[#0c0c0c] text-xs font-semibold font-['Montserrat']">
                              {{ getKindLabel(item.kind) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </transition-group>
                  
                  <!-- Кнопка "Показать все результаты" -->
                  <NuxtLink 
                    v-if="searchData && searchData.total_count > 6"
                    to="/anime"
                    @click="requestClose"
                    class="mt-2 text-center py-2 text-sm text-[#B3DE51] hover:text-[#B3DE51]/80 transition-colors"
                  >
                    Показать все результаты ({{ searchData.total_count }})
                  </NuxtLink>
                </div>

                <!-- Нет результатов -->
                <div v-else-if="isSearchMode && results.length === 0 && !isSearchFetching" class="text-center py-8 text-[#c8c7ca]/50">
                  Ничего не найдено по запросу "{{ searchQuery }}"
                </div>

                <!-- Подсказка -->
                <div v-else class="text-center py-8 text-[#c8c7ca]/50 text-sm">
                  Введите минимум {{ MIN_SEARCH_LENGTH }} символа для поиска
                </div>

                <!-- Recent queries -->
                <div v-if="recent.length > 0" class="flex flex-col gap-5 w-full">
                  <div class="h-px bg-[#d9d9d9]/5" />
                  <div class="flex flex-col gap-2.5">
                    <div class="text-[#c8c7ca]/70 text-xs font-medium font-['Montserrat']">Последние запросы</div>
                    <div class="flex flex-wrap gap-[5px]">
                      <button v-for="r in recent" :key="r" @click="selectRecent(r)" class="h-[30px] px-2.5 py-[5px] rounded-[7px] outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/10 flex items-center gap-2.5 hover:bg-[#c8c7ca]/5 transition-colors">
                        <span class="text-[#c8c7ca] text-xs font-medium font-['Montserrat']">{{ r }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition>
        <!-- Focus guard end -->
        <span tabindex="0" @focus="() => inputEl?.focus()" />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
/* Simple transition for list items */
.list-enter-active, .list-leave-active { transition: all .25s ease; }
.list-enter-from { opacity: 0; transform: translateY(4px); }
.list-leave-to { opacity: 0; transform: translateY(-4px); }

/* Overlay fade */
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity .2s ease; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

/* Panel animation */
.panel-enter-active, .panel-leave-active { transition: all .25s cubic-bezier(.4,0,.2,1); }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(12px) scale(.98); }

/* Staggered right-to-left animations */
.slide-bar-enter-active, .slide-bar-leave-active { transition: all .35s cubic-bezier(.4,0,.2,1); }
.slide-bar-enter-from, .slide-bar-leave-to { opacity:0; transform: translateX(40px); }

.slide-results-enter-active, .slide-results-leave-active { transition: all .45s cubic-bezier(.4,0,.2,1); transition-delay: .05s; }
.slide-results-enter-from, .slide-results-leave-to { opacity:0; transform: translateX(40px); }
</style>
