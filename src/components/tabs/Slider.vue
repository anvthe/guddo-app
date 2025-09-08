<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

const props = defineProps({
  modelValue: [String, Array, Number],
  disabled: Boolean,
  start: {
    type: [Number, Array],
    default: 0
  },
  connect: {
    type: [Boolean, Array],
    default: () => [true, false]
  },
  range: {
    type: Object,
    default: () => {
      return {
        min: 0,
        max: 100
      }
    }
  },
  type: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['update:modelValue'])

const slider = ref(null)
const sliderElement = ref(null)

function createSlider() {
  if (sliderElement.value) {
    noUiSlider.create(sliderElement.value, {
      start: props.modelValue || props.start,
      connect: props.connect,
      range: props.range,
      ...props.options
    })

    slider.value = sliderElement.value.noUiSlider
    slider.value.on('slide', () => {
      let value = slider.value.get()
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    })

    // Apply disabled state if needed
    if (props.disabled) {
      sliderElement.value.setAttribute('disabled', true)
    }
  }
}

onMounted(() => {
  createSlider()
})

watch(() => props.modelValue, (newValue, oldValue) => {
  if (slider.value) {
    const sliderValue = slider.value.get()
    if (newValue !== oldValue && sliderValue !== newValue) {
      if (Array.isArray(sliderValue) && Array.isArray(newValue)) {
        if (
            oldValue.length === newValue.length &&
            oldValue.every((v, i) => v === newValue[i])
        ) {
          slider.value.set(newValue)
        }
      } else {
        slider.value.set(newValue)
      }
    }
  }
})

watch(() => props.disabled, (newValue) => {
  if (sliderElement.value) {
    if (newValue) {
      sliderElement.value.setAttribute('disabled', true)
    } else {
      sliderElement.value.removeAttribute('disabled')
    }
  }
})

onBeforeUnmount(() => {
  if (slider.value) {
    slider.value.destroy()
  }
})
</script>

<template>
  <div
      ref="sliderElement"
      class="slider"
      :class="[`slider-${type}`]"
      :disabled="disabled"
  ></div>
</template>

<style scoped>

</style>