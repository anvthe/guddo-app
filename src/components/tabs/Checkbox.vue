<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  modelValue: [Array, Boolean],
  disabled: Boolean,
  inline: Boolean,
  hasError: Boolean
})

const emit = defineEmits(['update:modelValue'])

const cbId = ref('')
const touched = ref(false)

const model = computed({
  get() {
    return props.modelValue
  },
  set(check) {
    if (!touched.value) {
      touched.value = true
    }
    emit('update:modelValue', check)
  }
})

const inlineClass = computed(() => {
  if (props.inline) {
    return 'inline-flex'
  }
  return ''
})

onMounted(() => {
  cbId.value = Math.random()
      .toString(16)
      .slice(2)
})
</script>

<template>
  <div
      class="form-check flex items-center"
      :class="[
      { 'opacity-60 cursor-not-allowed': disabled },
      inlineClass,
      { 'text-red-600': hasError }
    ]"
  >
    <label :for="cbId" class="form-check-label flex items-center cursor-pointer">
      <input
          :id="cbId"
          class="form-check-input hidden"
          type="checkbox"
          :disabled="disabled"
          v-model="model"
      />
      <span
          class="form-check-sign w-5 h-5 border-2 rounded-md flex items-center justify-center mr-2 transition-colors duration-200"
          :class="[
          {
            'bg-blue-500 border-blue-500': model && !disabled,
            'bg-gray-100 border-gray-300': !model && !disabled,
            'bg-gray-200 border-gray-400': disabled,
            'border-red-500': hasError && !disabled
          }
        ]"
      >
        <svg
            v-if="model"
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>