<script setup lang="ts">
import { useGenreList } from "~/composables/useGenres";
import { 
  kindLabels, 
  statusLabels, 
  ratingLabels,
  sortByLabels
} from "~/composables/useAnimeFiltered";
import type { AnimeKind, AnimeStatus, AnimeRating, SortBy, SortOrder, AnimeFilters } from "~/lib/api/anime";

// Props для v-model
const filters = defineModel<AnimeFilters>('filters', { 
  default: () => ({
    page: 1,
    limit: 26,
    sort_by: 'score' as SortBy,
    sort_order: 'desc' as SortOrder,
    filter_by_score: true,
  })
});

const emit = defineEmits<{
  (e: "apply", filters: AnimeFilters): void;
  (e: "reset"): void;
}>();

// Получение жанров из API
const { data: genresList } = useGenreList();

// Локальные состояния для UI
const selectedSortBy = ref<SortBy>(filters.value.sort_by || 'score');
const selectedSortOrder = ref<SortOrder>(filters.value.sort_order || 'desc');
const selectedStatus = ref<AnimeStatus | ''>(filters.value.status || '');
const selectedKind = ref<AnimeKind | ''>(filters.value.kind || '');
const selectedRating = ref<AnimeRating | ''>(filters.value.rating || '');
const selectedGenreIds = ref<string[]>(filters.value.genre_id || []);

// Состояния для кастомного dropdown жанров
const isGenreDropdownOpen = ref(false);
const genreSearchQuery = ref('');
const genreDropdownRef = ref<HTMLElement | null>(null);
const genreInputRef = ref<HTMLInputElement | null>(null);

const currentYear = new Date().getFullYear();
const yearMin = 1960;
const yearMax = currentYear + 1;

const startYear = ref<number>(filters.value.start_year || 1990);
const endYear = ref<number>(filters.value.end_year || currentYear);

// Развернутые секции
const expandedSections = ref({
  sort: true,
  status: true,
  genre: true,
  year: true,
  type: false,
  rating: false,
});

function toggleSection(section: keyof typeof expandedSections.value) {
  expandedSections.value[section] = !expandedSections.value[section];
}

// Опции для фильтров
const sortByOptions: Array<{ value: SortBy; label: string }> = [
  { value: "score", label: sortByLabels.score || "Рейтингу" },
  { value: "aired_on", label: sortByLabels.aired_on || "Дате выхода" },
  { value: "russian", label: sortByLabels.russian || "Названию" },
];

const statusOptions: Array<{ value: AnimeStatus; label: string }> = [
  { value: "anons", label: statusLabels.anons },
  { value: "ongoing", label: statusLabels.ongoing },
  { value: "released", label: statusLabels.released },
];

const kindOptions: Array<{ value: AnimeKind; label: string }> = [
  { value: "tv", label: kindLabels.tv },
  { value: "tv_special", label: kindLabels.tv_special },
  { value: "movie", label: kindLabels.movie },
  { value: "ova", label: kindLabels.ova },
  { value: "ona", label: kindLabels.ona },
  { value: "special", label: kindLabels.special },
  { value: "cm", label: kindLabels.cm },
  { value: "pv", label: kindLabels.pv },
];

const ratingOptions: Array<{ value: AnimeRating; label: string }> = [
  { value: "g", label: ratingLabels.g },
  { value: "pg", label: ratingLabels.pg },
  { value: "pg_13", label: ratingLabels.pg_13 },
  { value: "r", label: ratingLabels.r },
  { value: "r_plus", label: ratingLabels.r_plus },
];

// Computed для проверки активных фильтров
const hasActiveFilters = computed(() => {
  return (
    selectedSortBy.value !== "score" ||
    selectedSortOrder.value !== "desc" ||
    selectedStatus.value !== "" ||
    selectedKind.value !== "" ||
    selectedRating.value !== "" ||
    selectedGenreIds.value.length > 0 ||
    startYear.value !== 1990 ||
    endYear.value !== currentYear
  );
});

