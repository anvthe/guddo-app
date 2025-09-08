<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  label: [String, Number],
  disabled: Boolean,
  modelValue: [String, Boolean, Number],
  inline: Boolean
})

const emit = defineEmits(['update:modelValue'])

const cbId = ref('')

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const inlineClass = computed(() => {
  if (props.inline) {
    return 'inline-flex mr-4'
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
      class="form-check-radio flex items-center"
      :class="[inlineClass, { 'opacity-60 cursor-not-allowed': disabled }]"
  >
    <label :for="cbId" class="form-check-label flex items-center cursor-pointer">
      <input
          :id="cbId"
          class="form-check-input hidden"
          type="radio"
          :disabled="disabled"
          :value="label"
          v-model="model"
      />
      <span
          class="form-check-sign w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 transition-colors duration-200"
          :class="[
          {
            'border-gray-300': !disabled && model !== label,
            'border-blue-500': !disabled && model === label,
            'border-gray-400': disabled
          }
        ]"
      >
        <span
            v-if="model === label"
            class="w-2.5 h-2.5 rounded-full bg-blue-500 transition-all duration-200"
        ></span>
      </span>
      <slot>
        <span v-if="label">{{ label }}</span>
      </slot>
    </label>
  </div>
</template>