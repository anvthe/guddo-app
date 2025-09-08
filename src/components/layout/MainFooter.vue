<script setup>
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<template>
  <footer class="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
    <div class="max-w-7xl mx-auto px-6 py-10 md:py-14">
      <!-- Grid: stacks on mobile, 2 cols on tablets, 4 cols on desktops -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Logo + Description -->
        <div class="text-center sm:text-left">
          <h2 class="text-2xl font-bold tracking-wide">RKO</h2>
          <p class="mt-4 text-sm opacity-80 max-w-xs mx-auto sm:mx-0">
            Building modern solutions with style, performance, and love.
          </p>
        </div>

        <!-- Navigation -->
        <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20"
        >
          <h3 class="text-lg font-semibold mb-4 text-center sm:text-left">
            Guddo Connection
          </h3>
          <ul class="space-y-2 text-center sm:text-left">
            <li><a href="#" class="hover:underline hover:text-orange-200">About Guddo</a></li>
            <li><a href="#" class="hover:underline hover:text-orange-200">Guddo Poinda</a></li>
            <li><a href="#" class="hover:underline hover:text-orange-200">Contact</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20"
        >
          <h3 class="text-lg font-semibold mb-4 text-center sm:text-left">Support</h3>
          <ul class="space-y-2 text-center sm:text-left">
            <li><a href="#" class="hover:underline hover:text-orange-200">Help Center</a></li>
            <li><a href="#" class="hover:underline hover:text-orange-200">Terms of Service</a></li>
            <li><a href="#" class="hover:underline hover:text-orange-200">Privacy Policy</a></li>
            <li><a href="#" class="hover:underline hover:text-orange-200">FAQs</a></li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-2xl font-semibold mb-6 text-center">Follow Me</h3>
          <div class="flex justify-center flex-wrap gap-5">
            <!-- Facebook -->
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                class="p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 group"
            >
              <i class="fa fa-facebook-f text-white text-xl"></i>
            </a>
            <!-- Twitter -->
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                class="p-3 bg-white/10 rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 group"
            >
              <i class="fab fa-twitter text-white text-xl"></i>
            </a>
            <!-- Instagram -->
            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                class="p-3 bg-white/10 rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 group"
            >
              <i class="fab fa-instagram text-white text-xl"></i>
            </a>
            <!-- LinkedIn -->
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                class="p-3 bg-white/10 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 group"
            >
              <i class="fab fa-linkedin-in text-white text-xl"></i>
            </a>
          </div>

          <div class="mt-6 text-center">
            <p class="text-white/80 text-sm max-w-xs mx-auto">
              Stay connected with us on social media for updates and news!
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div
          class="border-t border-white/20 mt-10 pt-6 text-center text-xs sm:text-sm opacity-80"
      >
        &copy; {{ year }} RKO. Designed by
        <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            class="font-semibold hover:underline"
        >RKO</a
        >, coded by
        <a
            href="https://anvthe.netlify.app"
            target="_blank"
            rel="noopener"
            class="font-semibold hover:underline"
        >GUDDO</a
        >.
      </div>
    </div>
  </footer>
</template>

