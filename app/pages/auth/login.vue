<template>
  <div class="relative size-full bg-[#0c0c0c] min-h-screen overflow-hidden flex items-center justify-end">
    <!-- Background images layer -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('http://localhost:3845/assets/41a1b2e68ff59a280ae4ae8c952b6b54f882df10.png')">
        <div class="absolute inset-0 bg-[rgba(4,4,4,0.8)]" />
      </div>
    </div>

    <!-- Second background layer with blur -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('http://localhost:3845/assets/bdbd46ebda248fdda5bcc10b8d231dd0e44dd8e7.png')">
        <div class="absolute inset-0 bg-[rgba(12,12,12,0.7)]" />
      </div>

      <!-- Logo badge -->
      <div class="absolute left-4 sm:left-8 lg:left-[60px] top-4 sm:top-8 lg:top-[60px] backdrop-blur-[17.75px] bg-[rgba(255,255,255,0.2)] rounded-[40px] flex items-center gap-[10px] pl-[10px] pr-[20px] py-[10px]">
        <div class="relative size-[34px] rounded-[52.456px] overflow-hidden">
          <img src="http://localhost:3845/assets/2ed54e4b31c5b0af2de87d88fa13a382ae363b45.png" alt="" class="absolute inset-0 size-full object-cover" />
        </div>
        <div class="font-semibold text-[14px] text-white opacity-80 text-nowrap">
          Anisign
        </div>
      </div>

      <!-- Quote at bottom -->
      <div class="hidden lg:flex absolute left-4 sm:left-8 lg:left-[60px] bottom-4 sm:bottom-8 lg:bottom-[60px] flex-col gap-[10px]">
        <div class="font-extrabold text-[18px] sm:text-[24px] text-[#dededf]">
          Настоящая сила приходит изнутри
        </div>
        <div class="font-semibold text-[14px] sm:text-[16px] text-[#a4a4a4]">
          Гоку («Dragon Ball»)
        </div>
      </div>
    </div>

    <!-- Auth form card -->
    <Motion
      :animate="{ 
        scale: isRegistering ? 1.01 : 1,
      }"
      :transition="{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 40,
        duration: 0.8
      }"
      class="relative z-10 bg-[#0c0c0c] rounded-[24px] p-6 sm:p-8 lg:p-[50px] w-full min-w-[492px] max-w-[492px] ml-4 sm:ml-6 lg:ml-0 mr-4 sm:mr-6 lg:mr-[175px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
    >
      <div class="relative">
        <AnimatePresence mode="wait">
          <!-- Login Form -->
          <Motion
            v-if="!isRegistering"
            key="login"
            :initial="{ opacity: 0, x: 50 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -50 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
            class="flex flex-col gap-6 sm:gap-[35px] w-full"
          >
            <!-- Header -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex items-center justify-between w-full"
            >
              <div class="font-semibold text-[16px] text-[#dededf] text-nowrap">
                Добро пожаловать ✌️
              </div>
              <button class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[68px] flex items-center justify-center h-[33px] px-[15px] py-[10px] overflow-clip">
                <div class="size-[24px] transform rotate-180">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </Motion>

            <!-- Social buttons -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.15, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex gap-[10px] w-full"
            >
              <button class="flex-1 bg-[rgba(255,255,255,0.02)] rounded-[12px] shadow-[0px_0.885px_1.771px_0px_rgba(0,0,0,0.05)] h-[56.665px] flex items-center justify-center gap-[8px] px-[16px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
                <div class="size-[16px] overflow-clip">
                  <img src="http://localhost:3845/assets/38682c94f5568224cc5ff905f0abab2833b34b15.svg" alt="Google" class="size-full" />
                </div>
                <span class="font-semibold text-[14.166px] leading-[20.364px] text-[#a7a7a7] text-nowrap">
                  Google
                </span>
              </button>
              <button class="flex-1 bg-[rgba(255,255,255,0.02)] rounded-[12px] shadow-[0px_0.885px_1.771px_0px_rgba(0,0,0,0.05)] h-[56.665px] flex items-center justify-center gap-[8px] px-[16px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
                <div class="size-[18px] overflow-clip">
                  <img src="http://localhost:3845/assets/ad1b15a9365fdf8f77318755d219a055d18e79ca.svg" alt="Discord" class="size-full" />
                </div>
                <span class="font-semibold text-[14.166px] leading-[20.364px] text-[#a7a7a7] text-nowrap">
                  Discord
                </span>
              </button>
            </Motion>

            <!-- Divider -->
            <Motion
              :initial="{ opacity: 0, scaleX: 0 }"
              :animate="{ opacity: 1, scaleX: 1 }"
              :transition="{ delay: 0.2, type: 'spring', stiffness: 400, damping: 25 }"
              class="bg-[rgba(217,217,217,0.05)] h-[0.885px] w-full origin-left"
            />

            <!-- Form inputs -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.25, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex flex-col gap-[15px] w-full"
            >
              <!-- Email input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center gap-[9.4px] px-[13.281px] py-[17.708px]">
                <div class="size-[21.249px] opacity-30">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="Логин"
                  class="flex-1 bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                />
              </div>

              <!-- Password input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center justify-between px-[13.281px] py-[17.708px]">
                <div class="flex items-center gap-[9.739px]">
                  <div class="size-[21.249px] opacity-30">
                    <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="16" r="1" fill="currentColor"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Пароль"
                    class="bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                  />
                </div>
                <button
                  @click="toggleForgotPassword"
                  class="bg-[rgba(200,199,202,0.03)] rounded-[8px] h-[35px] w-[70px] flex items-center justify-center p-[10px] transition-all duration-300 hover:bg-[rgba(200,199,202,0.05)]"
                >
                  <span class="font-medium text-[13.16px] leading-[18.799px] text-[rgba(200,199,202,0.7)] text-nowrap">
                    Забыл
                  </span>
                </button>
              </div>
            </Motion>

            <!-- Remember password checkbox -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex items-start"
            >
              <button
                @click="rememberPassword = !rememberPassword"
                class="border-[1.101px] border-[rgba(222,222,223,0.2)] border-solid rounded-full size-[17.617px] flex items-center justify-center transition-all duration-300"
                :class="{ 'bg-[#c8c7ca]': rememberPassword }"
              >
                <div v-if="rememberPassword" class="size-[8px] rounded-full bg-[#0c0c0c]" />
              </button>
              <div class="pl-[8.393px] flex items-center">
                <span class="font-medium text-[14.688px] leading-normal text-[#8f8f8f] text-nowrap">
                  Запомнить пароль
                </span>
              </div>
            </Motion>

            <!-- Action buttons -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.35, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex flex-col sm:flex-row items-stretch sm:items-start justify-between w-full gap-2 sm:gap-0"
            >
              <button
                @click="handleLogin"
                class="bg-[#c8c7ca] rounded-[14px] h-[65px] sm:w-[245px] flex items-center justify-center px-6 sm:px-[33.572px] py-[14.688px] gap-[10.491px] overflow-clip transition-all duration-300 hover:bg-[#dededf]"
              >
                <span class="font-semibold text-[16px] leading-[20.982px] text-black text-nowrap">
                  Войти
                </span>
              </button>
              <button
                @click="toggleToRegister"
                class="bg-[rgba(200,199,202,0.03)] rounded-[14px] h-[65px] flex items-center justify-center px-6 sm:px-[33.572px] py-[14.688px] gap-[10.491px] overflow-clip transition-all duration-300 hover:bg-[rgba(200,199,202,0.06)]"
              >
                <span class="font-medium text-[16px] leading-[20.982px] text-[#c8c7ca] text-nowrap">
                  Создать
                </span>
              </button>
            </Motion>
          </Motion>

          <!-- Registration Form -->
          <Motion
            v-else
            key="register"
            :initial="{ opacity: 0, x: 50 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -50 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
            class="flex flex-col gap-6 sm:gap-[35px] w-full"
          >
            <!-- Header -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex items-center justify-between w-full"
            >
              <div class="font-semibold text-[16px] text-[#dededf] text-nowrap">
                Создание аккаунта 🎉
              </div>
              <button @click="toggleToLogin" class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[68px] flex items-center justify-center h-[33px] px-[15px] py-[10px] overflow-clip transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
                <div class="size-[24px] transform rotate-180">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </Motion>

            <!-- Social buttons -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.15, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex gap-[10px] w-full"
            >
              <button class="flex-1 bg-[rgba(255,255,255,0.02)] rounded-[12px] shadow-[0px_0.885px_1.771px_0px_rgba(0,0,0,0.05)] h-[56.665px] flex items-center justify-center gap-[8px] px-[16px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
                <div class="size-[16px] overflow-clip">
                  <img src="http://localhost:3845/assets/38682c94f5568224cc5ff905f0abab2833b34b15.svg" alt="Google" class="size-full" />
                </div>
                <span class="font-semibold text-[14.166px] leading-[20.364px] text-[#a7a7a7] text-nowrap">
                  Google
                </span>
              </button>
              <button class="flex-1 bg-[rgba(255,255,255,0.02)] rounded-[12px] shadow-[0px_0.885px_1.771px_0px_rgba(0,0,0,0.05)] h-[56.665px] flex items-center justify-center gap-[8px] px-[16px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
                <div class="size-[18px] overflow-clip">
                  <img src="http://localhost:3845/assets/ad1b15a9365fdf8f77318755d219a055d18e79ca.svg" alt="Discord" class="size-full" />
                </div>
                <span class="font-semibold text-[14.166px] leading-[20.364px] text-[#a7a7a7] text-nowrap">
                  Discord
                </span>
              </button>
            </Motion>

            <!-- Divider -->
            <Motion
              :initial="{ opacity: 0, scaleX: 0 }"
              :animate="{ opacity: 1, scaleX: 1 }"
              :transition="{ delay: 0.2, type: 'spring', stiffness: 400, damping: 25 }"
              class="bg-[rgba(217,217,217,0.05)] h-[0.885px] w-full origin-left"
            />

            <!-- Form inputs -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.25, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex flex-col gap-[15px] w-full"
            >
              <!-- Username input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center gap-[9.4px] px-[13.281px] py-[17.708px]">
                <div class="size-[21.249px] opacity-30">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                <input
                  v-model="registerUsername"
                  type="text"
                  placeholder="Имя пользователя"
                  class="flex-1 bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                />
              </div>

              <!-- Email input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center gap-[9.4px] px-[13.281px] py-[17.708px]">
                <div class="size-[21.249px] opacity-30">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                <input
                  v-model="registerEmail"
                  type="email"
                  placeholder="Email"
                  class="flex-1 bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                />
              </div>

              <!-- Password input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center gap-[9.4px] px-[13.281px] py-[17.708px]">
                <div class="size-[21.249px] opacity-30">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                <input
                  v-model="registerPassword"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  placeholder="Пароль"
                  class="flex-1 bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                />
              </div>

              <!-- Confirm Password input -->
              <div class="border border-[rgba(255,255,255,0.05)] border-solid rounded-[14px] h-[65px] flex items-center gap-[9.4px] px-[13.281px] py-[17.708px]">
                <div class="size-[21.249px] opacity-30">
                  <svg class="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="bg-[rgba(200,199,202,0.1)] h-[14px] w-px" />
                <input
                  v-model="registerConfirmPassword"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  placeholder="Подтвердите пароль"
                  class="flex-1 bg-transparent border-none outline-none font-medium text-[13.16px] leading-[18.799px] text-[rgba(250,250,250,0.6)] placeholder:text-[rgba(250,250,250,0.6)]"
                />
              </div>
            </Motion>

            <!-- Terms checkbox -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex items-start"
            >
              <button
                @click="acceptTerms = !acceptTerms"
                class="border-[1.101px] border-[rgba(222,222,223,0.2)] border-solid rounded-full size-[17.617px] flex items-center justify-center transition-all duration-300"
                :class="{ 'bg-[#c8c7ca]': acceptTerms }"
              >
                <div v-if="acceptTerms" class="size-[8px] rounded-full bg-[#0c0c0c]" />
              </button>
              <div class="pl-[8.393px] flex items-center">
                <span class="font-medium text-[14.688px] leading-normal text-[#8f8f8f]">
                  Я принимаю условия использования
                </span>
              </div>
            </Motion>

            <!-- Action buttons -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.35, type: 'spring', stiffness: 400, damping: 25 }"
              class="flex flex-col sm:flex-row items-stretch sm:items-start justify-between w-full gap-2 sm:gap-0"
            >
              <button
                @click="handleRegister"
                class="bg-[#c8c7ca] rounded-[14px] h-[65px] sm:w-[245px] flex items-center justify-center px-6 sm:px-[33.572px] py-[14.688px] gap-[10.491px] overflow-clip transition-all duration-300 hover:bg-[#dededf]"
              >
                <span class="font-semibold text-[16px] leading-[20.982px] text-black text-nowrap">
                  Создать
                </span>
              </button>
              <button
                @click="toggleToLogin"
                class="bg-[rgba(200,199,202,0.03)] rounded-[14px] h-[65px] flex items-center justify-center px-6 sm:px-[33.572px] py-[14.688px] gap-[10.491px] overflow-clip transition-all duration-300 hover:bg-[rgba(200,199,202,0.06)]"
              >
                <span class="font-medium text-[16px] leading-[20.982px] text-[#c8c7ca] text-nowrap">
                  Войти
                </span>
              </button>
            </Motion>
          </Motion>
        </AnimatePresence>
      </div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

// Login form state
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberPassword = ref(false)

// Registration form state
const registerUsername = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')
const showRegisterPassword = ref(false)
const acceptTerms = ref(false)

// Form toggle
const isRegistering = ref(false)

const toggleToRegister = () => {
  isRegistering.value = true
}

const toggleToLogin = () => {
  isRegistering.value = false
}

const handleLogin = () => {
  // TODO: Implement login logic
  console.log('Login', { email: email.value, password: password.value, rememberPassword: rememberPassword.value })
}

const handleRegister = () => {
  // TODO: Implement registration logic
  console.log('Register', {
    username: registerUsername.value,
    email: registerEmail.value,
    password: registerPassword.value,
    acceptTerms: acceptTerms.value
  })
}

const toggleForgotPassword = () => {
  // TODO: Implement forgot password flow
  console.log('Forgot password')
}
</script>

<style scoped>
/* No additional styles needed - motion-v handles animations */
</style>
