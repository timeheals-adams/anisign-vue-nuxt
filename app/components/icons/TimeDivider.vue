<script setup lang="ts">
interface Props {
  width?: number
  height?: number
  opacity?: number
}

withDefaults(defineProps<Props>(), {
  width: 2,
  height: 11,
  opacity: 0.1
})
</script>

<template>
  <svg 
    :width="width" 
    :height="height" 
    :viewBox="`0 0 ${width} ${height}`" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect 
      x="0.5" 
      y="0.5" 
      :width="width - 1" 
      :height="height - 1" 
      fill="#D9D9D9" 
      :fill-opacity="opacity"
    />
  </svg>
</template>