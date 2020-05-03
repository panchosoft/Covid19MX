<template>
  <div id="columnChart" class="container">
    <div class="row">
      <h4>Casos confirmados hist&oacute;ricos</h4>
    </div>
    <div class="row">
      <div class="float-left">5000 casos confirmados</div>
      <div class="container-fluid">
        <div id="columnChartDiv" ref="columnChartDiv"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#columnChartDiv {
  width: 100%;
  height: 100% !important;
  min-height: 200px;
}
</style>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "ColumnChart",
  props: ["sourceData"],
  watch: {
    sourceData: function(newSource) {
      // If new source is defined
      if(newSource && newSource.length > 0)
        this.renderGraph()
    },
  },
  methods: {
    renderGraph() {
      // Create chart instance
      var chart = am4core.create(this.$refs.columnChartDiv, am4charts.XYChart);

      // Language
      chart.language.locale = am4lang_es_ES;

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineY.disabled = true;
      // chart.cursor.lineX.stroke = am4core.color("#eaeaea");

      // Add data
      chart.data = this.sourceData;

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 0;
      categoryAxis.renderer.labels.template.disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;

      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      valueAxis.renderer.grid.template.location = 0;
      // valueAxis.renderer.minGridDistance = 0;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "confirmed";
      series.dataFields.categoryX = "date";
      series.name = "Confirmados";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      series.columns.template.width = am4core.percent(100);

      // Rounded corners
      series.columns.template.column.cornerRadiusTopLeft = 2;
      series.columns.template.column.cornerRadiusTopRight = 2;

      // Accumulated value
      series.dataFields.valueYShow = "previousChange";
      series.clustered = false;

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

      // Keep a local reference
      this.chart = chart;
    }
  },
  // Dispose resources
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>
