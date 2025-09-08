<script setup>
import { ref } from 'vue'
import { FadeTransition } from 'vue-next-transition'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    description: 'Alert type'
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

const visible = ref(true)

function dismissAlert() {
  visible.value = false
}
</script>

<template>
  <fade-transition>
    <div
        v-if="visible"
        class="alert rounded-lg p-4 mb-4 flex items-start"
        :class="[`alert-${type}`]"
        role="alert"
    >
      <slot v-if="!dismissible"></slot>

      <template v-else>
        <div class="flex-1">
          <slot></slot>
        </div>
        <slot name="dismiss-icon">
          <button
              type="button"
              class="close ml-4 flex-shrink-0 p-1 rounded-full hover:bg-opacity-20 transition-colors duration-200"
              :class="{
              'hover:bg-blue-100': type === 'default' || type === 'info',
              'hover:bg-green-100': type === 'success',
              'hover:bg-red-100': type === 'danger',
              'hover:bg-yellow-100': type === 'warning',
              'hover:bg-gray-100': type === 'secondary'
            }"
              aria-label="Close"
              @click="dismissAlert"
          >
            <span aria-hidden="true" class="flex items-center justify-center w-5 h-5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </slot>
      </template>
    </div>
  </fade-transition>
</template>

<style scoped>
</style>