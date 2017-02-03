var initMap = function(){
  var mapURL = window.location.href;
  var id = mapURL.match(/\d*$/)[0]

  map = setMap()

  if (id) {
    loadPings(id, map)
  }

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  trip.view.showAdd()

  var addPing = $('#add-ping').click(trip.pingHandler.bind(trip))

  $('#submit-pings').click(trip.submitHandler.bind(trip))
}





