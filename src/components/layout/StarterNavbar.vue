<script setup>

import {ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

</script>

<template>
  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template #navbar-menu>
      <!-- Using Element Plus Dropdown instead of custom DropDown component -->
      <el-dropdown tag="li" class="nav-item" trigger="click">
        <span class="nav-link cursor-pointer flex items-center">
          <i class="now-ui-icons design_app mr-1"></i>
          Sample Dropdown
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="now-ui-icons users_single-02 mr-2"></i>
              Profile
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="now-ui-icons ui-1_settings-gear-63 mr-2"></i>
              Settings
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i class="now-ui-icons media-1_button-power mr-2"></i>
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Alternative: If you want to keep using your custom DropDown component -->
      <drop-down tag="li" title="Custom Dropdown">
        <template #dropdown-content>
          <a class="dropdown-item" href="#">
            <i class="now-ui-icons users_single-02 mr-2"></i>
            Profile
          </a>
          <a class="dropdown-item" href="#">
            <i class="now-ui-icons ui-1_settings-gear-63 mr-2"></i>
            Settings
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">
            <i class="now-ui-icons media-1_button-power mr-2"></i>
            Logout
          </a>
        </template>
      </drop-down>
    </template>
  </navbar>
</template>

<style scoped>


</style>