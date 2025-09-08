<script setup>
import {ref, reactive, computed} from 'vue'
import {useRouter} from 'vue-router'
import guddoService from '@/services/guddoService.js'
import MainFooter from "@/components/layout/MainFooter.vue";

const router = useRouter()

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const passwordsMatch = computed(() =>
    form.password && form.password === form.confirmPassword
)

const passwordStrength = computed(() => {
  if (!form.password) return 0
  let strength = 0
  if (form.password.length >= 8) strength += 1
  if (/[A-Z]/.test(form.password)) strength += 1
  if (/[0-9]/.test(form.password)) strength += 1
  if (/[^A-Za-z0-9]/.test(form.password)) strength += 1
  return strength
})

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    if (!passwordsMatch.value) {
      throw new Error('Passwords do not match')
    }

    const userData = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password
    }

    await guddoService.register(userData)

    await router.push('/login')
  } catch (error) {
    errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.'
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



    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('../../assets/images/login.jpg');"
    >
    </div>

    <!-- Card -->
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
      <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div class="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

        <div class="p-8">
          <!-- Header -->
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

          <!-- Error -->
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4">
            {{ errorMessage }}
          </p>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-5">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium mb-1">First Name</label>
              <input
                  type="text"
                  v-model="form.firstname"
                  placeholder="Enter your first name"
                  class="w-full pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                  required
              />
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium mb-1">Last Name</label>
              <input
                  type="text"
                  v-model="form.lastname"
                  placeholder="Enter your last name"
                  class="w-full pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>

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
              <label class="block text-sm font-medium mb-1">Password</label>
              <!-- Password -->
              <div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
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
              <!-- Password strength -->
              <div class="mt-2 h-2 bg-gray-200 rounded">
                <div
                    class="h-2 rounded"
                    :class="[
                passwordStrength === 1 && 'w-1/4 bg-red-500',
                passwordStrength === 2 && 'w-2/4 bg-yellow-500',
                passwordStrength === 3 && 'w-3/4 bg-blue-500',
                passwordStrength === 4 && 'w-full bg-green-500'
              ]"
                ></div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium mb-1">Confirm Password</label>
              <!-- Confirm Password -->
              <div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="form.confirmPassword"
                      placeholder="Enter your password"
                      class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                      required
                  />
                  <button
                      type="button"
                      class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                      @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
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
              <p v-if="form.confirmPassword && !passwordsMatch" class="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            </div>

            <!-- Submit -->
            <button
                type="submit"
                class="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                :disabled="isLoading"
            >
              {{ isLoading ? 'Creating account...' : 'Sign Up' }}
            </button>

            <!-- Google Signup -->
            <button
                type="button"
                @click="signInWithGoogle"
                class="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
            >
              <img src="../../assets/images/icon/icon-google.svg" alt="Google" class="h-5 w-5"/>
              <span class="text-gray-700 font-medium">Sign Up with Google</span>
            </button>
          </form>

          <!-- Footer -->
          <div class="mt-8 pt-5 border-t border-gray-200">
            <p class="text-center text-sm text-gray-500">
              Already have an account?
              <RouterLink to="/login" class="text-orange-600 hover:underline font-medium hover:text-orange-500 transition-colors ml-1">Sign in</RouterLink>
            </p>
          </div>
        </div>
        <div class="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      </div>
    </div>
  </div>
  <main-footer class="bg-gradient-to-r from-orange-400 to-orange-600"></main-footer>

</template>
