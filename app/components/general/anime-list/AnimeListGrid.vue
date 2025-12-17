<script setup lang="ts">
import { useAnimeList, useAnimeSearch, MIN_SEARCH_LENGTH } from "~/composables/useAnimeList";

const route = useRoute();
const router = useRouter();

const ITEMS_PER_PAGE = 26;
const DEBOUNCE_MS = 300;

// Текущая страница (инициализируем из URL)
const initialPage = Number(route.query.page) || 1;
const currentPage = ref(initialPage);

// Поисковый запрос (ввод пользователя)
const inputQuery = ref("");

// Дебаунсированный поисковый запрос (для API)
const searchQuery = ref("");

// Таймер для debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// Синхронизация страницы с URL
watch(currentPage, (newPage) => {
  const query = { ...route.query };
  if (newPage === 1) {
    delete query.page;
  } else {
    query.page = String(newPage);
  }
  router.replace({ query });
});

// Watch для debounce
watch(inputQuery, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  
  debounceTimer = setTimeout(() => {
    searchQuery.value = newValue;
    // Сбрасываем страницу при поиске
    if (newValue.trim().length >= MIN_SEARCH_LENGTH) {
      currentPage.value = 1;
    }
  }, DEBOUNCE_MS);
});

// Очистка таймера при размонтировании
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

// Получение данных списка
const { 
  data: listData, 
  isLoading: isListLoading, 
  isError: isListError, 
  error: listError 
} = useAnimeList(currentPage, ITEMS_PER_PAGE);

// Получение данных поиска
const { 
  data: searchData, 
  isLoading: isSearchLoading, 
  isError: isSearchError, 
  error: searchError,
  isFetching: isSearchFetching
} = useAnimeSearch(searchQuery);

// Определяем, в режиме поиска мы или нет (минимум 2 символа)
const isSearchMode = computed(() => searchQuery.value.trim().length >= MIN_SEARCH_LENGTH);

// Объединённые данные
const data = computed(() => isSearchMode.value ? searchData.value : listData.value);
const isLoading = computed(() => isSearchMode.value ? isSearchLoading.value : isListLoading.value);
const isError = computed(() => isSearchMode.value ? isSearchError.value : isListError.value);
const error = computed(() => isSearchMode.value ? searchError.value : listError.value);

// Общее количество страниц (только для режима списка)
const totalPages = computed(() => {
  if (!listData.value || isSearchMode.value) return 1;
  return Math.ceil(listData.value.total_count / ITEMS_PER_PAGE);
});

// Очистка поиска
function handleClear() {
  inputQuery.value = "";
  searchQuery.value = "";
  if (debounceTimer) clearTimeout(debounceTimer);
}

// Навигация по страницам
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Прокрутка наверх при смене страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Видимые номера страниц для пагинации
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    // Показываем все страницы если их мало
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    // Всегда показываем первую страницу
    pages.push(1);

    if (current > 3) {
      pages.push("...");
    }

    // Страницы вокруг текущей
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push("...");
    }

    // Всегда показываем последнюю страницу
    pages.push(total);
  }

  return pages;
});

const activeEllipsisIndex = ref<number | null>(null);
const ellipsisPageValue = ref<string>("");
const ellipsisInputEl = ref<HTMLInputElement | null>(null);

function activateEllipsis(index: number) {
  activeEllipsisIndex.value = index;
  ellipsisPageValue.value = "";
  nextTick(() => ellipsisInputEl.value?.focus());
}

function submitEllipsisPage() {
  const raw = ellipsisPageValue.value.trim();
  const pageNumber = Number(raw);
  if (!Number.isInteger(pageNumber)) return;
  if (pageNumber < 1 || pageNumber > totalPages.value) return;

  goToPage(pageNumber);
  activeEllipsisIndex.value = null;
}

function cancelEllipsis() {
  activeEllipsisIndex.value = null;
}
</script>

