function TripController(view, model){
  this.view = view,
  this.model = model
}

TripController.prototype.addPolyline = function(){
  var polyPings = []

  if (this.model.polyline) {  this.model.polyline.setMap(null) }
    //add mouseUp listener
  this.model.pings.forEach(function(ping){
    polyPings.push({lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())})
  })

  this.model.polyline = new google.maps.Polyline({
    path: polyPings,
    geodesic: true,
    strokeColor: 'blue',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  this.model.polyline.setMap(this.model.map)
}


TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // pingListener is global
  var pings = this.model.pings
  var that = this

  pingListener = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var ping = newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    pings.push(ping)
    ping.addListener('drag', that.addPolyline.bind(that));
    that.addPolyline()
  })
  this.view.showSubmit()
}

TripController.prototype.submitPingsHandler = function(event) {
  event.preventDefault()
  this.model.updateCenter()
  var name = $('#trip_name').val()

  $.post({
    url: "/trips",
    data: {trip: {latitude: this.model.center_lat,
                  longitude: this.model.center_lng,
                  zoom: this.model.zoom,
                  name: name},
            pings: this.model.simplePings(),
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(response){
    alert('trip saved!')
  }).fail(function(){
    alert('must have at least two pings to save!')
  })

  google.maps.event.removeListener(pingListener);
  this.view.showAdd()
}

TripController.prototype.markerHandler = function(event) {
  event.preventDefault()
  var markers = this.model.markers

  google.maps.event.addListenerOnce(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var marker = newMarker({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    markers.push(marker)
  })
  this.view.showSubmitMarker()
}

TripController.prototype.submitMarkerHandler = function(event) {
  event.preventDefault()
  var id = window.trip.id
  var marker = this.model.markers[0].getPosition()
  var note = $('#new-note').val()
  console.log($('#new-note').val())
  $.post({
    url: "/trips/" + id + "/markers",
    data: {marker: {lat: marker.lat(),
                  lng: marker.lng(),
                  note: note},
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(response){

    alert('note saved!')
  }).fail(function(){
    alert('something went wrong!')
  })

}

