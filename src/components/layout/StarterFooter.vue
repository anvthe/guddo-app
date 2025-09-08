<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>

              RKO

          </li>
          <li>

          </li>
          <li>

          </li>
          <li>
            <a href="">
              License
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Designed by
        <a href="" target="_blank" rel="noopener"
          >Invision</a
        >. Coded by
        <a href="" target="_blank" rel="noopener"
          >GUDDO</a
        >
        and

      </div>
    </div>
  </footer>
</template>

<style></style>
