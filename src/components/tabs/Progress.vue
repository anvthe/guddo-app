<script setup>
import { computed } from 'vue'

const props = defineProps({
  striped: Boolean,
  showValue: Boolean,
  animated: Boolean,
  label: String,
  height: {
    type: Number,
    default: 4
  },
  type: {
    type: String,
    default: 'default'
  },
  value: {
    type: Number,
    default: 0,
    validator: value => {
      return value >= 0 && value <= 100
    }
  }
})

const computedClasses = computed(() => {
  return [
    { 'progress-bar-striped': props.striped },
    { 'progress-bar-animated': props.animated }
  ]
})

const typeClasses = computed(() => {
  const types = {
    default: 'bg-blue-500',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-cyan-500'
  }
  return types[props.type] || types.default
})
</script>

<template>
  <div class="progress-container w-full mb-4">
    <span v-if="label || $slots.label" class="progress-badge block text-sm font-medium text-gray-700 mb-1">
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div
        class="progress w-full bg-gray-200 rounded-full overflow-hidden"
        :style="`height: ${height}px`"
    >
      <div
          class="progress-bar h-full rounded-full transition-all duration-300 ease-out"
          :class="[computedClasses, typeClasses]"
          role="progressbar"
          :aria-valuenow="value"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="`width: ${value}%;`"
      >
        <slot>
          <span
              v-if="showValue"
              class="progress-value text-xs font-bold text-white px-2 h-full flex items-center justify-end"
              :class="{ 'text-gray-800': value < 20 }"
          >
            {{ value }}%
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>