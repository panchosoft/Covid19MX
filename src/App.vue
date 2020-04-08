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

<style scoped>
.AppBackground {
  background-color: #212327 !important;
  color: #fff;
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
