TripController.prototype.displayPathElevation = function(path, elevator, map){
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 256
  }, this.plotElevation.bind(this));
}

TripController.prototype.plotElevation = function(elevations, status) {

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
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  // data.addColumn('number', 'Distance');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', (elevations[i].elevation * 3.28084)]);
  }

  // Draw the chart using the data within its DIV.
  this.view.showElevationChart(chart, data)

  var cumulativeGain = this.model.getCumulativeGain(elevations)
  this.view.showElevation(cumulativeGain, elevations)
}
