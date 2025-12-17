<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VerticalDivider from '~/components/icons/VerticalDivider.vue'
import ShortDivider from '~/components/icons/ShortDivider.vue'
import Lightning from '~/components/icons/Lightning.vue'
import Search from '~/components/icons/Search.vue'
// Lazy import modal component to avoid SSR issues until needed
const showSearch = ref(false)
import SearchModal from '../general/SearchModal.vue'

function openSearch() {
  showSearch.value = true
}
function closeSearch() {
  showSearch.value = false
}
function toggleSearch() {
  showSearch.value = !showSearch.value
}

function onKey(e: KeyboardEvent) {
  // CTRL+K (or CMD+K) opens search
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openSearch()
  } else if (e.key === 'Escape' && showSearch.value) {
    closeSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="h-[100px] px-5 py-6 bg-[#0c0c0c] border-b border-[#c8c7ca]/5 flex justify-center items-center">
    <div class="container flex justify-between items-center">
      <!-- Левая часть -->
      <div class="flex justify-start items-center gap-6 lg:gap-[25px]">
        <!-- Логотип -->
        <NuxtLink href="/" class="flex justify-start items-center gap-[15px]">
          <h1 class="text-white font-semibold">
            Anisign
          </h1>
        </NuxtLink>
        
        <!-- Разделитель -->
        <VerticalDivider />
        
        <!-- Навигация -->
        <div class="hidden lg:flex justify-start items-center gap-10">
          <NuxtLink href="/anime" class="text-center justify-center text-[#aeaeae] text-sm font-semibold leading-tight hover:text-white transition-colors cursor-pointer">
            Список аниме
          </NuxtLink>
          <NuxtLink href="/characters" class="text-center justify-center text-[#aeaeae] text-sm font-semibold leading-tight hover:text-white transition-colors cursor-pointer">
            Персонажи
          </NuxtLink>
          <NuxtLink href="/news" class="text-center justify-center text-[#aeaeae] text-sm font-semibold leading-tight hover:text-white transition-colors cursor-pointer">
            Новости
          </NuxtLink>
        </div>
        
        <!-- Второй разделитель -->
        <div class="hidden lg:block">
          <ShortDivider />
        </div>
        
        <!-- Подписка -->
        <div class="hidden md:flex justify-center items-center gap-[5px] cursor-pointer group">
          <Lightning />
          <div class="justify-start text-[#b3de51] text-sm font-medium  group-hover:text-[#9ac444] transition-colors">
            Подписка
          </div>
        </div>
      </div>
      
      <!-- Правая часть -->
      <div class="flex justify-start items-center gap-5">
        <!-- Поиск -->
        <button @click="openSearch" class="hidden sm:flex w-full sm:w-[251px] h-[50px] p-[15px] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 justify-between items-center">
          <div class="flex justify-start items-center gap-2.5">
            <Search />
            <ShortDivider />
            <div class="justify-start text-[#c8c7ca] text-sm font-medium ">
              Поиск...
            </div>
          </div>
          <div class="p-1 bg-[#c8c7ca] rounded shadow-[0px_2px_0px_0px_rgba(123,123,123,1.00)] flex justify-center items-center gap-2.5">
            <div class="justify-start text-[#0c0c0c] text-[10px] font-medium ">
              CTRL+K
            </div>
          </div>
        </button>

  <!-- Modal mount -->
  <SearchModal v-if="showSearch" @close="closeSearch" />
        
        <div class="flex justify-start items-center gap-[15px]">
          <!-- Разделитель -->
          <div class="hidden sm:block">
            <VerticalDivider />
          </div>
          
          <!-- Кнопки входа -->
          <div class="flex gap-2">
            <NuxtLink to="/auth/login" class="px-3 sm:px-5 py-3.5 bg-[#c8c7ca]/0 rounded-xl flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-[#c8c7ca]/10 transition-colors">
              <div class="text-center justify-center text-[#c8c7ca] text-sm font-semibold  leading-tight">
                Войти
              </div>
            </NuxtLink>
            <NuxtLink to="/auth/login" class="h-[50px] px-3 sm:px-5 py-3.5 bg-[#c8c7ca] rounded-xl flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-[#b3b3b3] transition-colors">
              <div class="text-center justify-center text-[#060606] text-sm font-semibold  leading-tight">
                Регистрация
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>