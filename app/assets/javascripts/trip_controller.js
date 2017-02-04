//clicked was added to prevent a note from being saved without a marker

function TripController(view, model){
  this.view = view,
  this.model = model,
  this.clicked = true
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

  this.clicked = false
  var that = this

  //submitMarkerListener is global so is can be removed on a cancel
  submitMarkerListener = google.maps.event.addListenerOnce(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var marker = newMarker({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    markers.push(marker)
    that.clicked = true
  })
  this.view.showSubmitMarker()
}

TripController.prototype.submitMarkerHandler = function(event) {
  event.preventDefault()

  if (!this.clicked){ alert('please set a location before saving your note'); return}

  var controller = this
  var id = window.trip.id
  var marker = this.model.markers.slice(-1)[0]
  var coordinates = marker.getPosition()
  var note = $('#new-note').val()

  $.post({
    url: "/trips/" + id + "/markers",
    data: {marker: {lat: coordinates.lat(),
                  lng: coordinates.lng(),
                  note: note},
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }

  ).done(function(response){
    $('#note-container').append('<li>' + marker.getLabel() + '. ' + note + '</li>')
    controller.view.showAddMarker()
    alert('note saved!')
  }

  ).fail(function(){
    alert('something went wrong!')
  })

}

TripController.prototype.cancel = function(event) {
  event.preventDefault()

  google.maps.event.removeListener(submitMarkerListener)
  this.view.showAddMarker()
  if (this.clicked) {
    var marker = this.model.markers.pop() //remove the placed marker
    marker.setMap(null)
    labelIndex--
  } else {
    this.clicked = true
  }
}

