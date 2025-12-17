<script setup lang="ts">
interface InfoItem {
  label: string
  value: string
}

interface Props {
  info: InfoItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-[10px] w-full lg:w-[342px]">
    <div
      v-for="(item, index) in info"
      :key="index"
      class="bg-[rgba(200,199,202,0.05)] flex h-auto min-h-[50px] items-center justify-between gap-3 px-5 py-[15px] rounded-[10px] w-full"
    >
      <span class="text-sm font-medium text-[#A5A5A5] leading-[21.4px]">
        {{ item.label }}
      </span>
      <span class="text-sm font-semibold text-[#DADADA] leading-[21.4px] text-right">
        {{ item.value }}
      </span>
    </div>
  </div>
</template>
