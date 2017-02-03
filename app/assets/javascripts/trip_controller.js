function TripController(view, model){
  this.view = view,
  this.model = model
}


newMarker = function(location, map){
  return new google.maps.Marker({
    position: location,
    map: map
  });
}

TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // latLng is global
  var pings = this.model.pings
  latLng = google.maps.event.addListener(this.model.map, 'click', function (event) {
    coordinates = event.latLng
    var newPing = newMarker({lat: event.latLng.lat(), lng: event.latLng.lng()}, this)
    pings.push(new PingModel({lat: event.latLng.lat(), lng: event.latLng.lng()}))
  })

  $('#add-ping').hide()
  $('#submit-pings').show()
}
