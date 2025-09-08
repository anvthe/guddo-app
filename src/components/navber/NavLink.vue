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

</style>