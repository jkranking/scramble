TripController.prototype.displayPathElevation = function(path, elevator, map){
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 256
  }, this.plotElevation);
}

TripController.prototype.plotElevation = function(elevations, status) {
  cumulativeElevation(elevations)
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== 'OK') {

    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
        status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  // data.addColumn('number', 'Distance');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', (elevations[i].elevation * 3.28084)]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (f)',
  });
}

function cumulativeElevation(elevations) {

  var cumulativeGain = 0
  for (i = 0; i < elevations.length - 1; i++){
    fromElevation = elevations[i].elevation
    toElevation = elevations[i + 1].elevation

    if (fromElevation < toElevation) {
      cumulativeGain += (toElevation - fromElevation)
    }
  }

  // these should be there own functions (actually we should rethink where a lot of this goes)

  var highPoint = elevations.slice().sort(function(a,b){
    return b.elevation - a.elevation
  })

  var gain = (cumulativeGain * 3.28084).toFixed(0)
    $("#gain").text("elevation gain: " + gain + " ft")

  var start = (elevations[0].elevation * 3.28084).toFixed(0)
    $("#starting-point").text("starting elevation: " + start + " ft")

  var summit = (highPoint[0].elevation * 3.28084).toFixed(0)
    $("#high-point").text("high point: " + summit + " ft")

}











