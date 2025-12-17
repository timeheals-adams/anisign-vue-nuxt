<template>
  <LayoutReport />
  <LayoutHeader />
  <div class="mt-[50px] mb-[100px] px-5">
    <div class="container mx-auto">
      <div class="flex justify-start items-start gap-12 flex-col xl:flex-row">
        <div
          class="w-full xl:w-[985px] flex flex-col justify-start items-start gap-11"
        >
          <div class="w-full flex flex-col justify-start items-end gap-7">
            <div
              class="w-full flex justify-between items-start gap-8 flex-col lg:flex-row lg:items-center"
            >
              <h1
                class="flex-1 text-[#c8c7ca] text-xl font-bold font-['Montserrat'] leading-tight"
              >
                {{
                  article.title ||
                  "Этот ваш Gigguk выложил на YouTube свое аниме «Baan: Граница взрослого мира»"
                }}
              </h1>
              <a
                :href="article.originalUrl"
                target="_blank"
                class="px-5 py-3.5 bg-[#c8c7ca]/10 hover:bg-[#c8c7ca]/20 rounded-xl flex justify-center items-center gap-2.5 transition-colors duration-200 shrink-0"
              >
                <span
                  class="text-[#c8c7ca] text-xs font-semibold font-['Montserrat']"
                  >Перейти на {{ article.source || "Goha.ru" }}</span
                >
              </a>
            </div>
            <img
              class="w-full h-96 object-cover opacity-70 rounded-xl"
              :src="
                article.heroImage ||
                'https://i.ytimg.com/vi/V-P3HWXGYm4/maxresdefault.jpg'
              "
              :alt="article.title"
            />
          </div>

          <div
            class="w-full text-[#c8c7ca] text-base font-medium font-['Montserrat'] leading-relaxed"
          >
            {{
              article.content?.[0] ||
              "Официальный сайт аниме-адаптации манги Dandadan объявил о зеленом свете для производства третьего сезона. Анонс сопровождался специальным постером после релиза финального эпизода второго сезона. Студия Science SARU, ответственная за проект, радует фанатов: первый сезон из 12 серий транслировался осенью 2024 года, а второй стартовал 4 июля и завершился вчера."
            }}
          </div>

          <img
            v-if="article.contentImages?.[0]"
            class="w-full h-auto max-h-[554px] object-cover opacity-70 rounded-3xl"
            :src="
              article.contentImages[0] ||
              'https://i.ytimg.com/vi/V-P3HWXGYm4/maxresdefault.jpg'
            "
            :alt="`${article.title} - изображение 1`"
          />

          <div
            v-if="article.content?.[1]"
            class="w-full text-[#c8c7ca] text-base font-medium font-['Montserrat'] leading-relaxed"
          >
            {{
              article.content[1] ||
              "Манга Dandadan в жанре сверхъестественного экшен-приключения начала публиковаться в веб-журнале Shounen Jump+ в апреле 2021 года. Shueisha выпустила печатную версию 20 тома 4 июля, а общий тираж превысил 10 миллионов копий."
            }}
          </div>

          <div
            v-if="article.videoUrl"
            class="w-full h-[553px] bg-[#0c0c0c]/60 rounded-3xl flex justify-center items-center cursor-pointer hover:bg-[#0c0c0c]/80 transition-colors duration-200"
            @click="playVideo"
          >
            <div class="w-16 h-16 relative">
              <svg
                width="66"
                height="65"
                viewBox="0 0 66 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 0.3125C50.8112 0.3125 65.25 14.7513 65.25 32.5625C65.25 50.3737 50.8112 64.8125 33 64.8125C15.1888 64.8125 0.75 50.3737 0.75 32.5625C0.75 14.7513 15.1888 0.3125 33 0.3125ZM33.3789 22.1104C29.6906 19.6515 24.75 22.2958 24.75 26.7285V38.3965C24.7502 42.8291 29.6907 45.4725 33.3789 43.0137L42.1299 37.1807C45.4249 34.9839 45.4248 30.1412 42.1299 27.9443L33.3789 22.1104Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="hidden xl:block w-px h-[1915px] bg-[#d9d9d9]/5" />

        <div
          class="xl:w-[513px] flex flex-col justify-start items-start gap-7"
        >
          <div class="opacity-60 hover:opacity-100 duration-300"><GeneralNewsCard /></div>
          <div class="opacity-60 hover:opacity-100 duration-300"><GeneralNewsCard /></div>
          <div class="opacity-60 hover:opacity-100 duration-300"><GeneralNewsCard /></div>
        </div>
      </div>
    </div>
  </div>
  <LayoutFooter />
</template>

<script setup lang="ts">
interface Article {
  title: string;
  content: string[];
  heroImage: string;
  contentImages: string[];
  videoUrl?: string;
  originalUrl: string;
  source: string;
  publishDate: string;
  author: string;
}


const route = useRoute();

// slug доступен для будущего API (пока не используется)
const slug = route.params.slug as string;

// Моковые данные для демонстрации (в реальном приложении здесь будет API запрос)
const article = ref<Article>({
  title:
    "Этот ваш Gigguk выложил на YouTube свое аниме «Baan: Граница взрослого мира»",
  content: [
    "Официальный сайт аниме-адаптации манги Dandadan объявил о зеленом свете для производства третьего сезона. Анонс сопровождался специальным постером после релиза финального эпизода второго сезона. Студия Science SARU, ответственная за проект, радует фанатов: первый сезон из 12 серий транслировался осенью 2024 года, а второй стартовал 4 июля и завершился вчера.",
    "Манга Dandadan в жанре сверхъестественного экшен-приключения начала публиковаться в веб-журнале Shounen Jump+ в апреле 2021 года. Shueisha выпустила печатную версию 20 тома 4 июля, а общий тираж превысил 10 миллионов копий.",
  ],
  heroImage: "https://i.ytimg.com/vi/V-P3HWXGYm4/maxresdefault.jpg",
  contentImages: ["https://i.ytimg.com/vi/V-P3HWXGYm4/maxresdefault.jpg"],
  videoUrl: "https://youtube.com/watch?v=V-P3HWXGYm4",
  originalUrl: "https://goha.ru",
  source: "Goha.ru",
  publishDate: "Сегодня в 12:00",
  author: "Редакция Goha.ru",
});

// Функции
const playVideo = () => {
  if (article.value.videoUrl) {
    window.open(article.value.videoUrl, "_blank");
  }
};

// SEO метаданные
useHead({
  title: () => article.value.title,
  meta: [
    {
      name: "description",
      content: () => article.value.content?.[0]?.substring(0, 155) || "",
    },
    { property: "og:title", content: () => article.value.title },
    {
      property: "og:description",
      content: () => article.value.content?.[0]?.substring(0, 155) || "",
    },
    { property: "og:image", content: () => article.value.heroImage },
    { property: "og:type", content: "article" },
  ],
});

// В реальном приложении здесь был бы запрос к API
// onMounted(async () => {
//   try {
//     const response = await $fetch(`/api/news/${slug}`)
//     article.value = response.article
//     relatedNews.value = response.relatedNews
//   } catch (error) {
//     throw createError({ statusCode: 404, statusMessage: 'Новость не найдена' })
//   }
// })
</script>
