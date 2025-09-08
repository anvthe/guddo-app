<script setup>
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import NavbarToggleButton from './NavbarToggleButton.vue'

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'relative'
  },
  menuClasses: {
    type: [String, Object, Array]
  },
  colorOnScroll: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'white',
    validator(value) {
      return [
        'white',
        'default',
        'primary',
        'danger',
        'success',
        'warning',
        'info'
      ].includes(value)
    }
  },
  navMenuClasses: {
    type: String,
    default: ''
  },
  menuImage: {
    type: String
  },
  expand: {
    type: [String, Boolean],
    default: 'lg'
  }
})

const emit = defineEmits(['open', 'close'])

const showMenu = ref(false)
const extraNavClasses = ref('')
const currentScrollValue = ref(0)

let resizeTimeout

function resizeThrottler(actualResizeHandler) {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      actualResizeHandler()
    }, 66)
  }
}

const slotData = computed(() => {
  return {
    toggle: toggle,
    open: open,
    close: close,
    isToggled: showMenu.value
  }
})

const classes = computed(() => {
  let color = `bg-${props.type}`
  let navPosition = `navbar-${props.position}`
  let colorOnScrollTransparent =
      props.colorOnScroll && currentScrollValue.value < props.colorOnScroll

  if (props.position === 'fixed') {
    navPosition = 'fixed-top'
  }

  return [
    { 'navbar-transparent': props.transparent || colorOnScrollTransparent },
    { [color]: !props.transparent && props.colorOnScroll === 0 },
    props.expand ? `navbar-expand-${props.expand}` : '',
    navPosition,
    extraNavClasses.value
  ]
})

function setNav(value) {
  let htmlClasses = document.querySelector('html').classList
  if (value) {
    htmlClasses.add('nav-open')
  } else {
    htmlClasses.remove('nav-open')
  }
  let isOpen = htmlClasses.contains('nav-open')
  let eventToTrigger = isOpen ? 'open' : 'close'
  showMenu.value = isOpen
  emit(eventToTrigger)
}

function toggle() {
  setNav(!showMenu.value)
}

function open() {
  setNav(true)
}

function close() {
  if (showMenu.value) {
    setNav(false)
  }
}

function handleScroll() {
  let scrollValue =
      document.body.scrollTop || document.documentElement.scrollTop
  currentScrollValue.value = scrollValue
  if (props.colorOnScroll > 0 && scrollValue > props.colorOnScroll) {
    extraNavClasses.value = `bg-${props.type}`
  } else {
    if (extraNavClasses.value) {
      extraNavClasses.value = ''
    }
  }
}

function scrollListener() {
  resizeThrottler(handleScroll)
}

onMounted(() => {
  document.addEventListener('scroll', scrollListener)
})

onBeforeUnmount(() => {
  document.removeEventListener('scroll', scrollListener)
})

provide('closeNavbar', close)
</script>

<template>
  <nav :class="classes" class="navbar">
    <div class="container mx-auto px-4">
      <div class="navbar-translate flex items-center justify-between">
        <slot v-bind="slotData"></slot>
        <navbar-toggle-button
            :toggled="showMenu"
            @click="toggle"
        ></navbar-toggle-button>
      </div>
      <div
          class="navbar-collapse"
          v-click-outside="close"
          :style="menuImage ? `background: url(${menuImage}) 0% 0% / cover;` : ''"
          :class="[
          { 'show': showMenu },
          { 'has-image': menuImage },
          navMenuClasses
        ]"
          v-if="$slots['navbar-menu']"
          id="navigation"
      >
        <slot name="before-menu"></slot>
        <ul class="navbar-nav" :class="menuClasses">
          <slot name="navbar-menu" v-bind="slotData"></slot>
        </ul>
        <slot name="after-menu"></slot>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>