TripModel.prototype.getCumulativeGain = function(elevations){
  var cumulativeGain = 0
  for (i = 0; i < elevations.length - 1; i++){
    fromElevation = elevations[i].elevation
    toElevation = elevations[i + 1].elevation

    if (fromElevation < toElevation) {
      cumulativeGain += (toElevation - fromElevation)
    }
  }
  return cumulativeGain
}
