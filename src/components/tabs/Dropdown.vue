<script setup>
import { ref, provide } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    default: 'down'
  },
  title: String,
  icon: String,
  position: String,
  hideArrow: Boolean,
  tag: {
    type: String,
    default: 'li'
  }
})

const emit = defineEmits(['change'])

const isOpen = ref(false)

function toggleDropDown() {
  isOpen.value = !isOpen.value
  emit('change', isOpen.value)
}

function closeDropDown() {
  isOpen.value = false
  emit('change', isOpen.value)
}

// Provide close function to child components
provide('closeDropDown', closeDropDown)
</script>

<template>
  <component
      class="dropdown relative list-none"
      :is="tag"
      :class="[
      { 'dropdown-open': isOpen },
      { 'dropdown': direction === 'down' },
      { 'dropup': direction === 'up' },
      { 'dropdown-end': position === 'right' }
    ]"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggleDropDown"
      v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a
          class="dropdown-toggle nav-link flex items-center cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          :class="{ 'no-caret': hideArrow }"
      >
        <i :class="icon" v-if="icon" class="mr-2"></i>
        <span class="no-icon">{{ title }}</span>
        <svg
            v-if="!hideArrow"
            class="ml-1 h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </slot>
    <ul
        class="dropdown-menu absolute z-50 min-w-[160px] mt-2 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 origin-top-right"
        :class="[
        {
          'right-0': position === 'right',
          'left-0': position !== 'right',
          'opacity-0 invisible scale-95': !isOpen,
          'opacity-100 visible scale-100': isOpen,
          'bottom-full mb-2': direction === 'up',
          'top-full mt-2': direction === 'down'
        }
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>