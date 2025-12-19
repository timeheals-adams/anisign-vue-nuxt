<script setup lang="ts">
import { computed, ref, watch } from "vue";

type SortBy = "score" | "aired_on" | "russian" | "";
type AnimeKind = "tv" | "movie" | "ova" | "ona" | "special" | "music" | "";
type AnimeStatus = "anons" | "ongoing" | "released" | "";

const sortByOptions: Array<{ value: SortBy; label: string }> = [
  { value: "score", label: "Рейтингу" },
  { value: "aired_on", label: "Дате выхода" },
  { value: "russian", label: "Названию" },
];

const statusOptions: Array<{ value: AnimeStatus; label: string }> = [
  { value: "anons", label: "Анонс" },
  { value: "ongoing", label: "Онгоинг" },
  { value: "released", label: "Завершено" },
];

const kindOptions: Array<{ value: AnimeKind; label: string }> = [
  { value: "tv", label: "ТВ-Сериал" },
  { value: "movie", label: "Фильм" },
  { value: "ova", label: "OVA" },
  { value: "ona", label: "ONA" },
  { value: "special", label: "Спешл" },
  { value: "music", label: "Клип" },
];

const genreOptions = ["Комедия", "Исекай", "Фентези", "Драма", "Экшен", "Романтика"];

const selectedSortBy = ref<SortBy>("score");
const selectedStatus = ref<AnimeStatus>("");
const selectedKind = ref<AnimeKind>("");

const selectedGenreToAdd = ref<string>("");
const selectedGenres = ref<string[]>(["Комедия", "Исекай", "Фентези"]);

const currentYear = new Date().getFullYear();
const yearMin = 1960;
const yearMax = currentYear;

const startYear = ref<number>(1995);
const endYear = ref<number>(2014);

const expandedSections = ref({
  sort: true,
  status: true,
  genre: true,
  year: true,
  type: false,
});

function toggleSection(section: keyof typeof expandedSections.value) {
  expandedSections.value[section] = !expandedSections.value[section];
}

const hasActiveFilters = computed(() => {
  return (
    selectedSortBy.value !== "score" ||
    selectedStatus.value !== "" ||
    selectedKind.value !== "" ||
    selectedGenres.value.length > 0 ||
    startYear.value !== 1995 ||
    endYear.value !== 2014
  );
});

const isSortActive = computed(() => selectedSortBy.value !== "score");
const isGenreActive = computed(() => selectedGenres.value.length > 0);
const isTypeActive = computed(() => selectedKind.value !== "");

const emit = defineEmits<{
  (e: "apply", filters: object): void;
  (e: "reset"): void;
}>();

function applyFilters() {
  emit("apply", {
    kind: selectedKind.value || undefined,
    status: selectedStatus.value || undefined,
    sort_by: selectedSortBy.value || undefined,
    start_year: startYear.value || undefined,
    end_year: endYear.value || undefined,
    genres: selectedGenres.value.length ? selectedGenres.value : undefined,
  });
}

function resetAll() {
  selectedSortBy.value = "score";
  selectedStatus.value = "";
  selectedKind.value = "";
  selectedGenres.value = [];
  selectedGenreToAdd.value = "";
  startYear.value = 1995;
  endYear.value = 2014;
  emit("reset");
  applyFilters();
}

function setSort(value: SortBy) {
  selectedSortBy.value = value;
  applyFilters();
}

function setStatus(value: AnimeStatus) {
  selectedStatus.value = selectedStatus.value === value ? "" : value;
  applyFilters();
}

function removeGenre(genre: string) {
  selectedGenres.value = selectedGenres.value.filter((g) => g !== genre);
  applyFilters();
}

watch(selectedGenreToAdd, (val) => {
  if (!val)
    return;
  if (!selectedGenres.value.includes(val))
    selectedGenres.value = [...selectedGenres.value, val];
  selectedGenreToAdd.value = "";
  applyFilters();
});

watch(startYear, (val) => {
  if (val > endYear.value)
    startYear.value = endYear.value;
});

watch(endYear, (val) => {
  if (val < startYear.value)
    endYear.value = startYear.value;
});

const visibleGenreChips = computed(() => selectedGenres.value.slice(0, 3));
const extraGenreCount = computed(() => Math.max(0, selectedGenres.value.length - 3));
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
          <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Cортировка</div>
          <span v-if="isSortActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]"></span>
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.sort ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.sort" class="mt-4 flex flex-wrap gap-[10px]">
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
    </section>

    <!-- Статус -->
    <section class="bg-[#c8c7ca]/2 border border-[#c8c7ca]/5 rounded-[14px] p-[25px] overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between"
        @click="toggleSection('status')"
      >
        <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Статус</div>
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
          <span v-if="isGenreActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]"></span>
        </div>
        <span class="w-[24px] h-[24px] p-[3px] rounded-[5px] flex items-center justify-center text-[#c8c7ca]">
          <IconsChevronDown
            class="w-[18px] h-[18px] transition-transform duration-200"
            :class="expandedSections.genre ? 'rotate-180' : 'rotate-0'"
          />
        </span>
      </button>

      <div v-show="expandedSections.genre" class="mt-4 flex flex-col gap-[10px]">
        <div class="h-[50px] px-[15px] py-[8px] rounded-[10px] border border-[#c8c7ca]/5 bg-[#c8c7ca]/3 flex items-center justify-between">
          <select
            v-model="selectedGenreToAdd"
            class="w-full bg-transparent outline-none border-none text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/90 appearance-none"
          >
            <option value="" disabled>Выберите жанр</option>
            <option v-for="g in genreOptions" :key="g" :value="g">{{ g }}</option>
          </select>
          <div class="flex items-center justify-center text-[#c8c7ca]/70">
            <IconsChevronDown class="w-[24px] h-[24px] -rotate-90" />
          </div>
        </div>

        <div class="flex flex-wrap gap-[10px]">
          <button
            v-for="g in visibleGenreChips"
            :key="g"
            type="button"
            class="px-[10px] py-[8px] rounded-[25px] bg-[#c8c7ca]/3 flex items-center gap-[5px]"
            @click="removeGenre(g)"
          >
            <span class="text-[13px] font-semibold font-['Montserrat'] text-[#c8c7ca]/70">{{ g }}</span>
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-[#c8c7ca]/50">
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
        <div class="text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat']">Год</div>
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
          class="w-[50px] px-[9px] py-[8px] rounded-[7px] bg-transparent border border-[#c8c7ca]/10 text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat'] outline-none"
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
          class="w-[51px] px-[9px] py-[8px] rounded-[7px] bg-transparent border border-[#c8c7ca]/10 text-[#c8c7ca] text-[14px] font-semibold font-['Montserrat'] outline-none"
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
          <span v-if="isTypeActive" class="w-[7px] h-[7px] rounded-full bg-[#b3de51]"></span>
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
          @click="selectedKind = selectedKind === option.value ? '' : option.value; applyFilters()"
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
</style>
