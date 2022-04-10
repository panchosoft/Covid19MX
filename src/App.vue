<template>
  <div id="app" class="">
    <div id="nav">
      <Navbar />
    </div>
    <div class="container-fluid text-white router-view p-0 m-0">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style>
body {
  background-color: #24292e !important;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath fill='%236d6d6d' fill-opacity='.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'/%3E%3C/svg%3E") !important;
  /* height: 99vh !important; */
  margin: 0 !important;
  padding: 0 !important;
}
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: underline !important;
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
    user-select: none !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
