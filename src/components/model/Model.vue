<script setup>
import { watch } from 'vue'
import { SlideYUpTransition } from 'vue-next-transition'

const props = defineProps({
  show: Boolean,
  showClose: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: '',
    validator(value) {
      let acceptedValues = ['', 'notice', 'mini']
      return acceptedValues.indexOf(value) !== -1
    }
  },
  modalClasses: [Object, String],
  headerClasses: [Object, String],
  bodyClasses: [Object, String],
  footerClasses: [Object, String],
  animationDuration: {
    type: Number,
    default: 500
  }
})

const emit = defineEmits(['update:show', 'close'])

function closeModal() {
  emit('update:show', false)
  emit('close')
}

watch(() => props.show, (val) => {
  let documentClasses = document.body.classList
  if (val) {
    documentClasses.add('overflow-hidden')
  } else {
    documentClasses.remove('overflow-hidden')
  }
})
</script>

<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
        class="modal fixed inset-0 z-50 overflow-y-auto"
        @click.self="closeModal"
        :class="[
        { 'flex items-center justify-center': show },
        { 'hidden': !show },
        { 'modal-mini': type === 'mini' }
      ]"
        v-show="show"
        tabindex="-1"
        role="dialog"
        :aria-hidden="!show"
    >
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      <div
          class="modal-dialog relative transform transition-all sm:max-w-lg sm:w-full mx-auto"
          :class="[
          { 'modal-notice': type === 'notice' },
          modalClasses,
          type === 'mini' ? 'max-w-md' : 'max-w-lg'
        ]"
      >
        <div class="modal-content bg-white rounded-lg shadow-xl overflow-hidden">
          <slot name="base-content">
            <div class="modal-header flex items-center justify-between p-4 border-b" :class="headerClasses">
              <slot name="header"></slot>
              <slot name="close-button">
                <button
                    v-if="showClose"
                    @click="closeModal"
                    class="close ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    data-dismiss="modal"
                    :aria-hidden="!show"
                >
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </slot>
            </div>

            <div class="modal-body p-4" :class="bodyClasses">
              <slot></slot>
            </div>

            <div class="modal-footer p-4 border-t bg-gray-50" :class="footerClasses">
              <slot name="footer"></slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>

<style scoped>

</style>