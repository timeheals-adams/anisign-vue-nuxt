<template>
  <div
    class=" px-[3px] pt-[3px] pb-4 bg-[#101010] rounded-xl inline-flex flex-col justify-start items-center gap-px "
  >
    <div class="w-full h-80 px-3.5 py-4 rounded-tl-[10px] rounded-tr-[10px] flex flex-col justify-start items-start gap-2.5 relative overflow-hidden">
      <div class="absolute inset-0 rounded-tl-[10px] rounded-tr-[10px] overflow-hidden">
        <img
          src="https://www.goha.ru/s/A:BQ/Sx/phH86bcjui.jpg"
          alt="News image"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="absolute inset-0 bg-gradient-to-b from-[#101010]/50 to-[#101010] rounded-tl-[10px] rounded-tr-[10px]"></div>

      <div class="h-8 px-2 py-1.5 bg-[#c8c7ca]/20 rounded-3xl backdrop-blur-md inline-flex justify-start items-center gap-1 relative z-10">
        <div class="relative">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.9137 3.68799C10.6046 3.68824 12.9461 5.18288 14.15 7.38428C14.4072 7.85454 14.4071 8.42377 14.15 8.89404C12.9461 11.0954 10.6046 12.5901 7.9137 12.5903C5.22267 12.5903 2.88148 11.0954 1.67737 8.89404C1.42016 8.42371 1.42015 7.85461 1.67737 7.38428C2.8815 5.18297 5.22273 3.68799 7.9137 3.68799ZM7.9137 5.6665C6.54808 5.6665 5.44118 6.77357 5.44104 8.13916C5.44118 9.50475 6.54808 10.6118 7.9137 10.6118C9.279 10.6114 10.3862 9.50452 10.3864 8.13916C10.3862 6.7738 9.279 5.66688 7.9137 5.6665ZM7.9137 6.65479C8.73272 6.65516 9.39696 7.32008 9.39709 8.13916C9.39696 8.95824 8.73272 9.62219 7.9137 9.62256C7.09436 9.62256 6.42946 8.95847 6.42932 8.13916C6.42946 7.31985 7.09436 6.65479 7.9137 6.65479Z" fill="#C8C7CA" />
          </svg>
        </div>
        <div class="text-[#c8c7ca] text-xs font-semibold font-['Montserrat']">465</div>
      </div>
    </div>

    <div class="w-full px-6 flex flex-col justify-start items-start gap-5">
      <div class="w-full flex flex-col justify-start items-start gap-3.5">
        <h3 class="w-full text-[#c8c7ca] text-base font-semibold font-['Montserrat'] leading-relaxed">
          «Человек-бензопила: История Резе» стартовал в Японии, для гайдзинов есть трейлер
        </h3>
        <p class="w-full text-[#c8c7ca]/70 text-xs font-medium font-['Montserrat'] leading-relaxed line-clamp-3">
          Гарнт Манетафо, более известный как Gigguk, представил на YouTube собственное короткометражное аниме «Bâan: Граница взрослого мира» (Bâan -Otona no Kyoukai-), анонсированное в июле.....
        </p>
      </div>

      <div class="w-full h-px bg-[#d9d9d9]/5" />

      <div class="w-full flex justify-between items-center gap-4">
        <div class="flex justify-start items-center gap-2.5 flex-1 min-w-0">
          <div class="text-[#c8c7ca]/70 text-sm font-medium font-['Montserrat'] whitespace-nowrap">
            Сегодня в 12:00
          </div>
          <div>
            <svg width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.585327" y="0.313477" width="1" height="15" fill="#D9D9D9" fill-opacity="0.05" />
            </svg>
          </div>
          <div class="text-[#c8c7ca] text-sm font-medium font-['Montserrat'] truncate">
            Goha.ru
          </div>
        </div>

        <NuxtLink href="/news/article-slug"
          class="px-4 py-3.5 bg-[#C8C7CA]/[0.03] rounded-xl flex justify-center items-center gap-4 hover:bg-[#c8c7ca]/10 transition-colors duration-200"
        >
          <p class="text-[#c8c7ca]  text-xs font-semibold font-['Montserrat']">Открыть</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент статический: все пропсы и события удалены по требованию.
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>