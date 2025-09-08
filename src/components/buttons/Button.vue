
<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  round: Boolean,
  simple: Boolean,
  block: Boolean,
  social: Boolean,
  link: Boolean,
  icon: Boolean,
  wide: Boolean,
  size: String
})

const emit = defineEmits(['click'])

const baseClasses = computed(() =>
    'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
)

const typeClasses = computed(() => {
  const types = {
    default: 'bg-gray-300 text-gray-900 hover:bg-gray-400 focus:ring-gray-500',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    info: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-400'
  }
  return types[props.type] || types.default
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  return props.size ? sizes[props.size] : ''
})

const stateClasses = computed(() => ({
  'rounded-full': props.round,
  'bg-transparent border border-current': props.simple,
  'w-full': props.block,
  'px-3 py-3': props.icon, // Square aspect ratio for icons
  'min-w-[120px]': props.wide,
  // Social button styles would need additional customization
  'opacity-50 cursor-not-allowed': props.disabled
}))

const handleClick = (evt) => {
  emit('click', evt)
}
</script>



<template>
  <component
      :is="tag"
      @click="handleClick"
      :type="nativeType"
      class="btn"
      :class="[baseClasses, typeClasses, sizeClasses, stateClasses]"
  >
    <span class="btn-label" v-if="$slots.label">
      <slot name="label"></slot>
    </span>
    <slot></slot>
    <span class="btn-label btn-label-right" v-if="$slots.labelRight">
      <slot name="labelRight"></slot>
    </span>
  </component>
</template>

<style scoped>

</style>