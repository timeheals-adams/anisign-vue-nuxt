<template>
  <div class="flex flex-col gap-[40px] items-start w-full">
    <!-- Header section -->
    <div class="flex items-center justify-between w-full">
      <!-- Title and count -->
      <div class="flex flex-col font-['Montserrat'] font-semibold gap-[5px] items-start text-[#c8c7ca]">
        <div class="text-[20px] leading-normal">
          Комментарии
        </div>
        <div class="text-[14px] leading-normal opacity-70">
          Всего - {{ comments.length }}
        </div>
      </div>
      
      <!-- Report button -->
      <button 
        @click="reportContent"
        class="bg-[rgba(243,149,149,0.05)] flex h-[53px] items-center justify-center px-[15px] rounded-[10px] transition-all duration-300 hover:bg-[rgba(243,149,149,0.1)]"
      >
        <span class="font-['Montserrat'] font-medium text-[#f39595] text-[14px]">
          Пожаловаться
        </span>
      </button>
    </div>

    <!-- Comment form -->
    <div class="bg-[rgba(200,199,202,0.02)] flex flex-col h-auto min-h-[217px] justify-between p-[25px] rounded-[12px] w-full border border-[rgba(200,199,202,0.05)]">
      <div class="flex flex-col gap-[25px] items-start w-full">
        <!-- Toolbar -->
        <div class="flex items-center gap-4 w-full">
          <div class="font-['Montserrat'] font-semibold text-[12px] text-white">
            Инструменты форматирования:
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="toggleBold"
              :class="{ 'bg-[rgba(200,199,202,0.1)]': isFormatActive('bold') }"
              class="size-[32px] flex items-center justify-center rounded-md hover:bg-[rgba(200,199,202,0.05)] transition-colors duration-200"
              title="Жирный"
            >
              <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" stroke="#c8c7ca" stroke-width="2"/>
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" stroke="#c8c7ca" stroke-width="2"/>
              </svg>
            </button>
            <button 
              @click="toggleItalic"
              :class="{ 'bg-[rgba(200,199,202,0.1)]': isFormatActive('italic') }"
              class="size-[32px] flex items-center justify-center rounded-md hover:bg-[rgba(200,199,202,0.05)] transition-colors duration-200"
              title="Курсив"
            >
              <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="19" y1="4" x2="10" y2="4" stroke="#c8c7ca" stroke-width="2"/>
                <line x1="14" y1="20" x2="5" y2="20" stroke="#c8c7ca" stroke-width="2"/>
                <line x1="15" y1="4" x2="9" y2="20" stroke="#c8c7ca" stroke-width="2"/>
              </svg>
            </button>
            <button 
              @click="addLink"
              class="size-[32px] flex items-center justify-center rounded-md hover:bg-[rgba(200,199,202,0.05)] transition-colors duration-200"
              title="Ссылка"
            >
              <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#c8c7ca" stroke-width="2"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#c8c7ca" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="bg-[rgba(217,217,217,0.05)] h-px w-full" />
        
        <!-- Text input -->
        <div class="w-full">
          <textarea
            v-model="newCommentText"
            ref="textareaRef"
            @keydown="handleKeydown"
            placeholder="Напишите что-то..."
            class="w-full min-h-[80px] bg-transparent border-none outline-none font-['Montserrat'] font-semibold text-[14px] text-white placeholder:text-[rgba(255,255,255,0.7)] resize-none leading-relaxed"
            style="field-sizing: content"
          />
        </div>
      </div>
      
      <!-- Submit button -->
      <div class="flex justify-end">
        <button 
          @click="submitComment"
          :disabled="!newCommentText.trim()"
          :class="{ 
            'bg-[#c8c7ca] text-[#0c0c0c] hover:bg-[#dededf]': newCommentText.trim(),
            'bg-[rgba(200,199,202,0.3)] text-[rgba(12,12,12,0.5)] cursor-not-allowed': !newCommentText.trim()
          }"
          class="flex h-[53px] items-center justify-center px-[15px] rounded-[10px] transition-all duration-300"
        >
          <span class="font-['Montserrat'] font-medium text-[14px]">
            Отправить
          </span>
        </button>
      </div>
    </div>

    <!-- Comments list -->
    <div v-if="comments.length > 0" class="flex flex-col gap-4 w-full">
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="bg-[rgba(200,199,202,0.02)] rounded-[12px] p-[25px] border border-[rgba(200,199,202,0.05)]"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="size-[40px] rounded-full bg-[rgba(200,199,202,0.1)] flex items-center justify-center">
              <svg class="size-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#c8c7ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="#c8c7ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="font-['Montserrat'] font-semibold text-[#c8c7ca] text-[14px]">
                {{ comment.author }}
              </div>
              <div class="font-['Montserrat'] font-normal text-[#8f8f8f] text-[12px]">
                {{ formatDate(comment.createdAt) }}
              </div>
            </div>
          </div>
          <button 
            @click="deleteComment(comment.id)"
            class="text-[#f39595] hover:text-[#ff6b6b] transition-colors duration-200"
          >
            <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <p class="font-['Montserrat'] text-[#dededf] text-[14px] leading-relaxed">
          {{ comment.text }}
        </p>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Comment {
  id: string
  author: string
  text: string
  createdAt: Date
}

