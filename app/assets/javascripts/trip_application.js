var initMap = function(){

  var id = window.trip.id
  var pings = window.pings
  var markers = window.markers



  map = setMap()
  searchBox(map)

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )


  if (pings) {
    trip.model.loadPingsList()
    trip.addPolyline()
  }

  if (markers) {
    trip.model.loadMarkersList()
  }

  trip.view.showAdd()
  trip.view.showAddMarker()

  var path = []
  trip.model.pings.forEach(function(ping){
    path.push({lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())})
  })
  console.log(path)

  var elevator = new google.maps.ElevationService;
  trip.displayPathElevation(path, elevator, map);


  $('#add-ping').click(trip.pingHandler.bind(trip))
  $('#submit-pings').click(trip.submitPingsHandler.bind(trip))
  $('#add-marker').click(trip.markerHandler.bind(trip))
  $('#submit-marker').click(trip.submitMarkerHandler.bind(trip))
  $('#cancel-marker').click(trip.cancel.bind(trip))
}






