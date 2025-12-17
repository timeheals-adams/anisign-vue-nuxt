<script setup lang="ts">
</script>

<template>
    <div class="bg-[#C8C7CA] px-5">
        <div class="container py-[15px] flex justify-between gap-4 items-center">
            <p class="text-[14px] text-[#0C0C0C] font-semibold">Сайт находиться в бета версии, если вам удалось найти баг обратитесь в поддержку</p>
            <div class="flex gap-2">
                <button class="px-[15px] h-[37px] flex items-center py-[10px] inline bg-[#0c0c0c] text-[14px] rounded-[10px] color-[#cdcdcd] hover:opacity-70 transition-all duration-300">Репорт</button>
                <button class="hover:opacity-70 transition-all duration-300">
                    <IconsCloseReport />
                </button>
            </div>
        </div>
    </div>
</template>