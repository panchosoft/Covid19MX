<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div class="container-fluid pl-0 pr-0">
      <router-view />
    </div>
  </div>
</template>

<style>
@media only screen and (-webkit-device-pixel-ratio: 2) {
  body {
    font-size: 13px !important;
  }
}

::selection {
  background: #e24414 !important;
  color: #fff !important;
}
::-moz-selection {
  background: #e24414 !important;
  color: #fff !important;
}

@media (max-width: 895px) {
  body {
    -webkit-user-select: none !important;
    -webkit-tap-highlight-color: transparent !important;
    -webkit-touch-callout: none;
  }
}
</style>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
      handleStyles () {
        // Dark style to the body tag for the home page
        if (['/'].includes(this.$route.path)) document.body.className = 'bg-dark'
        // While style to the body tag for all other pages
        else if (document.body.classList.contains('bg-dark')) document.body.className = 'bg-white'
      }
    },
    // Handle styles when the app is initially loaded
    mounted () {
      this.handleStyles()
    },
    // Handle styles when the route changes
    watch: {
      '$route' () {
        this.handleStyles()
      }
    }
};
</script>
