<script setup lang="ts"></script>

<template>
  <button class="flex flex-col hover:opacity-70 duration-300">
    <div class="calender-top h-[310px] py-[5px] px-[30px] flex items-end">
        <p class="max-w-[240px] text-[14px] font-semibold text-start">Благоухающий цветок расцветает с достоинством</p>
    </div>
    <div class="flex gap-[7px] justify-between px-[30px] py-[25px] bg-[#c8c7ca]/[0.02] rounded-rb-[10px] rounded-lb-[10px]">
        <div class="flex text-[14px] border border-[#c8c7ca]/[0.05] px-[16px] py-[13px] rounded-[10px] gap-[15px] items-center">
          <p>19.09</p>
          <div class="w-[1px] h-[10px] bg-[#c8c7ca]/10"></div>
          <p>23:00</p>
        </div>
        <div>
          <div class="flex text-[14px] border border-[#c8c7ca]/[0.05] px-[16px] py-[13px] rounded-[10px] gap-[15px] items-center">
            <p>20 Серия</p>
          </div>
        </div>
    </div>
  </button>
</template>

<style>
    .calender-top {
      border-radius: 12px 12px 0 0;
      background: linear-gradient(180deg, rgba(16, 16, 16, 0.00) 0%, #101010 100%), url('https://shikimori.one/uploads/poster/animes/59845/8409d8b6f79e81fb487348065e8b549c.jpeg') lightgray 50% / cover no-repeat;
    }
</style>