const isSortActive = computed(() => selectedSortBy.value !== "score" || selectedSortOrder.value !== "desc");
const isGenreActive = computed(() => selectedGenreIds.value.length > 0);
const isTypeActive = computed(() => selectedKind.value !== "");
const isRatingActive = computed(() => selectedRating.value !== "");
const isStatusActive = computed(() => selectedStatus.value !== "");
const isYearActive = computed(() => startYear.value !== 1990 || endYear.value !== currentYear);

// Получение имени жанра по ID
function getGenreName(genreId: string): string {
  const genre = genresList.value?.find(g => String(g.genre_id) === genreId);
  return genre?.russian || genre?.name || genreId;
}

// Применение фильтров
function applyFilters() {
  const newFilters: AnimeFilters = {
    page: 1, // Сбрасываем страницу при изменении фильтров
    limit: filters.value.limit || 26,
    sort_by: selectedSortBy.value,
    sort_order: selectedSortOrder.value,
  };

  // Устанавливаем filter_by_* на основе sort_by
  if (selectedSortBy.value === 'score') {
    newFilters.filter_by_score = true;
    newFilters.filter_by_date = false;
    newFilters.filter_by_name = false;
  } else if (selectedSortBy.value === 'aired_on') {
    newFilters.filter_by_score = false;
    newFilters.filter_by_date = true;
    newFilters.filter_by_name = false;
  } else if (selectedSortBy.value === 'russian') {
    newFilters.filter_by_score = false;
    newFilters.filter_by_date = false;
    newFilters.filter_by_name = true;
  }

  if (selectedKind.value) newFilters.kind = selectedKind.value;
  if (selectedStatus.value) newFilters.status = selectedStatus.value;
  if (selectedRating.value) newFilters.rating = selectedRating.value;
  if (selectedGenreIds.value.length > 0) newFilters.genre_id = selectedGenreIds.value;
  if (startYear.value !== 1990) newFilters.start_year = startYear.value;
  if (endYear.value !== currentYear) newFilters.end_year = endYear.value;

  filters.value = newFilters;
  emit("apply", newFilters);
}

function resetAll() {
  selectedSortBy.value = "score";
  selectedSortOrder.value = "desc";
  selectedStatus.value = "";
  selectedKind.value = "";
  selectedRating.value = "";
  selectedGenreIds.value = [];
  genreSearchQuery.value = "";
  startYear.value = 1990;
  endYear.value = currentYear;
  
  emit("reset");
  applyFilters();
}

function setSort(value: SortBy) {
  selectedSortBy.value = value;
  applyFilters();
}

function toggleSortOrder() {
  selectedSortOrder.value = selectedSortOrder.value === 'asc' ? 'desc' : 'asc';
  applyFilters();
}

function setStatus(value: AnimeStatus) {
  selectedStatus.value = selectedStatus.value === value ? "" : value;
  applyFilters();
}

function setKind(value: AnimeKind) {
  selectedKind.value = selectedKind.value === value ? "" : value;
  applyFilters();
}

function setRating(value: AnimeRating) {
  selectedRating.value = selectedRating.value === value ? "" : value;
  applyFilters();
}

function removeGenre(genreId: string) {
  selectedGenreIds.value = selectedGenreIds.value.filter((g) => g !== genreId);
  applyFilters();
}

// Функции для кастомного dropdown жанров
function toggleGenreDropdown() {
  isGenreDropdownOpen.value = !isGenreDropdownOpen.value;
  if (isGenreDropdownOpen.value) {
    genreSearchQuery.value = '';
    nextTick(() => genreInputRef.value?.focus());
  }
}

function closeGenreDropdown() {
  isGenreDropdownOpen.value = false;
  genreSearchQuery.value = '';
}

function selectGenre(genreId: string) {
  if (!selectedGenreIds.value.includes(genreId)) {
    selectedGenreIds.value = [...selectedGenreIds.value, genreId];
    applyFilters();
  }
  closeGenreDropdown();
}