interface Props {
  animeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  animeId: ''
})

// State
const comments = ref<Comment[]>([
  {
    id: '1',
    author: 'Пользователь123',
    text: 'Отличное аниме! Очень нравится рисовка и сюжет. Рекомендую всем к просмотру!',
    createdAt: new Date('2024-12-17T10:30:00')
  },
  {
    id: '2', 
    author: 'AnimeWatcher',
    text: 'Согласен с предыдущим комментарием. Качество анимации на высоте 👍',
    createdAt: new Date('2024-12-17T11:15:00')
  }
])

const newCommentText = ref('')
const textareaRef = ref<HTMLTextAreaElement>()

// Formatting state
const activeFormats = ref<Set<string>>(new Set())

// Methods
const formatDate = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes} мин назад`
  } else if (hours < 24) {
    return `${hours} ч назад`
  } else {
    const days = Math.floor(hours / 24)
    return `${days} дн назад`
  }
}

const submitComment = () => {
  if (!newCommentText.value.trim()) return
  
  const newComment: Comment = {
    id: Date.now().toString(),
    author: 'Вы',
    text: newCommentText.value.trim(),
    createdAt: new Date()
  }
  
  comments.value.push(newComment)
  newCommentText.value = ''
  activeFormats.value.clear()
}

const deleteComment = (commentId: string) => {
  comments.value = comments.value.filter(c => c.id !== commentId)
}

const reportContent = () => {
  alert('Функция жалобы отправлена в разработку')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    submitComment()
  }
}

// Text formatting methods
const isFormatActive = (format: string): boolean => {
  return activeFormats.value.has(format)
}

const toggleBold = () => {
  if (activeFormats.value.has('bold')) {
    activeFormats.value.delete('bold')
  } else {
    activeFormats.value.add('bold')
  }
  applyFormatting('bold')
}

const toggleItalic = () => {
  if (activeFormats.value.has('italic')) {
    activeFormats.value.delete('italic')
  } else {
    activeFormats.value.add('italic')
  }
  applyFormatting('italic')
}

const addLink = () => {
  const url = prompt('Введите URL:')
  if (url && textareaRef.value) {
    const textarea = textareaRef.value
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    const linkText = selectedText || 'ссылка'
    const markdown = `[${linkText}](${url})`
    
    const newText = text.substring(0, start) + markdown + text.substring(end)
    newCommentText.value = newText
    
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + markdown.length)
    })
  }
}

const applyFormatting = (format: string) => {
  if (!textareaRef.value) return
  
  const textarea = textareaRef.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value
  const selectedText = text.substring(start, end)
  
  if (selectedText) {
    let formattedText = selectedText
    
    if (format === 'bold') {
      formattedText = `**${selectedText}**`
    } else if (format === 'italic') {
      formattedText = `*${selectedText}*`
    }
    
    const newText = text.substring(0, start) + formattedText + text.substring(end)
    newCommentText.value = newText
    
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + formattedText.length)
    })
  }
}
</script>

<style scoped>
/* Auto-resize textarea */
textarea {
  field-sizing: content;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(200, 199, 202, 0.1);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(200, 199, 202, 0.3);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 199, 202, 0.5);
}
</style>