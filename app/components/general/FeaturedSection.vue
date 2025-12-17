<script setup lang="ts"></script>

<template>
  <div class="container flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-6">
      <a href="#"
        class="relative flex flex-col justify-between rounded-xl overflow-hidden min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] group md:col-span-6"
      >
      <div class="absolute inset-0">
        <NuxtImg
          src="https://helios-i.mashable.com/imagery/articles/00yoIviDSDi3aVSBSfwPzie/hero-image.fill.size_1248x702.v1752525551.jpg"
          alt="Изображение"
          class="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
          format="webp"
          quality="70"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-l from-[#0c0c0c]/60 to-[#0c0c0c]/95"
        />
      </div>
      <div
        class="relative z-10 p-6 md:p-7 flex flex-col h-full justify-between"
      >
        <div class="flex items-center gap-2">
          <span
            class="h-7 px-2.5 flex items-center rounded-md outline outline-1 outline-[#c8c7ca]/10 text-xs font-semibold text-[#c8c7ca] tracking-wide"
            >ПОПУЛЯРНАЯ</span
          >
          <span
            class="h-7 px-2.5 flex items-center rounded-md bg-[#fde5b9]/10 text-xs font-semibold text-[#fde5b9]"
            >9.2</span
          >
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-white text-xl font-bold leading-tight">
              Гатиакута
            </h3>
            <p class="text-white/70 text-sm font-medium leading-tight">
              Gachiakuta
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="h-7 px-2.5 flex items-center rounded-md bg-[#c8c7ca] text-xs font-semibold text-[#0c0c0c]"
            >
              ТВ-Сериал
            </span>
            <span class="w-px h-2 bg-white/10" />
            <div class="flex items-center gap-1.5">
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Сёнен</span
              >
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Экшен</span
              >
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Фэнтези</span
              >
            </div>
          </div>
        </div>
      </div>
    </a>

    <a href="#"
      class="relative flex flex-col justify-between rounded-xl min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] overflow-hidden group md:col-span-4"
    >
      <div class="absolute inset-0">
        <NuxtImg
          src="https://www.kino-teatr.ru/video/44669/start.jpg"
          alt="Изображение"
          class="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
          format="webp"
          quality="70"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 33vw"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-l from-[#0c0c0c]/60 to-[#0c0c0c]/95"
        />
      </div>
      <div
        class="relative z-10 p-6 md:p-7 flex flex-col h-full justify-between"
      >
        <div class="flex items-end justify-between gap-4">
          <div class="flex items-center gap-2">
            <span
              class="h-7 px-2.5 flex items-center rounded-md outline outline-1 outline-[#c8c7ca]/10 text-xs font-semibold text-[#c8c7ca]"
              >ОНГОИНГИ</span
            >
            <span
              class="h-7 px-2.5 flex items-center rounded-md bg-[#fde5b9]/10 text-xs font-semibold text-[#fde5b9]"
              >9.2</span
            >
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="h-7 w-7 flex items-center justify-center rounded-md outline outline-1 outline-[#c8c7ca]/10 bg-[#c8c7ca]/5 text-[#c8c7ca] transition-colors hover:bg-[#c8c7ca]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde5b9]/40"
              aria-label="Предыдущий"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6 6L3.53033 8.46967C3.23744 8.76256 3.23744 9.23744 3.53033 9.53033L6 12"
                  stroke="#D9D9D9"
                  stroke-width="1.125"
                  stroke-linecap="round"
                />
                <path
                  d="M3.75 9L14.25 9"
                  stroke="#D9D9D9"
                  stroke-width="1.125"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              class="h-7 w-7 flex items-center justify-center rounded-md outline outline-1 outline-[#c8c7ca]/10 bg-[#c8c7ca] text-[#0c0c0c] font-medium transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fde5b9]/40"
              aria-label="Следующий"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
              >
                <path
                  d="M9 7L11.4697 4.53033C11.7626 4.23744 11.7626 3.76256 11.4697 3.46967L9 1"
                  stroke="#D9D9D9"
                  stroke-width="1.125"
                  stroke-linecap="round"
                />
                <path
                  d="M11.25 4L0.75 4"
                  stroke="#D9D9D9"
                  stroke-width="1.125"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 max-w-xs">
          <div class="flex flex-col gap-2">
            <h3 class="text-white text-xl font-bold leading-tight">
              Дандадан 2
            </h3>
            <p class="text-white/70 text-sm font-medium leading-tight">
              Dandadan 2
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="h-7 px-2.5 flex items-center rounded-md bg-[#c8c7ca] text-xs font-semibold text-[#0c0c0c]"
            >
              ТВ-Сериал
            </span>
            <span class="w-px h-2 bg-white/10" />
            <div class="flex items-center gap-1.5">
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Сёнен</span
              >
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Экшен</span
              >
              <span
                class="px-1.5 py-1 rounded-md bg-[#c8c7ca]/5 text-[#c8c7ca] text-xs font-medium leading-tight backdrop-blur-[2px]"
                >Фэнтези</span
              >
            </div>
          </div>
        </div>
      </div>
    </a>

    <a href="#"
      class="relative flex flex-col justify-end rounded-xl text-black min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] overflow-hidden group md:col-span-2"
    >
      <div class="absolute inset-0">
        <NuxtImg
          src="https://i.ibb.co/C3f4XnWV/lib.png"
          alt="Изображение"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          format="webp"
          quality="70"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 20vw, 17vw"
          loading="lazy"
        />
      </div>
      <div class="relative z-10 p-6 md:p-7">
        <div class="flex items-end justify-between gap-4">
          <p class="text-sm font-semibold leading-snug">
            Перейти в<br />Библиотеку
          </p>
          <span class="text-3xl font-extrabold leading-none">10К</span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped></style>
