<template>
  <div id="table-root" class="table-container container p-0">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true
      }"
      theme="nocturnal"
      styleClass="vgt-table condensed"
      @on-row-click="onRowClick"
      @on-row-mouseenter="onRowMouseEnter"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'confirmed', type: 'desc' }
      }"
    />
  </div>
</template>

<script>
// import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "StatesList",
  components: {
    VueGoodTable
  },
  methods: {
    // On state list click event
    onRowClick: function(params) {
      if (params && params.row) this.$root.$emit("selectState", params.row.id);
    },
    // On row mouse enter in state list
    onRowMouseEnter: function(params) {
      if (params && params.row)
        this.$root.$emit("rollOverState", params.row.id);
    }
  },

  beforeMount() {
    // Reference
    let MainVueObject = this;

    // Get source data
    const getSourceData = async () => {
      const source = await fetch("/data/mx_timeline.json");
      return await source.json();
    };

    // Process results
    getSourceData().then(function(sourceData) {
      // Validate source data
      if (sourceData == null && sourceData.length == 0) return;

      // Pick first record
      var mostRecentDate = sourceData[0].date;
      var mostRecentObject = null;

      for (var key in sourceData) {
        if (sourceData[key].date > mostRecentDate)
          mostRecentObject = sourceData[key];
      }

      // Required vars
      var MexicoStatesKeyMap = new Array();
      MexicoStatesKeyMap["MX-AGU"] = "Aguascalientes";
      MexicoStatesKeyMap["MX-BCN"] = "Baja California";
      MexicoStatesKeyMap["MX-BCS"] = "Baja California Sur";
      MexicoStatesKeyMap["MX-CAM"] = "Campeche";
      MexicoStatesKeyMap["MX-CHP"] = "Chiapas";
      MexicoStatesKeyMap["MX-CHH"] = "Chihuahua";
      MexicoStatesKeyMap["MX-CMX"] = "Ciudad de México";
      MexicoStatesKeyMap["MX-COA"] = "Coahuila";
      MexicoStatesKeyMap["MX-COL"] = "Colima";
      MexicoStatesKeyMap["MX-DUR"] = "Durango";
      MexicoStatesKeyMap["MX-GUA"] = "Guanajuato";
      MexicoStatesKeyMap["MX-GRO"] = "Guerrero";
      MexicoStatesKeyMap["MX-HID"] = "Hidalgo";
      MexicoStatesKeyMap["MX-JAL"] = "Jalisco";
      MexicoStatesKeyMap["MX-MIC"] = "Michoacán";
      MexicoStatesKeyMap["MX-MOR"] = "Morelia";
      MexicoStatesKeyMap["MX-MEX"] = "Estado de México";
      MexicoStatesKeyMap["MX-NAY"] = "Nayarit";
      MexicoStatesKeyMap["MX-NLE"] = "Nuevo León";
      MexicoStatesKeyMap["MX-OAX"] = "Oaxaca";
      MexicoStatesKeyMap["MX-PUE"] = "Puebla";
      MexicoStatesKeyMap["MX-QUE"] = "Querétaro";
      MexicoStatesKeyMap["MX-ROO"] = "Quintana Roo";
      MexicoStatesKeyMap["MX-SLP"] = "San Luis Potosí";
      MexicoStatesKeyMap["MX-SIN"] = "Sinaloa";
      MexicoStatesKeyMap["MX-SON"] = "Sonora";
      MexicoStatesKeyMap["MX-TAB"] = "Tabasco";
      MexicoStatesKeyMap["MX-TAM"] = "Tamaulipas";
      MexicoStatesKeyMap["MX-TLA"] = "Tlaxcala";
      MexicoStatesKeyMap["MX-VER"] = "Veracruz";
      MexicoStatesKeyMap["MX-YUC"] = "Yucatán";
      MexicoStatesKeyMap["MX-ZAC"] = "Zacatecas";

      // Add rows to the table source data
      for (var i = 0; i < mostRecentObject.list.length - 1; i++) {
        MainVueObject.rows.push({
          id: mostRecentObject.list[i].id,
          state: MexicoStatesKeyMap[mostRecentObject.list[i].id],
          confirmed: parseInt(mostRecentObject.list[i].confirmed),
          deaths: parseInt(mostRecentObject.list[i].deaths)
        });
      }
    });
  },
  data: function() {
    return {
      filter: "",
      columns: [
        { label: "ID", field: "id", hidden: true },
        { label: "Estado", field: "state" },
        {
          label: "Confirmados",
          field: "confirmed",
          type: "number",
          align: "right",
          thClass: "greyColumn",
          tdClass: "greyColumn"
        },
        {
          label: "Decesos",
          field: "deaths",
          type: "number",
          align: "right"
        }
      ],
      rows: []
    };
  }
};
</script>
<style>
.table-container {
  max-height: 915px;
  overflow-y: auto;
}
.greyColumn {
  background-color: #55555556;
  border-bottom: 1px solid #555;
}

.vgt-table.nocturnal {
  border: 1px solid #212327 !important;
  background-color: #212327 !important;
}
.vgt-table.nocturnal tr:hover {
  background-color: #030303 !important;
  color: #da711c !important;
}
.vgt-table.nocturnal td {
  border-bottom: 1px solid #555;
  color: #c7ced8;
}
.vgt-table.nocturnal td:hover {
  border-bottom: 1px solid #555;
  color: #da711c !important;
}
table.vgt-table {
  font-size: 14px;
  border-collapse: collapse;
}
.vgt-wrap.nocturnal .vgt-global-search {
  border: 1px solid #212327;
  background: #212327;
}
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input,
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select {
  color: #000;
  background-color: #ccc;
  border: 1px solid #212327;
}
.vgt-table.nocturnal thead th {
  color: #c7ced8;
  border-bottom: 1px solid #212327;
  background: #212327;
  font-size: 15px;
}
</style>
