<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col lg:flex-row items-start justify-between gap-5">
    <!-- Left side - Poster skeleton -->
    <div class="flex flex-col sm:flex-row gap-5 items-start w-full lg:w-auto">
      <div class="flex flex-col gap-[30px] w-full sm:w-[315px]">
        <!-- Poster skeleton -->
        <div class="aspect-[315/454] sm:h-[454px] overflow-hidden rounded-[17px] relative w-full bg-white/5 animate-pulse">
        </div>

        <!-- Action buttons skeleton -->
        <div class="flex flex-col gap-[10px] w-full">
          <div class="h-[65px] bg-white/5 rounded-[14px] animate-pulse"></div>
          <div class="h-[65px] bg-white/5 rounded-[14px] animate-pulse"></div>
        </div>
      </div>

      <!-- Main content skeleton -->
      <div class="flex flex-col gap-[27px] w-full lg:w-[830px]">
        <!-- Next episode banner skeleton -->
        <div class="h-[58px] bg-white/5 rounded-[12px] animate-pulse"></div>

        <!-- Title skeleton -->
        <div class="flex flex-col gap-[10px]">
          <div class="h-8 bg-white/5 rounded w-3/4 animate-pulse"></div>
          <div class="h-4 bg-white/5 rounded w-1/2 animate-pulse"></div>
        </div>

        <!-- Genres skeleton -->
        <div class="flex flex-wrap gap-[10px]">
          <div class="h-[43px] w-24 bg-white/5 rounded-[38px] animate-pulse"></div>
          <div class="h-[43px] w-32 bg-white/5 rounded-[38px] animate-pulse"></div>
          <div class="h-[43px] w-28 bg-white/5 rounded-[38px] animate-pulse"></div>
          <div class="h-[43px] w-36 bg-white/5 rounded-[38px] animate-pulse"></div>
        </div>

        <!-- Description skeleton -->
        <div class="flex flex-col gap-2">
          <div class="h-4 bg-white/5 rounded w-full animate-pulse"></div>
          <div class="h-4 bg-white/5 rounded w-full animate-pulse"></div>
          <div class="h-4 bg-white/5 rounded w-5/6 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>
