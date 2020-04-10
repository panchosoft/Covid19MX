<template>
  <div id="app" class="AppBackground">
    <div id="nav">
      <Navbar />
    </div>
    <div class="container-fluid pt-5">
      <router-view />
    </div>
  </div>
</template>

<style>
.AppBackground {
  background-color: #212327 !important;
  color: #fff;
}
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

  /* .container-fluid {
    padding-left: 10px !important;
    padding-right: 10px !important;
  } */
}
</style>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
