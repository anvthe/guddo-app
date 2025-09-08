<script setup>
import {ref, reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import guddoService from '@/services/guddoService.js'
import MainFooter from "@/components/layout/MainFooter.vue";

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const {token, user} = await guddoService.logIn(form)

    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))

    const redirectPath = route.query.redirect || '/dashboard'
    await router.push(redirectPath)
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}


const signInWithGoogle = () => {
  guddoService.googleLogin()
}
</script>
<template>

  <div class="min-h-screen flex items-center justify-center py-12 relative bg-cover bg-center">
    <!-- Background with improved overlay -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('../../assets/images/login.jpg');"
    >
    </div>

    <!-- Card -->

    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

      <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
        <!-- Decorative header strip -->
        <div class="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

        <div class="p-8">

          <h2 class="text-3xl font-bold text-center text-gray-800 mb-2">Welcome GUDDO</h2>
          <p class="text-gray-500 text-center mb-6">Sign in to continue to your account</p>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">{{ errorMessage }}</span>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input
                    type="email"
                    v-model="form.email"
                    placeholder="Enter your email"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    required
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    placeholder="Enter your password"
                    class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    required
                />
                <button
                    type="button"
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                    @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                    type="checkbox"
                    id="rememberMe"
                    v-model="rememberMe"
                    class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label for="rememberMe" class="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="/forgot-password" class="text-sm text-orange-600 hover:text-orange-500 transition-colors">Forgot
                password?</a>
            </div>

            <!-- Submit -->
            <button
                type="submit"
                class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>

            <!-- Divider -->
            <div class="relative flex items-center">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>

            <!-- Google Login -->
            <button
                type="button"
                @click="signInWithGoogle"
                class="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
            >
              <img src="../../assets/images/icon/icon-google.svg" alt="Google" class="h-5 w-5"/>
              <span class="text-gray-700 font-medium">Sign In with Google</span>
            </button>
          </form>

          <!-- Footer -->
          <div class="mt-8 pt-5 border-t border-gray-200">
            <p class="text-center text-sm text-gray-500">
              Don't have an account?
              <a href="/register" class="font-medium text-orange-600 hover:text-orange-500 hover:underline transition-colors ml-1">Create
                account</a>
            </p>
          </div>
        </div>
        <div class="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      </div>
    </div>

  </div>
  <main-footer class="bg-gradient-to-r from-orange-400 to-orange-600"></main-footer>
</template>