<script setup lang="ts">
import { ref, watch } from 'vue';

// Поисковый запрос (локальный для инпута)
const inputQuery = ref('');

// Chips on the left side (popular filters)
const chips = ref<string[]>([
    'Популярные онгоинги',
    'Исекаи',
]);

// Props для получения текущего запроса извне
const props = defineProps<{
  modelValue?: string;
}>();

// Emit event
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();

// Синхронизация с внешним значением
watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== inputQuery.value) {
    inputQuery.value = val;
  }
}, { immediate: true });

// Отправка при каждом изменении ввода
watch(inputQuery, (newVal) => {
  emit('update:modelValue', newVal);
});

function clear() {
  inputQuery.value = '';
  emit('update:modelValue', '');
  emit('clear');
}

function toggleChip(label: string) {
    // Placeholder for future interactivity (selecting a chip could append to query or apply a filter)
    // For now we just append label if not already present
    if (!inputQuery.value.toLowerCase().includes(label.toLowerCase())) {
        inputQuery.value = inputQuery.value ? `${inputQuery.value} ${label}` : label;
    }
}
</script>

<template>
    <!-- Wrapper WITHOUT fixed width -->
    <div class="w-full inline-flex flex-col gap-3.5">
        <!-- Search bar -->
        <div
            class="w-full h-12 px-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 flex items-center gap-2.5 bg-white/0"
        >
            <IconsSearchIcon class="shrink-0 text-white/70" />
            <!-- Thin divider -->
            <span class="w-px h-4 bg-[#c8c7ca]/10" />
            <div class="flex-1 flex items-center">
                <input
                    v-model="inputQuery"
                    type="text"
                    placeholder="Поиск по названию (мин. 2 символа)..."
                    class="w-full bg-transparent outline-none border-none text-sm font-medium text-[#c8c7ca] placeholder:text-[#c8c7ca]/70 font-['Montserrat']"
                />
            </div>
            <!-- Кнопка очистки -->
            <button
              v-if="inputQuery.length > 0"
              type="button"
              class="shrink-0 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors"
              @click="clear"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
        </div>

        <!-- Chips + presets row -->
        <div class="w-full flex flex-wrap justify-between items-center gap-3">
            <!-- Left chips -->
            <div class="flex flex-wrap items-center gap-2.5">
                <button
                    v-for="label in chips"
                    :key="label"
                    type="button"
                    class="px-3.5 py-2.5 rounded-[38px] outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/5 text-xs font-medium font-['Montserrat'] text-[#c8c7ca] hover:bg-[#c8c7ca]/5 transition-colors"
                    @click="toggleChip(label)"
                >
                    {{ label }}
                </button>
            </div>

            <!-- Right side presets button group -->
            <div class="flex items-center gap-2.5">
                <IconsVerticalDivider class="hidden md:block h-[18px] w-px" />
                <button
                    class="px-3.5 py-2.5 bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 rounded-[10px] text-sm font-medium font-['Montserrat'] text-[#c8c7ca] transition-colors"
                >
                    Прессеты
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* You can move these to a central place if reused elsewhere */
input::-webkit-search-cancel-button { display: none; }
</style>