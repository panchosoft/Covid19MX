<template>
  <div id="statesChart" class="container">
    <div class="row">
      <div class="col">
        <h5 class="mb-0">{{ title }}</h5>
        <div id="statesChartDiv" ref="statesChartDiv"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#statesChartDiv {
  width: 100%;
  height: 100% !important;
  min-height: 330px;
}
</style>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.onlyShowOnViewport = true;

export default {
  name: "StatesChart",
  props: [
    "sourceData",
    "sourceField",
    "title",
    "chartTitle",
    "chartSubtitle",
    "highlightColor",
  ],
  watch: {
    sourceData: function (newSource) {
      // If new source is defined
      if (newSource && newSource.length > 0) this.renderGraph();
    },
    chartTitle: function (newTitle) {
      if (this.mainTitle && newTitle) this.mainTitle.text = newTitle;
    },
    chartSubtitle: function (newSubtitle) {
      if (this.mainSubtitle && newSubtitle)
        this.mainSubtitle.text = newSubtitle;
    },
  },
  data() {
    return {
      isMobile: window.matchMedia("only screen and (max-width: 768px)").matches,
    };
  },
  mounted() {
    if (this.sourceData && this.sourceData.length > 0) this.renderGraph();
  },
  methods: {
    renderGraph() {
      // Create chart instance
      var chart = am4core.create(this.$refs.statesChartDiv, am4charts.XYChart);

      // Language
      chart.language.locale = am4lang_es_ES;
      chart.language.locale["_decimalSeparator"] = ".";
      chart.language.locale["_thousandSeparator"] = ",";

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineY.disabled = true;
      chart.cursor.lineX.disabled = true;
      // chart.cursor.lineX.stroke = am4core.color("#eaeaea");

      // Add data
      chart.data = this.sourceData;

      // Chart font size
      chart.fontSize = "0.9em";

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "state";
      categoryAxis.renderer.labels.template.rotation = 300;
      categoryAxis.renderer.labels.template.hideOversized = false;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //   valueAxis.title.text = "Countries";
      valueAxis.title.fontWeight = "bold";
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.tooltip.disabled = true;
      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "confirmed";
      series.dataFields.categoryX = "state";
      series.name = "Visits";
      series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.stro = this.highlightColor;
      // Rounded corners
      series.columns.template.column.cornerRadiusTopLeft = 2;
      series.columns.template.column.cornerRadiusTopRight = 2;

      series.tooltip.autoTextColor = false;
      series.tooltip.pointerOrientation = "down";
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#000");
      series.tooltip.background.fill = am4core.color("#FFFFFF");
      series.columns.template.tooltipY = -25;

            series.fill = this.highlightColor;
      series.stroke = this.highlightColor;
      series.fillOpacity = 0.6;

      // Sort
      categoryAxis.sortBySeries = series;

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      columnTemplate.stroke = am4core.color("#FFFFFF");

      // Small screens config
      if (this.isMobile) {
        // Rounded corners
        series.columns.template.column.cornerRadiusTopLeft = 1;
        series.columns.template.column.cornerRadiusTopRight = 1;

        // chart.tapToActivate = true;
        // chart.responsive.enabled = true;
      }

      // Keep a local reference
      this.chart = chart;
    },
  },
  // Dispose resources
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>
