<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >

    <template slot="navbar-menu">




      <li class="nav-item">
        <a
            class="nav-link"
            rel="tooltip"
            title="Follow us on Twitter"
            data-placement="bottom"
            href="/login"
            target="_blank"
        >
          <i class="now-ui-icons users_circle-08"></i> Login
        </a>
      </li>


      <li class="nav-item">
        <a
            class="nav-link"
            rel="tooltip"
            title="Follow us on Twitter"
            data-placement="bottom"
            href="/profile"
            target="_blank"
        >
          <i class="now-ui-icons users_single-02"></i> Profile

        </a>
      </li>


      <li class="nav-item">
        <a
            class="nav-link"
            rel="tooltip"
            title="Follow us on Twitter"
            data-placement="bottom"
            href="/landing"
            target="_blank"
        >
          <i class="now-ui-icons education_paper"></i> Landing

        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Twitter"
          data-placement="bottom"
          href="https://twitter.com/"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          <p class="d-lg-none d-xl-none">Twitter</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Like us on Facebook"
          data-placement="bottom"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Instagram"
          data-placement="bottom"
          href="https://www.instagram.com/"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
          <p class="d-lg-none d-xl-none">Instagram</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {

    Navbar,

    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
