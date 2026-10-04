<template>
  <div id="table-root" class="table-container container-fluid p-0 m-0">
    <table v-if="rows.length" class="states-table">
      <thead>
        <tr>
          <th>Estado</th>
          <th class="text-end grey-column sortable" @click="sortBy('confirmed')">
            Confirmados
            <span v-if="sortField === 'confirmed'" class="sort-arrow">{{
              sortDirection === "desc" ? "▼" : "▲"
            }}</span>
          </th>
          <th class="text-end sortable" @click="sortBy('deaths')">
            Decesos
            <span v-if="sortField === 'deaths'" class="sort-arrow">{{
              sortDirection === "desc" ? "▼" : "▲"
            }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in sortedRows"
          :key="row.id"
          @click="onRowClick(row)"
          @mouseenter="onRowMouseEnter(row)"
        >
          <td>{{ row.state }}</td>
          <td class="text-end grey-column">{{ row.confirmed.toLocaleString() }}</td>
          <td class="text-end">{{ row.deaths.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty-state p-2">Fuente de datos no disponible.</div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";

export default {
  name: "StatesList",
  data: function () {
    return {
      rows: [],
      sortField: "confirmed",
      sortDirection: "desc",
    };
  },
  computed: {
    sortedRows() {
      const direction = this.sortDirection === "desc" ? -1 : 1;
      return [...this.rows].sort(
        (a, b) => (a[this.sortField] - b[this.sortField]) * direction
      );
    },
  },
  mounted() {
    // Enable communication with map to receive source json data
    eventBus.on("sendSourceData", (json) => {
      this.copySourceData(json);
    });
  },
  methods: {
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === "desc" ? "asc" : "desc";
      } else {
        this.sortField = field;
        this.sortDirection = "desc";
      }
    },
    // Receive source json data
    copySourceData(sourceData) {
      // Validate source data
      if (sourceData == null && sourceData.length == 0) return;

      // Clear existing data
      this.rows = [];

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
      MexicoStatesKeyMap["MX-MOR"] = "Morelos";
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
        this.rows.push({
          id: mostRecentObject.list[i].id,
          state: MexicoStatesKeyMap[mostRecentObject.list[i].id],
          confirmed: parseInt(mostRecentObject.list[i].confirmed),
          deaths: parseInt(mostRecentObject.list[i].deaths),
        });
      }
    },
    // On state list click event
    onRowClick: function (row) {
      if (row) eventBus.emit("selectState", row.id);

      // Scroll to the map after selecting a state
      document.getElementById("app").scrollIntoView();
    },
    // On row mouse enter in state list
    onRowMouseEnter: function (row) {
      if (row) eventBus.emit("rollOverState", row.id);
    },
  },
};
</script>
<style>
@media only screen and (-webkit-device-pixel-ratio: 2) {
  #table-root {
    font-size: 12px !important;
  }
}

@media (max-width: 1024px) {
  #table-root {
    margin-top: 10px;
  }

  .states-table {
    font-size: 15px !important;
    line-height: 20px;
  }

  .states-table thead th {
    font-style: normal;
    font-weight: normal;
  }
}

.grey-column {
  background-color: #55555556;
}

.states-table {
  width: 100%;
  border: 1px solid #24292e !important;
  background-color: #24292e !important;
  font-size: 14px;
  border-collapse: collapse;
}

.states-table thead th {
  color: #c7ced8;
  border-bottom: 1px solid #212327;
  background: #212327;
  font-size: 15px;
  padding: 0.2em 0.5em;
  text-align: left;
}

.states-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.states-table .sort-arrow {
  font-size: 0.7em;
}

.states-table td {
  border-bottom: 1px solid #555;
  color: #c7ced8;
  padding: 0.2em 0.5em;
}

.states-table tbody tr {
  cursor: pointer;
}

.states-table tbody tr:hover {
  background-color: #030303 !important;
  color: #da711c !important;
}

.states-table tbody tr:hover td {
  color: #da711c !important;
}

.empty-state {
  color: #c7ced8;
  background-color: #24292e;
}
</style>
