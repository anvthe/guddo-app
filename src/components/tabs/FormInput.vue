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
</style>