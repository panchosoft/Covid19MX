<template>
  <main role="main" class="flex-shrink-0 statistics">
    <div class="container">
      <h1 class="pt-3 text-center">Estad&iacute;sticas</h1>
      <p class="lead mt-3 text-center">
        En <span class="font-weight-bold text-info">M&eacute;xico</span>, al
        <span class="font-weight-bold text-info">{{ buildDateTime }}</span
        >, se han detectado
        <span class="font-weight-bold text-info"
          >{{
            currentData.confirmed ? currentData.confirmed.toLocaleString() : 0
          }}
          casos confirmados</span
        >
        de COVID-19, incluyendo
        <span class="font-weight-bold text-danger"
          >{{
            currentData.deaths ? currentData.deaths.toLocaleString() : 0
          }}
          defunciones</span
        >
        reportadas por la Secretar&iacute;a de Salud y el Gobierno Federal.
      </p>
    </div>
    <div id="chartsContainer" class="mt-5">
      <ColumnChart
        title="Evolución de casos confirmados"
        :sourceData="sourceTotalData"
        sourceField="confirmed"
        :chartTitle="
          new Number(
            currentData.confirmed ? currentData.confirmed : 0
          ).toLocaleString()
        "
        chartSubtitle="casos confirmados"
        highlightColor="#0093D5"
      ></ColumnChart>
      <div class="mt-5"></div>
      <ColumnChart
        title="Defunciones confirmadas en el tiempo"
        :sourceData="sourceTotalData"
        sourceField="deaths"
        :chartTitle="
          new Number(
            currentData.deaths ? currentData.deaths : 0
          ).toLocaleString()
        "
        chartSubtitle="decesos"
        highlightColor="#C33545"
      ></ColumnChart>
    </div>
  </main>
</template>

<script>
import ColumnChart from "@/components/charts/ColumnChart.vue";

export default {
  name: "Statistics",
  components: { ColumnChart },
  data() {
    return {
      buildDateTime: this.getBuildTime(),
      sourceData: {},
      sourceTotalData: {},
      mostRecentDate: {},
      currentData: {}
    };
  },
  beforeMount() {
    // Request source data
    this.fetchData("/data/mx_total_timeline.json").then(source => {
      // Keep local reference
      this.sourceTotalData = source;

      // Request source data
      this.fetchData("/data/mx_timeline.json").then(_source => {
        // Keep local reference
        this.sourceData = _source;

        //Refresh page
        this.updatePageData();
      });
    });
  },
  methods: {
    updatePageData() {
      // Validate source data
      if (!this.sourceTotalData || this.sourceTotalData.length == 0) return;

      // Required vars
      this.mostRecentDate = new Date(this.sourceTotalData[0].date);

      // Obtain the most recent record
      for (var i = 0; i <= this.sourceTotalData.length - 1; i++) {
        // Get Date
        var current = this.sourceTotalData[i];
        var dateParts = current.date.split("-");

        // month is 0-based, that's why we need dataParts[1] - 1
        var date = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);

        if (date > this.mostRecentDate) {
          this.mostRecentDate = date;
          this.currentData = current;
        }
      }
    },

    // Get URL content
    fetchData: async function(url) {
      // Validate url is defined
      if (!url) return;

      // Get source data
      const source = await fetch(url);
      return await source.json();
    },
    getBuildTime() {
      // Get build time from root <HTML> element
      var buildTime = document.documentElement.dataset.buildTimestamp;

      if (buildTime) {
        // request a weekday along with a long date
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        };

        // an application may want to use UTC and make that visible
        // options.timeZone = "America/New_York";
        options.timeZoneName = "short";

        return new Date(buildTime).toLocaleString("es-MX", options);
      }
    }
  }
};
</script>

<style scoped>
.text-info {
  color: #0093d5 !important;
}
</style>
