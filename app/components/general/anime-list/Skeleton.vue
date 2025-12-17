<script setup lang="ts">
// Количество скелетонов для отображения
defineProps<{
  count?: number;
}>();
</script>

<template>
  <div class="grid gap-2 lg:gap-[20px] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
    <div 
      v-for="i in (count ?? 12)" 
      :key="i" 
      class="flex flex-col gap-2 animate-pulse"
    >
      <!-- Постер скелетон -->
      <div class="relative overflow-hidden rounded-[14px] aspect-[225/318] bg-white/5">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer"></div>
      </div>
      <!-- Текст скелетон -->
      <div class="flex flex-col gap-2">
        <div class="h-4 bg-white/5 rounded w-3/4"></div>
        <div class="h-3 bg-white/5 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
