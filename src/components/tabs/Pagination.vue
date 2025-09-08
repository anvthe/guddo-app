<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: value => {
      return [
        'default',
        'primary',
        'danger',
        'success',
        'warning',
        'info'
      ].includes(value)
    }
  },
  pageCount: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  modelValue: {
    type: Number,
    default: 1
  },
  prevItemClasses: [String, Object],
  itemClasses: [String, Object],
  nextItemClasses: [String, Object]
})

const emit = defineEmits(['update:modelValue'])

const defaultPagesToDisplay = ref(5)

const totalPages = computed(() => {
  if (props.pageCount > 0) return props.pageCount
  if (props.total > 0) {
    return Math.ceil(props.total / props.perPage)
  }
  return 1
})

const pagesToDisplay = computed(() => {
  if (totalPages.value > 0 && totalPages.value < defaultPagesToDisplay.value) {
    return totalPages.value
  }
  return defaultPagesToDisplay.value
})

const minPage = computed(() => {
  if (props.modelValue >= pagesToDisplay.value) {
    const pagesToAdd = Math.floor(pagesToDisplay.value / 2)
    const newMaxPage = pagesToAdd + props.modelValue
    if (newMaxPage > totalPages.value) {
      return totalPages.value - pagesToDisplay.value + 1
    }
    return props.modelValue - pagesToAdd
  } else {
    return 1
  }
})

const maxPage = computed(() => {
  if (props.modelValue >= pagesToDisplay.value) {
    const pagesToAdd = Math.floor(pagesToDisplay.value / 2)
    const newMaxPage = pagesToAdd + props.modelValue
    if (newMaxPage < totalPages.value) {
      return newMaxPage
    } else {
      return totalPages.value
    }
  } else {
    return pagesToDisplay.value
  }
})

const paginationClass = computed(() => {
  return `pagination-${props.type}`
})

function range(min, max) {
  let arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

function changePage(item) {
  emit('update:modelValue', item)
}

function nextPage() {
  if (props.modelValue < totalPages.value) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function prevPage() {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

watch(() => props.perPage, () => {
  emit('update:modelValue', 1)
})

watch(() => props.total, () => {
  emit('update:modelValue', 1)
})
</script>

<template>
  <ul class="pagination flex items-center space-x-1" :class="paginationClass">
    <li
        class="page-item prev-page"
        :class="[{ 'opacity-50 cursor-not-allowed': modelValue === 1 }, prevItemClasses]"
    >
      <a
          class="page-link flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 hover:bg-gray-100"
          aria-label="Previous"
          @click="prevPage"
          :class="{ 'cursor-not-allowed hover:bg-transparent': modelValue === 1 }"
      >
        <slot name="prev">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </slot>
      </a>
    </li>
    <li
        class="page-item"
        v-for="item in range(minPage, maxPage)"
        :key="item"
        :class="[{
        'bg-blue-500 text-white': modelValue === item,
        'hover:bg-gray-100': modelValue !== item
      }, itemClasses]"
    >
      <a
          class="page-link flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200"
          @click="changePage(item)"
      >
        {{ item }}
      </a>
    </li>
    <li
        class="page-item page-pre next-page"
        :class="[{ 'opacity-50 cursor-not-allowed': modelValue === totalPages }, nextItemClasses]"
    >
      <a
          class="page-link flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 hover:bg-gray-100"
          aria-label="Next"
          @click="nextPage"
          :class="{ 'cursor-not-allowed hover:bg-transparent': modelValue === totalPages }"
      >
        <slot name="next">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </slot>
      </a>
    </li>
  </ul>
</template>