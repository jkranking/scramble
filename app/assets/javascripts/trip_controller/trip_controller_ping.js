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
    var ping = newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this, true)
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
  }).done(function(saved_trip){
    alert('trip saved!')
    window.location.href = "/trips/" + saved_trip.id;
  }).fail(function(){
    alert('must have at least two pings to save!')
  })

  google.maps.event.removeListener(pingListener);
  this.view.showAdd()
}

TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // pingListener is global
  var pings = this.model.pings
  var that = this

  pingListener = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var ping = newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this, true)
    pings.push(ping)
    ping.addListener('drag', that.addPolyline.bind(that));
    that.addPolyline()
  })
  this.view.showSubmit()
}

TripController.prototype.editTripHandler = function(event) {
  event.preventDefault()
  var that = this

  this.model.pings.forEach(function(ping){
    ping.setDraggable(true);
    ping.addListener('drag', that.addPolyline.bind(that));
  })
}

TripController.prototype.updateTripHandler = function(event) {
  event.preventDefault()
  this.model.updateCenter()
  //var name = $('#trip_name').val() //name update is not yet a featr

  $.ajax({
    type: 'PUT',
    url: "/trips/" + window.trip.id,
    data: {trip: {latitude: this.model.center_lat,
                  longitude: this.model.center_lng,
                  zoom: this.model.zoom},
            pings: this.model.simplePings(),
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(updated_trip){
    alert('trip updated!')
  }).fail(function(){
    alert('something went wrong!')
  })

  this.model.pings.forEach(function(ping){
    ping.setDraggable(false);
  }.bind(this))

}
