<template>
  <div id="columnChart" class="container">
    <div class="row">
      <div class="col">
        <h5 class="mb-0">{{ title }}</h5>
        <div id="columnChartDiv" ref="columnChartDiv"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#columnChartDiv {
  width: 100%;
  height: 100% !important;
  min-height: 230px;
}
</style>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

//  am4core.options.queue = true;
// am4core.options.viewportTarget = document.getElementById("chartsContainer")
// if(!am4core.options.onlyShowOnViewport)
// am4core.options.onlyShowOnViewport = true;

am4core.useTheme(am4themes_animated);
am4core.options.onlyShowOnViewport = true;

export default {
  name: "ColumnChart",
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
      var chart = am4core.create(this.$refs.columnChartDiv, am4charts.XYChart);

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

      // Labels
      var mainTitle = chart.createChild(am4core.Label);
      mainTitle.fontSize = 60;
      mainTitle.text = this.chartTitle;
      mainTitle.align = "left";
      mainTitle.paddingLeft = 0;
      mainTitle.paddingBottom = 1;
      mainTitle.fill = am4core.color("#ffffff");
      mainTitle.isMeasured = false;
      mainTitle.y = 20;

      var subTitle = chart.createChild(am4core.Label);
      subTitle.fontSize = 20;
      subTitle.text = this.chartSubtitle;
      subTitle.align = "left";
      subTitle.paddingLeft = 0;
      // subTitle.paddingBottom = 1;
      subTitle.fill = am4core.color("#ffffff");
      subTitle.isMeasured = false;
      subTitle.y = 85;

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.category = "date";
      dateAxis.renderer.grid.template.location = 0;

      // dateAxis.renderer.minGridDistance = 30;
      // dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.labels.template.fill = am4core.color("#fff");
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.language.locale = am4lang_es_ES;
      dateAxis.renderer.cellStartLocation = 0.2;
      dateAxis.renderer.cellEndLocation = 0.8;
      dateAxis.cursorTooltipEnabled = false;

      // Value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      valueAxis.renderer.grid.template.location = 0;
      // valueAxis.renderer.minGridDistance = 0;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = this.sourceField;
      series.dataFields.dateX = "date";
      series.name = "series";
      series.columns.template.dateFormatter.dateFormat = "MM-dd";
      series.columns.template.tooltipText =
        "[bold]{dateX.formatDate('MMMM d, YYYY')}[/]\n[bold " +
        this.highlightColor +
        "]{valueY}[/] " +
        this.chartSubtitle +
        "\n[bold #" +
        this.highlightColor +
        "]+{valueY.previousChange}[/] casos nuevos";
      series.tooltip.pointerOrientation = "down";
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#000");
      series.tooltip.background.fill = am4core.color("#FFFFFF");
      series.columns.template.tooltipY = -5;
      series.columns.template.fillOpacity = 1;
      series.columns.template.width = am4core.percent(100);

      // Rounded corners
      series.columns.template.column.cornerRadiusTopLeft = 2;
      series.columns.template.column.cornerRadiusTopRight = 2;

      // Accumulated value
      series.dataFields.valueYShow = "previousChange";
      series.clustered = false;

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 1;
      columnTemplate.strokeOpacity = 1;
      series.columns.template.fill = am4core.color("#eaeaea");
      series.columns.template.stroke = am4core.color("#eaeaea");

      var hoverState = series.columns.template.states.create("hover");
      hoverState.properties.fill = am4core.color(this.highlightColor);
      hoverState.properties.stroke = am4core.color(this.highlightColor);

      // Small screens config
      if (this.isMobile) {
        // Rounded corners
        series.columns.template.column.cornerRadiusTopLeft = 1;
        series.columns.template.column.cornerRadiusTopRight = 1;

        mainTitle.fontSize = 50;
        subTitle.fontSize = 15;
        // chart.tapToActivate = true;
        // chart.responsive.enabled = true;
      }

      // Keep a local reference
      this.chart = chart;
      this.mainTitle = mainTitle;
      this.mainSubtitle = subTitle;
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
