<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div class="container-fluid text-white router-view pl-0 pr-0">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  background-color: #24292e !important;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath fill='%236d6d6d' fill-opacity='.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'/%3E%3C/svg%3E") !important;
}
.router-view {
  /* background-color: #24292e !important; */
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
