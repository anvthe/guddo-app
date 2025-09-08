<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [Array, Boolean],
  onText: {
    type: String,
    default: 'ON'
  },
  offText: {
    type: String,
    default: 'OFF'
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const switchClass = computed(() => {
  return model.value ? 'switch-on' : 'switch-off'
})

function triggerToggle() {
  model.value = !model.value
}
</script>

<template>
  <div
      class="switch relative inline-flex items-center cursor-pointer transition-colors duration-200"
      :class="[
      switchClass,
      model ? 'bg-blue-500' : 'bg-gray-300'
    ]"
      @click="triggerToggle"
  >
    <div class="switch-container relative flex items-center w-16 h-8 rounded-full">
      <span class="switch-handle-on absolute left-1 text-xs font-medium text-white whitespace-nowrap overflow-hidden" style="max-width: 0;">
        <slot name="on">
          {{ onText }}
        </slot>
      </span>

      <span
          class="switch-handle absolute bg-white rounded-full shadow-md transform transition-transform duration-200"
          :class="[
          model ? 'translate-x-8' : 'translate-x-0'
        ]"
          style="width: 24px; height: 24px;"
      ></span>

      <span class="switch-handle-off absolute right-1 text-xs font-medium text-gray-600 whitespace-nowrap overflow-hidden" style="max-width: 0;">
        <slot name="off">
          {{ offText }}
        </slot>
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>