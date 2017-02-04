var initMap = function(){
  var id = window.trip.id
  var pings = window.pings

  map = setMap()

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  if (id) {
    loadPings(id, map, trip.model.pings)
  }

  if (pings) {
    trip.model.loadPingsList()
    trip.addPolyline()
  }

  trip.view.showAdd()

  $('#add-ping').click(trip.pingHandler.bind(trip))

  $('#submit-pings').click(trip.submitHandler.bind(trip))
}





