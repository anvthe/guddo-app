<script setup>

import {
  ElPopover,
  ElButton,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus';
import {
  User,
  Document,
  Twitter,
  Facebook,
  Instagram
} from '@element-plus/icons-vue';

defineProps({
  transparent: Boolean,
  colorOnScroll: Number
});
</script>

<template>
  <navbar
      position="fixed"
      type="primary"
      :transparent="transparent"
      :color-on-scroll="colorOnScroll"
      menu-classes="ml-auto"
  >
    <template #navbar-menu>
      <!-- Login Link with Tooltip -->
      <li class="nav-item">
        <el-tooltip content="Login to your account" placement="bottom">
          <router-link to="/login" class="nav-link">
            <el-icon><User /></el-icon>
            <span>Login</span>
          </router-link>
        </el-tooltip>
      </li>

      <!-- Profile Link with Tooltip -->
      <li class="nav-item">
        <el-tooltip content="View your profile" placement="bottom">
          <router-link to="/profile" class="nav-link">
            <el-icon><User /></el-icon>
            <span>Profile</span>
          </router-link>
        </el-tooltip>
      </li>

      <!-- Landing Page Link with Tooltip -->
      <li class="nav-item">
        <el-tooltip content="Visit landing page" placement="bottom">
          <router-link to="/landing" class="nav-link">
            <el-icon><Document /></el-icon>
            <span>Landing</span>
          </router-link>
        </el-tooltip>
      </li>

      <!-- Social Media Links with Tooltips -->
      <li class="nav-item">
        <el-tooltip content="Follow us on Twitter" placement="bottom">
          <a href="https://twitter.com/" target="_blank" class="nav-link">
            <el-icon><Twitter /></el-icon>
            <span class="d-lg-none d-xl-none">Twitter</span>
          </a>
        </el-tooltip>
      </li>

      <li class="nav-item">
        <el-tooltip content="Like us on Facebook" placement="bottom">
          <a href="https://www.facebook.com/" target="_blank" class="nav-link">
            <el-icon><Facebook /></el-icon>
            <span class="d-lg-none d-xl-none">Facebook</span>
          </a>
        </el-tooltip>
      </li>

      <li class="nav-item">
        <el-tooltip content="Follow us on Instagram" placement="bottom">
          <a href="https://www.instagram.com/" target="_blank" class="nav-link">
            <el-icon><Instagram /></el-icon>
            <span class="d-lg-none d-xl-none">Instagram</span>
          </a>
        </el-tooltip>
      </li>

      <!-- Optional: Dropdown Menu Example -->
      <li class="nav-item">
        <el-dropdown>
          <span class="nav-link cursor-pointer">
            <el-icon><User /></el-icon>
            More Options
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Settings</el-dropdown-item>
              <el-dropdown-item>Help</el-dropdown-item>
              <el-dropdown-item divided>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </template>
  </navbar>
</template>

<style scoped>
</style>