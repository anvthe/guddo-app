<script setup>
import { ref, provide, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  animationDuration: {
    type: Number,
    default: 250
  },
  multipleActive: {
    type: Boolean,
    default: true
  },
  activeIndex: {
    type: Number,
    default: -1
  }
})

const items = ref([])

function addItem(item) {
  // In Vue 3, we need a different approach to get the index
  // We'll just push the item and handle ordering differently
  if (!items.value.includes(item)) {
    items.value.push(item)
  }
}

function removeItem(item) {
  const index = items.value.indexOf(item)
  if (index > -1) {
    items.value.splice(index, 1)
  }
}

function deactivateAll() {
  items.value.forEach(item => {
    if (item.setActive) {
      item.setActive(false)
    }
  })
}

function activateItem() {
  if (props.activeIndex !== -1 && items.value[props.activeIndex]) {
    if (items.value[props.activeIndex].setActive) {
      items.value[props.activeIndex].setActive(true)
    }
  }
}

// Provide functions and values to child components
provide('animationDuration', props.animationDuration)
provide('multipleActive', props.multipleActive)
provide('addItem', addItem)
provide('removeItem', removeItem)
provide('deactivateAll', deactivateAll)

onMounted(() => {
  nextTick(() => {
    activateItem()
  })
})

watch(() => props.activeIndex, () => {
  activateItem()
})
</script>

<template>
  <div
      id="accordion"
      role="tablist"
      aria-multiselectable="true"
      class="card-collapse space-y-4"
  >
    <slot></slot>
  </div>
</template>