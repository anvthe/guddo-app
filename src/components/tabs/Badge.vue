<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'span'
  },
  href: String,
  type: {
    type: String,
    default: 'default',
    validator: value => {
      let acceptedValues = [
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'default',
        'neutral'
      ]
      return acceptedValues.indexOf(value) !== -1
    }
  }
})

const componentTag = computed(() => {
  return props.href ? 'a' : props.tag
})
</script>

<template>
  <component
      :is="componentTag"
      class="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      :class="[
      type === 'default' && 'bg-gray-100 text-gray-800',
      type === 'primary' && 'bg-blue-100 text-blue-800',
      type === 'info' && 'bg-cyan-100 text-cyan-800',
      type === 'success' && 'bg-green-100 text-green-800',
      type === 'warning' && 'bg-yellow-100 text-yellow-800',
      type === 'danger' && 'bg-red-100 text-red-800',
      type === 'neutral' && 'bg-gray-100 text-gray-800'
    ]"
      :href="href"
  >
    <slot></slot>
  </component>
</template>