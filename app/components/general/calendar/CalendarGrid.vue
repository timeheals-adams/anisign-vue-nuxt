<script setup lang="ts">
  import Info from '~/components/icons/Info.vue'
  import AnimeCard from './CalendarCard.vue'
</script>

<template>
  <div class="container flex justify-between items-start flex-wrap gap-4">
    <!-- Заголовок календаря -->
    <div class="flex-shrink-0">
      <h2 class="text-[#c8c7ca] text-xl font-bold font-['Montserrat'] text-center lg:text-left">
        Календарь <br> выхода серий
      </h2>
    </div>
    
    <!-- Блок с кнопками -->
    <div class="flex justify-start items-center gap-[15px] flex-wrap sm:flex-nowrap">
      <!-- Информационное уведомление -->
      <div class="h-[47px] p-[15px] rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#fde5b9]/10 flex justify-center items-center gap-2.5 min-w-0">
        <div class="flex-shrink-0">
          <Info :size="24" />
        </div>
        <div class="text-[#fde5b9]/70 text-sm font-medium font-['Montserrat'] whitespace-nowrap">
          Время выхода серий в Японии!
        </div>
      </div>
      
      <!-- Кнопка "Перейти" -->
      <div class="p-[15px] bg-[#c8c7ca]/5 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#c8c7ca]/10 transition-colors duration-200">
        <div class="text-[#c8c7ca] text-sm font-medium font-['Montserrat'] whitespace-nowrap">
          Перейти
        </div>
      </div>
    </div>
  </div>
  
  <!-- Сетка карточек аниме -->
  <div class="container mx-auto py-8">
    <div class="flex justify-between ">
      <GeneralCalendarCard 
        title="Гатиакута"
        date="19.09"
        time="23:00"
        :episode="190"
      />
      <GeneralCalendarCard 
        title="Магическая битва"
        date="20.09"
        time="22:30"
        :episode="25"
      />
      <GeneralCalendarCard 
        title="Атака титанов"
        date="21.09"
        time="23:30"
        :episode="75"
      />
      <GeneralCalendarCard 
        title="Наруто"
        date="22.09"
        time="21:00"
        :episode="720"
      />
      <GeneralCalendarCard 
        title="Наруто"
        date="22.09"
        time="21:00"
        :episode="720"
      />
    </div>
  </div>

  <div class="container h-[5px] rounded-full w-full bg-[#C8C7CA]/[0.1]">
    <div class="bg-[#C8C7CA] rounded-full h-[5px] w-[100px]">

    </div>
  </div>
</template>

<style scoped>
/* Дополнительные стили для адаптивности */
@media (max-width: 640px) {
  .flex-wrap {
    justify-content: center;
  }
}
</style>