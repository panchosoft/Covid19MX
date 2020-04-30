const request = require("request");
const csv = require("csvtojson");
const fs = require("fs");

csv()
  // Read source CSV file
  .fromStream(
    request.get(
      "https://raw.githubusercontent.com/carranco-sga/Mexico-COVID-19/master/Mexico_COVID19_CTD.csv"
    )
  )
  // Parse resulting JSON object
  .then(jsonObj => {
    // Debug message
    console.log("CSV source file obtained successfully.");

    // JSON results object
    var mx_timeline = [];
    var mx_total_timeline = [];
    var minStartDate = new Date("2020-02-24");

    var MexicoStatesKeyMap = {
      "MX-AGU": "AGU",
      "MX-BCN": "BCN",
      "MX-BCS": "BCS",
      "MX-CAM": "CAM",
      "MX-CHP": "CHP",
      "MX-CHH": "CHH",
      "MX-CMX": "CMX",
      "MX-COA": "COA",
      "MX-COL": "COL",
      "MX-DUR": "DUR",
      "MX-GUA": "GUA",
      "MX-GRO": "GRO",
      "MX-HID": "HID",
      "MX-JAL": "JAL",
      "MX-MIC": "MIC",
      "MX-MOR": "MOR",
      "MX-MEX": "MEX",
      "MX-NAY": "NAY",
      "MX-NLE": "NLE",
      "MX-OAX": "OAX",
      "MX-PUE": "PUE",
      "MX-QUE": "QUE",
      "MX-ROO": "ROO",
      "MX-SLP": "SLP",
      "MX-SIN": "SIN",
      "MX-SON": "SON",
      "MX-TAB": "TAB",
      "MX-TAM": "TAM",
      "MX-TLA": "TLA",
      "MX-VER": "VER",
      "MX-YUC": "YUC",
      "MX-ZAC": "ZAC"
    };

    // Iterate source data
    for (let i = 0; i < jsonObj.length; i++) {
      // Current row
      currentRow = jsonObj[i];

      // Get current row date as date object
      lastDateString = currentRow.Fecha;
      dateParts = lastDateString.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      currentDate = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);

      // Only process records in the desired range
      if (currentDate >= minStartDate) {
        // Debug message
        console.log("Latest date in source file: " + currentDate);

        // Create resulting row object
        var resultsByDateObject = {
          date: currentRow.Fecha,
          list: []
        };
        for (var stateKey in MexicoStatesKeyMap) {
          resultsByDateObject.list.push({
            id: stateKey,
            confirmed: parseInt(currentRow[MexicoStatesKeyMap[stateKey]]),
            // confirmed_imported: parseInt(
            //   currentRow[MexicoStatesKeyMap[stateKey] + "_I"]
            // ),
            // confirmed_local: parseInt(
            //   currentRow[MexicoStatesKeyMap[stateKey] + "_L"]
            // ),
            deaths: parseInt(currentRow[MexicoStatesKeyMap[stateKey] + "_D"]),
            recovered: parseInt(
              currentRow[MexicoStatesKeyMap[stateKey] + "_R"]
            ),
            suspect: parseInt(currentRow[MexicoStatesKeyMap[stateKey] + "_S"])
          });
        }
        // Add to result array
        mx_timeline.push(resultsByDateObject);
      }
    }

    // Debug message
    console.log("mx_timeline generated without any errors.");
    // console.log(JSON.stringify(mx_timeline))

    for (let i = 0; i < jsonObj.length; i++) {
      // Current row
      var currentRow = jsonObj[i];

      // Get current row date as date object
      var lastDateString = currentRow.Fecha;
      var dateParts = lastDateString.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      var currentDate = new Date(
        +dateParts[0],
        dateParts[1] - 1,
        +dateParts[2]
      );

      // Only process records in the desired range
      if (currentDate >= minStartDate) {
        // Debug message
        console.log("Latest date in source file: " + currentDate);

        // Create resulting row object
        mx_total_timeline.push({
          date: currentRow.Fecha,
          confirmed: parseInt(currentRow.Pos),
          confirmed_imported: parseInt(currentRow.Pos_I),
          confirmed_local: parseInt(currentRow.Pos_L),
          confirmed_official: parseInt(currentRow.Pos_rep),
          deaths: parseInt(currentRow.Deceased),
          recovered: parseInt(currentRow.Recovered),
          suspect: parseInt(currentRow.Susp),
          suspect_official: parseInt(currentRow.Susp_rep),
          tested: parseInt(currentRow.Tested_tot),
          negative: parseInt(currentRow.Neg_rep)
        });
      }
    }

    // Debug message
    console.log("mx_total_timeline object generated without any errors.");
    // console.log(mx_total_timeline);

    // Write results to file system
    fs.writeFile(
      "public/data/mx_total_timeline.json",
      JSON.stringify(mx_total_timeline),
      function(err) {
        if (err) return console.log(err);
        else
          console.log(
            "OK: mx_total_timeline > public/data/mx_total_timeline.json"
          );
      }
    );

    // Write results to file system
    fs.writeFile(
      "public/data/mx_timeline.json",
      JSON.stringify(mx_timeline),
      function(err) {
        if (err) return console.log(err);
        else console.log("OK: mx_timeline > public/data/mx_timeline.json");
      }
    );
  });
