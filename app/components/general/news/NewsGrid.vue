<script setup lang="ts">
// Статическая сетка карточек без пропсов / данных
const placeholderCards = Array.from({ length: 8 })
</script>

<template>
  <div class="container">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-[50px] gap-6">
      <div class="flex flex-col max-w-2xl">
        <h1 class="text-[32px] md:text-[40px] font-bold leading-tight">Свежие новости</h1>
        <p class="opacity-70 text-[14px] md:text-[16px] mt-2">
          Сейчас здесь только вёрстка без реальных данных. Позже появится динамический контент.
        </p>
      </div>
      <NuxtLink
        class="bg-[#C8C7CA] px-[20px] py-[15px] text-[#0C0C0C] font-semibold text-[14px] rounded-[12px] hover:opacity-70 duration-300 whitespace-nowrap"
        href="https://www.goha.ru/"
        target="_blank"
      >Перейти на Goha.ru</NuxtLink>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
      <GeneralNewsCard v-for="(_, i) in placeholderCards" :key="i" />
    </div>
  </div>
</template>
