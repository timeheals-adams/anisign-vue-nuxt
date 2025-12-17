<script setup lang="ts">
import SearchIcon from '../../icons/Search.vue'
</script>

<template>
  <div class="container">
    <div class="flex flex-col mb-[50px]">
        <h1 class="text-[40px] font-bold">Cписок персонажей</h1>
        <p class="opacity-70 text-[14px]">Полный каталог доступных аниме. Используйте фильтры и поиск, чтобы найти то, что интересно.</p>
    </div>
    <div class="mb-[50px] self-stretch h-[50px] px-[15px] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 inline-flex items-center gap-2.5 w-full">
      <SearchIcon class="w-4 h-4 text-[#C8C7CA]" />
      <span class="block h-[15px] w-px bg-[#C8C7CA]/10" aria-hidden="true"></span>
      <input
        type="text"
        placeholder="Поиск..."
        class="bg-transparent border-0 focus:outline-none focus:ring-0 text-sm font-medium placeholder-[#C8C7CA] text-[#C8C7CA] flex-1 min-w-0 font-['Montserrat']"
      />
    </div>
    <div class="grid grid-cols-6 gap-10">
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
        <GeneralCharactersCard /> 
    </div>
  </div>
</template>
