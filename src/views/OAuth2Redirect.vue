<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const token = route.query.token
  if (token) {
    localStorage.setItem('authToken', token)
    router.replace('/login')
  } else {
    router.replace('/login')
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <p>Logging in with Google...</p>
  </div>
</template>
