<template>
  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <template slot="navbar-menu"><drop-down tag="li" title="Sample Dropdown">

      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    DropDown,
    Navbar,

    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
