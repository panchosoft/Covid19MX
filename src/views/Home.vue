<template>
  <div class="home">
    <div class="container-fluid pl-0 pr-0">
      <div class="row">
        <div class="col-md-9 pl-0 pr-0">
          <MexicoMap />
        </div>
        <div class="col-md-3 border-left border-light">
          <StatesList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatesList from "@/components/StatesList.vue";
import MexicoMap from "@/components/charts/MexicoMap.vue";

export default {
  name: "Home",
  components: {
    StatesList,
    MexicoMap
  }
};
</script>
