<template>
  <div id="app" class="bg-secondary">
    <div id="nav">
      <Navbar />
    </div>
    <div class="container-fluid pt-5">
    <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>