<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
const slug = route.params.slug as string;

const character = {
  id: 145329,
  slug: "chisa-kotegawa",
  name_ru: "Тиса Котэгава",
  name_en: "Chisa Kotegawa",
  name_jp: "古手川 千紗",
  description: `Студентка первого курса университета «Идзу» и член клуба по дайвингу «Peek a Boo». Дочка Тосио Котэгавы и младшая сестра Нанаки, а также двоюродная сестра Иори Китахары. Умная, рассудительная, серьёзная и привлекательная девушка, страстно увлекающаяся дайвингом. По сравнению с другими членами «Peek a Boo», Тиса самая адекватная, поэтому редко участвует в пьянках клуба. Не интересуется романтикой, но часто привлекает парней своей красотой. Пытаясь предотвратить назойливые приставания и отомстить Иори, она представила его в качестве своего парня во время весеннего фестиваля. Они оба интересуются дайвингом, но пьяные выходки Иори вызывают в ней отвращение. Мечтает в будущем стать инструктором по дайвингу, поэтому часто помогает в семейном магазине «Grand Blue».`,
  image:
    "https://shikimori.one/uploads/poster/characters/145329/f2a2b7c87337d4b2497fb7133b9cb75a.jpeg",
};
</script>

<template>
  <LayoutReport />
  <LayoutHeader />
  <div class="container py-10  flex flex-col gap-10">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="max-w-[375px] shrink-0">
        <div class="relative rounded-xl overflow-hidden">
          <img
            :src="character.image"
            :alt="character.name_ru"
            class="w-full h-auto object-cover transition duration-500"
          />
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-6">
        <!-- Заголовок и имена -->
        <div class="flex flex-col gap-2">
          <h1 class="font-bold leading-tight text-4xl text-[#C8C7CA] font-['Montserrat']">
            {{ character.name_ru }}
          </h1>
          <div class="flex items-center gap-1 text-sm font-medium font-['Montserrat']">
            <span class="text-[#C8C7CA]/70">{{ character.name_en }}</span>
            <span v-if="character.name_jp" class="text-[#C8C7CA]/20">/</span>
            <span v-if="character.name_jp" class="text-[#C8C7CA]/70">{{ character.name_jp }}</span>
          </div>
        </div>

        <div class="h-px bg-[#C8C7CA]/10"></div>

        <!-- Блок описания -->
        <div class="flex flex-col gap-4">
          <h2 class="text-base font-semibold text-[#C8C7CA] font-['Montserrat']">Описание</h2>
          <p class="text-sm font-medium leading-relaxed text-[#C8C7CA]/70 font-['Montserrat']">
            Студентка первого курса университета «Идзу» и член клуба по дайвингу «Peek a Boo». Дочка 
            <span class="underline">Тосио Котэгавы</span>
            и младшая сестра <span class="underline">Нанаки</span>, а также двоюродная сестра <span class="underline">Иори Китахары</span>. Умная, рассудительная, серьёзная и привлекательная девушка, страстно увлекающаяся дайвингом. По сравнению с другими членами «Peek a Boo», Тиса самая адекватная, поэтому редко участвует в пьянках клуба. Не интересуется романтикой, но часто привлекает парней своей красотой. Пытаясь предотвратить назойливые приставания и отомстить <span class="underline">Иори</span>, она представила его в качестве своего парня во время весеннего фестиваля. Они оба интересуются дайвингом, но пьяные выходки <span class="underline">Иори</span> вызывают в ней отвращение. Мечтает в будущем стать инструктором по дайвингу, поэтому часто помогает в семейном магазине «Grand Blue».
          </p>
        </div>
        <div class="h-px bg-[#C8C7CA]/10"></div>
        <div class="flex flex-col gap-4">
          <h2 class="text-base font-semibold text-[#C8C7CA] font-['Montserrat']">Описание</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            
          </div>
        </div>

      </div>
    </div>
  </div>
  <LayoutFooter />
</template>

<style scoped></style>
