<template>
  <div class="home">
    <div class="container-fluid pl-0 pr-0">
      <div class="row">
        <div class="col-md-9 pl-0 pr-0">
          <MexicoMap />
        </div>
        <div class="col-md-3">
          <ListByState />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListByState from "@/components/ListByState.vue";
import MexicoMap from "@/components/charts/MexicoMap.vue";

export default {
  name: "Home",
  components: {
    ListByState,
    MexicoMap
  },
};
</script>