<template>
  <div class="container">
    <div class="flex flex-col mb-[50px]">
      <h1 class="text-[40px] font-bold">Cписок аниме</h1>
      <p class="opacity-70 text-[14px]">
        Полный каталог доступных аниме. Используйте фильтры и поиск, чтобы найти
        то, что интересно.
      </p>
    </div>
    <div class="flex justify-between gap-[40px]">
      <div :class="['w-full flex flex-col gap-[30px]', !isSearchMode ? 'pb-[96px]' : '']">
        <GeneralAnimeListAnimeSearch 
          v-model="inputQuery"
          @clear="handleClear"
        />

        <!-- Индикатор режима поиска -->
        <div v-if="isSearchMode && !isLoading" class="flex items-center gap-2">
          <span class="text-[14px] text-white/70">
            Результаты поиска: <span class="text-[#B3DE51] font-medium">{{ searchQuery }}</span>
          </span>
          <span v-if="data" class="text-[12px] text-white/40">
            (найдено {{ data.total_count }})
          </span>
          <button 
            class="ml-2 text-[12px] text-white/50 hover:text-white/80 underline"
            @click="handleClear"
          >
            Сбросить
          </button>
        </div>

        <!-- Загрузка (скелетон) -->
        <GeneralAnimeListSkeleton 
          v-if="isLoading || isSearchFetching" 
          :count="ITEMS_PER_PAGE" 
        />

        <!-- Ошибка -->
        <div v-else-if="isError" class="text-center py-20 text-red-400">
          <p>Ошибка загрузки: {{ error?.message }}</p>
          <button 
            class="mt-4 px-4 py-2 bg-[#B3DE51] text-black rounded-lg font-medium"
            @click="handleClear"
          >
            Попробовать снова
          </button>
        </div>

        <!-- Пустой результат поиска -->
        <div v-else-if="isSearchMode && data && data.anime_list.length === 0" class="text-center py-20">
          <p class="text-white/70 text-[16px] mb-2">Ничего не найдено</p>
          <p class="text-white/40 text-[14px]">Попробуйте изменить поисковый запрос</p>
          <button 
            class="mt-4 px-4 py-2 bg-white/10 text-white/70 hover:bg-white/15 rounded-lg font-medium transition-colors"
            @click="handleClear"
          >
            Показать все аниме
          </button>
        </div>

        <!-- Список аниме -->
        <template v-else-if="data">
          <div class="grid gap-2 lg:gap-[20px] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
            <GeneralAnimeListAnimeCard 
              v-for="anime in data.anime_list" 
              :key="anime.id" 
              :anime="anime"
            />
          </div>

          <!-- Пагинация (только для режима списка) -->
          <template v-if="!isSearchMode">
            <div class="sticky bottom-5 z-30 mt-[50px] flex justify-center">
              <div class="backdrop-blur-[19px] bg-[#0C0C0C]/80 rounded-[14px] px-[17px] py-[11px] flex items-center gap-[10px]">
                <!-- Назад -->
                <button
                  class="size-[36px] rounded-[10px] flex items-center justify-center transition-colors"
                  :class="currentPage === 1
                    ? 'bg-[#C8C7CA]/5 text-white/30 cursor-not-allowed'
                    : 'bg-[#C8C7CA]/5 text-white/70 hover:bg-[#C8C7CA]/8'"
                  :disabled="currentPage === 1"
                  @click="goToPage(currentPage - 1)"
                  aria-label="Предыдущая страница"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <!-- Номера страниц -->
                <div class="flex items-center gap-[4px]">
                  <template v-for="(page, index) in visiblePages" :key="index">
                    <div
                      v-if="page === '...'"
                      class="h-[36px] w-[45px] rounded-[8px] border border-[#C8C7CA]/5 flex items-center justify-center overflow-hidden"
                    >
                      <button
                        v-if="activeEllipsisIndex !== index"
                        class="size-full text-white/40 hover:text-white/60 transition-colors"
                        type="button"
                        @click="activateEllipsis(index)"
                        aria-label="Ввести номер страницы"
                      >
                        ...
                      </button>
                      <input
                        v-else
                        ref="ellipsisInputEl"
                        v-model="ellipsisPageValue"
                        class="size-full bg-transparent text-center text-[14px] font-medium text-white outline-none"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        placeholder="…"
                        @keydown.enter.prevent="submitEllipsisPage"
                        @keydown.esc.prevent="cancelEllipsis"
                        @blur="cancelEllipsis"
                        aria-label="Номер страницы"
                      />
                    </div>
                    <button
                      v-else
                      class="size-[36px] rounded-[8px] flex items-center justify-center text-[14px] font-medium transition-colors"
                      :class="page === currentPage
                        ? 'bg-[#C8C7CA] text-[#0C0C0C]'
                        : 'border border-[#C8C7CA]/5 text-white hover:bg-[#C8C7CA]/5'"
                      @click="goToPage(page)"
                      :aria-current="page === currentPage ? 'page' : undefined"
                    >
                      {{ page }}
                    </button>
                  </template>
                </div>

                <!-- Вперёд -->
                <button
                  class="size-[36px] rounded-[10px] flex items-center justify-center transition-colors"
                  :class="currentPage === totalPages
                    ? 'bg-[#C8C7CA]/5 text-white/30 cursor-not-allowed'
                    : 'bg-[#C8C7CA] text-[#0C0C0C] hover:bg-[#C8C7CA]/90'"
                  :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1)"
                  aria-label="Следующая страница"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

          <!-- Информация о странице -->
          <p class="text-center text-[12px] text-white/40 mt-3">
            Страница {{ currentPage }} из {{ totalPages }} • Всего {{ listData?.total_count.toLocaleString('ru-RU') }} аниме
          </p>
          </template>
        </template>
      </div>

      <!-- Боковая панель с фильтрами -->
      <div class="hidden xl:block">
        <GeneralAnimeListFilters />
      </div>
    </div>
  </div>
</template>
