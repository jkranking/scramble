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


  google.maps.event.addListener(map, 'mousemove', trip.view.displayCoordinates);

  $('#add-ping').click(trip.pingHandler.bind(trip))
  $('#submit-pings').click(trip.submitPingsHandler.bind(trip))
  $('body').on('keydown keyup',function(e){
      if(e.which==13){e.preventDefault();}
    });

  $('#add-marker').click(trip.markerHandler.bind(trip))
  $('#submit-marker').click(trip.submitMarkerHandler.bind(trip))
  $('#cancel-marker').click(trip.cancelNewMarker.bind(trip))

  $('#edit-trip').click(trip.editTripHandler.bind(trip))
  $('#update-trip').click(trip.updateTripHandler.bind(trip))


  $('#map').on('click', '.edit-marker', trip.editMarker.bind(trip))
  $('#map').on('click', '.update-marker', trip.updateMarker.bind(trip))
  $('#map').on('click', '.delete-marker', trip.deleteMarker.bind(trip))

  trip.addRating(rated, rating, id)

}
