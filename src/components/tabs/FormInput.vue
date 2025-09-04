<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
  required: Boolean,
  label: String,
  error: String,
  labelClasses: String,
  inputClasses: String,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  addonRightIcon: String,
  addonLeftIcon: String
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const slots = useSlots()
const focused = ref(false)

const hasIcon = computed(() => {
  return (
      slots.addonRight !== undefined ||
      slots.addonLeft !== undefined ||
      props.addonRightIcon !== undefined ||
      props.addonLeftIcon !== undefined
  )
})

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const onFocus = (event) => {
  focused.value = true
  emit('focus', event)
}

const onBlur = (event) => {
  focused.value = false
  emit('blur', event)
}
</script>

<template>
  <div
      class="form-group"
      :class="[
      { 'input-group': hasIcon },
      { 'has-danger': error },
      { 'input-group-focus': focused },
      { 'has-label': label || $slots.label }
    ]"
  >
    <slot name="label">
      <label v-if="label" class="control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
    </slot>

    <div :class="[{ 'input-group': hasIcon }]">
      <slot name="addonLeft">
        <div v-if="addonLeftIcon" class="input-group-prepend">
          <span class="input-group-text">
            <i :class="addonLeftIcon"></i>
          </span>
        </div>
      </slot>
      <slot>
        <input
            :value="modelValue"
            v-bind="$attrs"
            @input="updateValue"
            @focus="onFocus"
            @blur="onBlur"
            class="form-control"
            :class="[{ 'is-valid': modelValue && !error }, inputClasses]"
            aria-describedby="addon-right addon-left"
        />
      </slot>
      <slot name="addonRight">
        <span
            v-if="addonRightIcon"
            class="input-group-addon input-group-append"
        >
          <span class="input-group-text">
            <i :class="addonRightIcon"></i>
          </span>
        </span>
      </slot>

      <slot name="infoBlock"></slot>
      <slot name="helpBlock">
        <div
            class="text-red-500 text-sm mt-1"
            :class="{ 'mt-2': hasIcon }"
            v-if="error"
        >
          {{ error }}
        </div>
      </slot>
    </div>
  </div>
</template>



<style scoped>
.form-group {
  @apply mb-4;
}

.control-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.input-group {
  @apply flex rounded-md shadow-sm;
}

.input-group-prepend {
  @apply inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500;
}

.input-group-text {
  @apply h-4 w-4;
}

.input-group-addon {
  @apply inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500;
}

.form-control {
  @apply flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm;
}

.has-danger .form-control {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.is-valid {
  @apply border-green-500 focus:ring-green-500 focus:border-green-500;
}

.input-group-focus .input-group-prepend,
.input-group-focus .input-group-addon {
  @apply border-blue-500;
}

.input-group:focus-within .input-group-prepend,
.input-group:focus-within .input-group-addon {
  @apply border-blue-500;
}
</style>