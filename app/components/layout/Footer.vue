<script setup lang="ts">
import VerticalDivider from '~/components/icons/VerticalDivider.vue'
import Lightning from '~/components/icons/Lightning.vue'
</script>

<template>
  <footer class="bg-[#0c0c0c] border-t border-[#c8c7ca]/5 px-5 py-12">
    <div class="container">
      <!-- Основной контент футера -->
      <div class="flex flex-col lg:flex-row justify-between gap-8 mb-12">
        <!-- Логотип и описание -->
        <div class="lg:max-w-[400px]">
          <div class="flex items-center gap-[15px] mb-6">
            <h2 class="text-white font-semibold text-xl">Anisign</h2>
          </div>
          <p class="text-[#aeaeae] text-sm leading-relaxed mb-6">
            Лучшие аниме сериалы и фильмы в отличном качестве. Огромная коллекция контента для истинных ценителей японской анимации.
          </p>
          <div class="flex items-center gap-[5px] cursor-pointer group">
            <Lightning />
            <span class="text-[#b3de51] text-sm font-medium group-hover:text-[#9ac444] transition-colors">
              Премиум подписка
            </span>
          </div>
        </div>

        <!-- Навигационные колонки -->
        <div class="flex flex-col md:flex-row gap-10     lg:gap-20">
          <!-- Каталог -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-4">Каталог</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Список аниме</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Топ аниме</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Новинки</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Фильмы</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Персонажи</a></li>
            </ul>
          </div>

          <!-- Жанры -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-4">Жанры</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Экшен</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Романтика</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Фэнтези</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Комедия</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Драма</a></li>
            </ul>
          </div>

          <!-- Информация -->
          <div>
            <h3 class="text-white font-semibold text-sm mb-4">Информация</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">О проекте</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Новости</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Контакты</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">Поддержка</a></li>
              <li><a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#c8c7ca]/5 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Копирайт -->
          <div class="flex items-center gap-4">
            <p class="text-[#aeaeae] text-sm">
              © 2025 Anisign. Все права защищены.
            </p>
            <VerticalDivider />
            <p class="text-[#aeaeae] text-sm">
              Сделано с ❤️ для фанатов аниме
            </p>
          </div>

          <!-- Социальные сети и ссылки -->
          <div class="flex items-center gap-6">
            <a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
            <VerticalDivider />
            <a href="#" class="text-[#aeaeae] text-sm hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <VerticalDivider />
            <div class="flex gap-4">
              <a href="#" class="text-[#aeaeae] hover:text-[#b3de51] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-[#aeaeae] hover:text-[#b3de51] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-[#aeaeae] hover:text-[#b3de51] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.246.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>