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

</style>