// Отфильтрованные жанры по поиску
const filteredGenres = computed(() => {
  if (!genresList.value) return [];
  const query = genreSearchQuery.value.toLowerCase().trim();
  
  return genresList.value.filter(genre => {
    // Исключаем уже выбранные
    if (selectedGenreIds.value.includes(String(genre.genre_id))) return false;
    
    if (!query) return true;
    
    const russian = (genre.russian || '').toLowerCase();
    const name = (genre.name || '').toLowerCase();
    return russian.includes(query) || name.includes(query);
  });
});

// Закрытие dropdown при клике вне
function handleClickOutside(event: MouseEvent) {
  if (genreDropdownRef.value && !genreDropdownRef.value.contains(event.target as Node)) {
    closeGenreDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch для корректировки годов
watch(startYear, (val) => {
  if (val > endYear.value) startYear.value = endYear.value;
});

watch(endYear, (val) => {
  if (val < startYear.value) endYear.value = startYear.value;
});

// Debounce для годов
let yearDebounce: ReturnType<typeof setTimeout> | null = null;
watch([startYear, endYear], () => {
  if (yearDebounce) clearTimeout(yearDebounce);
  yearDebounce = setTimeout(() => {
    applyFilters();
  }, 500);
});

const visibleGenreChips = computed(() => selectedGenreIds.value.slice(0, 3));
const extraGenreCount = computed(() => Math.max(0, selectedGenreIds.value.length - 3));
</script>

<template>
  <div class="w-[310px] flex flex-col gap-[15px]">
    <!-- Сортировка -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('sort')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Сортировка</div>
          <span v-if="isSortActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.sort ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.sort" class="mt-4 flex flex-col gap-3">
        <div class="flex flex-wrap gap-[10px]">
          <button
            v-for="option in sortByOptions"
            :key="option.value"
            type="button"
            class="px-[8px] py-[8px] rounded-[6px] text-[13px] font-semibold font-['Montserrat'] transition-colors"
            :class="selectedSortBy === option.value
              ? 'filter-chip--active'
              : 'bg-[#c8c7ca]/3 text-[#c8c7ca]/70 hover:bg-[#c8c7ca]/6'"
            @click="setSort(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        
        <!-- Порядок сортировки -->
        <button
          type="button"
          class="flex items-center gap-2 text-[12px] text-[#c8c7ca]/60 hover:text-[#c8c7ca] transition-colors"
          @click="toggleSortOrder"
        >
          <svg 
            class="w-4 h-4 transition-transform duration-200" 
            :class="selectedSortOrder === 'desc' ? 'rotate-180' : ''"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M12 5v14M5 12l7-7 7 7" />
          </svg>
          <span>{{ selectedSortOrder === 'desc' ? 'По убыванию' : 'По возрастанию' }}</span>
        </button>
      </div>
    </section>

    <!-- Статус -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('status')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Статус</div>
          <span v-if="isStatusActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.status ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.status" class="mt-4 flex flex-wrap gap-[10px]">
        <button
          v-for="option in statusOptions"
          :key="option.value"
          type="button"
          class="px-[8px] py-[8px] rounded-[6px] text-[13px] font-semibold font-['Montserrat'] transition-colors"
          :class="selectedStatus === option.value
            ? 'filter-chip--active'
            : 'bg-[#c8c7ca]/3 text-[#c8c7ca]/70 hover:bg-[#c8c7ca]/6'"
          @click="setStatus(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </section>

    <!-- Жанр -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('genre')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Жанр</div>
          <span v-if="isGenreActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.genre ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.genre" class="mt-4 flex flex-col gap-[10px]">
        <!-- Кастомный dropdown с поиском -->
        <div ref="genreDropdownRef" class="relative">
          <!-- Триггер -->
          <button
            type="button"
            class="w-full h-[50px] px-[15px] rounded-[10px] border border-[#c8c7ca]/5 bg-[#c8c7ca]/3 flex items-center justify-between transition-all duration-200 hover:bg-[#c8c7ca]/5 hover:border-[#c8c7ca]/10"
            :class="{ 'border-[#c8c7ca]/20 bg-[#c8c7ca]/5': isGenreDropdownOpen }"
            @click.stop="toggleGenreDropdown"
          >
            <span class="text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/70">
              Выберите жанр
            </span>
            <IconsChevronDown 
              class="w-[18px] h-[18px] text-[#c8c7ca]/70 transition-transform duration-200"
              :class="isGenreDropdownOpen ? 'rotate-180' : ''"
            />
          </button>

          <!-- Выпадающий список -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-2 scale-95"
          >
            <div 
              v-if="isGenreDropdownOpen"
              class="absolute z-50 top-[calc(100%+8px)] left-0 right-0 bg-[#141414] border border-[#c8c7ca]/10 rounded-[12px] shadow-xl shadow-black/30 overflow-hidden"
            >
              <!-- Поле поиска -->
              <div class="p-3 border-b border-[#c8c7ca]/5">
                <div class="relative">
                  <svg 
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8c7ca]/40"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    ref="genreInputRef"
                    v-model="genreSearchQuery"
                    type="text"
                    placeholder="Поиск жанра..."
                    class="w-full h-[40px] pl-10 pr-4 bg-[#c8c7ca]/5 rounded-[8px] border border-[#c8c7ca]/5 text-[13px] font-['Montserrat'] text-[#c8c7ca] placeholder:text-[#c8c7ca]/40 outline-none focus:border-[#c8c7ca]/15 transition-colors"
                    @click.stop
                  />
                </div>
              </div>

              <!-- Список жанров -->
              <div class="max-h-[240px] overflow-y-auto custom-scrollbar">
                <div v-if="filteredGenres.length === 0" class="px-4 py-6 text-center">
                  <span class="text-[13px] text-[#c8c7ca]/50 font-['Montserrat']">
                    {{ genreSearchQuery ? 'Жанры не найдены' : 'Все жанры выбраны' }}
                  </span>
                </div>
                <button
                  v-for="genre in filteredGenres"
                  :key="genre.genre_id"
                  type="button"
                  class="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#c8c7ca]/5 transition-colors group"
                  @click.stop="selectGenre(String(genre.genre_id))"
                >
                  <span class="text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/80 group-hover:text-[#c8c7ca]">
                    {{ genre.russian || genre.name }}
                  </span>
                  <svg 
                    class="w-4 h-4 text-[#b3de51] opacity-0 group-hover:opacity-100 transition-opacity"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Выбранные жанры -->
        <div v-if="selectedGenreIds.length > 0" class="flex flex-wrap gap-[10px]">
          <button
            v-for="genreId in visibleGenreChips"
            :key="genreId"
            type="button"
            class="px-[10px] py-[8px] rounded-[25px] bg-[#c8c7ca]/3 flex items-center gap-[5px] hover:bg-[#c8c7ca]/6 transition-colors group"
            @click="removeGenre(genreId)"
          >
            <span class="text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/70">
              {{ getGenreName(genreId) }}
            </span>
            <svg 
              width="10" 
              height="10" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5" 
              class="text-[#c8c7ca]/40 group-hover:text-[#f39595] transition-colors"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            v-if="extraGenreCount > 0"
            class="px-[10px] py-[8px] rounded-[25px] bg-[#c8c7ca]/3 flex items-center"
          >
            <span class="text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/70">+{{ extraGenreCount }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Год -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('year')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Год</div>
          <span v-if="isYearActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.year ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.year" class="mt-4 flex items-center justify-between gap-[10px]">
        <input
          v-model.number="startYear"
          type="number"
          :min="yearMin"
          :max="yearMax"
          class="w-[55px] px-[9px] py-[8px] rounded-[7px] bg-transparent border border-[#c8c7ca]/10 text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat'] outline-none"
        />

        <div class="flex-1 relative h-[16px]">
          <div class="absolute left-0 right-0 top-[6px] h-[4px] rounded-[21px] bg-[#c8c7ca]/20" />
          <div
            class="absolute top-[6px] h-[4px] rounded-[21px] bg-[#c8c7ca]"
            :style="{
              left: `${((startYear - yearMin) / (yearMax - yearMin)) * 100}%`,
              right: `${100 - ((endYear - yearMin) / (yearMax - yearMin)) * 100}%`,
            }"
          />

          <input
            v-model.number="startYear"
            type="range"
            :min="yearMin"
            :max="yearMax"
            class="range-slider range-slider--start"
          />
          <input
            v-model.number="endYear"
            type="range"
            :min="yearMin"
            :max="yearMax"
            class="range-slider range-slider--end"
          />
        </div>

        <input
          v-model.number="endYear"
          type="number"
          :min="yearMin"
          :max="yearMax"
          class="w-[55px] px-[9px] py-[8px] rounded-[7px] bg-transparent border border-[#c8c7ca]/10 text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat'] outline-none"
        />
      </div>
    </section>

    <!-- Тип -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('type')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Тип</div>
          <span v-if="isTypeActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.type ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.type" class="mt-4 flex flex-wrap gap-[10px]">
        <button
          v-for="option in kindOptions"
          :key="option.value"
          type="button"
          class="px-[8px] py-[8px] rounded-[6px] text-[13px] font-semibold font-['Montserrat'] transition-colors"
          :class="selectedKind === option.value
            ? 'filter-chip--active'
            : 'bg-[#c8c7ca]/3 text-[#c8c7ca]/70 hover:bg-[#c8c7ca]/6'"
          @click="setKind(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </section>

    <!-- Рейтинг -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('rating')"
      >
        <div class="flex items-center gap-[10px]">
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Возрастной рейтинг</div>
          <span v-if="isRatingActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]" />
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.rating ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.rating" class="mt-4 flex flex-wrap gap-[10px]">
        <button
          v-for="option in ratingOptions"
          :key="option.value"
          type="button"
          class="px-[8px] py-[8px] rounded-[6px] text-[13px] font-semibold font-['Montserrat'] transition-colors"
          :class="selectedRating === option.value
            ? 'filter-chip--active'
            : 'bg-[#c8c7ca]/3 text-[#c8c7ca]/70 hover:bg-[#c8c7ca]/6'"
          @click="setRating(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </section>

    <!-- Сбросить всё -->
    <button
      v-if="hasActiveFilters"
      type="button"
      class="h-[50px] w-full px-[100px] py-[16px] rounded-[10px] bg-[#f39595]/15 flex items-center justify-center"
      @click="resetAll"
    >
      <span class="text-[#f39595] text-[14px] font-semibold font-['Montserrat']">Сбросить всё</span>
    </button>
  </div>
</template>

<style scoped>
.filter-chip--active {
  background: #c8c7ca;
  color: #0c0c0c;
}

.range-slider {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 16px;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
}

.range-slider::-webkit-slider-runnable-track {
  height: 16px;
  background: transparent;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 9999px;
  background: #c8c7ca;
  box-shadow: inset 0 0 0 2.73px #0c0c0c;
  pointer-events: auto;
}

.range-slider::-moz-range-track {
  height: 16px;
  background: transparent;
}

.range-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 9999px;
  background: #c8c7ca;
  box-shadow: inset 0 0 0 2.73px #0c0c0c;
  pointer-events: auto;
}

.range-slider--start {
  z-index: 2;
}

.range-slider--end {
  z-index: 3;
}

/* Кастомный скроллбар для dropdown */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(200, 199, 202, 0.2) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(200, 199, 202, 0.2);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 199, 202, 0.3);
}
</style>
