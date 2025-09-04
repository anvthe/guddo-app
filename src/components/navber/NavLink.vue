<script setup>
import {computed, inject} from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    default: undefined
  }
})

const { closeNavbar, closeDropDown } = inject('closeNavbar', { closeNavbar: null, closeDropDown: null })
const router = useRouter()

const componentType = computed(() => {
  return props.to ? 'router-link' : 'a'
})

function closeNav() {
  if (closeNavbar) {
    closeNavbar()
  }
  if (closeDropDown) {
    closeDropDown()
  }
}

function handleClick(event) {
  closeNav()

  // If it's a regular link (not router-link) and has a to prop, handle navigation
  if (props.to && !props.to.startsWith('#')) {
    event.preventDefault()
    if (typeof props.to === 'string') {
      router.push(props.to)
    } else {
      router.push(props.to)
    }
  }
}
</script>

<template>
  <component
      :is="componentType"
      :to="to"
      class="dropdown-item"
      @click="handleClick"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.dropdown-item {
  @apply block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200;
  @apply focus:outline-none focus:bg-gray-100 focus:text-gray-900;
}

.router-link-active {
  @apply bg-blue-50 text-blue-700 font-medium;
}

.router-link-active:hover {
  @apply bg-blue-100 text-blue-800;
}

/* Dark theme support */
.dark .dropdown-item {
  @apply text-gray-300 hover:bg-gray-700 hover:text-white;
}

.dark .dropdown-item:focus {
  @apply bg-gray-700 text-white;
}

.dark .router-link-active {
  @apply bg-blue-900 text-blue-100;
}

.dark .router-link-active:hover {
  @apply bg-blue-800 text-white;
}
</style>