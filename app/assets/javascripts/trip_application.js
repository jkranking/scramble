var initMap = function(){

  var id = window.trip.id
  var pings = window.pings
  var markers = window.markers
  var rated = window.user_rated
  var rating = window.rating

  map = setMap(window.trip)
  searchBox(map)

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  if (pings) {
    trip.model.loadPingsList()
    trip.addPolyline()
    trip.setElevationGraph()
    var distance = trip.model.calculateDistance()
    trip.view.showDistance(distance)
  }

  if (markers) {
    trip.model.loadMarkersList()
  }

  trip.view.showAdd()
  trip.view.showAddMarkerAndEditTrip()

  $('#add-ping').click(trip.pingHandler.bind(trip))
  $('#submit-pings').click(trip.submitPingsHandler.bind(trip))

  $('#add-marker').click(trip.markerHandler.bind(trip))
  $('#submit-marker').click(trip.submitMarkerHandler.bind(trip))
  $('#cancel-marker').click(trip.cancelNewMarker.bind(trip))

  $('#edit-trip').click(trip.editTripHandler.bind(trip))
  $('#update-trip').click(trip.updateTripHandler.bind(trip))


  $('#map').on('click', '.edit-marker', trip.editMarker.bind(trip))
  $('#map').on('click', '.update-marker', trip.updateMarker.bind(trip))
  $('#map').on('click', '.delete-marker', trip.deleteMarker.bind(trip))


if (!rated) {
  $(".stars label").click(function(event){
    var form = $(event.target)
    var star = form.attr('for')
    $.post('/ratings', {rating :star, trip_id :id}, function() {
    })
  })
} else {
  var starLabel = $("input[id=" + rating + "]")

  $(starLabel).click()

  $(".stars label").click(function(event){
    var form = $(event.target)
    var star = form.attr('for')
    $.ajax({
      type: 'PUT',
      url: "/ratings",
      data: {rating :star, trip_id :id}
    })
  })
}


























}






