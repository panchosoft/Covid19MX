<template>
  <div class="home">
    <div class="container-fluid pl-0 pr-0">
      <div class="row ml-0 mr-0">
        <div class="col-lg-9 pl-0 pr-0">
          <MexicoMap />
        </div>
        <div class="col-lg-3 state-list-container px-0">
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
    MexicoMap,
  },
};
</script>

<style scoped>
.home {
  background-color: #24292e;
  color: #fff;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath fill='%236d6d6d' fill-opacity='.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'/%3E%3C/svg%3E");
}
.state-list-container {
  border-left: 1px solid white;
}

@media (max-width: 760px) {
  .state-list-container {
    border-left: none !important;
    padding-top: 5px;
  }
}
</style>
