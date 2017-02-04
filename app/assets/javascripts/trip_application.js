var initMap = function(){
  var id = window.trip.id

  map = setMap()

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  if (id) {
    loadPings(id, map, trip.model.pings)
  }

  trip.model.loadPings()
  trip.view.showAdd()

  $('#add-ping').click(trip.pingHandler.bind(trip))

  $('#submit-pings').click(trip.submitHandler.bind(trip))
}





