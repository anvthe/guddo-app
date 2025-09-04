<script setup>
defineProps({
  toggled: Boolean
})
</script>

<template>
  <button
      type="button"
      class="navbar-toggler"
      :class="{ 'toggled': toggled, 'collapsed': !toggled }"
      aria-controls="navbarSupportedContent"
      :aria-expanded="toggled ? 'true' : 'false'"
      aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-bar top-bar"></span>
    <span class="navbar-toggler-bar middle-bar"></span>
    <span class="navbar-toggler-bar bottom-bar"></span>
  </button>
</template>

<style scoped>
.navbar-toggler {
  @apply relative w-8 h-8 flex flex-col items-center justify-center p-0 border-0 rounded-lg cursor-pointer transition-all duration-300 ease-in-out;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}

.navbar-toggler-bar {
  @apply block w-6 h-0.5 my-0.5 rounded-lg transition-all duration-300 ease-in-out;
  background-color: currentColor;
}

.navbar-toggler.toggled .top-bar {
  @apply transform rotate-45 translate-y-1.5;
}

.navbar-toggler.toggled .middle-bar {
  @apply opacity-0;
}

.navbar-toggler.toggled .bottom-bar {
  @apply transform -rotate-45 -translate-y-1.5;
}

.navbar-toggler.collapsed .navbar-toggler-bar {
  @apply transform-none opacity-100;
}

/* Light theme (default) */
.navbar-toggler {
  @apply text-gray-700 bg-transparent;
}

.navbar-toggler:hover {
  @apply bg-gray-100;
}

/* Dark theme for dark backgrounds */
.dark .navbar-toggler {
  @apply text-white;
}

.dark .navbar-toggler:hover {
  @apply bg-gray-700;
}
</style>