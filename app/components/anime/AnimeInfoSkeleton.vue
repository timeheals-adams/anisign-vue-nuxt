<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-[10px] w-full lg:w-[342px]">
    <div
      v-for="i in 6"
      :key="i"
      class="bg-[rgba(200,199,202,0.05)] h-[50px] rounded-[10px] w-full animate-pulse"
    ></div>
  </div>
</template>
