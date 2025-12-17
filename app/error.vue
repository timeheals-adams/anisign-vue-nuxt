<script setup lang="ts"></script>

<template>
  <LayoutReport />
  <LayoutHeader />
  <div class="flex mb-[80px] flex-col gap-10 justify-center items-center">
    <div class="flex gap-10 items-center">
      <p class="text-[270px] font-bold">4</p>
      <img
        class="max-w-[200px] h-[230px] rounded-full"
        src="https://media1.tenor.com/m/D--yGsQy2EsAAAAC/crying-girl-anime.gif"
        alt=""
      />
      <p class="text-[270px] font-bold">4</p>
    </div>
    <p>Cтраница не найдена</p>
    <NuxtLink class="px-[25px] py-[15px] bg-[#C8C7CA] text-black rounded-[12px] hover:opacity-60 duration-300 font-semibold" href="/">На главную</NuxtLink>
  </div>
  <LayoutFooter />
</template>
